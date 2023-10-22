const labels = [
  "dating: ",
  " violence: ",
  " world/life: ",
  " night/time: ",
  " shake the audience: ",
  " family/gospel: ",
  " romantic: ",
  " communication: ",
  " obscene: ",
  " music: ",
  " movement/places: ",
  " light/visual perceptions: ",
  " family/spiritual: ",
  " like/girls: ",
  " sadness: ",
  " feelings: ",
  " danceability: ",
  " loudness: ",
  " acousticness: ",
  " instrumentalness: ",
  " valence: ",
  " energy: "
];

export type musicParams = 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low'

export function calculateSearchParams(
  vec1: musicParams[],
  vec2: musicParams[],
  vec3: musicParams[]
) {
  let result = "";

  for (let i = 0; i < 5; i++) {
    let a = 0;
    if (vec1[i] === 'Very High') a = 5;
    else if (vec1[i] === 'High') a = 2;
    else if (vec1[i] === 'Medium') a = 0;
    else if (vec1[i] === 'Low') a = -2;
    else if (vec1[i] === 'Very Low') a = -5;
    let b = 0;
    if (vec2[i] === 'Very High') b = 5;
    else if (vec2[i] === 'High') b = 2;
    else if (vec2[i] === 'Medium') b = 0;
    else if (vec2[i] === 'Low') b = -2;
    else if (vec2[i] === 'Very Low') b = -5;
    let c = 0;
    if (vec3[i] === 'Very High') c = 5;
    else if (vec3[i] === 'High') c = 2;
    else if (vec3[i] === 'Medium') c = 0;
    else if (vec3[i] === 'Low') c = -2;
    else if (vec3[i] === 'Very Low') c = -5;

    const value = (a + b + c) / 3.0;
    console.log(value)
    if (value > 3.5) result += labels[i] + 'Very High';
    else if (value > 1) result += labels[i] + 'High';
    else if (value < -3.5) result += labels[i] + 'Very Low';
    else if (value < -1) result += labels[i] + 'Low';
    else result += labels[i] + 'Medium';
  }

  return result;
}

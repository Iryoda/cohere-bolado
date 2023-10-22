export const generateYoutubeUrl = (query: string) =>
  `https://www.youtube.com/results?search_query=${query
    .replace(/\s/g, "+")
    .replace(/&/g, "%26")}`;

export const generateSpotifyUrl = (query: string) =>
  `https://open.spotify.com/search/${query
    .replace(/\s/g, "%20")
    .replace(/&/g, "%26")}`;

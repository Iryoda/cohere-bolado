export const generateYoutubeUrl = (query: string) =>
  `https://www.youtube.com/results?search_query=${query.replace(/\s/g, "+")}`;

export const generateSpotifyUrl = (query: string) =>
  `https://open.spotify.com/search/${query.replace(/\s/g, "%20")}`;

const euclideanDistance = (a: number[], b: number[]) =>
  Math.hypot(...a.map((_, i) => b[i] - a[i]));

export default euclideanDistance;

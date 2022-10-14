export function getRandomDateInRange(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function getRandomInRange(max: number, min: number = 0): number {
  const range = max - min;
  return ~~(Math.random() * range) + min;
}

type randomFaceStyle =
  | 'male'
  | 'female'
  | 'big-ears-neutral'
  | 'big-ears'
  | 'big-smile'
  | 'human'
  | 'croodles'
  | 'personas'
  | 'identicon'
  | 'initials'
  | 'bottts'
  | 'avataaars'
  | 'jdenticon'
  | 'gridy'
  | 'micah'
  | 'adventurer'
  | 'adventurer-neutral';

export function getRandomProfileImgUrl(
  faceStyle: randomFaceStyle = 'micah'
): string {
  const seed = getRandomInRange(0, 10000);
  return `https://avatars.dicebear.com/api/${faceStyle}/${seed}.svg`;
}

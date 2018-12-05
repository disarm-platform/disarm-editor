import niceware from 'niceware';

export function generate_password(): string {
  const separator = '-';
  let input: string[] = [];
  input = niceware.generatePassphrase(4);
  input.push(getRandomInt(0, 1000).toString());
  return input.join(separator);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

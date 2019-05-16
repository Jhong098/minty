export function isVisa(num) {
  const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  return num.match(regex);
}

export function isMasterCard(num) {
  const regex = /^(?:5[1-5][0-9]{14})$/;
  return num.match(regex);
}

export function isValidPAN(text){
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(text);
}

export function isValidSalary(value){
  return !isNaN(value) && Number(value) > 0;
}

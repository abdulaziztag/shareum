// use to prevent floating math points
export const calculate = (a: number, b: number, sign: '+' | '-' | '*' | '/') => {
  const aLength = `${a}`.replace(/0./, '').length;
  const bLength = `${b}`.replace(/0./, '').length;
  const power = Math.pow(10, +(aLength > bLength ? aLength : bLength));
  const aDecimal = a * power;
  const bDecimal = b * power;
  return (
    eval(`${aDecimal}
    ${sign}
    ${bDecimal}`) / power
  );
};

export const mapOperatorToEn = {
  ایرانسل: "irancell",
  "همراه اول": "hamrah",
  رایتل: "rightel",
};
const persinNum = [
  /۰/gi,
  /۱/gi,
  /۲/gi,
  /۳/gi,
  /۴/gi,
  /۵/gi,
  /۶/gi,
  /۷/gi,
  /۸/gi,
  /۹/gi,
];
export function num2en(str) {
  for (var i = 0; i < 10; i++) {
    str = str.replace(persinNum[i], i);
  }
  return str;
}
export const operatorData = {
  irancell: [20000, 50000, 100000, 200000],
  hamrah: [20000, 50000, 100000],
  rightel: [20000, 50000, 100000],
};
export const formatChanger = (num) => {
  return new Intl.NumberFormat("fa-Ir").format(num);
};

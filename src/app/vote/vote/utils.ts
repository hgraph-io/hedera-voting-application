export const hex2a = (hexx: string): string => {
  let hex = hexx.toString().split('\\x')[1]; //force conversion
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
};

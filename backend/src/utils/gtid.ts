export const isGTID = (str: string) => {
  const gtidRegex = /^\d{9}$/;
  return gtidRegex.test(str);
};

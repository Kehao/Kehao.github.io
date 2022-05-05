type RawType = string | number;
const formatFloat = (value: RawType, len: number = 3, isPercent: boolean = false): string => {
  let result = value;
  if (isPercent) {
    result = parseFloat(value as string) * 100;
  }
  result = parseFloat(result as string).toFixed(len);
  return result;
};

const formatText = (str: string, len: number = 4): string => {
  if (str && str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
};

const formatPercent = (percent: RawType, len: number = 3): string => {
  let formated = `${percent}`.replace('%', '');
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(parseFloat(formated))) {
    formated = parseFloat(formated).toFixed(len);
    return (parseFloat(formated) > 1000 && '>1000.00%') || `${formated}%`;
  }
  return 'NAN%';
};

export { formatFloat, formatText, formatPercent };

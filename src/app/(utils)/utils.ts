export function getFirstLetterCapitalized(str: string) {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase();
    } else {
      return "";
    }
  }    
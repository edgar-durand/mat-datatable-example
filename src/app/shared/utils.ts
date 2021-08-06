/**
 *
 * @param str
 * @param setDefault
 */
export const setDefault = (str: string, setDefault = ''): string => typeof str !== 'undefined' ? str : setDefault;

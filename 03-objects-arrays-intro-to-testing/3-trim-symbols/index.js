/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (size === 0) {
        return '';
    }
    if (size === undefined) {
        return string;
    }

    let result = '';
    for (let i = 0, curChar = '', curSize = 0; i < string.length; i++) {
        if ( (curChar === string[i]) && (curSize < size) ) {
            result = result + string[i];
            curSize++;
        } else if ( !(curChar === string[i]) ) {
            curChar = string[i];
            result = result + string[i];
            curSize = 1;
        }
    }
    return result;
}

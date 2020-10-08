/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    return function (obj) {
        let arr = path.split('.');
        let curObj = obj;
        for (let item of arr) {
            switch ( typeof(curObj[item]) ) {
                case 'object': 
                    curObj = curObj[item];
                    break;
                default:
                    return curObj[item];
            }
        }
        return undefined;
    }
}

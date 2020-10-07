/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, param = 'asc') {
  if (!(param ==='asc' || param === 'desc')) {
    return [...arr];
  };  

  return [...arr].sort( (a, b) => {
      function check(first, second) {
        return first.localeCompare(second, ['ru', 'en'], {caseFirst: 'upper'});
      }

      if (param === 'asc') {
        return check(a, b);
      } else if (param === 'desc') {
        return check(b, a);
      };
  });
}

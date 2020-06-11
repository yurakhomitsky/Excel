/**
 *  Returns capitalized firts letter of the string
 *
 * @param {string} string - The desired string
 * @return {string} - capitalized firts letter of the string
 */
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1);

}
export function groupBy(map,list, keyGetter) {
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });

}
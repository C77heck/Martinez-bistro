// TODO -> this needs some improvement on the extraction of falsy values like 0, false and the like.
/**
 * @description alternative to lodash get function.
 * @param obj object to extract data from
 * @param path the path which the user attempts to access the data
 * @param defaultVal default value that the user wants to be returned in case the no value accessible.
 * @returns  
 */
export const get = (obj, path, defaultVal = '') => {
    const props = path.replace(/\./g, ' ').replace(/\[|\]/g, ' ').split(' ');
    let val = obj;

    for (const prop of props) {

        if (!prop || typeof val === 'string') {
            continue;
        }

        val = val[prop];

        if (!val) {
            return defaultVal;
        }
    }

    if (!!val) {
        return val;
    }

    return defaultVal;
}
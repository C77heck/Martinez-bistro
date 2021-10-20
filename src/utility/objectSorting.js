export const objectSorting = (array) => {

    const res = {};
    /* dynamically create object properties with array data structure */
    array.forEach(i => {
        if (!res.hasOwnProperty(i.type)) {
            res[i.type] = [i];
        } else {
            res[i.type].push(i)
        }
    });
    return res;
}
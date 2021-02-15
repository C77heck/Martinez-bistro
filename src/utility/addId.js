export const addId = (array) => {
    return array.map(i => { i.identifier = 'item' + array.indexOf(i); return i; });
}
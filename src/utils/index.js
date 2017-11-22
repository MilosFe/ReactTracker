export const reverseForEach = (collection, iteratee) => {
    let length = collection.length;

    for (let i = length - 1; i >= 0; i--) {
        iteratee(collection[i], i);
    }
};

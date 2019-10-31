
/**
 * Returns an array with arrays of the given size.
 *
 * @param arr {Array} array to split
 * @param num {Integer} Size of every group
 */
export function splitByNumber(arr, num) {
    let newArray = [];

    for (let i = 0; i < arr.length; i += num) {
        const subArray = arr.slice(i, i + num);
        newArray.push(subArray);
    }

    return newArray;
}

/**
 * Returns an object representing a pixel.
 *
 * @param pixel {Array} a four indexed array that
 * represents the Red, Green, Blue and Alpha values respectively.
 */
export function pixelArrayToObject(pixel) {
    return { red: pixel[0], green: pixel[1], blue: pixel[2], alpha: pixel[3] };
}

/**
 * Returns a pixel grid which represents an Image Data object as a two dimentional array of objects.
 *
 * @param pixel {Array} a four indexed array that
 * represents the Red, Green, Blue and Alpha values respectively.
 */
export function ImageDataToPixelGrid(imageData) {
    const twoDPixelArray = splitByNumber(imageData.data, imageData.width);
    const pixelGrid = twoDPixelArray.map(subArray => {
        const arrayOfPixels = [];
        for (let i = 0; i < subArray.length; i += 4) {
            arrayOfPixels.push(pixelArrayToObject([
                subArray[i],
                subArray[i + 1],
                subArray[i + 2],
                subArray[i + 3]
            ]));
        }
        return arrayOfPixels;
    });
    return pixelGrid;
}
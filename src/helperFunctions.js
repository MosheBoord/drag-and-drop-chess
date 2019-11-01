
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
    const pixelArray = splitByNumber(imageData.data, 4);
    const twoDPixelArray = splitByNumber(pixelArray, imageData.width);
    const pixelGrid = twoDPixelArray.map(subArray => {
        return subArray.map(pixel => pixelArrayToObject(...pixel));
    });
    return pixelGrid;
}

export function pixelToArray({ red, green, blue, alpha }) {
    return [red, green, blue, alpha];
}

/**
 * Returns a pixel grid which represents an Image Data object as a two dimentional array of objects.
 *
 * @param pixelGrid {Array} a two dimentional grid representing pixels.
 * @param imageData {Array} a array that represents pixels with their values.
 */
export function pixelGridToImageData(pixelGrid, imageData) {
    const array = [];
    const arrayOfPixels = array.concat(pixelGrid.map(row => {
        const arr = [];
        return arr.concat(row.map(pixel => pixelToArray(pixel)));
    }));
    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = arrayOfPixels[i];
    }
}
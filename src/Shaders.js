import React from "react";
import { ImageDataToPixelGrid } from "./helperFunctions";

const INCREMENTING = "INCREMENTING";
const DECREMENTING = "DECREMENTING";

// const ORIGINAL_PIXEL = "ORIGINAL_PIXEL";
// const   

class Filters {
    getPixels(img) {
        // console.log("img", img);
        // console.log(img.width, img.height);
        var imgWidth = img.width || img.naturalWidth;
        var imgHeight = img.height || img.naturalHeight;
        // console.log(imgWidth, imgHeight);
        let c = this.getCanvas(imgWidth, imgHeight);
        let ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // console.log(c);
        return ctx.getImageData(0, 0, c.width, c.height);

    }

    getCanvas(w, h) {
        let c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    filterImage(filter, image, ...rest) {
        let args = [this.getPixels(image), ...rest];
        return filter.apply(null, args);
    }

    transitionToSolidColor(pixels, originalWeight, newWeight) {
        let d = pixels.data;
        for (let i = 0; i < d.length; i += 4) {
            let r = d[i];
            let g = d[i + 1];
            let b = d[i + 2];
            d[i] = (r * originalWeight) + (255 * newWeight);
            d[i + 1] = (g * originalWeight) + (0 * newWeight);
            d[i + 2] = (b * originalWeight) + (0 * newWeight);
        }
        return pixels;
    }

    displayAsSolidColor(pixels, color = [255, 0, 0]) {
        let d = pixels.data;
        for (let i = 0; i < d.length; i += 4) {
            // let r = d[i];
            // let g = d[i + 1];
            // let b = d[i + 2];
            d[i] = color[0];
            d[i + 1] = color[1];
            d[i + 2] = color[2];
        }
        return pixels;
    }

    glow(pixels, originalWeight, newWeight, glowAmount = 3) {
        const canvasWidth = pixels.width;
        // const getColorIndicesForCoord = (x, y, width) => {
        //     const red = y * (width * 4) + x * 4;
        //     return [red, red + 1, red + 2, red + 3];
        // };
        const getAlphaForCoord = (x, y, width) => {
            const alpha = (y * (width * 4) + x * 4) + 3;
            return alpha;
        };

        // let pixelGrid = ImageDataToPixelGrid(pixels);

        // for (let y = 0; y < pixels.height; y++) {
        //     pixelGrid.push([]);
        // }


        // for (let y = 0; y < pixels.height; y++) {
        //     for (let x = 0; pixels.width; x++) {
        //         const currentPixel = getAlphaForCoord(x, y, canvasWidth);
        //         let pixelUp, pixelDown, pixelLeft, pixelRight;

        //         if (y - 1 === -1) {
        //             pixelUp = 0;
        //         } else if (y + 1 === pixels.height) {
        //             pixelDown = 0;
        //         }
        //         if (x - 1 === -1) {
        //             pixelLeft = 0;
        //         } else if (x + 1 === pixels.width) {
        //             pixelRight = 0;
        //         }

        //         if (pixelUp !== 0) {
        //             pixelUp = getAlphaForCoord(x, y - 1, canvasWidth);
        //         }
        //         if (pixelDown !== 0) {
        //             pixelDown = getAlphaForCoord(x, y + 1, canvasWidth);
        //         }
        //         if (pixelLeft !== 0) {
        //             pixelLeft = getAlphaForCoord(x - 1, y, canvasWidth);
        //         }
        //         if (pixelRight !== 0) {
        //             pixelRight = getAlphaForCoord(x + 1, y, canvasWidth);
        //         }
        //         if (!currentPixel) {
        //             if (pixelUp || pixelDown || pixelLeft || pixelRight) {
        //                 pixelGrid[y][x] = 1;
        //             }
        //         }
        //     }
        // }

        let d = pixels.data;
        // for (let i = 0; i < d.length; i += 4) {
        //     let r = d[i];
        //     let g = d[i + 1];
        //     let b = d[i + 2];
        // }



        for (let i = 0; i < d.length; i += 4) {
            let r = d[i];
            let g = d[i + 1];
            let b = d[i + 2];
            // d[i] = (r * originalWeight) + (0 * newWeight);
            // d[i + 1] = (g * originalWeight) + (255 * newWeight);
            // d[i + 2] = (b * originalWeight) + (255 * newWeight);
            d[i] = (r * originalWeight) + ((255 - r) * newWeight);
            d[i + 1] = (g * originalWeight) + ((255 - r) * newWeight);
            d[i + 2] = (b * originalWeight) + ((255 - r) * newWeight);
            // d[i] = 255 - r;
            // d[i + 1] = 255 - g;
            // d[i + 2] = 255 - b;
        }
        return pixels;
    }
}

class Effect extends React.Component {
    constructor() {
        super();
        this.state = { currentFrame: 0, currentDirection: INCREMENTING, };
    }

    componentDidMount() {
        this.drawCanvasFrame(this.state.currentFrame);

        const intervalID = setInterval(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                    try {
                        const s = self.state;
                        if (s.currentDirection === INCREMENTING) {
                            self.state.currentFrame++;
                        } else {
                            self.state.currentFrame--;
                        }
                        //Thing you wanted to run as non-window 'this'
                        if (s.currentFrame === 75) {
                            // s.currentFrame = 100;
                            s.currentDirection = DECREMENTING;
                        } else if (s.currentFrame === 10) {
                            // s.currentFrame = 0;
                            s.currentDirection = INCREMENTING;
                        }
                        self.drawCanvasFrame(self.state.currentFrame);
                    } catch (error) {
                        if (error.message !== "Cannot read property 'getContext' of null\n") {
                            clearInterval(intervalID);
                            // console.log("interval cleared");
                        } else {
                            // console.error(error.message);
                            console.error(error.message);
                        }
                    }
                };
            })(this),
            10     //normal interval, 'this' scope not impacted here.
        );
        this.intervalID = intervalID;
    }

    drawCanvasFrame(frameCount) {
        const canvas = this.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.img;
        // console.log("constructor img", img.width);
        // console.log(img);
        canvas.width = img.width;
        canvas.height = img.height;

        const originalWeight = 1 - (frameCount / 100);
        const newWeight = frameCount / 100;

        const extraArgs = this.props.args || [];

        const imgData = Filters.prototype.filterImage(
            this.props.effect,
            img,
            ...extraArgs,
            originalWeight,
            newWeight);
        ctx.putImageData(imgData, 0, 0, 0, 0, canvas.width, canvas.height);
    }

    render() {
        return (
            <>
                <canvas ref={(canvas) => { this.canvas = canvas; }}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block"
                    }} />
                < img ref={(image) => this.img = image} onLoad={this.imgLoaded} src={this.props.imgSrc} style={{ display: "none", width: "100%", height: "100%", margin: 0 }} />
            </>
        );
    }
}

export function TransitionToSolidColor(props) {
    return <Effect {...props} effect={Filters.prototype.transitionToSolidColor} />;
}

export function DisplayAsSolidColor(props) {
    let arg;
    switch (props.color) {
        case "red":
            arg = [255, 0, 0];
            break;
        case "yellow":
            arg = [255, 255, 0];
            break;
        case "blue":
            arg = [0, 0, 255];
            break;
        case "aqua":
            arg = [0, 255, 255];
            break;
    }

    return <Effect {...props} effect={Filters.prototype.displayAsSolidColor} args={[arg]} />;
}

export function GlowEffect(props) {
    return <Effect {...props} effect={Filters.prototype.glow} />;
}
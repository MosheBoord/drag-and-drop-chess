import React from "react";
import { ImageDataToPixelGrid, pixelArrayToObject, pixelGridToImageData } from "./helperFunctions";

const INCREMENTING = "INCREMENTING";
const DECREMENTING = "DECREMENTING";

class Filters {
    getPixels(img) {
        let imgWidth = img.width || img.naturalWidth;
        let imgHeight = img.height || img.naturalHeight;
        let c = this.getCanvas(imgWidth, imgHeight);
        let ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const id = ctx.getImageData(0, 0, c.width, c.height);
        // console.log(id);
        return id;
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
        // console.log(pixels);
        let d = pixels.data;
        for (let i = 0; i < d.length; i += 4) {
            let r = d[i];
            let g = d[i + 1];
            let b = d[i + 2];
            let a = d[i + 3];
            // d[i] = (r * originalWeight) + (255 * newWeight);
            d[i] = (r * .25) + (255 * .75);
            d[i + 1] = (g * originalWeight) + (0 * newWeight);
            d[i + 2] = (b * originalWeight) + (0 * newWeight);
            d[i + 3] = (a * originalWeight) + (0 * newWeight);
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

    glow(pixels, originalWeight, newWeight) {
        // console.log(pixels);
        // const pixelGrid = ImageDataToPixelGrid(pixels);

        function addGlowLayer() {
            const d = pixels.data;
            const pGrid = [];
            const alphaThreshhold = (255 / 2);
            for (let y = 0; y < pixels.height; y++) {
                const pRow = [];
                for (let x = 0; x < pixels.width; x++) {
                    let index = y * pixels.width + x;
                    // The plus 3 is to find the alpha value of the pixel.
                    if (d[index + 3] < alphaThreshhold) {
                        let pixelUp;
                        let pixelDown;
                        let pixelLeft;
                        let pixelRight;

                        if (x === 0) {
                            pixelLeft = false;
                            // The plus 7 is too shift one pixel over to the right and find it's alpha value.
                            pixelRight = d[index + 7] > alphaThreshhold;
                        } else if (x === pixels.width) {
                            pixelRight = false;
                            // The minus 1 is too shift to pixel on left alpha value.
                            pixelLeft = d[index - 1] > alphaThreshhold;
                        } else {
                            pixelLeft = d[index - 1] > alphaThreshhold;
                            pixelRight = d[index + 7] > alphaThreshhold;
                        }

                        if (y === 0) {
                            pixelUp = false;
                            pixelDown = d[index + pixels.width * 4 + 3] > alphaThreshhold;
                        } else if (y === pixels.height) {
                            pixelDown = false;
                            pixelUp = d[index - pixels.width * 4 - 1] > alphaThreshhold;
                        } else {
                            pixelDown = d[index + pixels.width * 4 + 3] > alphaThreshhold;
                            pixelUp = d[index - pixels.width * 4 - 1] > alphaThreshhold;
                        }

                        if (pixelUp || pixelDown || pixelLeft || pixelRight) {
                            pRow.push(true);
                        } else {
                            pRow.push(false);
                        }
                    } else {
                        pRow.push(false);
                    }
                }
                pGrid.push(pRow);
            }

            // console.log("pgrid", pGrid);


            for (let y = 0; y < pixels.height; y++) {
                for (let x = 0; x < pixels.width; x++) {
                    let index = y * pixels.width + x;
                    if (pGrid[y][x]) {
                        console.log("y, x", y, x);
                        // d[index] = 255;
                        // d[index + 1] = 0;
                        // d[index + 2] = 0;
                        // d[index + 3] = 255;
                    }
                }
            }
        }

        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // addGlowLayer();
        // for (let i = 0; i < 50; i++) {
        //     addGlowLayer();
        // }
        const d = pixels.data;
        for (let i = 0; i < d.length; i++) {
            const rand = Math.floor(Math.random() * 255);
            // if (d[i] > 0) {
            //     d[i] = Math.floor((d[i]) / (rand));
            //     console.log(rand);
            // }
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
                        if (s.currentFrame === 100) {
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
            6     //normal interval, 'this' scope not impacted here.
        );
        this.intervalID = intervalID;// real time delay is 10
    }

    drawCanvasFrame(frameCount) {
        const canvas = this.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.img;

        // console.log(this.img);
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
                < img ref={(image) => this.img = image} onLoad={() => this.imgLoaded = true} src={this.props.imgSrc} style={{ display: "none", width: "100%", height: "100%", margin: 0 }} />
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
            arg = [255, 165, 0];
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
import React from "react";

const INCREMENTING = "INCREMENTING";
const DECREMENTING = "DECREMENTING";

export class TransitionToSolidColor extends React.Component {
    constructor() {
        super();
        this.state = { currentFrame: 0, currentDirection: INCREMENTING };
    }

    componentDidMount() {
        this.drawCanvasFrame(this.state.currentFrame);
        // const state = this.state;
        // const drawCanvasFrame = this.drawCanvasFrame;

        this.intervalID = setInterval(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                    const s = self.state;
                    if (s.currentDirection === INCREMENTING) {
                        self.state.currentFrame++;
                    } else {
                        self.state.currentFrame--;
                    }
                    //Thing you wanted to run as non-window 'this'
                    if (s.currentFrame === 90) {
                        // s.currentFrame = 100;
                        s.currentDirection = DECREMENTING;
                    } else if (s.currentFrame === 0) {
                        // s.currentFrame = 0;
                        s.currentDirection = INCREMENTING;
                    }
                    self.drawCanvasFrame(self.state.currentFrame);
                };
            })(this),
            10     //normal interval, 'this' scope not impacted here.
        );

        // setInterval(() => {
        //     console.log("interval running");
        //     // this.setState({ currentFrame: this.state.currentFrame + 1 });
        //     state.currentFrame++;
        //     // drawCanvasFrame(state.currentFrame);
        // }, 15);
    }

    drawCanvasFrame(frameCount) {
        // console.log(frameCount);
        const canvas = this.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.img;
        canvas.width = img.width;
        canvas.height = img.height;

        const originalWeight = 1 - (frameCount / 100);
        const newWeight = frameCount / 100;

        // console.log("originalWeight", originalWeight, "newWeight", newWeight);

        const Filters = {};
        Filters.getPixels = function(img) {
            var c = this.getCanvas(img.width, img.height);
            var ctx = c.getContext("2d");
            ctx.drawImage(img, 0, 0);
            return ctx.getImageData(0, 0, c.width, c.height);
        };

        Filters.getCanvas = function(w, h) {
            var c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            return c;
        };

        Filters.filterImage = function(filter, image, var_args) {
            var args = [this.getPixels(image)];
            for (var i = 2; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            return filter.apply(null, args);
        };

        Filters.red = function(pixels, args) {
            var d = pixels.data;
            for (let i = 0; i < d.length; i += 4) {
                let r = d[i];
                let g = d[i + 1];
                let b = d[i + 2];
                d[i] = (r * originalWeight) + (255 * newWeight);
                d[i + 1] = (g * originalWeight) + (0 * newWeight);
                d[i + 2] = (b * originalWeight) + (0 * newWeight);
            }
            return pixels;
        };

        const imgData = Filters.filterImage(Filters.red, img);
        ctx.putImageData(imgData, 0, 0, 0, 0, canvas.width, canvas.height);
    }

    render() {
        return (
            <>
                <canvas ref={(canvas) => { this.canvas = canvas; }}
                    // width={this.props}
                    style={{
                        // textAlign: "center",
                        width: "100%",
                        // maxWidth: "100%",
                        height: "100%",
                        // display: "none",
                        // backgroundSize: "100% 100%"
                        // margin: "auto",
                    }} />
                < img ref={(image) => this.img = image} src={this.props.imgSrc} style={{ display: "none", width: "100%", height: "100%", margin: 0 }} />
            </>
        );
    }
}

// export TransitionToSolidColor;
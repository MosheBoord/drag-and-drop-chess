
export default class Wrapper {
    constructor(reactClass) {
        this.reactClass = reactClass;
    }

    wrapWith(wrapperFuncs) {
        if (Array.isArray(wrapperFuncs)) {
            this.reactClass = wrapperFuncs.reduce((reactClass, wrapperFunc) => wrapperFunc(reactClass), this.reactClass);
        } else {
            this.reactClass = wrapperFuncs(this.reactClass);
        }
        return this.reactClass;
    }
}

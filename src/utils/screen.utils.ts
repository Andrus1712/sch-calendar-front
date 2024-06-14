export const getCurrentDimension = (): {
    width: number
    height: number
} => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};
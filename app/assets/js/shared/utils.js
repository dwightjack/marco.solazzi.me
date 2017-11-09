/**
 * A function that returns `undefined`
 *
 * @return {undefined}
 */
export const noop = () => {};

/**
 * Fallback for `requestAnimationFrame`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
let lastTime = 0;
export const raf = global.requestAnimationFrame || function requestAnimationFrame(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(() => callback(currTime + timeToCall), timeToCall);
    lastTime = currTime + timeToCall;
    return id;
};
export const caf = global.cancelAnimationFrame || function cancelAnimationFrame(id) {
    return clearTimeout(id);
};

export const createAction = (mutation) => ({ commit }, payload) => commit(mutation, payload);

export const toInteger = (str) => parseInt(str, 10);


const objProto = Object.prototype;
const hasOwn = objProto.hasOwnProperty;
export const has = (obj, key) => hasOwn.call(obj, key);
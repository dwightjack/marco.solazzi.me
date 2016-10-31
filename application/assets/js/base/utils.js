/**
 * Binds passed in methods to a context
 * @param {object} ctx - Context to bind methods to
 * @param {...string} methods - Name of methods to bind as strings
 * @example
 *  bindAll(this, 'myMethod', 'anotherMethod');
 */
export const bindAll = (ctx, ...methods) => methods.forEach((m) => {
    ctx[m] = ctx[m].bind(ctx); //eslint-disable-line
});

export const bindProps = (ctx, ...methods) => methods.forEach((m) => {
    ctx[m] = ctx.props[m].bind(ctx); //eslint-disable-line
});



/**
 * A function that returns `undefined`
 *
 * @return {undefined}
 */
export const noop = () => {};



/**
 * Checks if an argument is `null` or an array or an empty object
 *
 * @param {*} obj - Object to check
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
    // Speed up calls to hasOwnProperty
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj === null) {
        return true;
    }
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) {
        return false;
    }
    if (obj.length === 0) {
        return true;
    }
    // Otherwise, does it have any properties of its own?
    for (const key in obj) { //eslint-disable-line no-restricted-syntax
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};

const hasOwn = Object.prototype.hasOwnProperty;

/**
 * Checks if `prop` is a direct property of `obj`.
 *
 * @param {object} obj - Source object
 * @param {string} prop - Path to check
 * @returns {boolean}
 */
export const has = (obj, prop) => hasOwn.call(obj, prop);



/**
 * Return a copy of the object only containing the whitelisted properties.
 *
 * @param {object} obj - Source object
 * @param {array} keys - Keys to include
 * @returns {object}
 */
export const pick = (obj, keys) => {
    const result = {};
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        if (hasOwn.call(obj, key)) {
            result[key] = obj[key];
        }
    }
    return result;
};



/**
 * Shallowly checks if passed in arguments are equal. Doesn't traverse nested objects
 *
 * @param {object} objA - Checked object
 * @param {object} objB - Checked object
 * @returns {boolean}
 */
export const shallowEqual = (objA, objB) => {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
};


/**
 * Utility to generate ref generation methods and pointers.
 *
 * @param {object} ctx - Context to bind the reference to
 * @param {...refs} references - Base name for the references to generate
 * @example
 *  //In constructor
 *  createRefs(this, 'header', 'body');
 *
 *  //In JSX
 *  <header ref={this.headerRef} />
 *
 *  //wherever you want
 *  this.header
 *
 *
 */
export const createRefs = (ctx, ...refs) => {
    refs.forEach((ref) => {
        const refMethodName = `${ref}Ref`;
        if (refMethodName in ctx) {
            console.warn(`Reference method name "${refMethodName}" is already taken`); //eslint-disable-line no-console
        } else {
            ctx[refMethodName] = (el) => (ctx[ref] = el); //eslint-disable-line no-param-reassign
        }

    });

};
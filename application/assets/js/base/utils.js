export const bindAll = (ctx, ...methods) => methods.forEach((method) => {
    ctx[method] = ctx[method].bind(ctx); //eslint-disable-line
});
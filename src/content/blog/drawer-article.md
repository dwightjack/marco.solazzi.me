---
title: Building a drawer without a library
publishDate: 2026-06-12
excerpt: 'Building a bottom drawer with native HTML, CSS, and minimal JavaScript.'
---

Modern HTML features like [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover), and [invoker commands](https://caniuse.com/?search=command) let us build common UI patterns with less code. One of those patterns is the _Drawer_, a popular mobile UI pattern where an expandable, often modal panel slides in from one of the edges of the screen to reveal additional contents like navigation or configuration options. Libraries like [shadcn](https://ui.shadcn.com/docs/components/radix/drawer) and [Base UI](https://base-ui.com/react/components/drawer) implement this pattern from scratch.

In this experiment, I will use native HTML features, modern CSS, and a minimal amount of JavaScript to create a basic implementation of the drawer.

:::warning

**Disclaimer**: This is an experiment — accessibility hasn't been fully tested. <i>Drag-to-dismiss</i> interactions in particular can create issues. If you use a drawer, always [provide another way](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) to dismiss it (like a button).

:::

## The case for native `<dialog>`

The `<dialog>` element handles several things that custom UIs have to manually implement: backdrop rendering, focus trapping, and returning focus on close. The Escape key dismisses the dialog, and [`closedby="any"`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/closedBy) closes it when you click the backdrop.

Native dialogs also sit on their own [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) above the document body. This eliminates the need for [portals](https://react.dev/reference/react-dom/createPortal) in web frameworks like React.

Finally, [invoker commands](https://caniuse.com/wf-invoker-commands) let you open the dialog with just HTML, avoiding nested components or extra JavaScript.

## The drawer

Here's the [drawer demo](https://codepen.io/marco_solazzi/pen/QwdELZM). If your browser doesn't support some of these APIs, there's a video below:

<figure>
  <video src="/assets/blog/drawer.mp4" controls playsinline></video>
  <figcaption>Bottom-up drawer closed by dragging down its top anchor.</figcaption>
</figure>

## Design choices

Some design decisions I made to keep the experiment simple:

- You can only dismiss the drawer by dragging the handle at the top. This is less intuitive than mobile drawers, but keeps the content interactive and accessible.
- The drawer closes when dragged down more than 50% of its height.

## Technical implementation

Notable Web APIs I used (some of them might not be supported in all major browser at the time of writing):

- [HTML invoker](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) (`commandfor` and `command="show-modal"`): opens the dialog without JavaScript
- [`closedby="any"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby): closes on backdrop click
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style) and [discrete transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior): animate the dialog
- [`setPointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture), [`lostpointercapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lostpointercapture_event), and [`releasePointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture): handle drag events

### Dragging with Pointer Capture

A few notes on pointer capture: `setPointerCapture` routes all pointer events to the anchor, even if your cursor or finger leaves it. This way you don't need to attach a `pointermove` listener to the `document`:

```js
anchor.addEventListener('pointerdown', (e) => {
  anchor.setPointerCapture(e.pointerId);
  // ...
});
```

On release, `lostpointercapture` fires and we release the explicit capture:

```js
anchor.addEventListener('lostpointercapture', (e) => {
  anchor.releasePointerCapture(e.pointerId);
});
```

### The pointer release phase

Previously, I mentioned that the drawer closes when dragged down more than 50% of its height. Initially, I implement the calculations in the `lostpointercapture` event handler, but I soon realized that in Safari, `event.clientY` is always `0`. A safer solution was to use `pointerup` instead.

```js
anchor.addEventListener('pointerup', (e) => {
  // e.clientY is !== 0 here
});
```

### The transition timing change

One last detail: when opening or closing normally, the drawer uses a 300ms transition with custom easing. But during a drag interaction, the drawer needs to feel connected to the pointer. I handle this by adding a `data-drag` attribute to the drawer and adjusting the CSS:

```css
#drawer[data-drag] {
  transition-duration: 0ms;
}
```

## Experiment results

Overall, I'm satisfied with the outcome of this quick experiment experiment.

From a broader point of view, I think that `dialog`, `popover` and [custom selects](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) are a good alternative to a custom implementation, with a smaller bundle size and a better userland code experience.

Since most of these features are still relatively young, they may still fall short on the accessibility side. The suggestion is, as always, to run your usability and accessibility tests before shipping to production.

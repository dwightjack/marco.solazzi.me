---
title: A simple native <meter> with colored thresholds
publishDate: 2026-08-01
excerpt: Styling a native HTML meter with typed attr(), the CSS if() function, and a math-only fallback for browsers that don't support it yet.
---

# A simple native `<meter>` with colored thresholds

In the last few days I enbaqued in a new experiment during my off times: styling the native `<meter>` element as a bar with specific colors for some of its states using only valid HTML and CSS.

What sent me down this path was a concrete UI requirement: re-create the credits/usage bar you see in many contexts like subscription products, system usage overview etc.; a bar showing how much of your quota is used, that shifts color as you approach the limit.

<figure>

![Screenshot of Windows Storage settings showing disk space usage by category each with a horizontal usage bar](../../assets/images/blog/windows-meters.png)

  <figcaption>Windows disk usage meters</figcaption>
</figure>

It's a common enough pattern that I expected a ready-made component for it. Instead I found that most UI libraries reach for the wrong native primitive, or skip native primitives entirely.

## Is it a progress bar?

By looking at some of the popular libraries it might seems that this kind of UI element is called <i>Progress</i>. For example both [shadcn/ui](https://ui.shadcn.com/docs/components/base/progress) and [Bootstrap](https://getbootstrap.com/docs/4.0/components/progress/) has a Progress component and both appy a `role="progressbar"` to it. While it might be tempting to use these components, in reality a progressbar (or the HTML native counterpart, `<progress>`) is <b>the wrong element for the task</b>:

<figure>

> The `progress` element represents the completion progress of a task.

<figcaption>HTML spec - <cite><a href="https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element">4.10.13 The progress element</a></cite></figcaption>
</figure>

<figure>

> An element that displays the progress status for tasks that take a long time.
>
> A `progressbar` indicates that the user's request has been received and the application is making progress toward completing the requested action.

<figcaption>WAI-ARIA 1.2 spec - <cite><a href="https://www.w3.org/TR/wai-aria-1.2/#progressbar">`progressbar` role</a></cite></figcaption>
</figure>

Instead the HTML spec is very clear on what we should use:

<figure>

> The `progress` element is the wrong element to use for something that is just a gauge, as opposed to task progress. For instance, indicating disk space usage using progress would be inappropriate. Instead, the `meter` element is available for such use cases.

<figcaption>HTML spec - <cite><a href="https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element">4.10.13 The progress element</a></cite></figcaption>
</figure>

## Implementation

From this I started experimenting with the `<meter>` element to see how for a nice implementation of a usage meter using just HTML and CSS as much as possible.

:::warning

**Disclaimer**: What follows is a CSS experiment. Accessibility and old browsers compatibility hasn't been fully tested.

:::

### Requirements

For this experiment, my requirements are:

1. The bar should have <b>rounded corners</b> (both the container and the actual meter bar).
1. The bar has three state defined by color codes: <b>default</b>, <b>warning (optional)</b>, and <b>max</b>.

### TL;DR

If you are just curious to see the finished implementation here it is the codepen:

<p class="codepen" data-height="300" data-pen-title="Colorized meter" data-preview="true" data-default-tab="result" data-slug-hash="emgKdYy" data-user="marco_solazzi" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/marco_solazzi/pen/emgKdYy">
  Colorized meter</a> by Marco Solazzi (<a href="https://codepen.io/marco_solazzi">@marco_solazzi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

### HTML setup

The `<meter>` element already gives me all the features I need to fullfil the requirements:

```html
<label for="meter">Meter</label>
<meter min="0" max="200" value="100" high="150" id="meter"></meter>
```

Think of `value` as the current usage, `max` as the maximum allowed usage, and `high` as the thresold at which a system would want to nudge you with a warning before you actually run out of space.

And that's it for the HTML part. But if you are using this for something other than just plain numbers it might be a good idea to associate a [visually hidden](https://www.w3.org/WAI/WCAG22/Techniques/css/C7) <i>human</i> reading for accessibility purpose. In my case, I used the text as visual description of the meter value and positioned it with [Anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using).

```html
<label for="meter">Disk Usage</label>
<meter min="0" max="200" value="100" high="150" id="meter"></meter>
<span id="description">100GB out of 200GB</span>
<style>
  /* Anchor the description at the top/right of the meter */
  meter {
    anchor-name: --meter;
  }
  #description {
    position: absolute;
    position-anchor: --meter;
    inset-block-end: calc(anchor(start) + 0.25rem);
    inset-inline-end: anchor(end);
  }
</style>
```

For a more in-depth review of this subject, please read this 2022 [article about `<meter>` accessibility by Dana Byerly](https://www.htmhell.dev/adventcalendar/2022/5/#:~:text=Using%20visually%20hidden%20text%20instead%20of%20fallback).

### Design choices

- No gradients between states, just a hard swap with a short transition.
- Firefox and Chromium/WebKit style `<meter>` through completely different pseudo-elements, so both had to be reset and re-styled independently.

### Technical implementation

Now, for the CSS implementation I used some pretty new CSS features:

- [Typed `attr()`](https://developer.chrome.com/blog/advanced-attr) (`attr(value type(<number>), 0)`): reads an HTML attribute straight into a CSS custom property as a real `<number>`, not a string
- [`if()`](https://developer.mozilla.org/en-US/docs/Web/CSS/if) with [`style()`](https://developer.mozilla.org/en-US/docs/Web/CSS/@container/style): a native conditional for choosing a value based on comparing two custom properties — see [css-tip.com/if-trick](https://css-tip.com/if-trick/)
- [`sign()`](https://developer.mozilla.org/en-US/docs/Web/CSS/sign) and [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp): used together to compute a 0/1/2 "state" number without `if()`, for the fallback path
- [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix), nested twice: turns that state number into an actual color

### Reading attributes as numbers with typed `attr()`

Plain `attr()` has always existed in CSS, but it only ever returned a string — useless for math. [Typed `attr()`](https://developer.chrome.com/blog/advanced-attr) lets you specify the expected type and a fallback:

```css
@supports (x: attr(x type(*))) {
  --value: attr(value type(<number>), 0);
  --max: attr(max type(<number>), infinity);
  --threshold: attr(high type(<number>), var(--max));
}
```

That last line is worth pausing on: the fallback for `--threshold` is `var(--max))`, which mirrors the [actual HTML spec behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter#high) — a meter without a `high` attribute has no "warning" zone, so the threshold effectively becomes the max.

Once `--value`, `--max`, and `--threshold` are numbers, the bar's color becomes a pure comparison problem — no JS involved, and it updates automatically whenever the attributes change in the DOM.

### The clean path: `if()`

Where supported, the whole state machine collapses into one declaration:

```css
--bar-color: if(
  style(--value = --max): var(--color-alert) ;
    style(--value >= --threshold): var(--color-warning) ;
    else: var(--color-default) ;
);
```

Read top to bottom like a switch statement: full value → alert, past threshold → warning, otherwise the default color. This is the version I'd want to ship in a year or two, once support catches up — see [caniuse.com/css-if](https://caniuse.com/css-if).

### The fallback: turning comparisons into arithmetic

For browsers without `if()`, there's no native "if/else" to fall back on, so the trick is to encode the three states as a single number and let math pick the color. `--state` ends up being `0` (default), `1` (warning), or `2` (alert):

```css
--state: clamp(
  0,
  calc(
    sign(var(--value) - var(--threshold) + 1) +
      sign(var(--value) - var(--max)) + 1
  ),
  2
);
```

`sign()` returns `-1`, `0`, or `1` depending on whether its argument is negative, zero, or positive. The `+ 1` inside the first `sign()` call is what makes the threshold comparison _inclusive_ — without it, hitting `--value === --threshold` exactly would still read as "default," not "warning." The second `sign()` term only kicks in once `--value` reaches `--max`, adding another `+1` to push the state to `2`.

With `--state` as a plain number, `color-mix()` — nested since [Chrome and Safari cap color-mix at two colors](https://caniuse.com/wf-color-mix-variadic) — turns it into the final color:

```css
--bar-color: color-mix(
  in srgb,
  var(--color-alert) max(0%, (var(--state) - 1) * 100%),
  color-mix(
    in srgb,
    var(--color-warning) min(100%, calc(var(--state) * 100%)),
    var(--color-default)
  )
);
```

Walking through it at `--state: 1`: the outer mix contributes `0%` alert (so it's fully transparent to the inner result), and the inner mix contributes `100%` warning — landing exactly on `--color-warning`. At `--state: 0` both mixes bottom out at the default color; at `--state: 2` the outer mix goes to `100%` alert and wins outright. No branching, just weighted blending that happens to land on discrete colors at integer inputs.

### Resetting two completely different pseudo-element trees

Firefox and Chromium/WebKit expose `<meter>`'s internals through unrelated pseudo-elements, so both need resetting before the custom `--bar-color` can show through:

```css
&::-moz-meter-bar {
  appearance: none;
  background: var(--bar-color);
}

&::-webkit-meter-bar,
&::-webkit-meter-inner-element,
&::-webkit-meter-optimum-value,
&::-webkit-meter-suboptimum-value,
&::-webkit-meter-even-less-good-value {
  appearance: none;
  background: none;
}

&::-webkit-meter-suboptimum-value,
&::-webkit-meter-optimum-value {
  background: var(--bar-color);
}
```

WebKit alone has four pseudo-elements standing in for the track and the value fill in its different built-in states — all of them need `appearance: none` before `background` will actually apply.

### JavaScript's only job: syncing what CSS can't read yet

In browsers without typed `attr()` support, custom properties can't read HTML attributes at all, so `script.js` mirrors them manually:

```js
const hasIf = CSS.supports('color', 'if(style(--a >= --b): red; else: blue)');

if (!hasIf) {
  $meter.style.setProperty('--value', $meter.value);
  $meter.style.setProperty('--max', $meter.getAttribute('max'));
}

$range.addEventListener('input', ({ target }) => {
  $meter.value = target.value;
  $output.value = target.value;
  if (!hasIf) {
    $meter.style.setProperty('--value', target.value);
  }
});
```

Note the feature check is against `if()` support, not typed `attr()` — in this codebase, if a browser supports `if()` it's assumed modern enough to also support typed `attr()`, so the two checks are collapsed into one `CSS.supports()` call. Everywhere else, the actual HTML attributes (`value`, `high`) still get updated too, so the DOM stays correct regardless of which CSS path is active — this is purely a rendering fallback, not a data source.

## Experiment results

What stood out most is how little JavaScript survives once typed `attr()` is available: no listeners are needed to keep the bar in sync with `value` or `high`, because CSS is reading the attributes directly. The `hasIf` check exists purely to skip that reactive wiring in modern browsers, not to add a second implementation of the logic.

The fallback math is the more fragile piece of the whole thing — `sign()`-based state detection works, but it's clearly a workaround, not something I'd want to write from scratch for every component. `if()` is the feature that makes this pattern actually pleasant to author; until it lands everywhere, I'd reach for it selectively, on components where the payoff (deleting a chunk of reactive JS) is worth the extra CSS complexity of maintaining a fallback.

---
title: Not Everything Needs a Component
publishDate: 2024-11-14
isDraft: true
excerpt: ""
---

not-everything-needs-a-component

In the early 2000s, a new term, [*Divitis*](https://en.wiktionary.org/wiki/divitis), was coined to refer to <q>The practice of authoring web-page code with many div elements in place of meaningful semantic HTML elements</q>. This was part of an effort to increase awareness of semantics in HTML within the frame of the [Progressive Enhancement](https://alistapart.com/article/testdriven/) technique.

Fast forward 20 years: I witness a new *syndrome* affecting web developers: *componentitis*. Here is my made-up definition:

<figure class="pullquote">

<dfn>Componentitis</dfn>: the practice of creating a component for every aspect of a UI in place of a simpler and more reusable solution.

</figure>

## Components

So, first of all, what is a *component*? I think React popularized the term to refer to its building blocks:

<figure>

> React lets you combine your markup, CSS, and JavaScript into custom "components", **reusable UI elements for your app.**

<figcaption>React documentation - <cite><a href="https://react.dev/learn/your-first-component#:~:text=React%20lets%20you%20combine%20your%20markup%2C%20CSS%2C%20and%20JavaScript%20into%20custom%20%E2%80%9Ccomponents%E2%80%9D%2C%20reusable%20UI%20elements%20for%20your%20app">Your First Component</a></cite></figcaption>
</figure>

While the concept of reusable UI elements wasn’t new at the time (in CSS, we already had techniques like [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/), [SMACSS](https://smacss.com/), and [BEM](https://en.bem.info/methodology/quick-start/)), the key difference is its original approach to the separation of markup, style, and interaction. With React components (and all the subsequent UI libraries), it’s possible to [co-locate](https://kentcdodds.com/blog/colocation) everything in a single file within the boundaries of a component. So, using Facebook’s latest CSS library [Stylex](https://stylexjs.com/), you could write:

```tsx
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

// styles
const styles = stylex.create({
	base: {
		fontSize: 16,
		lineHeight: 1.5,
		color: "#000",
	},
});

export function Toggle() {
	// interactions
	const [toggle, setToggle] = useState(false);
	const onClick = () => setToggle((t) => !t);

	// markup
	return (
		<button {...stylex.props(styles.base)} type="button" onClick={onClick}>
			{toggle}
		</button>
	);
}

```

You can be a fan or not of writing CSS in object notation (I’m not), but this level of co-location is often a good idea to make a component-based project more maintainable. 

In libraries like Svelte, the co-location is even more explicit (and the code more concise):

```html
<script>
	let toggle = $state(false)
	const onclick = () => toggle = !toggle
</script>

<button type='button' {onclick}>
	{toggle}
</button>

<style>
button {
	font-size: 16px;
	line-height: 1.5;
	color: #000;
}
</style> 
```

Over time, this pattern has gained so much traction to the point that everything is encapsulated in components. You have probably encountered page components like this: 

```tsx
export function Page() {

	return (<Layout>
		<Header nav={<Nav />} />
			<Body>
				<Stack spacing={2}>
				  <Item>Item 1</Item>
				  <Item>Item 2</Item>
				  <Item>Item 3</Item>
				</Stack>	
			</Body>
			<Footer />
		</Layout>);
}
```

## Co-location of one

The above code looks clean and consistent: we use the component interface to describe a page.

But then, let’s look at the possible implementation of `Stack`:

```tsx
import * as stylex from "@stylexjs/stylex";
import type { PropsWithChildren } from "react";

const styles = stylex.create({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	spacing: (value) => ({
		rowGap: value * 16,
	}),
});

export function Stack({
	spacing = 0,
	children,
}: PropsWithChildren<{ spacing?: number }>) {
	return (
		<div {...stylex.props(styles.root, styles.spacing(spacing))}>
			{children}
		</div>
	);
}
```

We only define the styles and the root element of the component. 

In this case, we could even say that **the only thing we are co-locating is the style block** since the HTML is only used to hold a CSS class reference, and there is no interactivity or business logic.

## The (avoidable) cost of flexibility

Now, what if we want to be able to render the root element as a `section` and maybe add some attributes? We need to enter the realm of polymorphic components. In React and with TypeScript this might end up being something like the following:

```tsx
import * as stylex from "@stylexjs/stylex";

type PolymorphicComponentProps<T extends React.ElementType> = {
	as?: T;
	children?: React.ReactNode;
	spacing?: number;
} & React.ComponentPropsWithoutRef<T>;

const styles = stylex.create({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	spacing: (value) => ({
		rowGap: value * 16,
	}),
});

export function Stack<T extends React.ElementType = "div">({
	as,
	spacing = 1,
	children,
	...props
}: PolymorphicComponentProps<T>) {
	const Component = as || "div";
	return (
		<Component
			{...props}
			{...stylex.props(styles.root, styles.spacing(spacing))}
		>
			{children}
		</Component>
	);
}
```

In my opinion, this isn't very readable at first glance. And remember: we are just rendering an element with 3 CSS declarations.

## Back to the basics

A while back, I was working on an Angular pet project. Being used to thinking of everything in components, I reached out to them to create a wrapper to ensure all direct child elements are vertically stacked and evenly spaced. This kind of wrapper is often defined as `Stack`. 

It turns out that in Angular polymorphic components are [even more complex to create](https://www.angularspace.com/bringing-polymorphic-functional-components-to-angular-with-signal-inputs-2/). 

This was an epiphany: why spend time and lines of code on complex implementations when the solution was always right in front of me?

```tsx
<div class="c-stack"> 
</div>
```

```css
.c-stack {
  --s: 0;
	display: flex;
	flex-direction: column;
	row-gap: calc(var(--s) * 16px);
}
```

Really, that’s the barebone *native* implementation of the `Stack` . Once you load the CSS in the layout, it can be used right away in your code:

```tsx
export function Page() {

	return (<Layout>
		<Header nav={<Nav />} />
			<Body>
				<div className="c-stack" style="--s: 2">
				  <Item>Item 1</Item>
				  <Item>Item 2</Item>
				  <Item>Item 3</Item>
				</div>	
			</Body>
			<Footer />
		</Layout>);
}
```

Let's see the main advantages of this approach:

* reusability
* reduced complexity
* smaller JavaScript bundle and less overhead
* **interoperability**

The last point is easy to overlook: Not every project uses React, and if you’re including the stack layout pattern in a Design System or a redistributable UI library, developers could use it in projects using different UI frameworks or a server-side language like PHP or Ruby.

## Nice features and improvements

From this base, you can iterate to add more features and improve the developer experience. Here are some examples.

### Reduce verbosity

If you find that writing an explicit `style` attribute might be too verbose, you could add some modifiers for the most common spacing values:

```scss
.c-stack {
  --s: 0;
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--s) * 16px);
  
  &.s\:1 { --s: 1 }
  &.s\:2 { --s: 2 }
  &.s\:4 { --s: 4 }
  &.s\:6 { --s: 6 }
}

/** Usage:
<div class="c-stack s:2">
</div>
*/
```

### Add better scoping

Scoping, in this case, refers to techniques to prevent conflicts with other styles using the same selector. I’d argue that scoping issues affects a pretty small number of projects, but if you are really concerned about it, you could:

1. Use something as simple as [CSS Modules](https://github.com/css-modules/css-modules), which is well supported in all major bundlers and frontend frameworks.
2. Use [cascade layers resets](https://knowler.dev/blog/so-you-want-to-encapsulate-your-styles#using-cascade-layers-to-isolate-our-styles) to prevent external stylesheets from modifying your styles (this is an interesting technique).
3. Define a namespace like `.my-app-...` for your classes.

Here is the result with CSS Modules:

```css
.stack {
  --s: 0;
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--s) * 16px);
  
  &.s1 { --s: 1 }
  &.s2 { --s: 2 }
  &.s4 { --s: 4 }
  &.s6 { --s: 6 }
}

/** Usage
import * from './styles/stack.module.css'

<div className={`${styles.stack} ${styles.s2}`}>
	// ...
</div>	
*/
```

### Reduce verbosity and type-safety

The CSS-only solution provides neither typing nor IDE auto-completion. 

Also, if we are not using spacing modifiers, it might feel too verbose to write both a `class` and a `style` attribute instead of a `spacing` prop. In this case, you could leverage JSX and create a utility function:

```tsx
function stack({ spacing? }: { spacing: number }) {
	return { 
		className: 'c-stack', 
		style: { '--s': spacing } as React.CSSProperties 
	}
}

/* Usage:
<div {...stack({ spacing: 2 })}>
	// ...
</div>	
*/
```

Note that React TypeScript doesn’t allow unknown CSS properties. I used a type assertion for brevity, but you should choose a [more robust solution](https://8hob.io/posts/type-css-variables-react/).

If you’re using modifiers and still want type safety and/or auto-completion, you can modify the utility function:

```tsx
export function stack({ spacing }: { spacing: 0 | 1 | 2 | 4 | 6 }) {
  return `c-stack s:${spacing}`
}

/* Usage:
<div className={stack({ spacing: 2 })}>
	// ...
</div>	
*/
```

This gives you a developer experience similar to [PandaCSS patterns](https://panda-css.com/docs/concepts/patterns#stack). 

### Prevent code duplication and hardcoded values

Some of you might have noticed that, in the last example, I hardcoded the expected values of `spacing`. If one value is removed or added, this might be an issue because we must keep the two files in sync. 

If you’re building a library, automated visual regression tests will probably catch this kind of issue. Anyway, if it still bothers you, a solution might be to reach for CSS Modules and either use [typed-css-modules](https://blog.logrocket.com/write-type-safe-css-modules/) or throw a runtime error for unsupported values:

```css
.stack {
  --s: 0;
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--s) * 16px);
  
  &.s\:1 { --s: 1 }
  &.s\:2 { --s: 2 }
  &.s\:4 { --s: 4 }
  &.s\:6 { --s: 6 }
}
```

```tsx
import styles from './stack.module.css';

export function stack({ spacing }: { spacing: number} = {}) {
const modifier = styles['s:' + spacing]
  if (!modifier) {
    throw new Error('Spacing not supported ' + spacing)
  }
  return `${styles.stack} ${modifier}`
} 
```

## Alternatives

If you still think a polymorphic component would be better, really cannot deal with plain HTML, or don’t want to write CSS in a separate file (even if I am not sure why), my next suggestion would be to use [PandaCSS](https://panda-css.com/) and create custom patterns or try other alternatives like [vanilla-extract](https://vanilla-extract.style/). In my opinion, they are still an over-engineered CSS metalanguage.

Another alternative worth considering is [Tailwind CSS](https://tailwindcss.com/), which has the advantage of being interoperable between languages and frameworks.

Using the default [spacing scale](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale) defined by Tailwind, we could create a `stack-` plugin like this:

```jsx
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ matchComponents, theme }) {
	    // dynamic component
	    // will match stack-0, stack-1, stack-4, ... 
      matchComponents({
        'stack': (value) => ({
          display: 'flex',
          flexDirection: 'column',
          rowGap: `${value}`,
        }),
      }, { 
        values: theme('spacing')
      })
    })
  ],
}

/* Usage:
<div className="stack-2">
	// ...
</div>	
*/
```

As a side note: it's interesting that Tailwind uses the component mental model in `matchComponents` to describe complex CSS rulesets, even if it does not create any *real* component. Maybe another example of how pervasive the concept is?  

## Takeaways

The case of Componentitis, beyond its technical aspects, demonstrates the importance of pausing to examine and question our mental models and habits. Like many patterns in software development, components emerged as solutions to real problems, but when we began defaulting to this pattern, it became an invisible source of complexity. *Componentitis* resembles those nutritional deficiencies caused by a restricted diet: the problem isn't with any single food but rather with missing out on everything else.

# A Journey through Switches

Status: In progress

**Disclaimer:** This post is just a record of my tests, investigations and speculations. Things might evolve and change as technology changes. Remember to verify your assumptions and test your code.

Some time ago I learned about an interesting HTML pattern by wandering through [the spec](https://html.spec.whatwg.org/):

```html
<label for="btn">Hello World<label>
<button type="button" id="btn"></button>
```

What I didn’t know until then is that `button` is a [labelable element](https://html.spec.whatwg.org/multipage/forms.html#category-label) and thus it can be referenced with the `for` attribute of a `label`.

Since this looked an exotic pattern to me, I did some research and it seems that the pattern is actually well supported by browsers and most screen readers but not so well supported by voice control softwares. My initial guess was that, depending on the requirements, there are probably more consolidated patterns out there, like using `id+aria-labbeledby`. Nonetheless, this pattern stuck in my mind.

## And then came The Switch

Now, the example above doesn’t make many sense, and I didn’t encounter it *in the wild* until recently when I found an implementation of it looking at the examples of the `Switch` component in the [shadcn documentation](https://ui.shadcn.com/docs/components/switch) (I cleaned it up to make it more readable): 

```html
<button 
	type="button" 
	role="switch" 
	aria-checked="false" 
	value="on" 
	id="airplane-mode"
>
</button>
<label for="airplane-mode">Airplane Mode</label>
```

The markup is very close to my first snippet, with the relevant addition of the `switch` role and the related `aria-checked` attribute. Those addition tells to assistive technologies that the control is a [switch](https://www.w3.org/TR/wai-aria/#switch). Around the web, you might find the control also called “toggle” or “toggle switch”, but this is how it would usually look like:

[https://commons.wikimedia.org/wiki/File:GtkSwitch.png#/media/File:GtkSwitch.png](https://commons.wikimedia.org/wiki/File:GtkSwitch.png#/media/File:GtkSwitch.png)

Since shadcn is based on Radix UI, a pretty established React library with focus on accessibility, I  decided to embark in a journey to see what other popular libraries were doing and how much the *labelled button* pattern was widespread. 

### Introduction to switches

Before starting the journey, let’s try to understand what a *switch* is, because the control itself is also pretty interesting from a User Experience point of view. It clearly is a [Skeuomorphism](https://www.interaction-design.org/literature/topics/skeuomorphism) of physical [toggle switches](https://en.wikipedia.org/wiki/Switch#Toggle_switch) and it was probably popularized by the [iOS interface](https://developer.apple.com/design/human-interface-guidelines/toggles).  In many cases the expected behavior for this control is to immediately have an effect on the system. For example, we expect a switch for airplane mode to immediately turn it on or off without having to press a save button. This is where the application of this UI pattern to the web changes: a switch can both have immediate effect or be part of a submittable form (thus behaving almost like a checkbox). Let’s keep this in mind for later.

### Web switches

When it comes to web, there’s an extensive literature about accessible switches and the toggle buttons (for example: [https://www.scottohara.me/note/2019/04/03/switch-script.html](https://www.scottohara.me/note/2019/04/03/switch-script.html), [https://inclusive-components.design/toggle-button/](https://inclusive-components.design/toggle-button/), [https://kittygiraudel.com/2021/04/05/an-accessible-toggle/](https://kittygiraudel.com/2021/04/05/an-accessible-toggle/#button-variant)) and even if their semantic is slightly different, the names are [used interchangeabily in design systems](https://component.gallery/components/toggle/). There are two ongoing initiative for native switch controls: [OpenUI toggle](https://open-ui.org/components/switch.explainer/) and [switch attribute](https://github.com/whatwg/html/pull/9546), the latter one being [already shipped in Safari 17.4](https://webkit.org/blog/15054/an-html-switch-control/). But for now, the closest patterns are:

```html
<!-- 1) HTML base is a checkbox -->  
<label for="switch">Airplane mode</label>
<input type="checkbox" id="switch" role="switch" aria-checked="false" />

<!-- 2) HTML base is a button -->
<label id="switch-label">Airplane mode</label>
<button aria-labelledby="switch-label" role="switch" aria-checked="false"></button>

```

**Screen readers**

For both patterns, NVDA and VoiceOver and other screen readers would sound like (you can check it on [CodePen](https://codepen.io/marco_solazzi/pen/jENojxL)):

```
Airplane mode off switch
```

Not all screen readers/browser pairs support these patterns though. For example Narrator in every browser except Edge identifies the switch as `button, off`  (probably because Narrator is mostly tailored for Edge users). As always, build with your target audience in mind.

**Interactions** 

From an operative point of view, the first pattern is probably preferable in cases where the switch’s state change is part of a submittable form because the checkbox’s value is submitted with all other fields (which is a good practice for progressive enhancement and also, more relevant with concepts like [React Server Functions](https://react.dev/reference/react-dom/components/form#handle-form-submission-with-a-server-function)). The second pattern is instead more suitable when we want the state change to have an immediate effect since that’s an expected behavior of the underlying `button` element.  

Another big difference, at least from the user agent point of view, is that in the first example the `label` has an associated [labeled control](https://html.spec.whatwg.org/multipage/forms.html#labeled-control) (the checkbox), while in the second **it’s just a caption for the button**.

It might seem a semantic subtlety, but there is a rather interesting side effect: interacting with the label of a labeled control triggers events on the control itself. For example, in most browsers, clicking the label of a checkbox will change the checkbox’s state, like if we directly clicked on the control. This is not the case when we associate a label and a control using `aria-labelledby` .

So, if we change the second snippet to:

```html
<!-- 2) HTML base is a button -->
<label for="switch-btn">Airplane mode</label>
<button id="switch-btn" role="switch" aria-checked="false"></button>
```

now clicking on the label triggers the button `click` event (you can test the behavior in [this CodePen](https://codepen.io/marco_solazzi/pen/bNGEgPM)). 

In the context of a form with many inputs this behavior might concur to the consistency of the user experience by making the switch feel more *native*. Anyway, as I previously mentioned, some accessibility softwares might not fully support this pattern. We’ll see later how component libraries are trying to solve the problem.

## Switches in the wild

So, now that we covered the basics, I’d like to see what other popular component libraries are doing for the same component. I will focus on React, Vue and Angular since they seem to [have the higher market share](https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/) in the JavaScript ecosystem. My choice of library is a mix of [surveys](https://2024.stateofreact.com/en-US/libraries/component-libraries/) and other [sources](https://bestofjs.org/projects?page=1&limit=30&tags=component&sort=monthly-downloads). 

### React Libraries

| Library | Pattern |
| --- | --- |
| [MUI](https://mui.com/material-ui/react-switch/#label) | label > input[type=checkbox] |
| [shadcn/ui + Radix Primitives](https://ui.shadcn.com/docs/components/switch) | label[for] + button[role=switch] |
| [Headless UI](https://headlessui.com/react/switch#adding-a-label) | label[for] + button[role=switch][aria-labelledby] |
| [Chakra UI](https://chakra-ui.com/docs/components/switch) | label > input[type=checkbox] |
| [React Aria](https://react-spectrum.adobe.com/react-aria/Switch.html) | label > input[type=checkbox][role=switch] (no aria-checked) |

### Vue Libraries

| Library | Pattern |
| --- | --- |
| [Vuetify](https://vuetifyjs.com/en/components/switches/#usage) | label[for] + input[type=checkbox] |
| [Element Plus](https://element-plus.org/en-US/component/form.html) | label[for] + input[type=checkbox][role=switch] |
| [Radix Vue](https://www.radix-vue.com/components/switch.html) | label[for] + button[role=switch][aria-label] |

### Angular Libraries

| Library | Pattern |
| --- | --- |
| [Angular Material](https://material.angular.io/components/slide-toggle/overview) | label[for] + button[role=switch][aria-labelledby] |
| [Nebular](https://akveo.github.io/nebular/docs/components/toggle/examples#nbtogglecomponent) | label > input[type=checkbox][role=switch] |

### Multi-framework Libraries

| Library | Pattern |
| --- | --- |
| [Bootstrap](https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches) | label[for] + input[type=checkbox][role=switch] |
| [Prime(NG,React,Vue)](https://www.primefaces.org/) | label[for] + input[type=checkbox][role=switch] |
| [Ark UI](https://ark-ui.com/react/docs/components/switch) | label[for] +  input[type=checkbox][aria-labelledby] |

### Results

As I suspected, most of the library authors settled for a more conservative pattern using a `label` and a checkbox with (or without) the `switch` role. 

It might seem that the `label + button` pattern isn’t used a lot, but remember that React is the most popular JavaScript library, shadcn and Radix have large adoption and that Headless UI is used in [Tailwind’s own premium UI library](https://tailwindui.com/components).

As for screen readers, in my quick tests using VoiceOver, NVDA and Narrator, all this patterns worked as expected, correctly reporting switches or checkboxes and their states.

I also noticed some interesting details:

- MUI,  Vuetify and Chakra UI (as well as Ark UI, which is developed under the same org) implementations of the switch are basically just visual: the underlying control are a simply labelled checkboxes. While this makes the accessibility information less consistent with its on-screen appearance, as [MUI documentation states](https://mui.com/material-ui/react-switch/#accessibility), the choice of not using the switch role is conservative, to widen the range of supported devices.
- React Aria doesn’t set the `aria-checked` attribute that [should be required](https://www.w3.org/TR/wai-aria/#switch), anyway in all my tests screen readers where able to pick the state from the underlying checkbox.
- Headless UI and Angular Material use the same implementation of shadcn/ui (`label+button`) but with a twist: they introduce a redundancy where the label is referenced in the button via the `aria-labelledby` attribute.

### Redundant labelling

Let’s expand that last point. Here is a snippet as reference:

```html
<label for="switch" id="switch-label">Airplane mode</label>
<button id="switch" role="switch" aria-labelledby="switch-label" aria-checked="false"></button>
```

Earlier we said that some accessibility softwares might not properly compute the name of buttons associated with labels with the `for` attribute. Since `aria-*` attributes have precedence in the [computation of accessible names](https://www.stefanjudis.com/today-i-learned/the-order-of-accessible-name-computation-steps/), the `for` attribute becomes superflus and is then only used to leverage the labeled control trigger side effect (as [reported in this PR](https://github.com/tailwindlabs/headlessui/pull/2265)). Anyway, I couldn’t test the accessibility of this pattern so I can’t 100% vouch for it.

## Takeaways

I am amazed by the variety of implementations and the small variations 

- Because UI libraries abstract away the final code that you are shipping, you might not know the type of “accessible experience” you are delivering.
- When you demand your design choices to someone else, you don't know the impact on your user experience.
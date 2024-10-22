---
title: Outgrowing Frontend and the Journey Ahead
publishDate: 2024-10-10
excerpt: "I'm facing a problem: after many years, I don’t feel comfortable calling myself a frontend developer anymore..."
---

On the bookshelf of my childhood room at my parents' house, there's a book titled <cite lang="it">Chi sono io</cite> ("Who am I") by [Gianni Rodari](https://en.wikipedia.org/wiki/Gianni_Rodari), a famous Italian author of children's literature. The book tells the journey of a child who begins with a simple question: <q>Who am I?</q> Through a series of imaginative encounters in a fantasy world, the child discovers his many identities and characteristics.

Though I'm no longer a child, the memory of that book came to mind recently as I faced a problem: after many years, I no longer feel comfortable calling myself a frontend developer. It doesn’t seem to fit, and I struggle to connect with many in the frontend community.

I’m not the first to notice this. In 2019 Chris Coyer described it in great detail in [The Great Divide](https://css-tricks.com/the-great-divide/), and many others before and after him wrote about it in a way I cannot probably come close to.

Job titles may seem random at times, and we could all just be called 'webmasters,' but **they play an important role in defining our work, both for ourselves and for others**.

## What do we mean with *frontend*

As I was thinking of why the word *frontend* no longer fits, I realized the issue has existed for some time but became apparent only recently: we divided web development into frontend and backend, using them as synonyms of *client-side* and *server-side*,  a model that worked 10 or 15 years ago. However, with the rise of Single Page Applications and Server-Side Rendered frameworks like Next.js, the analogy no longer applies. If frontend is synonymous with client-side, then why do frontend engineers deal with Server Components and Server Actions?

If we think about it, the word frontend can be explained as the part of a website or service that presents data to the users and through which users can interact with the system. **This definition doesn't specify whether it's limited to the client-side or includes server-side logic**.

In 2021, Brad Frost proposed two terms to define the great divide in the frontend community: *front-of-the-front-end* and *back-of-the-front-end*. Those terms are still not very clear to me, especially in the context of JavaScript meta-frameworks becoming full-fledged full-stack frameworks. 

Nowadays, I am leaning towards *client-side-front-end* and *server-side-front-end*. 

We can explain the idea using the classic MVC pattern:

- The model is what holds database operations, data modeling, etc: that's the backend.
- The controller is responsible for instantiating the models in response to a request and extracting data for the view: that's the server-side-front-end.
- The view is where the data are shown to the users and is tightly connected to client-side assets like styles and interactions: that's the client-side-front-end.

To be honest, whether it's *back-of-the-front-end* or *server-side-front-end*, I still remember a time when that part of the stack was in the scope of the backend (probably we should call it *front-of-the-back-end* then?).

## A bit of perspective

I know, this discussion might seem irrelevant to many, but as I said, job titles help us define ourselves as professionals and identify our closest community. They are also pretty important when it comes to hiring and company organization strategies.

Let's see how the implications of the shifting meaning of frontend has become more and more relevant over time using my personal career as an example.

### How it all started

My journey in the web industry started as a *generic web developer* working on databases, reading and writing data, and finally populating view templates created with HTML and CSS. At some point, I started working more on client-side-related tasks. I was sitting between the designers and the backend developers, and my job was to mediate between the design, the limitations of the server, and those of the final medium used to consume the product: browsers.

In the beginning, that kind of job position was some sort of specialized "web developer" and I, like many others, had to fight to make *frontend developer* be recognized as a real job because "it was the easy part" and "we cannot afford specialization, especially on the easy parts. Everyone has to work on everything".

Over time, the output of my work was usually static HTML templates based on a design (in one company I worked for, we used a term that in English translates roughly to "disassemble the design") which I then passed to the full-stack or backend developers to be *interpolated* with real data from the database. These templates included some CSS files and a small amount of JavaScript (mostly jQuery) to deal with interactions like carousels, menus, inline form validations, etc.

### A (misread) recognition

Then SPAs became popular, and frontend development suddenly became trendy. 

I was delighted. Not only because of the recognition, but also because frontend frameworks like Backbone or Angular gave me direct control over the end product, the interpolated views with data from a remote API. Backend people were happy as well because they were able to focus on tasks closer to the server.

Once SPA became ubiquitous, thanks to Angular and later React, it seemed that the frontend had taken over the engineering landscape. 

**But it wasn't frontend that took over the engineering landscape: it was JavaScript and JavaScript developers**. This started to become clear once CSS-in-JS libraries started to pop up. Because JavaScript engineers had a hard time dealing with how CSS works, they preferred to over-engineer it into a mental model closer to their expectations. 

This wasn't new for the web development world: Haml and Sass were initially designed to match the bracket-less and indented style of the Ruby language.

At the same time, though, the frontend was now in charge of new responsibilities like SEO and rendering performance. **That led to cycles of increased complexity with solutions like SSR, meta-frameworks and, eventually, server components.**

### A shift in expectations

Now that we live in the era of server components, when I look at my daily tasks, I see myself reading data from a database (aren't GraphQL and REST API a sort of database driver, in the end?) and interpolating data on a server-rendered view. Occasionally, I apply some styles with CSS-in-JS or Tailwind.

I went full circle and became a generic web developer again. While this could be fine, I am still considered a *frontend developer* because **its definition gradually shifted over time**. 

One problem with the change in the meaning of *frontend* is that now the skills expectations and requirements from companies and the community **lean more towards server programming** while still requiring some *traditional* client-side knowledge. If I think about it, years ago many of my colleagues and the "opinion leaders" in the community came from a design or humanities background, while now many of them come from CS.

## In search of a new language

So, while *client-side-front-end* (or *front-of-the-front-end*, if you prefer) might be good at delimiting my area of expertise, it isn't very nice and probably a bit verbose.  

Many others before me realized this shift and investigated possible new terms to differentiate what are two distinct development roles. There's *UX engineer*, *UI Engineer*, and many are going as far as Elly Loel using [*Web Designers*](https://www.ellyloel.com/blog/front-end-development-s-identity-crisis/) (a concept pitched by [Matthias Ott in 2024 CSS Day](https://www.youtube.com/watch?v=su6WA0kUUJE) as well). Another interesting term that is gaining traction lately is *Design Engineer*, which might seem confusing at first, could be a good start. There is a nice [article by David Luhr](https://luhr.co/blog/2024/02/26/the-origins-of-design-engineering/) that summarizes the story of the term over the years.

Personally, I have temporarily settled on *UI Engineer* because it highlights my stronger skills and what I like to do: building user interfaces, but *Design Engineer* is probably a broader definition that better describes my career as a bridge between design and engineering teams. 

## Missed opportunities and potential to unlock

The shift in the definition of *frontend* and the move towards an increasingly engineering-focused perspective has significant consequences for IT companies as well: since they settled on the traditional distinction between design and frontend, they often overlook the importance of what's in between and its importance for the development process.

Many of these companies face a related problem: a disproportionately small number of internal or freelance designers are tasked with handling an **overwhelming amount of design work, often in a near-waterfall process**. Designers create an application, hand it out to the engineers, handle immediate feedback, and then move on, frequently losing track of the project’s later stages. This approach not only leads to designer burnout, but excludes them from the product implementation process defying any chance for iterative improvements (because you often discover problems and challenges when you write the code), often leaving them as spectators of how much their vision changes from design to release (thus increasing even more their burnout). Additionally, engineers are left struggling with UX, accessibility, and related areas, even when provided with a design system.

### Unlocking design engineering potential

Design engineers have cross-functional skills (UX, web design, client-side development). They are not generalists; they usually specialize in one or two areas but, due to their role in a production team, they gain a broad understanding of multiple fields. This allows them to help team members from the surrounding areas. In a way, they speak multiple languages in a world where effectively design and engineering are often strangers to each other. This means that they can act as the glue between the design and engineering phases of a traditional project, or they can facilitate the iterations of an agile-like team. 

**With design engineers in the mix, they can influence the design with an engineering perspective and help engineers in building the UI and iterating with awareness of the original design vision.**

## Closing remarks

As I was researching this topic during my journey to redefine myself, I found more and more articles and people on the same path. This resounds to me as the slow and constant awakening of a community.

The emergence of Design Engineering as a role isn't just about finding a new job title, it's about recognizing and validating the missing piece between design and engineering that has always existed but hasn't been properly identified. It represents the natural evolution of a role that has been there all along, speaking multiple languages in an industry where design and engineering often feel worlds apart.


<footer class="small">

## Related links

- [The Great Divide](https://css-tricks.com/the-great-divide/) (January 2019)
- [HTML, CSS and our vanishing industry entry points](https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/) (January 2019)
- [Reluctant Gatekeeping: The Problem with Full Stack](https://medium.com/@Heydon/reluctant-gatekeeping-the-problem-with-full-stack-e9ad836570f6) (February 2019)
- [Front-of-the-Front-End and Back-of-the-Front-End Web Development](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/) (January 2021)
- [Development Is Design](https://bradfrost.com/blog/post/development-is-design/) (March 2021)
- [The Case for Design Engineers](https://blog.jim-nielsen.com/2022/the-case-for-design-engineers/) (March 2022)
- [Why Your Web Design Sucks](https://heather-buchel.com/blog/2023/10/why-your-web-design-sucks/) (October 2023)
- [Front-end Development's Identity Crisis](https://www.ellyloel.com/blog/front-end-development-s-identity-crisis/) (November 2023)
- [Is Front-End Development Having an Identity Crisis?](https://dev.to/assaultoustudios/is-front-end-development-having-an-identitycrisis-2224) (January 2024)

## Design Engineering Resources

- [Tales of a Non-Unicorn: A Story About The Trouble With Job Titles and Descriptions](https://css-tricks.com/tales-of-a-non-unicorn-a-story-about-the-trouble-with-job-titles-and-descriptions/) (September 2019)
- [Design Engineering - Natalya Shelburne at Beyond Tellerrand](https://beyondtellerrand.com/events/berlin-2019/speakers/natalya-shelburne) (November 2019)
- [I Think I'm a Design Engineer](https://www.trysmudford.com/blog/i-think-im-a-design-engineer/) (July 2023)
- [Design Engineering at Vercel](https://vercel.com/blog/design-engineering-at-vercel) (October 2023)
- [The Origins of Design Engineering](https://luhr.co/blog/2024/02/26/the-origins-of-design-engineering/) (February 2024)
- [What is Design Engineering? - Matthias Ott at CSS Day 2024 - video](https://www.youtube.com/watch?v=su6WA0kUUJE) (June 2024)

</footer>

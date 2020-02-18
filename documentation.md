# Documentation

## Story time

So, you're a web developer working on a legacy project, but like **real**
legacy: it started with back-end developers making a J2EE MVC application, and
10 years ago they started adding some Javascript to make the thing a little more
bearable to the user.

Now, your codebase is riddled with jQuery calls (or worse, Prototype (or worse,
both!)), the main JSP contains more than 50 scripts tags to import your JS
files, the order of which can make or break the application, everything is
stored in global variables which are used by 5 different files on average, you
can't even barely remember the SOLID principles but you're pretty sure this
codebase breaks at least 3 of them.

Also there is no CI at all, every commit introduces new bugs... suffice to say
you want to tidy things up a little bit.
You know that this project is beyond saving but you're thinking:

> If only I could make everyone's life just a little easier! If only I could
> introduce a sliver of encapsulation!

At this point, three options are available to you:

1. Convince you project manager (who you've never seen in person) to set up a JS
   bundler like Webpack in the production pipeline.
   _Impossible in some government administrations. Believe me, I tried._
1. Find a new job.
   _I mean you're a developer, you'll be fine._
1. Work out a way to bring a module system (with dependencies and all) to the
   browser.

So you're starting to read up on ways to do this, you learn the existence of
weird names like AMD, CommonJS, UMD and ES6 modules, and most of the resources
you find just tell you that ES6 modules are awesome and give you some
comparative code examples without actually pointing to a library or something
you could use without NPM and Webpack.

Somehow you manage to figure out that AMD is what you're looking for, and that
the two most common implementations of it are
[RequireJS](https://requirejs.org/) and [Dojo](https://dojotoolkit.org/), but
Dojo is like a complete framework and you don't need that, so you're going with
RequireJS.

You read the documentation and you realise that there is 5 different ways of
doing things and that you have no idea how to configure the thing so that it
actually finds your modules, and very early on you stumble on an error that
starts with `Mismatched anonymous define() modules...`.

When reading the documentation's section for it, you slowly start to understand
that even the makers or RequireJS assume that you can use NPM.

Everyone in the world assumes that you can use NPM.

> But why? WHY? Is there anyone on this forsaken earth who is in my situation?
> Is there anyone to understand my pain? ANYONE?

...

Well, here I am.

## Introducing nina.js

TODO

## API

TODO
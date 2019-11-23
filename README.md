# nina.js

_Nina Is Not AMD._

Nina is a lightweight in-browser asynchronous module management library. **It is not an implementation of AMD.**

## Context

The [Asynchronous Module Definition API](https://github.com/amdjs/amdjs-api/wiki/AMD) (AMD) is a specification for defining and loading encapsulated Javascript code for browser applications. A few implementations of the specification exist, the most popular arguably being [RequireJS](https://requirejs.org). Nina is not one of them, but rather a simplified version of what an asynchronous module loader can be.

It is being developed more as an exercise than something aimed for production, though you might find some use for it in small projects which don't rely on a Node-based transpilation pipeline.

Also, nina.js is an anagram of ninjas, which makes it automatically cool.

## Differences with AMD

Nina's API is heavily inspired by AMD's: modules are declared through the use of a `define` function which accepts a list of dependencies and a factory as arguments. However, there are some key differences that make it much less flexible than an AMD implementation. This is a tradeoff for a more consistent API and _hopefully_ a lighter library in the end (which might get countered by the code overhead for larger projects anyway).

* No CommonJS wrapping.
* No id argument in the define function. Modules are identified solely by their absolute path.
* The dependencies argument is not optional. Pass an empty array if your module has no dependency.
* The factory argument has to be a function. An error is thrown otherwise.
* Probably some other stuff that is going to become evident as I write the thing.

## Usage

TODO

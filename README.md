# nina.js

_Nina Is Not AMD._

Nina is a lightweight in-browser asynchronous module management library. **It is not an implementation of AMD.** To read more about differences with AMD, check out the end of this file.

It is being developed as an experiment rather than something aimed at production, though you might find some use for it in small projects which don't rely on a Node-based transpilation pipeline.

Also, nina.js is an anagram of ninjas, which makes it automatically cool.

## Documentation

### Setting up Nina in your project

Nina is explicitely meant to be used directly in the browser. No NPM instructions; just add this to your HTML file:

```html
<script src="path/to/nina.js"></script>
```

### Defining a module

Since Nina uses file paths to identify modules, a module consists of one JS file and that's it. In this file, just call the `define` function as follows:

```js
define(
  ['url/to/first/dependency.js', 'url/to/second/dependency.js'],
  function(firstDependency, secondDependency) {
    // ...

    return someValue; // This is what Nina is going to register in its map of modules.
  }
);
```

Because of the way Nina resolves URLs (or _doesn't_, technically), those URLs have to be defined **relative to the initial HTML file** and not the current JS file. More on that later.

Some quick notes:
* The first argument is **always** an array of strings. If your module doesn't have dependencies, pass an empty array. If it only has one dependency, pass an array with one element.
* The second argument is **always** a function that takes your dependencies as arguments and returns your module. If your module is a plain object, pass a function which just returns that object.
* The code in the entire file is executed inside a closure by Nina, so you can technically write stuff outside of the call to `define`. This can give you some flexibility (weird use cases like a dynamic dependency list come to mind) but I would suggest you keep your code inside the second argument as much as possible since not doing so isn't supported and could break on future commits.

### Using modules in your project

Once the `nina.js` script has been imported in your HTML, you can call Nina's `require` function to import modules:

```html
<script>
Nina.require(
  ['url/to/first/module.js', 'url/to/second/module.js'],
  function(firstModule, secondModule) {
    // ...
  }
);
</script>
```

When you call the `require` function, Nina checks its cache for already loaded modules and their dependencies and fetches those that haven't been loaded yet.

Just like the `define` function described above, the `require` function takes an array of string and a function as arguments and only that.

## About module URLs

I'm a fan of the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle), which is why Nina's API is more restrictive than most, and why its codebase is kept relatively short.

Letting developers choose to declare names for their modules or not would add a lot of complexity, and it seems when checking out [RequireJS](https://requirejs.org) (see below) that it can't be done without some kind of transpiling. I believe that using a module's URL as its identifier is a sound design decision when it comes to keeping both the code and the API simple and predictable.

However, Nina doesn't handle URL resolution right now, and lets the browser do it by just using standard XHR calls with the raw strings and hoping for the best. This method has two drawbacks:
* Relative URLs are resolved based on the browser's current URL and not that of the module calling the dependencies, which is something the developer has to be aware of.
* Since the URL is also the module's identifier, the same module could be loaded twice if evoked using different ways of describing its path (`domain.com/path` or `/path`, for example).

I think fixing those problems is worth adding a little complexity to the code, which is why I'm planning to add URL resolution in the set of things Nina is responsible for. That way, it could register modules using the full URL everytime, and maybe simplify declaration of dependencies (still not sure how I'll do that last one, though).

## Differences with AMD

The [Asynchronous Module Definition API](https://github.com/amdjs/amdjs-api/wiki/AMD) (AMD) is a specification for defining and loading encapsulated Javascript code for browser applications. A few implementations of the specification exist, the most popular arguably being [RequireJS](https://requirejs.org). Nina is not one of them, but rather a simplified version of what an asynchronous module loader can be.

Nina's API is heavily inspired by AMD's: modules are declared through the use of a `define` function which accepts a list of dependencies and a factory as arguments. However, there are some key differences that make it much less flexible than an AMD implementation. This is a tradeoff for a more consistent API and _hopefully_ a lighter library in the end (which might get countered by the code overhead for larger projects anyway).

* No CommonJS wrapping.
* No id argument in the define function. Modules are identified solely by their absolute path.
* The dependencies argument is not optional. Pass an empty array if your module has no dependency.
* The factory argument has to be a function. An error is thrown otherwise.
* Probably some other stuff that is going to become evident as I write the thing.

Nina = (function() {
  const loadedModules = {};

  function registerModule(path, mod) {
    loadedModules[path] = mod;
  }

  function require(dependencies, callback) {
    if (!Array.isArray(dependencies)) {
      throw new Error('The first argument of require() should be an array.');
    }
    if ('function' !== typeof callback) {
      throw new Error('The second argument of require() should be a function.');
    }
    if (dependencies.length === 0) {
      callback();
    } else {
      const head = dependencies[0];
      const tail = dependencies.slice(1);
      getModule(head, firstDependency =>
        require(tail, (...args) => callback.apply(this, [firstDependency, ...args]))
      );
    }
  }

  function getModule(path, callback) {
    if (path in loadedModules) {
      callback(loadedModules[path]);
    } else {
      fetchModule(path, callback);
    }
  }

  function fetchModule(path, callback) {
    const http = new XMLHttpRequest();
    http.open('GET', path, true);
    http.addEventListener('load', function() {
      var mod;
      if (this.status !== 200) {
        throw new Error('The file ' + path + ' could not be found. HTTP error ' + this.status);
      }
      try {
        mod = new Function('define', this.responseText);
      } catch (e) {
        console.error(e);
        throw new Error('Syntax error in file ' + path + '.');
      }
      mod(function define(dependencies, moduleBuilder) {
        if (!Array.isArray(dependencies)) {
          throw new Error('Error in declaration of module ' + path + '. The first argument of define() should be an array.');
        }
        if ('function' !== typeof moduleBuilder) {
          throw new Error('Error in declaration of module ' + path + '. The second argument of define() should be a function.');
        }
        if (dependencies.length === 0) {
          registerModule(path, moduleBuilder());
          getModule(path, callback);
        } else {
          require(dependencies, (...deps) =>
            define([], () => moduleBuilder.apply(this, deps))
          );
        }
      });
    });
    http.send();
  }

  return { require };
})();

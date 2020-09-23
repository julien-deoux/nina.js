/**
 * Nina.js - in-browser module management library
 * Copyright (C) 2020  Julien Déoux <juliendeoux@gmail.com>
 *
 * Nina.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Nina.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

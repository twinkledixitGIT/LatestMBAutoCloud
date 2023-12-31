/**
 * vis-data
 * http://visjs.org/
 *
 * Manage unstructured data using DataSet. Add, update, and remove data, and listen for changes in the data.
 *
 * @version 7.0.0
 * @date    2020-08-02T17:48:43.502Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$1
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;

var path = {};

var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

var functionBindContext = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();

        case 1:
          return new NativeConstructor(a);

        case 2:
          return new NativeConstructor(a, b);
      }

      return new NativeConstructor(a, b, c);
    }

    return NativeConstructor.apply(this, arguments);
  };

  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;
  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;
  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;
  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);
    targetProperty = target[key];
    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key]; // export native or implementation

    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1); // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty); // default case
        else resultProperty = sourceProperty; // add a flag to not completely full polyfills

    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      } // export virtual prototype methods


      path[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

// https://tc39.github.io/ecma262/#sec-isarray

var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? functionBindContext(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

var flattenIntoArray_1 = flattenIntoArray;

// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store;

var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.4',
    mode:  'pure' ,
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
&& !Symbol.sham // eslint-disable-next-line no-undef
&& typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }

  return WellKnownSymbolsStore[name];
};

var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

// https://github.com/tc39/proposal-flatMap


_export({
  target: 'Array',
  proto: true
}, {
  flatMap: function flatMap(callbackfn
  /* , thisArg */
  ) {
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A;
    aFunction(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray_1(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});

var entryVirtual = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

var flatMap = entryVirtual('Array').flatMap;

var ArrayPrototype = Array.prototype;

var flatMap_1 = function (it) {
  var own = it.flatMap;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.flatMap ? flatMap : own;
};

var flatMap$1 = flatMap_1;

var flatMap$2 = flatMap$1;

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

var aFunction$1 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES$1] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) {
  throw it;
};

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;
  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = {
      length: -1
    };
    if (ACCESSORS) defineProperty(O, 1, {
      enumerable: true,
      get: thrower
    });else O[1] = 1;
    method.call(O, argument0, argument1);
  });
};

var $map = arrayIteration.map;
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map'); // FF49- issue

var USES_TO_LENGTH = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var map = entryVirtual('Array').map;

var ArrayPrototype$1 = Array.prototype;

var map_1 = function (it) {
  var own = it.map;
  return it === ArrayPrototype$1 || it instanceof Array && own === ArrayPrototype$1.map ? map : own;
};

var map$1 = map_1;

var map$2 = map$1;

var $filter = arrayIteration.filter;
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$1
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var filter = entryVirtual('Array').filter;

var ArrayPrototype$2 = Array.prototype;

var filter_1 = function (it) {
  var own = it.filter;
  return it === ArrayPrototype$2 || it instanceof Array && own === ArrayPrototype$2.filter ? filter : own;
};

var filter$1 = filter_1;

var filter$2 = filter$1;

var createMethod$1 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }

    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$1(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$1(true)
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var $reduce = arrayReduce.left;
var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('reduce', {
  1: 0
}); // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD || !USES_TO_LENGTH$2
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var reduce = entryVirtual('Array').reduce;

var ArrayPrototype$3 = Array.prototype;

var reduce_1 = function (it) {
  var own = it.reduce;
  return it === ArrayPrototype$3 || it instanceof Array && own === ArrayPrototype$3.reduce ? reduce : own;
};

var reduce$1 = reduce_1;

var reduce$2 = reduce$1;

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func


    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind


var functionBind = Function.bind || function bind(that
/* , ...args */
) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);

  var boundFunction = function bound()
  /* args... */
  {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };

  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

// https://tc39.github.io/ecma262/#sec-function.prototype.bind

_export({
  target: 'Function',
  proto: true
}, {
  bind: functionBind
});

var bind = entryVirtual('Function').bind;

var FunctionPrototype = Function.prototype;

var bind_1 = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || it instanceof Function && own === FunctionPrototype.bind ? bind : own;
};

var bind$1 = bind_1;

var bind$2 = bind$1;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

// https://tc39.github.io/ecma262/#sec-object.defineproperty

_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperty: objectDefineProperty.f
});

var defineProperty_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var defineProperty = module.exports = function defineProperty(it, key, desc) {
    return Object.defineProperty(it, key, desc);
  };

  if (Object.defineProperty.sham) defineProperty.sham = true;
});

var defineProperty$1 = defineProperty_1;

var defineProperty$2 = defineProperty$1;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$2(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

/* eslint @typescript-eslint/member-ordering: ["error", { "classes": ["field", "constructor", "method"] }] */

/**
 * Create new data pipe.
 *
 * @param from - The source data set or data view.
 *
 * @remarks
 * Example usage:
 * ```typescript
 * interface AppItem {
 *   whoami: string;
 *   appData: unknown;
 *   visData: VisItem;
 * }
 * interface VisItem {
 *   id: number;
 *   label: string;
 *   color: string;
 *   x: number;
 *   y: number;
 * }
 *
 * const ds1 = new DataSet<AppItem, "whoami">([], { fieldId: "whoami" });
 * const ds2 = new DataSet<VisItem, "id">();
 *
 * const pipe = createNewDataPipeFrom(ds1)
 *   .filter((item): boolean => item.enabled === true)
 *   .map<VisItem, "id">((item): VisItem => item.visData)
 *   .to(ds2);
 *
 * pipe.start();
 * ```
 *
 * @returns A factory whose methods can be used to configure the pipe.
 */
function createNewDataPipeFrom(from) {
  return new DataPipeUnderConstruction(from);
}
/**
 * Internal implementation of the pipe. This should be accessible only through
 * `createNewDataPipeFrom` from the outside.
 *
 * @typeparam SI - Source item type.
 * @typeparam SP - Source item type's id property name.
 * @typeparam TI - Target item type.
 * @typeparam TP - Target item type's id property name.
 */

var SimpleDataPipe = /*#__PURE__*/function () {
  /**
   * Create a new data pipe.
   *
   * @param _source - The data set or data view that will be observed.
   * @param _transformers - An array of transforming functions to be used to
   * filter or transform the items in the pipe.
   * @param _target - The data set or data view that will receive the items.
   */
  function SimpleDataPipe(_source, _transformers, _target) {
    var _context, _context2, _context3;

    classCallCheck(this, SimpleDataPipe);

    this._source = _source;
    this._transformers = _transformers;
    this._target = _target;
    /**
     * Bound listeners for use with `DataInterface['on' | 'off']`.
     */

    this._listeners = {
      add: bind$2(_context = this._add).call(_context, this),
      remove: bind$2(_context2 = this._remove).call(_context2, this),
      update: bind$2(_context3 = this._update).call(_context3, this)
    };
  }
  /** @inheritdoc */


  createClass(SimpleDataPipe, [{
    key: "all",
    value: function all() {
      this._target.update(this._transformItems(this._source.get()));

      return this;
    }
    /** @inheritdoc */

  }, {
    key: "start",
    value: function start() {
      this._source.on("add", this._listeners.add);

      this._source.on("remove", this._listeners.remove);

      this._source.on("update", this._listeners.update);

      return this;
    }
    /** @inheritdoc */

  }, {
    key: "stop",
    value: function stop() {
      this._source.off("add", this._listeners.add);

      this._source.off("remove", this._listeners.remove);

      this._source.off("update", this._listeners.update);

      return this;
    }
    /**
     * Apply the transformers to the items.
     *
     * @param items - The items to be transformed.
     *
     * @returns The transformed items.
     */

  }, {
    key: "_transformItems",
    value: function _transformItems(items) {
      var _context4;

      return reduce$2(_context4 = this._transformers).call(_context4, function (items, transform) {
        return transform(items);
      }, items);
    }
    /**
     * Handle an add event.
     *
     * @param _name - Ignored.
     * @param payload - The payload containing the ids of the added items.
     */

  }, {
    key: "_add",
    value: function _add(_name, payload) {
      if (payload == null) {
        return;
      }

      this._target.add(this._transformItems(this._source.get(payload.items)));
    }
    /**
     * Handle an update event.
     *
     * @param _name - Ignored.
     * @param payload - The payload containing the ids of the updated items.
     */

  }, {
    key: "_update",
    value: function _update(_name, payload) {
      if (payload == null) {
        return;
      }

      this._target.update(this._transformItems(this._source.get(payload.items)));
    }
    /**
     * Handle a remove event.
     *
     * @param _name - Ignored.
     * @param payload - The payload containing the data of the removed items.
     */

  }, {
    key: "_remove",
    value: function _remove(_name, payload) {
      if (payload == null) {
        return;
      }

      this._target.remove(this._transformItems(payload.oldData));
    }
  }]);

  return SimpleDataPipe;
}();
/**
 * Internal implementation of the pipe factory. This should be accessible
 * only through `createNewDataPipeFrom` from the outside.
 *
 * @typeparam TI - Target item type.
 * @typeparam TP - Target item type's id property name.
 */


var DataPipeUnderConstruction = /*#__PURE__*/function () {
  /**
   * Create a new data pipe factory. This is an internal constructor that
   * should never be called from outside of this file.
   *
   * @param _source - The source data set or data view for this pipe.
   */
  function DataPipeUnderConstruction(_source) {
    classCallCheck(this, DataPipeUnderConstruction);

    this._source = _source;
    /**
     * Array transformers used to transform items within the pipe. This is typed
     * as any for the sake of simplicity.
     */

    this._transformers = [];
  }
  /**
   * Filter the items.
   *
   * @param callback - A filtering function that returns true if given item
   * should be piped and false if not.
   *
   * @returns This factory for further configuration.
   */


  createClass(DataPipeUnderConstruction, [{
    key: "filter",
    value: function filter(callback) {
      this._transformers.push(function (input) {
        return filter$2(input).call(input, callback);
      });

      return this;
    }
    /**
     * Map each source item to a new type.
     *
     * @param callback - A mapping function that takes a source item and returns
     * corresponding mapped item.
     *
     * @typeparam TI - Target item type.
     * @typeparam TP - Target item type's id property name.
     *
     * @returns This factory for further configuration.
     */

  }, {
    key: "map",
    value: function map(callback) {
      this._transformers.push(function (input) {
        return map$2(input).call(input, callback);
      });

      return this;
    }
    /**
     * Map each source item to zero or more items of a new type.
     *
     * @param callback - A mapping function that takes a source item and returns
     * an array of corresponding mapped items.
     *
     * @typeparam TI - Target item type.
     * @typeparam TP - Target item type's id property name.
     *
     * @returns This factory for further configuration.
     */

  }, {
    key: "flatMap",
    value: function flatMap(callback) {
      this._transformers.push(function (input) {
        return flatMap$2(input).call(input, callback);
      });

      return this;
    }
    /**
     * Connect this pipe to given data set.
     *
     * @param target - The data set that will receive the items from this pipe.
     *
     * @returns The pipe connected between given data sets and performing
     * configured transformation on the processed items.
     */

  }, {
    key: "to",
    value: function to(target) {
      return new SimpleDataPipe(this._source, this._transformers, target);
    }
  }]);

  return DataPipeUnderConstruction;
}();

var defineProperty$3 = defineProperty_1;

var defineProperty$4 = defineProperty$3;

var max = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var hiddenKeys = {};

var indexOf = arrayIncludes.indexOf;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

// https://tc39.github.io/ecma262/#sec-object.keys

var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// https://tc39.github.io/ecma262/#sec-object.defineproperties

var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

  return O;
};

// https://tc39.github.io/ecma262/#sec-object.defineproperties

_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperties: objectDefineProperties
});

var defineProperties_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var defineProperties = module.exports = function defineProperties(T, D) {
    return Object.defineProperties(T, D);
  };

  if (Object.defineProperties.sham) defineProperties.sham = true;
});

var defineProperties = defineProperties_1;

var defineProperties$1 = defineProperties;

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
  f: f$3
};

var f$4 = Object.getOwnPropertySymbols;
var objectGetOwnPropertySymbols = {
  f: f$4
};

var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

var getOwnPropertyDescriptors = path.Object.getOwnPropertyDescriptors;

var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

var iterators = {};

var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;

  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store$1, it) || {};
  };

  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };

  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var defineProperty$5 = objectDefineProperty.f;
var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;

    if (!has(target, TO_STRING_TAG$2)) {
      defineProperty$5(target, TO_STRING_TAG$2, {
        configurable: true,
        value: TAG
      });
    }

    if (SET_METHOD && !toStringTagSupport) {
      createNonEnumerableProperty(target, 'toString', objectToString);
    }
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var returnThis = function () {
  return this;
};

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */

var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var redefine = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
};

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$1 = function () {
  return this;
};

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      iterators[TO_STRING_TAG] = returnThis$1;
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
  }

  iterators[COLLECTION_NAME] = iterators.Array;
}

var $forEach = arrayIteration.forEach;
var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

var arrayForEach = !STRICT_METHOD$1 || !USES_TO_LENGTH$3 ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


_export({
  target: 'Array',
  proto: true,
  forced: [].forEach != arrayForEach
}, {
  forEach: arrayForEach
});

var forEach = entryVirtual('Array').forEach;

var forEach$1 = forEach;

var ArrayPrototype$4 = Array.prototype;
var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

var forEach_1 = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype$4 || it instanceof Array && own === ArrayPrototype$4.forEach // eslint-disable-next-line no-prototype-builtins
  || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
};

var forEach$2 = forEach_1;

var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor$1(1);
});
var FORCED = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !descriptors
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$1(toIndexedObject(it), key);
  }
});

var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
    return Object.getOwnPropertyDescriptor(it, key);
  };

  if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
});

var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor_1;

var getOwnPropertyDescriptor$3 = getOwnPropertyDescriptor$2;

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
var toString$1 = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$5
};

var f$6 = wellKnownSymbol;
var wellKnownSymbolWrapped = {
  f: f$6
};

var defineProperty$6 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty$6(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};

var $forEach$1 = arrayIteration.forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(SYMBOL);
var ObjectPrototype$1 = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore$1 = shared('wks');
var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () {
      return nativeDefineProperty$1(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$1, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
  nativeDefineProperty$1(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState$1(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach$1(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState$1(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });
  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  wellKnownSymbolWrapped.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$1(this).description;
      }
    });
  }
}

_export({
  global: true,
  wrap: true,
  forced: !nativeSymbol,
  sham: !nativeSymbol
}, {
  Symbol: $Symbol
});
$forEach$1(objectKeys(WellKnownSymbolsStore$1), function (name) {
  defineWellKnownSymbol(name);
});
_export({
  target: SYMBOL,
  stat: true,
  forced: !nativeSymbol
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol,
  sham: !descriptors
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

_export({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    objectGetOwnPropertySymbols.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  _export({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

var getOwnPropertySymbols = path.Object.getOwnPropertySymbols;

var getOwnPropertySymbols$1 = getOwnPropertySymbols;

var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

var createMethod$3 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$3(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$3(true)
};

var charAt = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

var ITERATOR$2 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || iterators[classof(it)];
};

var getIterator = function (it) {
  var iteratorMethod = getIteratorMethod(it);

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  }

  return anObject(iteratorMethod.call(it));
};

var getIterator_1 = getIterator;

var getIterator$1 = getIterator_1;

var getIteratorMethod_1 = getIteratorMethod;

var getIteratorMethod$1 = getIteratorMethod_1;

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$1
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

// empty

var es_object_toString = /*#__PURE__*/Object.freeze({
	__proto__: null
});

// https://tc39.github.io/ecma262/#sec-symbol.asynciterator

defineWellKnownSymbol('asyncIterator');

// empty

var es_symbol_description = /*#__PURE__*/Object.freeze({
	__proto__: null
});

// https://tc39.github.io/ecma262/#sec-symbol.hasinstance

defineWellKnownSymbol('hasInstance');

// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable

defineWellKnownSymbol('isConcatSpreadable');

// https://tc39.github.io/ecma262/#sec-symbol.iterator

defineWellKnownSymbol('iterator');

// https://tc39.github.io/ecma262/#sec-symbol.match

defineWellKnownSymbol('match');

defineWellKnownSymbol('matchAll');

// https://tc39.github.io/ecma262/#sec-symbol.replace

defineWellKnownSymbol('replace');

// https://tc39.github.io/ecma262/#sec-symbol.search

defineWellKnownSymbol('search');

// https://tc39.github.io/ecma262/#sec-symbol.species

defineWellKnownSymbol('species');

// https://tc39.github.io/ecma262/#sec-symbol.split

defineWellKnownSymbol('split');

// https://tc39.github.io/ecma262/#sec-symbol.toprimitive

defineWellKnownSymbol('toPrimitive');

// https://tc39.github.io/ecma262/#sec-symbol.tostringtag

defineWellKnownSymbol('toStringTag');

// https://tc39.github.io/ecma262/#sec-symbol.unscopables

defineWellKnownSymbol('unscopables');

// https://tc39.github.io/ecma262/#sec-math-@@tostringtag

setToStringTag(Math, 'Math', true);

// https://tc39.github.io/ecma262/#sec-json-@@tostringtag

setToStringTag(global_1.JSON, 'JSON', true);

getCjsExportFromNamespace(es_object_toString);

getCjsExportFromNamespace(es_symbol_description);

var symbol = path.Symbol;

var symbol$1 = symbol;

var symbol$2 = symbol$1;

var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var ITERATOR$3 = wellKnownSymbol('iterator');
var ArrayPrototype$5 = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$5[ITERATOR$3] === it);
};

// https://tc39.github.io/ecma262/#sec-array.from


var arrayFrom = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};

var ITERATOR$4 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from

_export({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: arrayFrom
});

var from_1 = path.Array.from;

var from_1$1 = from_1;

var from_1$2 = from_1$1;

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$4 = arrayMethodUsesToLength('slice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var SPECIES$2 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$2];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});

var slice$1 = entryVirtual('Array').slice;

var ArrayPrototype$6 = Array.prototype;

var slice_1 = function (it) {
  var own = it.slice;
  return it === ArrayPrototype$6 || it instanceof Array && own === ArrayPrototype$6.slice ? slice$1 : own;
};

var slice$2 = slice_1;

var slice$3 = slice$2;

var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = fails(function () {
  function F() {
    /* empty */
  }

  return !(nativeConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () {
    /* empty */
  });
});
var FORCED$2 = NEW_TARGET_BUG || ARGS_BUG;
_export({
  target: 'Reflect',
  stat: true,
  forced: FORCED$2,
  sham: FORCED$2
}, {
  construct: function construct(Target, args
  /* , newTarget */
  ) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();

        case 1:
          return new Target(args[0]);

        case 2:
          return new Target(args[0], args[1]);

        case 3:
          return new Target(args[0], args[1], args[2]);

        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      } // w/o altered newTarget, lot of arguments case


      var $args = [null];
      $args.push.apply($args, args);
      return new (functionBind.apply(Target, $args))();
    } // with altered newTarget, not support built-in constructors


    var proto = newTarget.prototype;
    var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

var construct$1 = path.Reflect.construct;

var construct$2 = construct$1;

var construct$3 = construct$2;

var entries = entryVirtual('Array').entries;

var entries$1 = entries;

var ArrayPrototype$7 = Array.prototype;
var DOMIterables$1 = {
  DOMTokenList: true,
  NodeList: true
};

var entries_1 = function (it) {
  var own = it.entries;
  return it === ArrayPrototype$7 || it instanceof Array && own === ArrayPrototype$7.entries // eslint-disable-next-line no-prototype-builtins
  || DOMIterables$1.hasOwnProperty(classof(it)) ? entries$1 : own;
};

var entries$2 = entries_1;

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

var iterator = wellKnownSymbolWrapped.f('iterator');

var iterator$1 = iterator;

var iterator$2 = iterator$1;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$2(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty$7 = _defineProperty;

var $stringify$1 = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);

  if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
    return '\\u' + match.charCodeAt(0).toString(16);
  }

  return match;
};

var FORCED$3 = fails(function () {
  return $stringify$1('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify$1('\uDEAD') !== '"\\udead"';
});

if ($stringify$1) {
  // https://github.com/tc39/proposal-well-formed-stringify
  _export({
    target: 'JSON',
    stat: true,
    forced: FORCED$3
  }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var result = $stringify$1.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}

if (!path.JSON) path.JSON = {
  stringify: JSON.stringify
}; // eslint-disable-next-line no-unused-vars

var stringify = function stringify(it, replacer, space) {
  return path.JSON.stringify.apply(null, arguments);
};

var stringify$1 = stringify;

var stringify$2 = stringify$1;

var values = entryVirtual('Array').values;

var values$1 = values;

var ArrayPrototype$8 = Array.prototype;
var DOMIterables$2 = {
  DOMTokenList: true,
  NodeList: true
};

var values_1 = function (it) {
  var own = it.values;
  return it === ArrayPrototype$8 || it instanceof Array && own === ArrayPrototype$8.values // eslint-disable-next-line no-prototype-builtins
  || DOMIterables$2.hasOwnProperty(classof(it)) ? values$1 : own;
};

var values$2 = values_1;

var test$1 = [];
var nativeSort = test$1.sort; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test$1.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test$1.sort(null);
}); // Old WebKit

var STRICT_METHOD$2 = arrayMethodIsStrict('sort');
var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$2; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$4
}, {
  sort: function sort(comparefn) {
    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

var sort = entryVirtual('Array').sort;

var ArrayPrototype$9 = Array.prototype;

var sort_1 = function (it) {
  var own = it.sort;
  return it === ArrayPrototype$9 || it instanceof Array && own === ArrayPrototype$9.sort ? sort : own;
};

var sort$1 = sort_1;

var sort$2 = sort$1;

var FAILS_ON_PRIMITIVES$1 = fails(function () {
  objectKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$1
}, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var keys$1 = path.Object.keys;

var keys$2 = keys$1;

var keys$3 = keys$2;

var keys$4 = entryVirtual('Array').keys;

var keys$5 = keys$4;

var ArrayPrototype$a = Array.prototype;
var DOMIterables$3 = {
  DOMTokenList: true,
  NodeList: true
};

var keys_1 = function (it) {
  var own = it.keys;
  return it === ArrayPrototype$a || it instanceof Array && own === ArrayPrototype$a.keys // eslint-disable-next-line no-prototype-builtins
  || DOMIterables$3.hasOwnProperty(classof(it)) ? keys$5 : own;
};

var keys$6 = keys_1;

// https://tc39.github.io/ecma262/#sec-array.isarray

_export({
  target: 'Array',
  stat: true
}, {
  isArray: isArray
});

var isArray$1 = path.Array.isArray;

var isArray$2 = isArray$1;

var isArray$3 = isArray$2;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _arrayWithoutHoles(arr) {
  if (isArray$3(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

var from_1$3 = from_1;

var from_1$4 = from_1$3;

var ITERATOR$5 = wellKnownSymbol('iterator');

var isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$5] !== undefined || '@@iterator' in O // eslint-disable-next-line no-prototype-builtins
  || iterators.hasOwnProperty(classof(O));
};

var isIterable_1 = isIterable;

var isIterable$1 = isIterable_1;

// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol('asyncDispose');

// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol('dispose');

// https://github.com/tc39/proposal-observable

defineWellKnownSymbol('observable');

// https://github.com/tc39/proposal-pattern-matching

defineWellKnownSymbol('patternMatch');

defineWellKnownSymbol('replaceAll');

var symbol$3 = symbol;

var symbol$4 = symbol$3;

function _iterableToArray(iter) {
  if (typeof symbol$4 !== "undefined" && isIterable$1(Object(iter))) return from_1$4(iter);
}

var iterableToArray = _iterableToArray;

var slice$4 = slice_1;

var slice$5 = slice$4;

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);

  var n = slice$5(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return from_1$4(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

var concat = entryVirtual('Array').concat;

var ArrayPrototype$b = Array.prototype;

var concat_1 = function (it) {
  var own = it.concat;
  return it === ArrayPrototype$b || it instanceof Array && own === ArrayPrototype$b.concat ? concat : own;
};

var concat$1 = concat_1;

var concat$2 = concat$1;

var nativeAssign = Object.assign;
var defineProperty$8 = Object.defineProperty; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && nativeAssign({
    b: 1
  }, nativeAssign(defineProperty$8({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$8(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : nativeAssign;

// https://tc39.github.io/ecma262/#sec-object.assign

_export({
  target: 'Object',
  stat: true,
  forced: Object.assign !== objectAssign
}, {
  assign: objectAssign
});

var assign = path.Object.assign;

var assign$1 = assign;

var assign$2 = assign$1;

var $some = arrayIteration.some;
var STRICT_METHOD$3 = arrayMethodIsStrict('some');
var USES_TO_LENGTH$5 = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$5
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var some = entryVirtual('Array').some;

var ArrayPrototype$c = Array.prototype;

var some_1 = function (it) {
  var own = it.some;
  return it === ArrayPrototype$c || it instanceof Array && own === ArrayPrototype$c.some ? some : own;
};

var some$1 = some_1;

var some$2 = some$1;

var iterator$3 = iterator;

var iterator$4 = iterator$3;

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof symbol$4 === "function" && typeof iterator$4 === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof symbol$4 === "function" && obj.constructor === symbol$4 && obj !== symbol$4.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;
  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + ++id,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys[METADATA] = true;
});

var iterate_1 = createCommonjsModule(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = iterFn.call(iterable);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
});

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

var defineProperty$9 = objectDefineProperty.f;
var forEach$3 = arrayIteration.forEach;
var setInternalState$3 = internalState.set;
var internalStateGetterFor = internalState.getterFor;

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var exported = {};
  var Constructor;

  if (!descriptors || typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  }))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState$3(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (iterable != undefined) iterate_1(iterable, target[ADDER], target, IS_MAP);
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
    forEach$3(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';

      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
        createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
          var collection = getInternalState(this).collection;
          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
          var result = collection[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      }
    });
    IS_WEAK || defineProperty$9(Constructor.prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);
  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({
    global: true,
    forced: true
  }, exported);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

var redefineAll = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
  }

  return target;
};

var SPECIES$3 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var defineProperty$a = objectDefineProperty.f;
var fastKey = internalMetadata.fastKey;
var setInternalState$4 = internalState.set;
var internalStateGetterFor$1 = internalState.getterFor;
var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$4(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index; // change existing entry

      if (entry) {
        entry.value = value; // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;else that.size++; // add to index

        if (index !== 'F') state.index[index] = entry;
      }

      return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that); // fast case

      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index]; // frozen object case

      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;

        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }

        state.first = state.last = undefined;
        if (descriptors) state.size = 0;else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;else that.size--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        var state = getInternalState(this);
        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;

        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty$a(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$4(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last; // revert to the last existing entry

      while (entry && entry.removed) entry = entry.previous; // get next entry


      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return {
          value: undefined,
          done: true
        };
      } // return step by kind


      if (kind == 'keys') return {
        value: entry.key,
        done: false
      };
      if (kind == 'values') return {
        value: entry.value,
        done: false
      };
      return {
        value: [entry.key, entry.value],
        done: false
      };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

    setSpecies(CONSTRUCTOR_NAME);
  }
};

// https://tc39.github.io/ecma262/#sec-map-objects


var es_map = collection('Map', function (init) {
  return function Map() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
}, collectionStrong);

var map$3 = path.Map;

var map$4 = map$3;

var map$5 = map$4;

var isArray$4 = isArray$1;

var isArray$5 = isArray$4;

// https://tc39.github.io/ecma262/#sec-object.create

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  create: objectCreate
});

var Object$1 = path.Object;

var create = function create(P, D) {
  return Object$1.create(P, D);
};

var create$1 = create;

var create$2 = create$1;

// https://tc39.github.io/ecma262/#sec-object.setprototypeof

_export({
  target: 'Object',
  stat: true
}, {
  setPrototypeOf: objectSetPrototypeOf
});

var setPrototypeOf = path.Object.setPrototypeOf;

var setPrototypeOf$1 = setPrototypeOf;

var setPrototypeOf$2 = setPrototypeOf$1;

var setPrototypeOf$3 = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = setPrototypeOf$2 || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = create$2(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf$3(subClass, superClass);
}

var inherits = _inherits;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var FAILS_ON_PRIMITIVES$2 = fails(function () {
  objectGetPrototypeOf(1);
}); // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$2,
  sham: !correctPrototypeGetter
}, {
  getPrototypeOf: function getPrototypeOf(it) {
    return objectGetPrototypeOf(toObject(it));
  }
});

var getPrototypeOf = path.Object.getPrototypeOf;

var getPrototypeOf$1 = getPrototypeOf;

var getPrototypeOf$2 = getPrototypeOf$1;

var getPrototypeOf$3 = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = setPrototypeOf$2 ? getPrototypeOf$2 : function _getPrototypeOf(o) {
      return o.__proto__ || getPrototypeOf$2(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify$3(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify$3(rnds);
}

var create$3 = create;

var create$4 = create$3;

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$4 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$4(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$4(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$4(3)
};

var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim; // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim

_export({
  target: 'String',
  proto: true,
  forced: stringTrimForced('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

var trim = entryVirtual('String').trim;

var trim$1 = stringTrim.trim;
var $parseInt = global_1.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$5 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix

var numberParseInt = FORCED$5 ? function parseInt(string, radix) {
  var S = trim$1(String(string));
  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
} : $parseInt;

// https://tc39.github.io/ecma262/#sec-parseint-string-radix

_export({
  global: true,
  forced: parseInt != numberParseInt
}, {
  parseInt: numberParseInt
});

var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

var createMethod$5 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod$5(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod$5(false)
};

var $values = objectToArray.values; // `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values

_export({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

var values$3 = path.Object.values;

var $indexOf = arrayIncludes.indexOf;
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$4 = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$6 = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

_export({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || !STRICT_METHOD$4 || !USES_TO_LENGTH$6
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var indexOf$1 = entryVirtual('Array').indexOf;

function _arrayWithHoles(arr) {
  if (isArray$3(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof symbol$4 === "undefined" || !isIterable$1(Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = getIterator$1(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

// https://tc39.github.io/ecma262/#sec-date.now

_export({
  target: 'Date',
  stat: true
}, {
  now: function now() {
    return new Date().getTime();
  }
});

var now = path.Date.now;

// https://tc39.github.io/ecma262/#sec-reflect.ownkeys

_export({
  target: 'Reflect',
  stat: true
}, {
  ownKeys: ownKeys
});

var ownKeys$1 = path.Reflect.ownKeys;

var ownKeys$2 = ownKeys$1;

var ownKeys$3 = ownKeys$2;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof symbol$2 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$5(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { var _context13; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = slice$3(_context13 = Object.prototype.toString.call(o)).call(_context13, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * vis-util
 * https://github.com/visjs/vis-util
 *
 * utilitie collection for visjs
 *
 * @version 4.3.4
 * @date    2020-08-01T15:11:53.524Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

/**
 * Use this symbol to delete properies in deepObjectAssign.
 */
var DELETE = symbol$2("DELETE");
/**
 * Pure version of deepObjectAssign, it doesn't modify any of it's arguments.
 *
 * @param base - The base object that fullfils the whole interface T.
 * @param updates - Updates that may change or delete props.
 *
 * @returns A brand new instance with all the supplied objects deeply merged.
 */


function pureDeepObjectAssign(base) {
  var _context;

  for (var _len = arguments.length, updates = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    updates[_key - 1] = arguments[_key];
  }

  return deepObjectAssign.apply(void 0, concat$2(_context = [{}, base]).call(_context, updates));
}
/**
 * Deep version of object assign with additional deleting by the DELETE symbol.
 *
 * @param values - Objects to be deeply merged.
 *
 * @returns The first object from values.
 */


function deepObjectAssign() {
  var merged = deepObjectAssignNonentry.apply(void 0, arguments);
  stripDelete(merged);
  return merged;
}
/**
 * Deep version of object assign with additional deleting by the DELETE symbol.
 *
 * @remarks
 * This doesn't strip the DELETE symbols so they may end up in the final object.
 *
 * @param values - Objects to be deeply merged.
 *
 * @returns The first object from values.
 */


function deepObjectAssignNonentry() {
  for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    values[_key2] = arguments[_key2];
  }

  if (values.length < 2) {
    return values[0];
  } else if (values.length > 2) {
    var _context2;

    return deepObjectAssignNonentry.apply(void 0, concat$2(_context2 = [deepObjectAssign(values[0], values[1])]).call(_context2, toConsumableArray(slice$3(values).call(values, 2))));
  }

  var a = values[0];
  var b = values[1];

  var _iterator = _createForOfIteratorHelper(ownKeys$3(b)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var prop = _step.value;
      if (!Object.prototype.propertyIsEnumerable.call(b, prop)) ;else if (b[prop] === DELETE) {
        delete a[prop];
      } else if (a[prop] !== null && b[prop] !== null && _typeof_1(a[prop]) === "object" && _typeof_1(b[prop]) === "object" && !isArray$5(a[prop]) && !isArray$5(b[prop])) {
        a[prop] = deepObjectAssignNonentry(a[prop], b[prop]);
      } else {
        a[prop] = clone(b[prop]);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return a;
}
/**
 * Deep clone given object or array. In case of primitive simply return.
 *
 * @param a - Anything.
 *
 * @returns Deep cloned object/array or unchanged a.
 */


function clone(a) {
  if (isArray$5(a)) {
    return map$2(a).call(a, function (value) {
      return clone(value);
    });
  } else if (_typeof_1(a) === "object" && a !== null) {
    return deepObjectAssignNonentry({}, a);
  } else {
    return a;
  }
}
/**
 * Strip DELETE from given object.
 *
 * @param a - Object which may contain DELETE but won't after this is executed.
 */


function stripDelete(a) {
  for (var _i = 0, _Object$keys = keys$3(a); _i < _Object$keys.length; _i++) {
    var prop = _Object$keys[_i];

    if (a[prop] === DELETE) {
      delete a[prop];
    } else if (_typeof_1(a[prop]) === "object" && a[prop] !== null) {
      stripDelete(a[prop]);
    }
  }
}

/**
 * Determine whether a value can be used as an id.
 *
 * @param value - Input value of unknown type.
 *
 * @returns True if the value is valid id, false otherwise.
 */
function isId(value) {
  return typeof value === "string" || typeof value === "number";
}

var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$7 = arrayMethodUsesToLength('splice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var max$2 = Math.max;
var min$2 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$7
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var splice = entryVirtual('Array').splice;

var ArrayPrototype$d = Array.prototype;

var splice_1 = function (it) {
  var own = it.splice;
  return it === ArrayPrototype$d || it instanceof Array && own === ArrayPrototype$d.splice ? splice : own;
};

var splice$1 = splice_1;

var splice$2 = splice$1;

var slice$6 = [].slice;
var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

var wrap$1 = function (scheduler) {
  return function (handler, timeout
  /* , ...arguments */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice$6.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
}; // ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


_export({
  global: true,
  bind: true,
  forced: MSIE
}, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap$1(global_1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap$1(global_1.setInterval)
});

var setTimeout = path.setTimeout;

var setTimeout$1 = setTimeout;

/* eslint @typescript-eslint/member-ordering: ["error", { "classes": ["field", "constructor", "method"] }] */

/**
 * A queue.
 *
 * @typeParam T - The type of method names to be replaced by queued versions.
 */
var Queue = /*#__PURE__*/function () {
  /**
   * Construct a new Queue.
   *
   * @param options - Queue configuration.
   */
  function Queue(options) {
    classCallCheck(this, Queue);

    this._queue = [];
    this._timeout = null;
    this._extended = null; // options

    this.delay = null;
    this.max = Infinity;
    this.setOptions(options);
  }
  /**
   * Update the configuration of the queue.
   *
   * @param options - Queue configuration.
   */


  createClass(Queue, [{
    key: "setOptions",
    value: function setOptions(options) {
      if (options && typeof options.delay !== "undefined") {
        this.delay = options.delay;
      }

      if (options && typeof options.max !== "undefined") {
        this.max = options.max;
      }

      this._flushIfNeeded();
    }
    /**
     * Extend an object with queuing functionality.
     * The object will be extended with a function flush, and the methods provided in options.replace will be replaced with queued ones.
     *
     * @param object - The object to be extended.
     * @param options - Additional options.
     *
     * @returns The created queue.
     */

  }, {
    key: "destroy",

    /**
     * Destroy the queue. The queue will first flush all queued actions, and in case it has extended an object, will restore the original object.
     */
    value: function destroy() {
      this.flush();

      if (this._extended) {
        var object = this._extended.object;
        var methods = this._extended.methods;

        for (var i = 0; i < methods.length; i++) {
          var method = methods[i];

          if (method.original) {
            // @TODO: better solution?
            object[method.name] = method.original;
          } else {
            // @TODO: better solution?
            delete object[method.name];
          }
        }

        this._extended = null;
      }
    }
    /**
     * Replace a method on an object with a queued version.
     *
     * @param object - Object having the method.
     * @param method - The method name.
     */

  }, {
    key: "replace",
    value: function replace(object, method) {
      /* eslint-disable-next-line @typescript-eslint/no-this-alias */
      var me = this;
      var original = object[method];

      if (!original) {
        throw new Error("Method " + method + " undefined");
      }

      object[method] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        // add this call to the queue
        me.queue({
          args: args,
          fn: original,
          context: this
        });
      };
    }
    /**
     * Queue a call.
     *
     * @param entry - The function or entry to be queued.
     */

  }, {
    key: "queue",
    value: function queue(entry) {
      if (typeof entry === "function") {
        this._queue.push({
          fn: entry
        });
      } else {
        this._queue.push(entry);
      }

      this._flushIfNeeded();
    }
    /**
     * Check whether the queue needs to be flushed.
     */

  }, {
    key: "_flushIfNeeded",
    value: function _flushIfNeeded() {
      var _this = this;

      // flush when the maximum is exceeded.
      if (this._queue.length > this.max) {
        this.flush();
      } // flush after a period of inactivity when a delay is configured


      if (this._timeout != null) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }

      if (this.queue.length > 0 && typeof this.delay === "number") {
        this._timeout = setTimeout$1(function () {
          _this.flush();
        }, this.delay);
      }
    }
    /**
     * Flush all queued calls
     */

  }, {
    key: "flush",
    value: function flush() {
      var _context, _context2;

      forEach$2(_context = splice$2(_context2 = this._queue).call(_context2, 0)).call(_context, function (entry) {
        entry.fn.apply(entry.context || entry.fn, entry.args || []);
      });
    }
  }], [{
    key: "extend",
    value: function extend(object, options) {
      var queue = new Queue(options);

      if (object.flush !== undefined) {
        throw new Error("Target object already has a property flush");
      }

      object.flush = function () {
        queue.flush();
      };

      var methods = [{
        name: "flush",
        original: undefined
      }];

      if (options && options.replace) {
        for (var i = 0; i < options.replace.length; i++) {
          var name = options.replace[i];
          methods.push({
            name: name,
            // @TODO: better solution?
            original: object[name]
          }); // @TODO: better solution?

          queue.replace(object, name);
        }
      }

      queue._extended = {
        object: object,
        methods: methods
      };
      return queue;
    }
  }]);

  return Queue;
}();

/* eslint-disable @typescript-eslint/member-ordering */

/**
 * [[DataSet]] code that can be reused in [[DataView]] or other similar implementations of [[DataInterface]].
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
var DataSetPart = /*#__PURE__*/function () {
  function DataSetPart() {
    classCallCheck(this, DataSetPart);

    this._subscribers = {
      "*": [],
      add: [],
      remove: [],
      update: []
    };
    /**
     * @deprecated Use on instead (PS: DataView.subscribe === DataView.on).
     */

    this.subscribe = DataSetPart.prototype.on;
    /**
     * @deprecated Use off instead (PS: DataView.unsubscribe === DataView.off).
     */

    this.unsubscribe = DataSetPart.prototype.off;
  }
  /**
   * Trigger an event
   *
   * @param event - Event name.
   * @param payload - Event payload.
   * @param senderId - Id of the sender.
   */


  createClass(DataSetPart, [{
    key: "_trigger",
    value: function _trigger(event, payload, senderId) {
      var _context, _context2;

      if (event === "*") {
        throw new Error("Cannot trigger event *");
      }

      forEach$2(_context = concat$2(_context2 = []).call(_context2, toConsumableArray(this._subscribers[event]), toConsumableArray(this._subscribers["*"]))).call(_context, function (subscriber) {
        subscriber(event, payload, senderId != null ? senderId : null);
      });
    }
    /**
     * Subscribe to an event, add an event listener.
     *
     * @remarks Non-function callbacks are ignored.
     *
     * @param event - Event name.
     * @param callback - Callback method.
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      if (typeof callback === "function") {
        this._subscribers[event].push(callback);
      } // @TODO: Maybe throw for invalid callbacks?

    }
    /**
     * Unsubscribe from an event, remove an event listener.
     *
     * @remarks If the same callback was subscribed more than once **all** occurences will be removed.
     *
     * @param event - Event name.
     * @param callback - Callback method.
     */

  }, {
    key: "off",
    value: function off(event, callback) {
      var _context3;

      this._subscribers[event] = filter$2(_context3 = this._subscribers[event]).call(_context3, function (subscriber) {
        return subscriber !== callback;
      });
    }
  }]);

  return DataSetPart;
}();

// https://tc39.github.io/ecma262/#sec-set-objects


var es_set = collection('Set', function (init) {
  return function Set() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
}, collectionStrong);

var set$1 = path.Set;

var set$2 = set$1;

var set$3 = set$2;

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof symbol$2 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$5(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { var _context10; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = slice$3(_context10 = Object.prototype.toString.call(o)).call(_context10, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Data stream
 *
 * @remarks
 * [[DataStream]] offers an always up to date stream of items from a [[DataSet]] or [[DataView]].
 * That means that the stream is evaluated at the time of iteration, conversion to another data type or when [[cache]] is called, not when the [[DataStream]] was created.
 * Multiple invocations of for example [[toItemArray]] may yield different results (if the data source like for example [[DataSet]] gets modified).
 *
 * @typeparam Item - The item type this stream is going to work with.
 */
var DataStream = /*#__PURE__*/function () {
  /**
   * Create a new data stream.
   *
   * @param _pairs - The id, item pairs.
   */
  function DataStream(_pairs) {
    classCallCheck(this, DataStream);

    this._pairs = _pairs;
  }
  /**
   * Return an iterable of key, value pairs for every entry in the stream.
   */


  createClass(DataStream, [{
    key: iterator$2,
    value: /*#__PURE__*/regenerator.mark(function value() {
      var _iterator, _step, _step$value, id, item;

      return regenerator.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper$1(this._pairs);
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 9;
                break;
              }

              _step$value = slicedToArray(_step.value, 2), id = _step$value[0], item = _step$value[1];
              _context.next = 7;
              return [id, item];

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, value, this, [[1, 11, 14, 17]]);
    })
    /**
     * Return an iterable of key, value pairs for every entry in the stream.
     */

  }, {
    key: "entries",
    value: /*#__PURE__*/regenerator.mark(function entries() {
      var _iterator2, _step2, _step2$value, id, item;

      return regenerator.wrap(function entries$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper$1(this._pairs);
              _context2.prev = 1;

              _iterator2.s();

            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context2.next = 9;
                break;
              }

              _step2$value = slicedToArray(_step2.value, 2), id = _step2$value[0], item = _step2$value[1];
              _context2.next = 7;
              return [id, item];

            case 7:
              _context2.next = 3;
              break;

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);

              _iterator2.e(_context2.t0);

            case 14:
              _context2.prev = 14;

              _iterator2.f();

              return _context2.finish(14);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, entries, this, [[1, 11, 14, 17]]);
    })
    /**
     * Return an iterable of keys in the stream.
     */

  }, {
    key: "keys",
    value: /*#__PURE__*/regenerator.mark(function keys() {
      var _iterator3, _step3, _step3$value, id;

      return regenerator.wrap(function keys$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper$1(this._pairs);
              _context3.prev = 1;

              _iterator3.s();

            case 3:
              if ((_step3 = _iterator3.n()).done) {
                _context3.next = 9;
                break;
              }

              _step3$value = slicedToArray(_step3.value, 1), id = _step3$value[0];
              _context3.next = 7;
              return id;

            case 7:
              _context3.next = 3;
              break;

            case 9:
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);

              _iterator3.e(_context3.t0);

            case 14:
              _context3.prev = 14;

              _iterator3.f();

              return _context3.finish(14);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, keys, this, [[1, 11, 14, 17]]);
    })
    /**
     * Return an iterable of values in the stream.
     */

  }, {
    key: "values",
    value: /*#__PURE__*/regenerator.mark(function values() {
      var _iterator4, _step4, _step4$value, item;

      return regenerator.wrap(function values$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _iterator4 = _createForOfIteratorHelper$1(this._pairs);
              _context4.prev = 1;

              _iterator4.s();

            case 3:
              if ((_step4 = _iterator4.n()).done) {
                _context4.next = 9;
                break;
              }

              _step4$value = slicedToArray(_step4.value, 2), item = _step4$value[1];
              _context4.next = 7;
              return item;

            case 7:
              _context4.next = 3;
              break;

            case 9:
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);

              _iterator4.e(_context4.t0);

            case 14:
              _context4.prev = 14;

              _iterator4.f();

              return _context4.finish(14);

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, values, this, [[1, 11, 14, 17]]);
    })
    /**
     * Return an array containing all the ids in this stream.
     *
     * @remarks
     * The array may contain duplicities.
     *
     * @returns The array with all ids from this stream.
     */

  }, {
    key: "toIdArray",
    value: function toIdArray() {
      var _context5;

      return map$2(_context5 = toConsumableArray(this._pairs)).call(_context5, function (pair) {
        return pair[0];
      });
    }
    /**
     * Return an array containing all the items in this stream.
     *
     * @remarks
     * The array may contain duplicities.
     *
     * @returns The array with all items from this stream.
     */

  }, {
    key: "toItemArray",
    value: function toItemArray() {
      var _context6;

      return map$2(_context6 = toConsumableArray(this._pairs)).call(_context6, function (pair) {
        return pair[1];
      });
    }
    /**
     * Return an array containing all the entries in this stream.
     *
     * @remarks
     * The array may contain duplicities.
     *
     * @returns The array with all entries from this stream.
     */

  }, {
    key: "toEntryArray",
    value: function toEntryArray() {
      return toConsumableArray(this._pairs);
    }
    /**
     * Return an object map containing all the items in this stream accessible by ids.
     *
     * @remarks
     * In case of duplicate ids (coerced to string so `7 == '7'`) the last encoutered appears in the returned object.
     *
     * @returns The object map of all id → item pairs from this stream.
     */

  }, {
    key: "toObjectMap",
    value: function toObjectMap() {
      var map = create$4(null);

      var _iterator5 = _createForOfIteratorHelper$1(this._pairs),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = slicedToArray(_step5.value, 2),
              id = _step5$value[0],
              item = _step5$value[1];

          map[id] = item;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return map;
    }
    /**
     * Return a map containing all the items in this stream accessible by ids.
     *
     * @returns The map of all id → item pairs from this stream.
     */

  }, {
    key: "toMap",
    value: function toMap() {
      return new map$5(this._pairs);
    }
    /**
     * Return a set containing all the (unique) ids in this stream.
     *
     * @returns The set of all ids from this stream.
     */

  }, {
    key: "toIdSet",
    value: function toIdSet() {
      return new set$3(this.toIdArray());
    }
    /**
     * Return a set containing all the (unique) items in this stream.
     *
     * @returns The set of all items from this stream.
     */

  }, {
    key: "toItemSet",
    value: function toItemSet() {
      return new set$3(this.toItemArray());
    }
    /**
     * Cache the items from this stream.
     *
     * @remarks
     * This method allows for items to be fetched immediatelly and used (possibly multiple times) later.
     * It can also be used to optimize performance as [[DataStream]] would otherwise reevaluate everything upon each iteration.
     *
     * ## Example
     * ```javascript
     * const ds = new DataSet([…])
     *
     * const cachedStream = ds.stream()
     *   .filter(…)
     *   .sort(…)
     *   .map(…)
     *   .cached(…) // Data are fetched, processed and cached here.
     *
     * ds.clear()
     * chachedStream // Still has all the items.
     * ```
     *
     * @returns A new [[DataStream]] with cached items (detached from the original [[DataSet]]).
     */

  }, {
    key: "cache",
    value: function cache() {
      return new DataStream(toConsumableArray(this._pairs));
    }
    /**
     * Get the distinct values of given property.
     *
     * @param callback - The function that picks and possibly converts the property.
     *
     * @typeparam T - The type of the distinct value.
     *
     * @returns A set of all distinct properties.
     */

  }, {
    key: "distinct",
    value: function distinct(callback) {
      var set = new set$3();

      var _iterator6 = _createForOfIteratorHelper$1(this._pairs),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _step6$value = slicedToArray(_step6.value, 2),
              id = _step6$value[0],
              item = _step6$value[1];

          set.add(callback(item, id));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      return set;
    }
    /**
     * Filter the items of the stream.
     *
     * @param callback - The function that decides whether an item will be included.
     *
     * @returns A new data stream with the filtered items.
     */

  }, {
    key: "filter",
    value: function filter(callback) {
      var pairs = this._pairs;
      return new DataStream(defineProperty$7({}, iterator$2, /*#__PURE__*/regenerator.mark(function _callee() {
        var _iterator7, _step7, _step7$value, id, item;

        return regenerator.wrap(function _callee$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _iterator7 = _createForOfIteratorHelper$1(pairs);
                _context7.prev = 1;

                _iterator7.s();

              case 3:
                if ((_step7 = _iterator7.n()).done) {
                  _context7.next = 10;
                  break;
                }

                _step7$value = slicedToArray(_step7.value, 2), id = _step7$value[0], item = _step7$value[1];

                if (!callback(item, id)) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 8;
                return [id, item];

              case 8:
                _context7.next = 3;
                break;

              case 10:
                _context7.next = 15;
                break;

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](1);

                _iterator7.e(_context7.t0);

              case 15:
                _context7.prev = 15;

                _iterator7.f();

                return _context7.finish(15);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee, null, [[1, 12, 15, 18]]);
      })));
    }
    /**
     * Execute a callback for each item of the stream.
     *
     * @param callback - The function that will be invoked for each item.
     */

  }, {
    key: "forEach",
    value: function forEach(callback) {
      var _iterator8 = _createForOfIteratorHelper$1(this._pairs),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _step8$value = slicedToArray(_step8.value, 2),
              id = _step8$value[0],
              item = _step8$value[1];

          callback(item, id);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
    /**
     * Map the items into a different type.
     *
     * @param callback - The function that does the conversion.
     *
     * @typeparam Mapped - The type of the item after mapping.
     *
     * @returns A new data stream with the mapped items.
     */

  }, {
    key: "map",
    value: function map(callback) {
      var pairs = this._pairs;
      return new DataStream(defineProperty$7({}, iterator$2, /*#__PURE__*/regenerator.mark(function _callee2() {
        var _iterator9, _step9, _step9$value, id, item;

        return regenerator.wrap(function _callee2$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _iterator9 = _createForOfIteratorHelper$1(pairs);
                _context8.prev = 1;

                _iterator9.s();

              case 3:
                if ((_step9 = _iterator9.n()).done) {
                  _context8.next = 9;
                  break;
                }

                _step9$value = slicedToArray(_step9.value, 2), id = _step9$value[0], item = _step9$value[1];
                _context8.next = 7;
                return [id, callback(item, id)];

              case 7:
                _context8.next = 3;
                break;

              case 9:
                _context8.next = 14;
                break;

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](1);

                _iterator9.e(_context8.t0);

              case 14:
                _context8.prev = 14;

                _iterator9.f();

                return _context8.finish(14);

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee2, null, [[1, 11, 14, 17]]);
      })));
    }
    /**
     * Get the item with the maximum value of given property.
     *
     * @param callback - The function that picks and possibly converts the property.
     *
     * @returns The item with the maximum if found otherwise null.
     */

  }, {
    key: "max",
    value: function max(callback) {
      var iter = getIterator$1(this._pairs);

      var curr = iter.next();

      if (curr.done) {
        return null;
      }

      var maxItem = curr.value[1];
      var maxValue = callback(curr.value[1], curr.value[0]);

      while (!(curr = iter.next()).done) {
        var _curr$value = slicedToArray(curr.value, 2),
            id = _curr$value[0],
            item = _curr$value[1];

        var _value = callback(item, id);

        if (_value > maxValue) {
          maxValue = _value;
          maxItem = item;
        }
      }

      return maxItem;
    }
    /**
     * Get the item with the minimum value of given property.
     *
     * @param callback - The function that picks and possibly converts the property.
     *
     * @returns The item with the minimum if found otherwise null.
     */

  }, {
    key: "min",
    value: function min(callback) {
      var iter = getIterator$1(this._pairs);

      var curr = iter.next();

      if (curr.done) {
        return null;
      }

      var minItem = curr.value[1];
      var minValue = callback(curr.value[1], curr.value[0]);

      while (!(curr = iter.next()).done) {
        var _curr$value2 = slicedToArray(curr.value, 2),
            id = _curr$value2[0],
            item = _curr$value2[1];

        var _value2 = callback(item, id);

        if (_value2 < minValue) {
          minValue = _value2;
          minItem = item;
        }
      }

      return minItem;
    }
    /**
     * Reduce the items into a single value.
     *
     * @param callback - The function that does the reduction.
     * @param accumulator - The initial value of the accumulator.
     *
     * @typeparam T - The type of the accumulated value.
     *
     * @returns The reduced value.
     */

  }, {
    key: "reduce",
    value: function reduce(callback, accumulator) {
      var _iterator10 = _createForOfIteratorHelper$1(this._pairs),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var _step10$value = slicedToArray(_step10.value, 2),
              id = _step10$value[0],
              item = _step10$value[1];

          accumulator = callback(accumulator, item, id);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      return accumulator;
    }
    /**
     * Sort the items.
     *
     * @param callback - Item comparator.
     *
     * @returns A new stream with sorted items.
     */

  }, {
    key: "sort",
    value: function sort(callback) {
      var _this = this;

      return new DataStream(defineProperty$7({}, iterator$2, function () {
        var _context9;

        return getIterator$1(sort$2(_context9 = toConsumableArray(_this._pairs)).call(_context9, function (_ref, _ref2) {
          var _ref3 = slicedToArray(_ref, 2),
              idA = _ref3[0],
              itemA = _ref3[1];

          var _ref4 = slicedToArray(_ref2, 2),
              idB = _ref4[0],
              itemB = _ref4[1];

          return callback(itemA, itemB, idA, idB);
        }));
      }));
    }
  }]);

  return DataStream;
}();

function ownKeys$4(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context10; forEach$2(_context10 = ownKeys$4(Object(source), true)).call(_context10, function (key) { defineProperty$7(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context11; forEach$2(_context11 = ownKeys$4(Object(source))).call(_context11, function (key) { defineProperty$4(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof symbol$2 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$5(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { var _context9; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = slice$3(_context9 = Object.prototype.toString.call(o)).call(_context9, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Add an id to given item if it doesn't have one already.
 *
 * @remarks
 * The item will be modified.
 *
 * @param item - The item that will have an id after a call to this function.
 * @param idProp - The key of the id property.
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 *
 * @returns true
 */

function ensureFullItem(item, idProp) {
  if (item[idProp] == null) {
    // generate an id
    item[idProp] = v4();
  }

  return item;
}
/**
 * # DataSet
 *
 * Vis.js comes with a flexible DataSet, which can be used to hold and
 * manipulate unstructured data and listen for changes in the data. The DataSet
 * is key/value based. Data items can be added, updated and removed from the
 * DataSet, and one can subscribe to changes in the DataSet. The data in the
 * DataSet can be filtered and ordered. Data can be normalized when appending it
 * to the DataSet as well.
 *
 * ## Example
 *
 * The following example shows how to use a DataSet.
 *
 * ```javascript
 * // create a DataSet
 * var options = {};
 * var data = new vis.DataSet(options);
 *
 * // add items
 * // note that the data items can contain different properties and data formats
 * data.add([
 *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
 *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
 *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
 *   {id: 4, text: 'item 4'}
 * ]);
 *
 * // subscribe to any change in the DataSet
 * data.on('*', function (event, properties, senderId) {
 *   console.log('event', event, properties);
 * });
 *
 * // update an existing item
 * data.update({id: 2, group: 1});
 *
 * // remove an item
 * data.remove(4);
 *
 * // get all ids
 * var ids = data.getIds();
 * console.log('ids', ids);
 *
 * // get a specific item
 * var item1 = data.get(1);
 * console.log('item1', item1);
 *
 * // retrieve a filtered subset of the data
 * var items = data.get({
 *   filter: function (item) {
 *     return item.group == 1;
 *   }
 * });
 * console.log('filtered items', items);
 * ```
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */


var DataSet = /*#__PURE__*/function (_DataSetPart) {
  inherits(DataSet, _DataSetPart);

  var _super = _createSuper(DataSet);

  /**
   * Construct a new DataSet.
   *
   * @param data - Initial data or options.
   * @param options - Options (type error if data is also options).
   */
  function DataSet(data, options) {
    var _this;

    classCallCheck(this, DataSet);

    _this = _super.call(this); // correctly read optional arguments

    if (data && !isArray$5(data)) {
      options = data;
      data = [];
    }

    _this._options = options || {};
    _this._data = new map$5(); // map with data indexed by id

    _this.length = 0; // number of items in the DataSet

    _this._idProp = _this._options.fieldId || "id"; // name of the field containing id
    // add initial data when provided

    if (data && data.length) {
      _this.add(data);
    }

    _this.setOptions(options);

    return _this;
  }
  /**
   * Set new options.
   *
   * @param options - The new options.
   */


  createClass(DataSet, [{
    key: "setOptions",
    value: function setOptions(options) {
      if (options && options.queue !== undefined) {
        if (options.queue === false) {
          // delete queue if loaded
          if (this._queue) {
            this._queue.destroy();

            delete this._queue;
          }
        } else {
          // create queue and update its options
          if (!this._queue) {
            this._queue = Queue.extend(this, {
              replace: ["add", "update", "remove"]
            });
          }

          if (options.queue && _typeof_1(options.queue) === "object") {
            this._queue.setOptions(options.queue);
          }
        }
      }
    }
    /**
     * Add a data item or an array with items.
     *
     * After the items are added to the DataSet, the DataSet will trigger an event `add`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     *
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet()
     *
     * // add items
     * const ids = data.add([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { text: 'item without an id' }
     * ])
     *
     * console.log(ids) // [1, 2, '<UUIDv4>']
     * ```
     *
     * @param data - Items to be added (ids will be generated if missing).
     * @param senderId - Sender id.
     *
     * @returns addedIds - Array with the ids (generated if not present) of the added items.
     *
     * @throws When an item with the same id as any of the added items already exists.
     */

  }, {
    key: "add",
    value: function add(data, senderId) {
      var _this2 = this;

      var addedIds = [];
      var id;

      if (isArray$5(data)) {
        // Array
        var idsToAdd = map$2(data).call(data, function (d) {
          return d[_this2._idProp];
        });

        if (some$2(idsToAdd).call(idsToAdd, function (id) {
          return _this2._data.has(id);
        })) {
          throw new Error("A duplicate id was found in the parameter array.");
        }

        for (var i = 0, len = data.length; i < len; i++) {
          id = this._addItem(data[i]);
          addedIds.push(id);
        }
      } else if (data && _typeof_1(data) === "object") {
        // Single item
        id = this._addItem(data);
        addedIds.push(id);
      } else {
        throw new Error("Unknown dataType");
      }

      if (addedIds.length) {
        this._trigger("add", {
          items: addedIds
        }, senderId);
      }

      return addedIds;
    }
    /**
     * Update existing items. When an item does not exist, it will be created.
     *
     * @remarks
     * The provided properties will be merged in the existing item. When an item does not exist, it will be created.
     *
     * After the items are updated, the DataSet will trigger an event `add` for the added items, and an event `update`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     *
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { id: 3, text: 'item 3' }
     * ])
     *
     * // update items
     * const ids = data.update([
     *   { id: 2, text: 'item 2 (updated)' },
     *   { id: 4, text: 'item 4 (new)' }
     * ])
     *
     * console.log(ids) // [2, 4]
     * ```
     *
     * ## Warning for TypeScript users
     * This method may introduce partial items into the data set. Use add or updateOnly instead for better type safety.
     *
     * @param data - Items to be updated (if the id is already present) or added (if the id is missing).
     * @param senderId - Sender id.
     *
     * @returns updatedIds - The ids of the added (these may be newly generated if there was no id in the item from the data) or updated items.
     *
     * @throws When the supplied data is neither an item nor an array of items.
     */

  }, {
    key: "update",
    value: function update(data, senderId) {
      var _this3 = this;

      var addedIds = [];
      var updatedIds = [];
      var oldData = [];
      var updatedData = [];
      var idProp = this._idProp;

      var addOrUpdate = function addOrUpdate(item) {
        var origId = item[idProp];

        if (origId != null && _this3._data.has(origId)) {
          var fullItem = item; // it has an id, therefore it is a fullitem

          var oldItem = assign$2({}, _this3._data.get(origId)); // update item


          var id = _this3._updateItem(fullItem);

          updatedIds.push(id);
          updatedData.push(fullItem);
          oldData.push(oldItem);
        } else {
          // add new item
          var _id = _this3._addItem(item);

          addedIds.push(_id);
        }
      };

      if (isArray$5(data)) {
        // Array
        for (var i = 0, len = data.length; i < len; i++) {
          if (data[i] && _typeof_1(data[i]) === "object") {
            addOrUpdate(data[i]);
          } else {
            console.warn("Ignoring input item, which is not an object at index " + i);
          }
        }
      } else if (data && _typeof_1(data) === "object") {
        // Single item
        addOrUpdate(data);
      } else {
        throw new Error("Unknown dataType");
      }

      if (addedIds.length) {
        this._trigger("add", {
          items: addedIds
        }, senderId);
      }

      if (updatedIds.length) {
        var props = {
          items: updatedIds,
          oldData: oldData,
          data: updatedData
        }; // TODO: remove deprecated property 'data' some day
        //Object.defineProperty(props, 'data', {
        //  'get': (function() {
        //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
        //    return updatedData;
        //  }).bind(this)
        //});

        this._trigger("update", props, senderId);
      }

      return concat$2(addedIds).call(addedIds, updatedIds);
    }
    /**
     * Update existing items. When an item does not exist, an error will be thrown.
     *
     * @remarks
     * The provided properties will be deeply merged into the existing item.
     * When an item does not exist (id not present in the data set or absent), an error will be thrown and nothing will be changed.
     *
     * After the items are updated, the DataSet will trigger an event `update`.
     * When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     *
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { id: 3, text: 'item 3' },
     * ])
     *
     * // update items
     * const ids = data.update([
     *   { id: 2, text: 'item 2 (updated)' }, // works
     *   // { id: 4, text: 'item 4 (new)' }, // would throw
     *   // { text: 'item 4 (new)' }, // would also throw
     * ])
     *
     * console.log(ids) // [2]
     * ```
     *
     * @param data - Updates (the id and optionally other props) to the items in this data set.
     * @param senderId - Sender id.
     *
     * @returns updatedIds - The ids of the updated items.
     *
     * @throws When the supplied data is neither an item nor an array of items, when the ids are missing.
     */

  }, {
    key: "updateOnly",
    value: function updateOnly(data, senderId) {
      var _context,
          _this4 = this;

      if (!isArray$5(data)) {
        data = [data];
      }

      var updateEventData = map$2(_context = map$2(data).call(data, function (update) {
        var oldData = _this4._data.get(update[_this4._idProp]);

        if (oldData == null) {
          throw new Error("Updating non-existent items is not allowed.");
        }

        return {
          oldData: oldData,
          update: update
        };
      })).call(_context, function (_ref) {
        var oldData = _ref.oldData,
            update = _ref.update;
        var id = oldData[_this4._idProp];
        var updatedData = pureDeepObjectAssign(oldData, update);

        _this4._data.set(id, updatedData);

        return {
          id: id,
          oldData: oldData,
          updatedData: updatedData
        };
      });

      if (updateEventData.length) {
        var props = {
          items: map$2(updateEventData).call(updateEventData, function (value) {
            return value.id;
          }),
          oldData: map$2(updateEventData).call(updateEventData, function (value) {
            return value.oldData;
          }),
          data: map$2(updateEventData).call(updateEventData, function (value) {
            return value.updatedData;
          })
        }; // TODO: remove deprecated property 'data' some day
        //Object.defineProperty(props, 'data', {
        //  'get': (function() {
        //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
        //    return updatedData;
        //  }).bind(this)
        //});

        this._trigger("update", props, senderId);

        return props.items;
      } else {
        return [];
      }
    }
    /** @inheritdoc */

  }, {
    key: "get",
    value: function get(first, second) {
      // @TODO: Woudn't it be better to split this into multiple methods?
      // parse the arguments
      var id = undefined;
      var ids = undefined;
      var options = undefined;

      if (isId(first)) {
        // get(id [, options])
        id = first;
        options = second;
      } else if (isArray$5(first)) {
        // get(ids [, options])
        ids = first;
        options = second;
      } else {
        // get([, options])
        options = first;
      } // determine the return type


      var returnType = options && options.returnType === "Object" ? "Object" : "Array"; // @TODO: WTF is this? Or am I missing something?
      // var returnType
      // if (options && options.returnType) {
      //   var allowedValues = ['Array', 'Object']
      //   returnType =
      //     allowedValues.indexOf(options.returnType) == -1
      //       ? 'Array'
      //       : options.returnType
      // } else {
      //   returnType = 'Array'
      // }
      // build options

      var filter = options && filter$2(options);

      var items = [];
      var item = undefined;
      var itemIds = undefined;
      var itemId = undefined; // convert items

      if (id != null) {
        // return a single item
        item = this._data.get(id);

        if (item && filter && !filter(item)) {
          item = undefined;
        }
      } else if (ids != null) {
        // return a subset of items
        for (var i = 0, len = ids.length; i < len; i++) {
          item = this._data.get(ids[i]);

          if (item != null && (!filter || filter(item))) {
            items.push(item);
          }
        }
      } else {
        var _context2;

        // return all items
        itemIds = toConsumableArray(keys$6(_context2 = this._data).call(_context2));

        for (var _i = 0, _len = itemIds.length; _i < _len; _i++) {
          itemId = itemIds[_i];
          item = this._data.get(itemId);

          if (item != null && (!filter || filter(item))) {
            items.push(item);
          }
        }
      } // order the results


      if (options && options.order && id == undefined) {
        this._sort(items, options.order);
      } // filter fields of the items


      if (options && options.fields) {
        var fields = options.fields;

        if (id != undefined && item != null) {
          item = this._filterFields(item, fields);
        } else {
          for (var _i2 = 0, _len2 = items.length; _i2 < _len2; _i2++) {
            items[_i2] = this._filterFields(items[_i2], fields);
          }
        }
      } // return the results


      if (returnType == "Object") {
        var result = {};

        for (var _i3 = 0, _len3 = items.length; _i3 < _len3; _i3++) {
          var resultant = items[_i3]; // @TODO: Shoudn't this be this._fieldId?
          // result[resultant.id] = resultant

          var _id2 = resultant[this._idProp];
          result[_id2] = resultant;
        }

        return result;
      } else {
        if (id != null) {
          // a single item
          return item !== null && item !== void 0 ? item : null;
        } else {
          // just return our array
          return items;
        }
      }
    }
    /** @inheritdoc */

  }, {
    key: "getIds",
    value: function getIds(options) {
      var data = this._data;

      var filter = options && filter$2(options);

      var order = options && options.order;

      var itemIds = toConsumableArray(keys$6(data).call(data));

      var ids = [];

      if (filter) {
        // get filtered items
        if (order) {
          // create ordered list
          var items = [];

          for (var i = 0, len = itemIds.length; i < len; i++) {
            var id = itemIds[i];

            var item = this._data.get(id);

            if (item != null && filter(item)) {
              items.push(item);
            }
          }

          this._sort(items, order);

          for (var _i4 = 0, _len4 = items.length; _i4 < _len4; _i4++) {
            ids.push(items[_i4][this._idProp]);
          }
        } else {
          // create unordered list
          for (var _i5 = 0, _len5 = itemIds.length; _i5 < _len5; _i5++) {
            var _id3 = itemIds[_i5];

            var _item = this._data.get(_id3);

            if (_item != null && filter(_item)) {
              ids.push(_item[this._idProp]);
            }
          }
        }
      } else {
        // get all items
        if (order) {
          // create an ordered list
          var _items = [];

          for (var _i6 = 0, _len6 = itemIds.length; _i6 < _len6; _i6++) {
            var _id4 = itemIds[_i6];

            _items.push(data.get(_id4));
          }

          this._sort(_items, order);

          for (var _i7 = 0, _len7 = _items.length; _i7 < _len7; _i7++) {
            ids.push(_items[_i7][this._idProp]);
          }
        } else {
          // create unordered list
          for (var _i8 = 0, _len8 = itemIds.length; _i8 < _len8; _i8++) {
            var _id5 = itemIds[_i8];

            var _item2 = data.get(_id5);

            if (_item2 != null) {
              ids.push(_item2[this._idProp]);
            }
          }
        }
      }

      return ids;
    }
    /** @inheritdoc */

  }, {
    key: "getDataSet",
    value: function getDataSet() {
      return this;
    }
    /** @inheritdoc */

  }, {
    key: "forEach",
    value: function forEach(callback, options) {
      var filter = options && filter$2(options);

      var data = this._data;

      var itemIds = toConsumableArray(keys$6(data).call(data));

      if (options && options.order) {
        // execute forEach on ordered list
        var items = this.get(options);

        for (var i = 0, len = items.length; i < len; i++) {
          var item = items[i];
          var id = item[this._idProp];
          callback(item, id);
        }
      } else {
        // unordered
        for (var _i9 = 0, _len9 = itemIds.length; _i9 < _len9; _i9++) {
          var _id6 = itemIds[_i9];

          var _item3 = this._data.get(_id6);

          if (_item3 != null && (!filter || filter(_item3))) {
            callback(_item3, _id6);
          }
        }
      }
    }
    /** @inheritdoc */

  }, {
    key: "map",
    value: function map(callback, options) {
      var filter = options && filter$2(options);

      var mappedItems = [];
      var data = this._data;

      var itemIds = toConsumableArray(keys$6(data).call(data)); // convert and filter items


      for (var i = 0, len = itemIds.length; i < len; i++) {
        var id = itemIds[i];

        var item = this._data.get(id);

        if (item != null && (!filter || filter(item))) {
          mappedItems.push(callback(item, id));
        }
      } // order items


      if (options && options.order) {
        this._sort(mappedItems, options.order);
      }

      return mappedItems;
    }
    /**
     * Filter the fields of an item.
     *
     * @param item - The item whose fields should be filtered.
     * @param fields - The names of the fields that will be kept.
     *
     * @typeParam K - Field name type.
     *
     * @returns The item without any additional fields.
     */

  }, {
    key: "_filterFields",
    value: function _filterFields(item, fields) {
      var _context3;

      if (!item) {
        // item is null
        return item;
      }

      return reduce$2(_context3 = isArray$5(fields) ? // Use the supplied array
      fields : // Use the keys of the supplied object
      keys$3(fields)).call(_context3, function (filteredItem, field) {
        filteredItem[field] = item[field];
        return filteredItem;
      }, {});
    }
    /**
     * Sort the provided array with items.
     *
     * @param items - Items to be sorted in place.
     * @param order - A field name or custom sort function.
     *
     * @typeParam T - The type of the items in the items array.
     */

  }, {
    key: "_sort",
    value: function _sort(items, order) {
      if (typeof order === "string") {
        // order by provided field name
        var name = order; // field name

        sort$2(items).call(items, function (a, b) {
          // @TODO: How to treat missing properties?
          var av = a[name];
          var bv = b[name];
          return av > bv ? 1 : av < bv ? -1 : 0;
        });
      } else if (typeof order === "function") {
        // order by sort function
        sort$2(items).call(items, order);
      } else {
        // TODO: extend order by an Object {field:string, direction:string}
        //       where direction can be 'asc' or 'desc'
        throw new TypeError("Order must be a function or a string");
      }
    }
    /**
     * Remove an item or multiple items by “reference” (only the id is used) or by id.
     *
     * The method ignores removal of non-existing items, and returns an array containing the ids of the items which are actually removed from the DataSet.
     *
     * After the items are removed, the DataSet will trigger an event `remove` for the removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { id: 3, text: 'item 3' }
     * ])
     *
     * // remove items
     * const ids = data.remove([2, { id: 3 }, 4])
     *
     * console.log(ids) // [2, 3]
     * ```
     *
     * @param id - One or more items or ids of items to be removed.
     * @param senderId - Sender id.
     *
     * @returns The ids of the removed items.
     */

  }, {
    key: "remove",
    value: function remove(id, senderId) {
      var removedIds = [];
      var removedItems = []; // force everything to be an array for simplicity

      var ids = isArray$5(id) ? id : [id];

      for (var i = 0, len = ids.length; i < len; i++) {
        var item = this._remove(ids[i]);

        if (item) {
          var itemId = item[this._idProp];

          if (itemId != null) {
            removedIds.push(itemId);
            removedItems.push(item);
          }
        }
      }

      if (removedIds.length) {
        this._trigger("remove", {
          items: removedIds,
          oldData: removedItems
        }, senderId);
      }

      return removedIds;
    }
    /**
     * Remove an item by its id or reference.
     *
     * @param id - Id of an item or the item itself.
     *
     * @returns The removed item if removed, null otherwise.
     */

  }, {
    key: "_remove",
    value: function _remove(id) {
      // @TODO: It origianlly returned the item although the docs say id.
      // The code expects the item, so probably an error in the docs.
      var ident; // confirm the id to use based on the args type

      if (isId(id)) {
        ident = id;
      } else if (id && _typeof_1(id) === "object") {
        ident = id[this._idProp]; // look for the identifier field using ._idProp
      } // do the removing if the item is found


      if (ident != null && this._data.has(ident)) {
        var item = this._data.get(ident) || null;

        this._data.delete(ident);

        --this.length;
        return item;
      }

      return null;
    }
    /**
     * Clear the entire data set.
     *
     * After the items are removed, the [[DataSet]] will trigger an event `remove` for all removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * @param senderId - Sender id.
     *
     * @returns removedIds - The ids of all removed items.
     */

  }, {
    key: "clear",
    value: function clear(senderId) {
      var _context4;

      var ids = toConsumableArray(keys$6(_context4 = this._data).call(_context4));

      var items = [];

      for (var i = 0, len = ids.length; i < len; i++) {
        items.push(this._data.get(ids[i]));
      }

      this._data.clear();

      this.length = 0;

      this._trigger("remove", {
        items: ids,
        oldData: items
      }, senderId);

      return ids;
    }
    /**
     * Find the item with maximum value of a specified field.
     *
     * @param field - Name of the property that should be searched for max value.
     *
     * @returns Item containing max value, or null if no items.
     */

  }, {
    key: "max",
    value: function max(field) {
      var _context5;

      var max = null;
      var maxField = null;

      var _iterator = _createForOfIteratorHelper$2(values$2(_context5 = this._data).call(_context5)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          var itemField = item[field];

          if (typeof itemField === "number" && (maxField == null || itemField > maxField)) {
            max = item;
            maxField = itemField;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return max || null;
    }
    /**
     * Find the item with minimum value of a specified field.
     *
     * @param field - Name of the property that should be searched for min value.
     *
     * @returns Item containing min value, or null if no items.
     */

  }, {
    key: "min",
    value: function min(field) {
      var _context6;

      var min = null;
      var minField = null;

      var _iterator2 = _createForOfIteratorHelper$2(values$2(_context6 = this._data).call(_context6)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          var itemField = item[field];

          if (typeof itemField === "number" && (minField == null || itemField < minField)) {
            min = item;
            minField = itemField;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return min || null;
    }
    /**
     * Find all distinct values of a specified field
     *
     * @param prop - The property name whose distinct values should be returned.
     *
     * @returns Unordered array containing all distinct values. Items without specified property are ignored.
     */

  }, {
    key: "distinct",
    value: function distinct(prop) {
      var data = this._data;

      var itemIds = toConsumableArray(keys$6(data).call(data));

      var values = [];
      var count = 0;

      for (var i = 0, len = itemIds.length; i < len; i++) {
        var id = itemIds[i];
        var item = data.get(id);
        var value = item[prop];
        var exists = false;

        for (var j = 0; j < count; j++) {
          if (values[j] == value) {
            exists = true;
            break;
          }
        }

        if (!exists && value !== undefined) {
          values[count] = value;
          count++;
        }
      }

      return values;
    }
    /**
     * Add a single item. Will fail when an item with the same id already exists.
     *
     * @param item - A new item to be added.
     *
     * @returns Added item's id. An id is generated when it is not present in the item.
     */

  }, {
    key: "_addItem",
    value: function _addItem(item) {
      var fullItem = ensureFullItem(item, this._idProp);
      var id = fullItem[this._idProp]; // check whether this id is already taken

      if (this._data.has(id)) {
        // item already exists
        throw new Error("Cannot add item: item with id " + id + " already exists");
      }

      this._data.set(id, fullItem);

      ++this.length;
      return id;
    }
    /**
     * Update a single item: merge with existing item.
     * Will fail when the item has no id, or when there does not exist an item with the same id.
     *
     * @param update - The new item
     *
     * @returns The id of the updated item.
     */

  }, {
    key: "_updateItem",
    value: function _updateItem(update) {
      var id = update[this._idProp];

      if (id == null) {
        throw new Error("Cannot update item: item has no id (item: " + stringify$2(update) + ")");
      }

      var item = this._data.get(id);

      if (!item) {
        // item doesn't exist
        throw new Error("Cannot update item: no item with id " + id + " found");
      }

      this._data.set(id, _objectSpread(_objectSpread({}, item), update));

      return id;
    }
    /** @inheritdoc */

  }, {
    key: "stream",
    value: function stream(ids) {
      if (ids) {
        var data = this._data;
        return new DataStream(defineProperty$7({}, iterator$2, /*#__PURE__*/regenerator.mark(function _callee() {
          var _iterator3, _step3, id, item;

          return regenerator.wrap(function _callee$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _iterator3 = _createForOfIteratorHelper$2(ids);
                  _context7.prev = 1;

                  _iterator3.s();

                case 3:
                  if ((_step3 = _iterator3.n()).done) {
                    _context7.next = 11;
                    break;
                  }

                  id = _step3.value;
                  item = data.get(id);

                  if (!(item != null)) {
                    _context7.next = 9;
                    break;
                  }

                  _context7.next = 9;
                  return [id, item];

                case 9:
                  _context7.next = 3;
                  break;

                case 11:
                  _context7.next = 16;
                  break;

                case 13:
                  _context7.prev = 13;
                  _context7.t0 = _context7["catch"](1);

                  _iterator3.e(_context7.t0);

                case 16:
                  _context7.prev = 16;

                  _iterator3.f();

                  return _context7.finish(16);

                case 19:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee, null, [[1, 13, 16, 19]]);
        })));
      } else {
        var _context8;

        return new DataStream(defineProperty$7({}, iterator$2, bind$2(_context8 = entries$2(this._data)).call(_context8, this._data)));
      }
    }
  }]);

  return DataSet;
}(DataSetPart);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * DataView
 *
 * A DataView offers a filtered and/or formatted view on a DataSet. One can subscribe to changes in a DataView, and easily get filtered or formatted data without having to specify filters and field types all the time.
 *
 * ## Example
 * ```javascript
 * // create a DataSet
 * var data = new vis.DataSet();
 * data.add([
 *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
 *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
 *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
 *   {id: 4, text: 'item 4'}
 * ]);
 *
 * // create a DataView
 * // the view will only contain items having a property group with value 1,
 * // and will only output fields id, text, and date.
 * var view = new vis.DataView(data, {
 *   filter: function (item) {
 *     return (item.group == 1);
 *   },
 *   fields: ['id', 'text', 'date']
 * });
 *
 * // subscribe to any change in the DataView
 * view.on('*', function (event, properties, senderId) {
 *   console.log('event', event, properties);
 * });
 *
 * // update an item in the data set
 * data.update({id: 2, group: 1});
 *
 * // get all ids in the view
 * var ids = view.getIds();
 * console.log('ids', ids); // will output [1, 2]
 *
 * // get all items in the view
 * var items = view.get();
 * ```
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */

var DataView = /*#__PURE__*/function (_DataSetPart) {
  inherits(DataView, _DataSetPart);

  var _super = _createSuper$1(DataView);

  /**
   * Create a DataView.
   *
   * @param data - The instance containing data (directly or indirectly).
   * @param options - Options to configure this data view.
   */
  function DataView(data, options) {
    var _context;

    var _this;

    classCallCheck(this, DataView);

    _this = _super.call(this);
    /** @inheritdoc */

    _this.length = 0;
    _this._ids = new set$3(); // ids of the items currently in memory (just contains a boolean true)

    _this._options = options || {};
    _this._listener = bind$2(_context = _this._onEvent).call(_context, assertThisInitialized(_this));

    _this.setData(data);

    return _this;
  } // TODO: implement a function .config() to dynamically update things like configured filter
  // and trigger changes accordingly

  /**
   * Set a data source for the view.
   *
   * @param data - The instance containing data (directly or indirectly).
   *
   * @remarks
   * Note that when the data view is bound to a data set it won't be garbage
   * collected unless the data set is too. Use `dataView.setData(null)` or
   * `dataView.dispose()` to enable garbage collection before you lose the last
   * reference.
   */


  createClass(DataView, [{
    key: "setData",
    value: function setData(data) {
      if (this._data) {
        // unsubscribe from current dataset
        if (this._data.off) {
          this._data.off("*", this._listener);
        } // trigger a remove of all items in memory


        var ids = this._data.getIds({
          filter: filter$2(this._options)
        });

        var items = this._data.get(ids);

        this._ids.clear();

        this.length = 0;

        this._trigger("remove", {
          items: ids,
          oldData: items
        });
      }

      if (data != null) {
        this._data = data; // trigger an add of all added items

        var _ids = this._data.getIds({
          filter: filter$2(this._options)
        });

        for (var i = 0, len = _ids.length; i < len; i++) {
          var id = _ids[i];

          this._ids.add(id);
        }

        this.length = _ids.length;

        this._trigger("add", {
          items: _ids
        });
      } else {
        this._data = new DataSet();
      } // subscribe to new dataset


      if (this._data.on) {
        this._data.on("*", this._listener);
      }
    }
    /**
     * Refresh the DataView.
     * Useful when the DataView has a filter function containing a variable parameter.
     */

  }, {
    key: "refresh",
    value: function refresh() {
      var ids = this._data.getIds({
        filter: filter$2(this._options)
      });

      var oldIds = toConsumableArray(this._ids);

      var newIds = {};
      var addedIds = [];
      var removedIds = [];
      var removedItems = []; // check for additions

      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i];
        newIds[id] = true;

        if (!this._ids.has(id)) {
          addedIds.push(id);

          this._ids.add(id);
        }
      } // check for removals


      for (var _i = 0, _len = oldIds.length; _i < _len; _i++) {
        var _id = oldIds[_i];

        var item = this._data.get(_id);

        if (item == null) {
          // @TODO: Investigate.
          // Doesn't happen during tests or examples.
          // Is it really impossible or could it eventually happen?
          // How to handle it if it does? The types guarantee non-nullable items.
          console.error("If you see this, report it please.");
        } else if (!newIds[_id]) {
          removedIds.push(_id);
          removedItems.push(item);

          this._ids.delete(_id);
        }
      }

      this.length += addedIds.length - removedIds.length; // trigger events

      if (addedIds.length) {
        this._trigger("add", {
          items: addedIds
        });
      }

      if (removedIds.length) {
        this._trigger("remove", {
          items: removedIds,
          oldData: removedItems
        });
      }
    }
    /** @inheritdoc */

  }, {
    key: "get",
    value: function get(first, second) {
      if (this._data == null) {
        return null;
      } // parse the arguments


      var ids = null;
      var options;

      if (isId(first) || isArray$5(first)) {
        ids = first;
        options = second;
      } else {
        options = first;
      } // extend the options with the default options and provided options


      var viewOptions = assign$2({}, this._options, options); // create a combined filter method when needed


      var thisFilter = filter$2(this._options);

      var optionsFilter = options && filter$2(options);

      if (thisFilter && optionsFilter) {
        viewOptions.filter = function (item) {
          return thisFilter(item) && optionsFilter(item);
        };
      }

      if (ids == null) {
        return this._data.get(viewOptions);
      } else {
        return this._data.get(ids, viewOptions);
      }
    }
    /** @inheritdoc */

  }, {
    key: "getIds",
    value: function getIds(options) {
      if (this._data.length) {
        var defaultFilter = filter$2(this._options);

        var optionsFilter = options != null ? filter$2(options) : null;
        var filter;

        if (optionsFilter) {
          if (defaultFilter) {
            filter = function filter(item) {
              return defaultFilter(item) && optionsFilter(item);
            };
          } else {
            filter = optionsFilter;
          }
        } else {
          filter = defaultFilter;
        }

        return this._data.getIds({
          filter: filter,
          order: options && options.order
        });
      } else {
        return [];
      }
    }
    /** @inheritdoc */

  }, {
    key: "forEach",
    value: function forEach(callback, options) {
      if (this._data) {
        var _context2;

        var defaultFilter = filter$2(this._options);

        var optionsFilter = options && filter$2(options);

        var filter;

        if (optionsFilter) {
          if (defaultFilter) {
            filter = function filter(item) {
              return defaultFilter(item) && optionsFilter(item);
            };
          } else {
            filter = optionsFilter;
          }
        } else {
          filter = defaultFilter;
        }

        forEach$2(_context2 = this._data).call(_context2, callback, {
          filter: filter,
          order: options && options.order
        });
      }
    }
    /** @inheritdoc */

  }, {
    key: "map",
    value: function map(callback, options) {
      if (this._data) {
        var _context3;

        var defaultFilter = filter$2(this._options);

        var optionsFilter = options && filter$2(options);

        var filter;

        if (optionsFilter) {
          if (defaultFilter) {
            filter = function filter(item) {
              return defaultFilter(item) && optionsFilter(item);
            };
          } else {
            filter = optionsFilter;
          }
        } else {
          filter = defaultFilter;
        }

        return map$2(_context3 = this._data).call(_context3, callback, {
          filter: filter,
          order: options && options.order
        });
      } else {
        return [];
      }
    }
    /** @inheritdoc */

  }, {
    key: "getDataSet",
    value: function getDataSet() {
      return this._data.getDataSet();
    }
    /** @inheritdoc */

  }, {
    key: "stream",
    value: function stream(ids) {
      var _context4;

      return this._data.stream(ids || defineProperty$7({}, iterator$2, bind$2(_context4 = keys$6(this._ids)).call(_context4, this._ids)));
    }
    /**
     * Render the instance unusable prior to garbage collection.
     *
     * @remarks
     * The intention of this method is to help discover scenarios where the data
     * view is being used when the programmer thinks it has been garbage collected
     * already. It's stricter version of `dataView.setData(null)`.
     */

  }, {
    key: "dispose",
    value: function dispose() {
      var _a;

      if ((_a = this._data) === null || _a === void 0 ? void 0 : _a.off) {
        this._data.off("*", this._listener);
      }

      var message = "This data view has already been disposed of.";

      defineProperty$4(this, "_data", {
        get: function get() {
          throw new Error(message);
        },
        set: function set() {
          throw new Error(message);
        },
        configurable: false
      });
    }
    /**
     * Event listener. Will propagate all events from the connected data set to the subscribers of the DataView, but will filter the items and only trigger when there are changes in the filtered data set.
     *
     * @param event - The name of the event.
     * @param params - Parameters of the event.
     * @param senderId - Id supplied by the sender.
     */

  }, {
    key: "_onEvent",
    value: function _onEvent(event, params, senderId) {
      if (!params || !params.items || !this._data) {
        return;
      }

      var ids = params.items;
      var addedIds = [];
      var updatedIds = [];
      var removedIds = [];
      var oldItems = [];
      var updatedItems = [];
      var removedItems = [];

      switch (event) {
        case "add":
          // filter the ids of the added items
          for (var i = 0, len = ids.length; i < len; i++) {
            var id = ids[i];
            var item = this.get(id);

            if (item) {
              this._ids.add(id);

              addedIds.push(id);
            }
          }

          break;

        case "update":
          // determine the event from the views viewpoint: an updated
          // item can be added, updated, or removed from this view.
          for (var _i2 = 0, _len2 = ids.length; _i2 < _len2; _i2++) {
            var _id2 = ids[_i2];

            var _item = this.get(_id2);

            if (_item) {
              if (this._ids.has(_id2)) {
                updatedIds.push(_id2);
                updatedItems.push(params.data[_i2]);
                oldItems.push(params.oldData[_i2]);
              } else {
                this._ids.add(_id2);

                addedIds.push(_id2);
              }
            } else {
              if (this._ids.has(_id2)) {
                this._ids.delete(_id2);

                removedIds.push(_id2);
                removedItems.push(params.oldData[_i2]);
              }
            }
          }

          break;

        case "remove":
          // filter the ids of the removed items
          for (var _i3 = 0, _len3 = ids.length; _i3 < _len3; _i3++) {
            var _id3 = ids[_i3];

            if (this._ids.has(_id3)) {
              this._ids.delete(_id3);

              removedIds.push(_id3);
              removedItems.push(params.oldData[_i3]);
            }
          }

          break;
      }

      this.length += addedIds.length - removedIds.length;

      if (addedIds.length) {
        this._trigger("add", {
          items: addedIds
        }, senderId);
      }

      if (updatedIds.length) {
        this._trigger("update", {
          items: updatedIds,
          oldData: oldItems,
          data: updatedItems
        }, senderId);
      }

      if (removedIds.length) {
        this._trigger("remove", {
          items: removedIds,
          oldData: removedItems
        }, senderId);
      }
    }
  }]);

  return DataView;
}(DataSetPart);

export { DELETE, DataSet, DataStream, DataView, Queue, createNewDataPipeFrom };
//# sourceMappingURL=vis-data.js.map
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"2":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({}[chunkId]||chunkId) + "." + chunkId + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				var onLinkComplete = function (event) {
/******/ 					// avoid mem leaks.
/******/ 					linkTag.onerror = linkTag.onload = null;
/******/ 					if (event.type === 'load') {
/******/ 						resolve();
/******/ 					} else {
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realHref = event && event.target && event.target.href || fullhref;
/******/ 						var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 						err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 						err.type = errorType;
/******/ 						err.request = realHref;
/******/ 						delete installedCssChunks[chunkId]
/******/ 						linkTag.parentNode.removeChild(linkTag)
/******/ 						reject(err);
/******/ 					}
/******/ 				};
/******/ 				linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				document.head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./node_modules/dlv/dist/dlv.umd.js":
/*!******************************************!*\
  !*** ./node_modules/dlv/dist/dlv.umd.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=function(t,n,e,i,o){for(n=n.split?n.split("."):n,i=0;i<n.length;i++)t=t?t[n[i]]:o;return t===o?e:t}:undefined}(this);
//# sourceMappingURL=dlv.umd.js.map


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/fast-memoize/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/fast-memoize/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//
// Main
//

function memoize (fn, options) {
  var cache = options && options.cache
    ? options.cache
    : cacheDefault

  var serializer = options && options.serializer
    ? options.serializer
    : serializerDefault

  var strategy = options && options.strategy
    ? options.strategy
    : strategyDefault

  return strategy(fn, {
    cache: cache,
    serializer: serializer
  })
}

//
// Strategy
//

function isPrimitive (value) {
  return value == null || typeof value === 'number' || typeof value === 'boolean' // || typeof value === "string" 'unsafe' primitive for our needs
}

function monadic (fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg)

  var computedValue = cache.get(cacheKey)
  if (typeof computedValue === 'undefined') {
    computedValue = fn.call(this, arg)
    cache.set(cacheKey, computedValue)
  }

  return computedValue
}

function variadic (fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3)
  var cacheKey = serializer(args)

  var computedValue = cache.get(cacheKey)
  if (typeof computedValue === 'undefined') {
    computedValue = fn.apply(this, args)
    cache.set(cacheKey, computedValue)
  }

  return computedValue
}

function assemble (fn, context, strategy, cache, serialize) {
  return strategy.bind(
    context,
    fn,
    cache,
    serialize
  )
}

function strategyDefault (fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyVariadic (fn, options) {
  var strategy = variadic

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyMonadic (fn, options) {
  var strategy = monadic

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

//
// Serializer
//

function serializerDefault () {
  return JSON.stringify(arguments)
}

//
// Cache
//

function ObjectWithoutPrototypeCache () {
  this.cache = Object.create(null)
}

ObjectWithoutPrototypeCache.prototype.has = function (key) {
  return (key in this.cache)
}

ObjectWithoutPrototypeCache.prototype.get = function (key) {
  return this.cache[key]
}

ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
  this.cache[key] = value
}

var cacheDefault = {
  create: function create () {
    return new ObjectWithoutPrototypeCache()
  }
}

//
// API
//

module.exports = memoize
module.exports.strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
}


/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
var alphaIndex = {};
var numIndex = {};
(function () {
    var i = 0;
    var length = HTML_ALPHA.length;
    while (i < length) {
        var a = HTML_ALPHA[i];
        var c = HTML_CODES[i];
        alphaIndex[a] = String.fromCharCode(c);
        numIndex[c] = a;
        i++;
    }
})();
var Html4Entities = /** @class */ (function () {
    function Html4Entities() {
    }
    Html4Entities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
                var code = entity.charAt(1).toLowerCase() === 'x' ?
                    parseInt(entity.substr(2), 16) :
                    parseInt(entity.substr(1));
                if (!(isNaN(code) || code < -32768 || code > 65535)) {
                    chr = String.fromCharCode(code);
                }
            }
            else {
                chr = alphaIndex[entity];
            }
            return chr || s;
        });
    };
    Html4Entities.decode = function (str) {
        return new Html4Entities().decode(str);
    };
    Html4Entities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var alpha = numIndex[str.charCodeAt(i)];
            result += alpha ? "&" + alpha + ";" : str.charAt(i);
            i++;
        }
        return result;
    };
    Html4Entities.encode = function (str) {
        return new Html4Entities().encode(str);
    };
    Html4Entities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var cc = str.charCodeAt(i);
            var alpha = numIndex[cc];
            if (alpha) {
                result += "&" + alpha + ";";
            }
            else if (cc < 32 || cc > 126) {
                result += "&#" + cc + ";";
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    Html4Entities.encodeNonUTF = function (str) {
        return new Html4Entities().encodeNonUTF(str);
    };
    Html4Entities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    Html4Entities.encodeNonASCII = function (str) {
        return new Html4Entities().encodeNonASCII(str);
    };
    return Html4Entities;
}());
exports.Html4Entities = Html4Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
var alphaIndex = {};
var charIndex = {};
createIndexes(alphaIndex, charIndex);
var Html5Entities = /** @class */ (function () {
    function Html5Entities() {
    }
    Html5Entities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
                var code = entity.charAt(1) === 'x' ?
                    parseInt(entity.substr(2).toLowerCase(), 16) :
                    parseInt(entity.substr(1));
                if (!(isNaN(code) || code < -32768 || code > 65535)) {
                    chr = String.fromCharCode(code);
                }
            }
            else {
                chr = alphaIndex[entity];
            }
            return chr || s;
        });
    };
    Html5Entities.decode = function (str) {
        return new Html5Entities().decode(str);
    };
    Html5Entities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var charInfo = charIndex[str.charCodeAt(i)];
            if (charInfo) {
                var alpha = charInfo[str.charCodeAt(i + 1)];
                if (alpha) {
                    i++;
                }
                else {
                    alpha = charInfo[''];
                }
                if (alpha) {
                    result += "&" + alpha + ";";
                    i++;
                    continue;
                }
            }
            result += str.charAt(i);
            i++;
        }
        return result;
    };
    Html5Entities.encode = function (str) {
        return new Html5Entities().encode(str);
    };
    Html5Entities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            var charInfo = charIndex[c];
            if (charInfo) {
                var alpha = charInfo[str.charCodeAt(i + 1)];
                if (alpha) {
                    i++;
                }
                else {
                    alpha = charInfo[''];
                }
                if (alpha) {
                    result += "&" + alpha + ";";
                    i++;
                    continue;
                }
            }
            if (c < 32 || c > 126) {
                result += '&#' + c + ';';
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    Html5Entities.encodeNonUTF = function (str) {
        return new Html5Entities().encodeNonUTF(str);
    };
    Html5Entities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    Html5Entities.encodeNonASCII = function (str) {
        return new Html5Entities().encodeNonASCII(str);
    };
    return Html5Entities;
}());
exports.Html5Entities = Html5Entities;
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo = void 0;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            addChar && (charInfo[chr2] = alpha);
        }
        else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            addChar && (charInfo[''] = alpha);
        }
    }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xml_entities_1 = __webpack_require__(/*! ./xml-entities */ "./node_modules/html-entities/lib/xml-entities.js");
exports.XmlEntities = xml_entities_1.XmlEntities;
var html4_entities_1 = __webpack_require__(/*! ./html4-entities */ "./node_modules/html-entities/lib/html4-entities.js");
exports.Html4Entities = html4_entities_1.Html4Entities;
var html5_entities_1 = __webpack_require__(/*! ./html5-entities */ "./node_modules/html-entities/lib/html5-entities.js");
exports.Html5Entities = html5_entities_1.Html5Entities;
exports.AllHtmlEntities = html5_entities_1.Html5Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};
var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};
var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};
var XmlEntities = /** @class */ (function () {
    function XmlEntities() {
    }
    XmlEntities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/[<>"'&]/g, function (s) {
            return CHAR_S_INDEX[s];
        });
    };
    XmlEntities.encode = function (str) {
        return new XmlEntities().encode(str);
    };
    XmlEntities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
            if (s.charAt(1) === '#') {
                var code = s.charAt(2).toLowerCase() === 'x' ?
                    parseInt(s.substr(3), 16) :
                    parseInt(s.substr(2));
                if (isNaN(code) || code < -32768 || code > 65535) {
                    return '';
                }
                return String.fromCharCode(code);
            }
            return ALPHA_INDEX[s] || s;
        });
    };
    XmlEntities.decode = function (str) {
        return new XmlEntities().decode(str);
    };
    XmlEntities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            var alpha = CHAR_INDEX[c];
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
            if (c < 32 || c > 126) {
                result += '&#' + c + ';';
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    XmlEntities.encodeNonUTF = function (str) {
        return new XmlEntities().encodeNonUTF(str);
    };
    XmlEntities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLenght = str.length;
        var result = '';
        var i = 0;
        while (i < strLenght) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    XmlEntities.encodeNonASCII = function (str) {
        return new XmlEntities().encodeNonASCII(str);
    };
    return XmlEntities;
}());
exports.XmlEntities = XmlEntities;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/lib/index.js ***!
  \*************************************************************/
/*! exports provided: TYPE, SKELETON_TYPE, isLiteralElement, isArgumentElement, isNumberElement, isDateElement, isTimeElement, isSelectElement, isPluralElement, isPoundElement, isTagElement, isNumberSkeleton, isDateTimeSkeleton, createLiteralElement, createNumberElement, SyntaxError, pegParse, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/intl-messageformat-parser/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _src_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/parser */ "./node_modules/intl-messageformat-parser/lib/src/parser.js");
/* harmony import */ var _src_normalize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/normalize */ "./node_modules/intl-messageformat-parser/lib/src/normalize.js");
/* harmony import */ var _src_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/types */ "./node_modules/intl-messageformat-parser/lib/src/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TYPE", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SKELETON_TYPE", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["SKELETON_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isLiteralElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isLiteralElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArgumentElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isArgumentElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumberElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isNumberElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDateElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isDateElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTimeElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isTimeElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSelectElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isSelectElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPluralElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isPluralElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPoundElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isPoundElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTagElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isTagElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumberSkeleton", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isNumberSkeleton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDateTimeSkeleton", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["isDateTimeSkeleton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLiteralElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["createLiteralElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createNumberElement", function() { return _src_types__WEBPACK_IMPORTED_MODULE_3__["createNumberElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SyntaxError", function() { return _src_parser__WEBPACK_IMPORTED_MODULE_1__["SyntaxError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pegParse", function() { return _src_parser__WEBPACK_IMPORTED_MODULE_1__["pegParse"]; });






function parse(input, opts) {
    opts = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ normalizeHashtagInPlural: true, shouldParseSkeleton: true }, (opts || {}));
    var els = Object(_src_parser__WEBPACK_IMPORTED_MODULE_1__["pegParse"])(input, opts);
    if (opts.normalizeHashtagInPlural) {
        Object(_src_normalize__WEBPACK_IMPORTED_MODULE_2__["normalizeHashtagInPlural"])(els);
    }
    return els;
}


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/lib/src/normalize.js":
/*!*********************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/lib/src/normalize.js ***!
  \*********************************************************************/
/*! exports provided: normalizeHashtagInPlural */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeHashtagInPlural", function() { return normalizeHashtagInPlural; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/intl-messageformat-parser/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./node_modules/intl-messageformat-parser/lib/src/types.js");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser */ "./node_modules/intl-messageformat-parser/lib/src/parser.js");



var PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g;
/**
 * Whether to convert `#` in plural rule options
 * to `{var, number}`
 * @param el AST Element
 * @param pluralStack current plural stack
 */
function normalizeHashtagInPlural(els) {
    els.forEach(function (el) {
        // If we're encountering a plural el
        if (!Object(_types__WEBPACK_IMPORTED_MODULE_1__["isPluralElement"])(el) && !Object(_types__WEBPACK_IMPORTED_MODULE_1__["isSelectElement"])(el)) {
            return;
        }
        // Go down the options and search for # in any literal element
        Object.keys(el.options).forEach(function (id) {
            var _a;
            var opt = el.options[id];
            // If we got a match, we have to split this
            // and inject a NumberElement in the middle
            var matchingLiteralElIndex = -1;
            var literalEl = undefined;
            for (var i = 0; i < opt.value.length; i++) {
                var el_1 = opt.value[i];
                if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isLiteralElement"])(el_1) && PLURAL_HASHTAG_REGEX.test(el_1.value)) {
                    matchingLiteralElIndex = i;
                    literalEl = el_1;
                    break;
                }
            }
            if (literalEl) {
                var newValue = literalEl.value.replace(PLURAL_HASHTAG_REGEX, "$1{" + el.value + ", number}");
                var newEls = Object(_parser__WEBPACK_IMPORTED_MODULE_2__["pegParse"])(newValue);
                (_a = opt.value).splice.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])([matchingLiteralElIndex, 1], newEls));
            }
            normalizeHashtagInPlural(opt.value);
        });
    });
}


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/lib/src/parser.js":
/*!******************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/lib/src/parser.js ***!
  \******************************************************************/
/*! exports provided: SyntaxError, pegParse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyntaxError", function() { return SyntaxError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pegParse", function() { return pegParse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/intl-messageformat-parser/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./node_modules/intl-messageformat-parser/lib/src/types.js");
/* harmony import */ var _skeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./skeleton */ "./node_modules/intl-messageformat-parser/lib/src/skeleton.js");
// @ts-nocheck

// @generated


var SyntaxError = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(SyntaxError, _super);
    function SyntaxError(message, expected, found, location) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.expected = expected;
        _this.found = found;
        _this.location = location;
        _this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(_this, SyntaxError);
        }
        return _this;
    }
    SyntaxError.buildMessage = function (expected, found) {
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function describeExpectation(expectation) {
            switch (expectation.type) {
                case "literal":
                    return "\"" + literalEscape(expectation.text) + "\"";
                case "class":
                    var escapedParts = expectation.parts.map(function (part) {
                        return Array.isArray(part)
                            ? classEscape(part[0]) + "-" + classEscape(part[1])
                            : classEscape(part);
                    });
                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                case "any":
                    return "any character";
                case "end":
                    return "end of input";
                case "other":
                    return expectation.description;
            }
        }
        function describeExpected(expected1) {
            var descriptions = expected1.map(describeExpectation);
            var i;
            var j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    return SyntaxError;
}(Error));

function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    var peg$FAILED = {};
    var peg$startRuleFunctions = { start: peg$parsestart };
    var peg$startRuleFunction = peg$parsestart;
    var peg$c0 = function () { return !ignoreTag; };
    var peg$c1 = function (x) { return x; };
    var peg$c2 = function () { return ignoreTag; };
    var peg$c3 = "<";
    var peg$c4 = peg$literalExpectation("<", false);
    var peg$c5 = function (parts) {
        return parts.join('');
    };
    var peg$c6 = function () { return '<'; };
    var peg$c7 = function (messageText) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].literal, value: messageText }, insertLocation());
    };
    var peg$c8 = "#";
    var peg$c9 = peg$literalExpectation("#", false);
    var peg$c10 = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].pound }, insertLocation());
    };
    var peg$c11 = peg$otherExpectation("tagElement");
    var peg$c12 = function (open, children, close) {
        if (open !== close) {
            error("Mismatch tag \"" + open + "\" !== \"" + close + "\"", location());
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].tag, value: open, children: children }, insertLocation());
    };
    var peg$c13 = "/>";
    var peg$c14 = peg$literalExpectation("/>", false);
    var peg$c15 = function (value) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].literal, value: value.join('') }, insertLocation());
    };
    var peg$c16 = ">";
    var peg$c17 = peg$literalExpectation(">", false);
    var peg$c18 = function (tag) { return tag; };
    var peg$c19 = "</";
    var peg$c20 = peg$literalExpectation("</", false);
    var peg$c21 = peg$otherExpectation("argumentElement");
    var peg$c22 = "{";
    var peg$c23 = peg$literalExpectation("{", false);
    var peg$c24 = "}";
    var peg$c25 = peg$literalExpectation("}", false);
    var peg$c26 = function (value) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].argument, value: value }, insertLocation());
    };
    var peg$c27 = peg$otherExpectation("numberSkeletonId");
    var peg$c28 = /^['\/{}]/;
    var peg$c29 = peg$classExpectation(["'", "/", "{", "}"], false, false);
    var peg$c30 = peg$anyExpectation();
    var peg$c31 = peg$otherExpectation("numberSkeletonTokenOption");
    var peg$c32 = "/";
    var peg$c33 = peg$literalExpectation("/", false);
    var peg$c34 = function (option) { return option; };
    var peg$c35 = peg$otherExpectation("numberSkeletonToken");
    var peg$c36 = function (stem, options) {
        return { stem: stem, options: options };
    };
    var peg$c37 = function (tokens) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: 0 /* number */, tokens: tokens, parsedOptions: shouldParseSkeleton ? Object(_skeleton__WEBPACK_IMPORTED_MODULE_2__["parseNumberSkeleton"])(tokens) : {} }, insertLocation());
    };
    var peg$c38 = "::";
    var peg$c39 = peg$literalExpectation("::", false);
    var peg$c40 = function (skeleton) { return skeleton; };
    var peg$c41 = function () { messageCtx.push('numberArgStyle'); return true; };
    var peg$c42 = function (style) {
        messageCtx.pop();
        return style.replace(/\s*$/, '');
    };
    var peg$c43 = ",";
    var peg$c44 = peg$literalExpectation(",", false);
    var peg$c45 = "number";
    var peg$c46 = peg$literalExpectation("number", false);
    var peg$c47 = function (value, type, style) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: type === 'number' ? _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].number : type === 'date' ? _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].date : _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].time, style: style && style[2], value: value }, insertLocation());
    };
    var peg$c48 = "'";
    var peg$c49 = peg$literalExpectation("'", false);
    var peg$c50 = /^[^']/;
    var peg$c51 = peg$classExpectation(["'"], true, false);
    var peg$c52 = /^[^a-zA-Z'{}]/;
    var peg$c53 = peg$classExpectation([["a", "z"], ["A", "Z"], "'", "{", "}"], true, false);
    var peg$c54 = /^[a-zA-Z]/;
    var peg$c55 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
    var peg$c56 = function (pattern) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: 1 /* dateTime */, pattern: pattern, parsedOptions: shouldParseSkeleton ? Object(_skeleton__WEBPACK_IMPORTED_MODULE_2__["parseDateTimeSkeleton"])(pattern) : {} }, insertLocation());
    };
    var peg$c57 = function () { messageCtx.push('dateOrTimeArgStyle'); return true; };
    var peg$c58 = "date";
    var peg$c59 = peg$literalExpectation("date", false);
    var peg$c60 = "time";
    var peg$c61 = peg$literalExpectation("time", false);
    var peg$c62 = "plural";
    var peg$c63 = peg$literalExpectation("plural", false);
    var peg$c64 = "selectordinal";
    var peg$c65 = peg$literalExpectation("selectordinal", false);
    var peg$c66 = "offset:";
    var peg$c67 = peg$literalExpectation("offset:", false);
    var peg$c68 = function (value, pluralType, offset, options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].plural, pluralType: pluralType === 'plural' ? 'cardinal' : 'ordinal', value: value, offset: offset ? offset[2] : 0, options: options.reduce(function (all, _a) {
                var id = _a.id, value = _a.value, optionLocation = _a.location;
                if (id in all) {
                    error("Duplicate option \"" + id + "\" in plural element: \"" + text() + "\"", location());
                }
                all[id] = {
                    value: value,
                    location: optionLocation
                };
                return all;
            }, {}) }, insertLocation());
    };
    var peg$c69 = "select";
    var peg$c70 = peg$literalExpectation("select", false);
    var peg$c71 = function (value, options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: _types__WEBPACK_IMPORTED_MODULE_1__["TYPE"].select, value: value, options: options.reduce(function (all, _a) {
                var id = _a.id, value = _a.value, optionLocation = _a.location;
                if (id in all) {
                    error("Duplicate option \"" + id + "\" in select element: \"" + text() + "\"", location());
                }
                all[id] = {
                    value: value,
                    location: optionLocation
                };
                return all;
            }, {}) }, insertLocation());
    };
    var peg$c72 = "=";
    var peg$c73 = peg$literalExpectation("=", false);
    var peg$c74 = function (id) { messageCtx.push('select'); return true; };
    var peg$c75 = function (id, value) {
        messageCtx.pop();
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ id: id,
            value: value }, insertLocation());
    };
    var peg$c76 = function (id) { messageCtx.push('plural'); return true; };
    var peg$c77 = function (id, value) {
        messageCtx.pop();
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ id: id,
            value: value }, insertLocation());
    };
    var peg$c78 = peg$otherExpectation("whitespace");
    var peg$c79 = /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
    var peg$c80 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u2028", "\u2029", "\u202F", "\u205F", "\u3000"], false, false);
    var peg$c81 = peg$otherExpectation("syntax pattern");
    var peg$c82 = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/;
    var peg$c83 = peg$classExpectation([["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], false, false);
    var peg$c84 = peg$otherExpectation("optional whitespace");
    var peg$c85 = peg$otherExpectation("number");
    var peg$c86 = "-";
    var peg$c87 = peg$literalExpectation("-", false);
    var peg$c88 = function (negative, num) {
        return num
            ? negative
                ? -num
                : num
            : 0;
    };
    var peg$c89 = peg$otherExpectation("apostrophe");
    var peg$c90 = peg$otherExpectation("double apostrophes");
    var peg$c91 = "''";
    var peg$c92 = peg$literalExpectation("''", false);
    var peg$c93 = function () { return "'"; };
    var peg$c94 = function (escapedChar, quotedChars) {
        return escapedChar + quotedChars.replace("''", "'");
    };
    var peg$c95 = function (x) {
        return (x !== '<' &&
            x !== '{' &&
            !(isInPluralOption() && x === '#') &&
            !(isNestedMessageText() && x === '}'));
    };
    var peg$c96 = "\n";
    var peg$c97 = peg$literalExpectation("\n", false);
    var peg$c98 = function (x) {
        return x === '<' || x === '>' || x === '{' || x === '}' || (isInPluralOption() && x === '#');
    };
    var peg$c99 = peg$otherExpectation("argNameOrNumber");
    var peg$c100 = peg$otherExpectation("validTag");
    var peg$c101 = peg$otherExpectation("argNumber");
    var peg$c102 = "0";
    var peg$c103 = peg$literalExpectation("0", false);
    var peg$c104 = function () { return 0; };
    var peg$c105 = /^[1-9]/;
    var peg$c106 = peg$classExpectation([["1", "9"]], false, false);
    var peg$c107 = /^[0-9]/;
    var peg$c108 = peg$classExpectation([["0", "9"]], false, false);
    var peg$c109 = function (digits) {
        return parseInt(digits.join(''), 10);
    };
    var peg$c110 = peg$otherExpectation("argName");
    var peg$c111 = peg$otherExpectation("tagName");
    var peg$currPos = 0;
    var peg$savedPos = 0;
    var peg$posDetailsCache = [{ line: 1, column: 1 }];
    var peg$maxFailPos = 0;
    var peg$maxFailExpected = [];
    var peg$silentFails = 0;
    var peg$result;
    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos];
        var p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos);
        var endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$parsestart() {
        var s0;
        s0 = peg$parsemessage();
        return s0;
    }
    function peg$parsemessage() {
        var s0, s1;
        s0 = [];
        s1 = peg$parsemessageElement();
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parsemessageElement();
        }
        return s0;
    }
    function peg$parsemessageElement() {
        var s0, s1, s2;
        s0 = peg$currPos;
        peg$savedPos = peg$currPos;
        s1 = peg$c0();
        if (s1) {
            s1 = undefined;
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsetagElement();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c1(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parseliteralElement();
            if (s0 === peg$FAILED) {
                s0 = peg$parseargumentElement();
                if (s0 === peg$FAILED) {
                    s0 = peg$parsesimpleFormatElement();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parsepluralElement();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseselectElement();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parsepoundElement();
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsemessageText() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        peg$savedPos = peg$currPos;
        s1 = peg$c2();
        if (s1) {
            s1 = undefined;
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsedoubleApostrophes();
            if (s3 === peg$FAILED) {
                s3 = peg$parsequotedString();
                if (s3 === peg$FAILED) {
                    s3 = peg$parseunquotedString();
                    if (s3 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 60) {
                            s3 = peg$c3;
                            peg$currPos++;
                        }
                        else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c4);
                            }
                        }
                    }
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parsedoubleApostrophes();
                    if (s3 === peg$FAILED) {
                        s3 = peg$parsequotedString();
                        if (s3 === peg$FAILED) {
                            s3 = peg$parseunquotedString();
                            if (s3 === peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 60) {
                                    s3 = peg$c3;
                                    peg$currPos++;
                                }
                                else {
                                    s3 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c4);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c5(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parsedoubleApostrophes();
            if (s2 === peg$FAILED) {
                s2 = peg$parsequotedString();
                if (s2 === peg$FAILED) {
                    s2 = peg$parseunquotedString();
                    if (s2 === peg$FAILED) {
                        s2 = peg$parsenonTagStartingAngleBracket();
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    s2 = peg$parsedoubleApostrophes();
                    if (s2 === peg$FAILED) {
                        s2 = peg$parsequotedString();
                        if (s2 === peg$FAILED) {
                            s2 = peg$parseunquotedString();
                            if (s2 === peg$FAILED) {
                                s2 = peg$parsenonTagStartingAngleBracket();
                            }
                        }
                    }
                }
            }
            else {
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c5(s1);
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parsenonTagStartingAngleBracket() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parseopeningTag();
        if (s2 === peg$FAILED) {
            s2 = peg$parseclosingTag();
            if (s2 === peg$FAILED) {
                s2 = peg$parseselfClosingTag();
            }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
            s1 = undefined;
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 60) {
                s2 = peg$c3;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c4);
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c6();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseliteralElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c7(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsepoundElement() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c8;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c9);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c10();
        }
        s0 = s1;
        return s0;
    }
    function peg$parsetagElement() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$parseselfClosingTag();
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseopeningTag();
            if (s1 !== peg$FAILED) {
                s2 = peg$parsemessage();
                if (s2 !== peg$FAILED) {
                    s3 = peg$parseclosingTag();
                    if (s3 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c12(s1, s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c11);
            }
        }
        return s0;
    }
    function peg$parseselfClosingTag() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 60) {
            s2 = peg$c3;
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = peg$parsevalidTag();
            if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c13) {
                        s5 = peg$c13;
                        peg$currPos += 2;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c14);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s2 = [s2, s3, s4, s5];
                        s1 = s2;
                    }
                    else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c15(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseopeningTag() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 60) {
            s1 = peg$c3;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsevalidTag();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                    s3 = peg$c16;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c17);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c18(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseclosingTag() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c20);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsevalidTag();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                    s3 = peg$c16;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c17);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c18(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c22;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                            s5 = peg$c24;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c25);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c26(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c21);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonId() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsewhiteSpace();
        if (s4 === peg$FAILED) {
            if (peg$c28.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c29);
                }
            }
        }
        peg$silentFails--;
        if (s4 === peg$FAILED) {
            s3 = undefined;
        }
        else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c30);
                }
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$currPos;
                peg$silentFails++;
                s4 = peg$parsewhiteSpace();
                if (s4 === peg$FAILED) {
                    if (peg$c28.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c29);
                        }
                    }
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                    s3 = undefined;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c30);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c27);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonTokenOption() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
            s1 = peg$c32;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeletonId();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c34(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c31);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonToken() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeletonId();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsenumberSkeletonTokenOption();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsenumberSkeletonTokenOption();
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c36(s2, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c35);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeleton() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsenumberSkeletonToken();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parsenumberSkeletonToken();
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c37(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsenumberArgStyle() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c38) {
            s1 = peg$c38;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c39);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeleton();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c40(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            peg$savedPos = peg$currPos;
            s1 = peg$c41();
            if (s1) {
                s1 = undefined;
            }
            else {
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsemessageText();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c42(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsenumberFormatElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c22;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c43;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c44);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c45) {
                                    s7 = peg$c45;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c46);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s10 = peg$c43;
                                            peg$currPos++;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c44);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parse_();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsenumberArgStyle();
                                                if (s12 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                    s11 = peg$c24;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c25);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c47(s3, s7, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedateTimeSkeletonLiteral() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c48;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c49);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsedoubleApostrophes();
            if (s3 === peg$FAILED) {
                if (peg$c50.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c51);
                    }
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parsedoubleApostrophes();
                    if (s3 === peg$FAILED) {
                        if (peg$c50.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c51);
                            }
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 39) {
                    s3 = peg$c48;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c49);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = [];
            s1 = peg$parsedoubleApostrophes();
            if (s1 === peg$FAILED) {
                if (peg$c52.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c53);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                while (s1 !== peg$FAILED) {
                    s0.push(s1);
                    s1 = peg$parsedoubleApostrophes();
                    if (s1 === peg$FAILED) {
                        if (peg$c52.test(input.charAt(peg$currPos))) {
                            s1 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c53);
                            }
                        }
                    }
                }
            }
            else {
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsedateTimeSkeletonPattern() {
        var s0, s1;
        s0 = [];
        if (peg$c54.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c55);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (peg$c54.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c55);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedateTimeSkeleton() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parsedateTimeSkeletonLiteral();
        if (s3 === peg$FAILED) {
            s3 = peg$parsedateTimeSkeletonPattern();
        }
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parsedateTimeSkeletonLiteral();
                if (s3 === peg$FAILED) {
                    s3 = peg$parsedateTimeSkeletonPattern();
                }
            }
        }
        else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        }
        else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c56(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsedateOrTimeArgStyle() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c38) {
            s1 = peg$c38;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c39);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsedateTimeSkeleton();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c40(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            peg$savedPos = peg$currPos;
            s1 = peg$c57();
            if (s1) {
                s1 = undefined;
            }
            else {
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsemessageText();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c42(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsedateOrTimeFormatElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c22;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c43;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c44);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 4) === peg$c58) {
                                    s7 = peg$c58;
                                    peg$currPos += 4;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c59);
                                    }
                                }
                                if (s7 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 4) === peg$c60) {
                                        s7 = peg$c60;
                                        peg$currPos += 4;
                                    }
                                    else {
                                        s7 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c61);
                                        }
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s10 = peg$c43;
                                            peg$currPos++;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c44);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parse_();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsedateOrTimeArgStyle();
                                                if (s12 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                    s11 = peg$c24;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c25);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c47(s3, s7, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsesimpleFormatElement() {
        var s0;
        s0 = peg$parsenumberFormatElement();
        if (s0 === peg$FAILED) {
            s0 = peg$parsedateOrTimeFormatElement();
        }
        return s0;
    }
    function peg$parsepluralElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c22;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c43;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c44);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c62) {
                                    s7 = peg$c62;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c63);
                                    }
                                }
                                if (s7 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 13) === peg$c64) {
                                        s7 = peg$c64;
                                        peg$currPos += 13;
                                    }
                                    else {
                                        s7 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c65);
                                        }
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s9 = peg$c43;
                                            peg$currPos++;
                                        }
                                        else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c44);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$currPos;
                                                if (input.substr(peg$currPos, 7) === peg$c66) {
                                                    s12 = peg$c66;
                                                    peg$currPos += 7;
                                                }
                                                else {
                                                    s12 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c67);
                                                    }
                                                }
                                                if (s12 !== peg$FAILED) {
                                                    s13 = peg$parse_();
                                                    if (s13 !== peg$FAILED) {
                                                        s14 = peg$parsenumber();
                                                        if (s14 !== peg$FAILED) {
                                                            s12 = [s12, s13, s14];
                                                            s11 = s12;
                                                        }
                                                        else {
                                                            peg$currPos = s11;
                                                            s11 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s11;
                                                        s11 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 === peg$FAILED) {
                                                    s11 = null;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parse_();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = [];
                                                        s14 = peg$parsepluralOption();
                                                        if (s14 !== peg$FAILED) {
                                                            while (s14 !== peg$FAILED) {
                                                                s13.push(s14);
                                                                s14 = peg$parsepluralOption();
                                                            }
                                                        }
                                                        else {
                                                            s13 = peg$FAILED;
                                                        }
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parse_();
                                                            if (s14 !== peg$FAILED) {
                                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                                    s15 = peg$c24;
                                                                    peg$currPos++;
                                                                }
                                                                else {
                                                                    s15 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c25);
                                                                    }
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    peg$savedPos = s0;
                                                                    s1 = peg$c68(s3, s7, s11, s13);
                                                                    s0 = s1;
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseselectElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c22;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c43;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c44);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c69) {
                                    s7 = peg$c69;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c70);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s9 = peg$c43;
                                            peg$currPos++;
                                        }
                                        else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c44);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = [];
                                                s12 = peg$parseselectOption();
                                                if (s12 !== peg$FAILED) {
                                                    while (s12 !== peg$FAILED) {
                                                        s11.push(s12);
                                                        s12 = peg$parseselectOption();
                                                    }
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parse_();
                                                    if (s12 !== peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 125) {
                                                            s13 = peg$c24;
                                                            peg$currPos++;
                                                        }
                                                        else {
                                                            s13 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                                peg$fail(peg$c25);
                                                            }
                                                        }
                                                        if (s13 !== peg$FAILED) {
                                                            peg$savedPos = s0;
                                                            s1 = peg$c71(s3, s11);
                                                            s0 = s1;
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepluralRuleSelectValue() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c72;
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c73);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parseargName();
        }
        return s0;
    }
    function peg$parseselectOption() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseargName();
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s4 = peg$c22;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c23);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        s5 = peg$c74(s2);
                        if (s5) {
                            s5 = undefined;
                        }
                        else {
                            s5 = peg$FAILED;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsemessage();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 125) {
                                    s7 = peg$c24;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c25);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c75(s2, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepluralOption() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsepluralRuleSelectValue();
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s4 = peg$c22;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c23);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        s5 = peg$c76(s2);
                        if (s5) {
                            s5 = undefined;
                        }
                        else {
                            s5 = peg$FAILED;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsemessage();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 125) {
                                    s7 = peg$c24;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c25);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c77(s2, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsewhiteSpace() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c79.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c80);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c78);
            }
        }
        return s0;
    }
    function peg$parsepatternSyntax() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c82.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c83);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c81);
            }
        }
        return s0;
    }
    function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewhiteSpace();
        while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsewhiteSpace();
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c84);
            }
        }
        return s0;
    }
    function peg$parsenumber() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
            s1 = peg$c86;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c87);
            }
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseargNumber();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c88(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c85);
            }
        }
        return s0;
    }
    function peg$parseapostrophe() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 39) {
            s0 = peg$c48;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c49);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c89);
            }
        }
        return s0;
    }
    function peg$parsedoubleApostrophes() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c91) {
            s1 = peg$c91;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c92);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c93();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c90);
            }
        }
        return s0;
    }
    function peg$parsequotedString() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c48;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c49);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseescapedChar();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = [];
                if (input.substr(peg$currPos, 2) === peg$c91) {
                    s5 = peg$c91;
                    peg$currPos += 2;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c92);
                    }
                }
                if (s5 === peg$FAILED) {
                    if (peg$c50.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c51);
                        }
                    }
                }
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    if (input.substr(peg$currPos, 2) === peg$c91) {
                        s5 = peg$c91;
                        peg$currPos += 2;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c92);
                        }
                    }
                    if (s5 === peg$FAILED) {
                        if (peg$c50.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c51);
                            }
                        }
                    }
                }
                if (s4 !== peg$FAILED) {
                    s3 = input.substring(s3, peg$currPos);
                }
                else {
                    s3 = s4;
                }
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 39) {
                        s4 = peg$c48;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c49);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c94(s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseunquotedString() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c30);
            }
        }
        if (s2 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s3 = peg$c95(s2);
            if (s3) {
                s3 = undefined;
            }
            else {
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
                s1 = peg$c96;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c97);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        return s0;
    }
    function peg$parseescapedChar() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c30);
            }
        }
        if (s2 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s3 = peg$c98(s2);
            if (s3) {
                s3 = undefined;
            }
            else {
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        return s0;
    }
    function peg$parseargNameOrNumber() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseargNumber();
        if (s1 === peg$FAILED) {
            s1 = peg$parseargName();
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c99);
            }
        }
        return s0;
    }
    function peg$parsevalidTag() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseargNumber();
        if (s1 === peg$FAILED) {
            s1 = peg$parsetagName();
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c100);
            }
        }
        return s0;
    }
    function peg$parseargNumber() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 48) {
            s1 = peg$c102;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c103);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c104();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            if (peg$c105.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c106);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                if (peg$c107.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c108);
                    }
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    if (peg$c107.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c108);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                }
                else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c109(s1);
            }
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c101);
            }
        }
        return s0;
    }
    function peg$parseargName() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsewhiteSpace();
        if (s4 === peg$FAILED) {
            s4 = peg$parsepatternSyntax();
        }
        peg$silentFails--;
        if (s4 === peg$FAILED) {
            s3 = undefined;
        }
        else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c30);
                }
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$currPos;
                peg$silentFails++;
                s4 = peg$parsewhiteSpace();
                if (s4 === peg$FAILED) {
                    s4 = peg$parsepatternSyntax();
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                    s3 = undefined;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c30);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c110);
            }
        }
        return s0;
    }
    function peg$parsetagName() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 45) {
            s2 = peg$c86;
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c87);
            }
        }
        if (s2 === peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$currPos;
            peg$silentFails++;
            s4 = peg$parsewhiteSpace();
            if (s4 === peg$FAILED) {
                s4 = peg$parsepatternSyntax();
            }
            peg$silentFails--;
            if (s4 === peg$FAILED) {
                s3 = undefined;
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c30);
                    }
                }
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (input.charCodeAt(peg$currPos) === 45) {
                    s2 = peg$c86;
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c87);
                    }
                }
                if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    s3 = peg$currPos;
                    peg$silentFails++;
                    s4 = peg$parsewhiteSpace();
                    if (s4 === peg$FAILED) {
                        s4 = peg$parsepatternSyntax();
                    }
                    peg$silentFails--;
                    if (s4 === peg$FAILED) {
                        s3 = undefined;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                    if (s3 !== peg$FAILED) {
                        if (input.length > peg$currPos) {
                            s4 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c30);
                            }
                        }
                        if (s4 !== peg$FAILED) {
                            s3 = [s3, s4];
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c111);
            }
        }
        return s0;
    }
    var messageCtx = ['root'];
    function isNestedMessageText() {
        return messageCtx.length > 1;
    }
    function isInPluralOption() {
        return messageCtx[messageCtx.length - 1] === 'plural';
    }
    function insertLocation() {
        return options && options.captureLocation ? {
            location: location()
        } : {};
    }
    var ignoreTag = options && options.ignoreTag;
    var shouldParseSkeleton = options && options.shouldParseSkeleton;
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
var pegParse = peg$parse;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/lib/src/skeleton.js":
/*!********************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/lib/src/skeleton.js ***!
  \********************************************************************/
/*! exports provided: parseDateTimeSkeleton, parseNumberSkeleton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDateTimeSkeleton", function() { return parseDateTimeSkeleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseNumberSkeleton", function() { return parseNumberSkeleton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/intl-messageformat-parser/node_modules/tslib/tslib.es6.js");

/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;
function parseSignificantPrecision(str) {
    var result = {};
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
            return {
                signDisplay: 'never',
            };
    }
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function parseNumberSkeleton(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
                result.style = 'percent';
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
            case '.':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
        }
        // Precision
        // https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#fraction-precision
        // precision-integer case
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === '*') {
                    result.minimumFractionDigits = g1.length;
                }
                // .### case
                else if (g3 && g3[0] === '#') {
                    result.maximumFractionDigits = g3.length;
                }
                // .00## case
                else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                }
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return '';
            });
            if (token.options.length) {
                result = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), parseSignificantPrecision(token.options[0]));
            }
            continue;
        }
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), signOpts);
        }
    }
    return result;
}


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/lib/src/types.js":
/*!*****************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/lib/src/types.js ***!
  \*****************************************************************/
/*! exports provided: TYPE, SKELETON_TYPE, isLiteralElement, isArgumentElement, isNumberElement, isDateElement, isTimeElement, isSelectElement, isPluralElement, isPoundElement, isTagElement, isNumberSkeleton, isDateTimeSkeleton, createLiteralElement, createNumberElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE", function() { return TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SKELETON_TYPE", function() { return SKELETON_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLiteralElement", function() { return isLiteralElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArgumentElement", function() { return isArgumentElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberElement", function() { return isNumberElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDateElement", function() { return isDateElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTimeElement", function() { return isTimeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSelectElement", function() { return isSelectElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPluralElement", function() { return isPluralElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPoundElement", function() { return isPoundElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTagElement", function() { return isTagElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberSkeleton", function() { return isNumberSkeleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDateTimeSkeleton", function() { return isDateTimeSkeleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLiteralElement", function() { return createLiteralElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNumberElement", function() { return createNumberElement; });
var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    TYPE[TYPE["pound"] = 7] = "pound";
    /**
     * XML-like tag
     */
    TYPE[TYPE["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function (SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === 0 /* number */);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === 1 /* dateTime */);
}
function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value: value,
    };
}
function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value: value,
        style: style,
    };
}


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/node_modules/tslib/tslib.es6.js":
/*!********************************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/node_modules/tslib/tslib.es6.js ***!
  \********************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/intl-messageformat/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/index.js ***!
  \******************************************************/
/*! exports provided: PART_TYPE, isFormatXMLElementFn, formatToParts, IntlMessageFormat, ErrorCode, FormatError, InvalidValueError, InvalidValueTypeError, MissingValueError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/core */ "./node_modules/intl-messageformat/lib/src/core.js");
/* harmony import */ var _src_formatters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/formatters */ "./node_modules/intl-messageformat/lib/src/formatters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PART_TYPE", function() { return _src_formatters__WEBPACK_IMPORTED_MODULE_1__["PART_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFormatXMLElementFn", function() { return _src_formatters__WEBPACK_IMPORTED_MODULE_1__["isFormatXMLElementFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatToParts", function() { return _src_formatters__WEBPACK_IMPORTED_MODULE_1__["formatToParts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntlMessageFormat", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["IntlMessageFormat"]; });

/* harmony import */ var _src_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/error */ "./node_modules/intl-messageformat/lib/src/error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorCode", function() { return _src_error__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormatError", function() { return _src_error__WEBPACK_IMPORTED_MODULE_2__["FormatError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidValueError", function() { return _src_error__WEBPACK_IMPORTED_MODULE_2__["InvalidValueError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidValueTypeError", function() { return _src_error__WEBPACK_IMPORTED_MODULE_2__["InvalidValueTypeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MissingValueError", function() { return _src_error__WEBPACK_IMPORTED_MODULE_2__["MissingValueError"]; });

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/




/* harmony default export */ __webpack_exports__["default"] = (_src_core__WEBPACK_IMPORTED_MODULE_0__["IntlMessageFormat"]);


/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/core.js":
/*!*********************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/core.js ***!
  \*********************************************************/
/*! exports provided: IntlMessageFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntlMessageFormat", function() { return IntlMessageFormat; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/intl-messageformat/node_modules/tslib/tslib.es6.js");
/* harmony import */ var intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! intl-messageformat-parser */ "./node_modules/intl-messageformat-parser/lib/index.js");
/* harmony import */ var fast_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-memoize */ "./node_modules/fast-memoize/src/index.js");
/* harmony import */ var fast_memoize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fast_memoize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatters */ "./node_modules/intl-messageformat/lib/src/formatters.js");
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/




// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultConfig));
}
function createFastMemoizeCache(store) {
    return {
        create: function () {
            return {
                has: function (key) {
                    return key in store;
                },
                get: function (key) {
                    return store[key];
                },
                set: function (key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
// @ts-ignore this is to deal with rollup's default import shenanigans
var _memoizeIntl = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default.a || fast_memoize__WEBPACK_IMPORTED_MODULE_2__;
var memoizeIntl = _memoizeIntl;
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: memoizeIntl(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.NumberFormat).bind.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])([void 0], args)))();
        }, {
            cache: createFastMemoizeCache(cache.number),
            strategy: memoizeIntl.strategies.variadic,
        }),
        getDateTimeFormat: memoizeIntl(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.DateTimeFormat).bind.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])([void 0], args)))();
        }, {
            cache: createFastMemoizeCache(cache.dateTime),
            strategy: memoizeIntl.strategies.variadic,
        }),
        getPluralRules: memoizeIntl(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.PluralRules).bind.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])([void 0], args)))();
        }, {
            cache: createFastMemoizeCache(cache.pluralRules),
            strategy: memoizeIntl.strategies.variadic,
        }),
    };
}
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            var parts = _this.formatToParts(values);
            // Hot path for straight simple msg translations
            if (parts.length === 1) {
                return parts[0].value;
            }
            var result = parts.reduce(function (all, part) {
                if (!all.length ||
                    part.type !== 0 /* literal */ ||
                    typeof all[all.length - 1] !== 'string') {
                    all.push(part.value);
                }
                else {
                    all[all.length - 1] += part.value;
                }
                return all;
            }, []);
            if (result.length <= 1) {
                return result[0] || '';
            }
            return result;
        };
        this.formatToParts = function (values) {
            return Object(_formatters__WEBPACK_IMPORTED_MODULE_3__["formatToParts"])(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.resolvedOptions = function () { return ({
            locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
        }); };
        this.getAst = function () { return _this.ast; };
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                normalizeHashtagInPlural: false,
                ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag,
            });
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    Object.defineProperty(IntlMessageFormat, "defaultLocale", {
        get: function () {
            if (!IntlMessageFormat.memoizedDefaultLocale) {
                IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
            }
            return IntlMessageFormat.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
    });
    IntlMessageFormat.memoizedDefaultLocale = null;
    IntlMessageFormat.__parse = intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_1__["parse"];
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());



/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/error.js":
/*!**********************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/error.js ***!
  \**********************************************************/
/*! exports provided: ErrorCode, FormatError, InvalidValueError, InvalidValueTypeError, MissingValueError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorCode", function() { return ErrorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatError", function() { return FormatError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidValueError", function() { return InvalidValueError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidValueTypeError", function() { return InvalidValueTypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissingValueError", function() { return MissingValueError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/intl-messageformat/node_modules/tslib/tslib.es6.js");

var ErrorCode;
(function (ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FormatError, _super);
    function FormatError(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
    }
    FormatError.prototype.toString = function () {
        return "[formatjs Error: " + this.code + "] " + this.message;
    };
    return FormatError;
}(Error));

var InvalidValueError = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InvalidValueError, _super);
    function InvalidValueError(variableId, value, options, originalMessage) {
        return _super.call(this, "Invalid values for \"" + variableId + "\": \"" + value + "\". Options are \"" + Object.keys(options).join('", "') + "\"", "INVALID_VALUE" /* INVALID_VALUE */, originalMessage) || this;
    }
    return InvalidValueError;
}(FormatError));

var InvalidValueTypeError = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InvalidValueTypeError, _super);
    function InvalidValueTypeError(value, type, originalMessage) {
        return _super.call(this, "Value for \"" + value + "\" must be of type " + type, "INVALID_VALUE" /* INVALID_VALUE */, originalMessage) || this;
    }
    return InvalidValueTypeError;
}(FormatError));

var MissingValueError = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MissingValueError, _super);
    function MissingValueError(variableId, originalMessage) {
        return _super.call(this, "The intl string context variable \"" + variableId + "\" was not provided to the string \"" + originalMessage + "\"", "MISSING_VALUE" /* MISSING_VALUE */, originalMessage) || this;
    }
    return MissingValueError;
}(FormatError));



/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/formatters.js":
/*!***************************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/formatters.js ***!
  \***************************************************************/
/*! exports provided: PART_TYPE, isFormatXMLElementFn, formatToParts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PART_TYPE", function() { return PART_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFormatXMLElementFn", function() { return isFormatXMLElementFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatToParts", function() { return formatToParts; });
/* harmony import */ var intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! intl-messageformat-parser */ "./node_modules/intl-messageformat-parser/lib/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/intl-messageformat/lib/src/error.js");


var PART_TYPE;
(function (PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== 0 /* literal */ ||
            part.type !== 0 /* literal */) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === 'function';
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isLiteralElement"])(els[0])) {
        return [
            {
                type: 0 /* literal */,
                value: els[0].value,
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isLiteralElement"])(el)) {
            result.push({
                type: 0 /* literal */,
                value: el.value,
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isPoundElement"])(el)) {
            if (typeof currentPluralValue === 'number') {
                result.push({
                    type: 0 /* literal */,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue),
                });
            }
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new _error__WEBPACK_IMPORTED_MODULE_1__["MissingValueError"](varName, originalMessage);
        }
        var value = values[varName];
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isArgumentElement"])(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: typeof value === 'string' ? 0 /* literal */ : 1 /* object */,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isDateElement"])(el)) {
            var style = typeof el.style === 'string'
                ? formats.date[el.style]
                : Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isDateTimeSkeleton"])(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isTimeElement"])(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isDateTimeSkeleton"])(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isNumberElement"])(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isNumberSkeleton"])(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isTagElement"])(el)) {
            var children = el.children, value_1 = el.value;
            var formatFn = values[value_1];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__["InvalidValueTypeError"](value_1, 'function', originalMessage);
            }
            var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            var chunks = formatFn(parts.map(function (p) { return p.value; }));
            if (!Array.isArray(chunks)) {
                chunks = [chunks];
            }
            result.push.apply(result, chunks.map(function (c) {
                return {
                    type: typeof c === 'string' ? 0 /* literal */ : 1 /* object */,
                    value: c,
                };
            }));
        }
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isSelectElement"])(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__["InvalidValueError"](el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if (Object(intl_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__["isPluralElement"])(el)) {
            var opt = el.options["=" + value];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new _error__WEBPACK_IMPORTED_MODULE_1__["FormatError"]("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", "MISSING_INTL_API" /* MISSING_INTL_API */, originalMessage);
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__["InvalidValueError"](el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}


/***/ }),

/***/ "./node_modules/intl-messageformat/node_modules/tslib/tslib.es6.js":
/*!*************************************************************************!*\
  !*** ./node_modules/intl-messageformat/node_modules/tslib/tslib.es6.js ***!
  \*************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/sockjs-client/dist/sockjs.js":
/*!***************************************************!*\
  !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.4.0 | http://sockjs.org | MIT license */
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

var transportList = require('./transport-list');

module.exports = require('./main')(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./main":14,"./transport-list":16}],2:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

inherits(CloseEvent, Event);

module.exports = CloseEvent;

},{"./event":4,"inherits":57}],3:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventTarget = require('./eventtarget')
  ;

function EventEmitter() {
  EventTarget.call(this);
}

inherits(EventEmitter, EventTarget);

EventEmitter.prototype.removeAllListeners = function(type) {
  if (type) {
    delete this._listeners[type];
  } else {
    this._listeners = {};
  }
};

EventEmitter.prototype.once = function(type, listener) {
  var self = this
    , fired = false;

  function g() {
    self.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  this.on(type, g);
};

EventEmitter.prototype.emit = function() {
  var type = arguments[0];
  var listeners = this._listeners[type];
  if (!listeners) {
    return;
  }
  // equivalent of Array.prototype.slice.call(arguments, 1);
  var l = arguments.length;
  var args = new Array(l - 1);
  for (var ai = 1; ai < l; ai++) {
    args[ai - 1] = arguments[ai];
  }
  for (var i = 0; i < listeners.length; i++) {
    listeners[i].apply(this, args);
  }
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

module.exports.EventEmitter = EventEmitter;

},{"./eventtarget":5,"inherits":57}],4:[function(require,module,exports){
'use strict';

function Event(eventType) {
  this.type = eventType;
}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = +new Date();
  return this;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET = 2;
Event.BUBBLING_PHASE = 3;

module.exports = Event;

},{}],5:[function(require,module,exports){
'use strict';

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function() {
  var event = arguments[0];
  var t = event.type;
  // equivalent of Array.prototype.slice.call(arguments, 0);
  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = EventTarget;

},{}],6:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;

},{"./event":4,"inherits":57}],7:[function(require,module,exports){
'use strict';

var JSON3 = require('json3')
  , iframeUtils = require('./utils/iframe')
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function(code, reason) {
  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
};
FacadeJS.prototype._transportMessage = function(frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function(data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function() {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;

},{"./utils/iframe":47,"json3":58}],8:[function(require,module,exports){
(function (process){
'use strict';

var urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , JSON3 = require('json3')
  , FacadeJS = require('./facade')
  , InfoIframeReceiver = require('./info-iframe-receiver')
  , iframeUtils = require('./utils/iframe')
  , loc = require('./location')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:iframe-bootstrap');
}

module.exports = function(SockJS, availableTransports) {
  var transportMap = {};
  availableTransports.forEach(function(at) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  });

  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  var parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = loc.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof parentOrigin === 'undefined') {
        parentOrigin = e.origin;
      }
      if (e.origin !== parentOrigin) {
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch (iframeMessage.type) {
      case 's':
        var p;
        try {
          p = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          break;
        }
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        debug(version, transport, transUrl, baseUrl);
        // change this to semver logic
        if (version !== SockJS.version) {
          throw new Error('Incompatible SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
          throw new Error('Can\'t connect to different domain from within an ' +
                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(iframeMessage.data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    eventUtils.attachEvent('message', onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};

}).call(this,{ env: {} })

},{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":55,"json3":58}],9:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , objectUtils = require('./utils/object')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-ajax');
}

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = +new Date();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = (+new Date()) - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        } catch (e) {
          debug('bad json', text);
        }
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function() {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;

}).call(this,{ env: {} })

},{"./utils/object":49,"debug":55,"events":3,"inherits":57,"json3":58}],10:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , JSON3 = require('json3')
  , XHRLocalObject = require('./transport/sender/xhr-local')
  , InfoAjax = require('./info-ajax')
  ;

function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);

  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}

inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.transportName = 'iframe-info-receiver';

InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};

module.exports = InfoReceiverIframe;

},{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"inherits":57,"json3":58}],11:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , utils = require('./utils/event')
  , IframeTransport = require('./transport/iframe')
  , InfoReceiverIframe = require('./info-iframe-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-iframe');
}

function InfoIframe(baseUrl, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

    ifr.once('message', function(msg) {
      if (msg) {
        var d;
        try {
          d = JSON3.parse(msg);
        } catch (e) {
          debug('bad json', msg);
          self.emit('finish');
          self.close();
          return;
        }

        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function() {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function() {
  return IframeTransport.enabled();
};

InfoIframe.prototype.close = function() {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":55,"events":3,"inherits":57,"json3":58}],12:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , urlUtils = require('./utils/url')
  , XDR = require('./transport/sender/xdr')
  , XHRCors = require('./transport/sender/xhr-cors')
  , XHRLocal = require('./transport/sender/xhr-local')
  , XHRFake = require('./transport/sender/xhr-fake')
  , InfoIframe = require('./info-iframe')
  , InfoAjax = require('./info-ajax')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-receiver');
}

function InfoReceiver(baseUrl, urlInfo) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.doXhr(baseUrl, urlInfo);
  }, 0);
}

inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
  // determine method of CORS support (if needed)
  if (urlInfo.sameOrigin) {
    return new InfoAjax(url, XHRLocal);
  }
  if (XHRCors.enabled) {
    return new InfoAjax(url, XHRCors);
  }
  if (XDR.enabled && urlInfo.sameScheme) {
    return new InfoAjax(url, XDR);
  }
  if (InfoIframe.enabled()) {
    return new InfoIframe(baseUrl, url);
  }
  return new InfoAjax(url, XHRFake);
};

InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
  var self = this
    , url = urlUtils.addPath(baseUrl, '/info')
    ;
  debug('doXhr', url);

  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;

}).call(this,{ env: {} })

},{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":55,"events":3,"inherits":57}],13:[function(require,module,exports){
(function (global){
'use strict';

module.exports = global.location || {
  origin: 'http://localhost:80'
, protocol: 'http:'
, host: 'localhost'
, port: 80
, href: 'http://localhost/'
, hash: ''
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
(function (process,global){
'use strict';

require('./shims');

var URL = require('url-parse')
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , random = require('./utils/random')
  , escape = require('./utils/escape')
  , urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , transport = require('./utils/transport')
  , objectUtils = require('./utils/object')
  , browser = require('./utils/browser')
  , log = require('./utils/log')
  , Event = require('./event/event')
  , EventTarget = require('./event/eventtarget')
  , loc = require('./location')
  , CloseEvent = require('./event/close')
  , TransportMessageEvent = require('./event/trans-message')
  , InfoReceiver = require('./info-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:main');
}

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, options) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols, options);
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  options = options || {};
  if (options.protocols_whitelist) {
    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
  }
  this._transportsWhitelist = options.transports;
  this._transportOptions = options.transportOptions || {};
  this._timeout = options.timeout || 0;

  var sessionId = options.sessionId || 8;
  if (typeof sessionId === 'function') {
    this._generateSessionId = sessionId;
  } else if (typeof sessionId === 'number') {
    this._generateSessionId = function() {
      return random.string(sessionId);
    };
  } else {
    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
  }

  this._server = options.server || random.numberString(1000);

  // Step 1 of WS spec - parse and validate the url. Issue #8
  var parsedUrl = new URL(url);
  if (!parsedUrl.host || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https:' && !secure) {
    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (!protocols) {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  sortedProtocols.forEach(function(proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  var o = urlUtils.getOrigin(loc.href);
  this._origin = o ? o.toLowerCase() : null;

  // remove the trailing slash
  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

  // store the sanitized url
  this.url = parsedUrl.href;
  debug('using url', this.url);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._urlInfo = {
    nullOrigin: !browser.hasDomain()
  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
  };

  this._ir = new InfoReceiver(this.url, this._urlInfo);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && !userSetCode(code)) {
    throw new Error('InvalidAccessError: Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  // #13 - convert anything non-string to string
  // TODO this currently turns objects into [object Object]
  if (typeof data !== 'string') {
    data = '' + data;
  }
  if (this.readyState === SockJS.CONNECTING) {
    throw new Error('InvalidStateError: The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.version = require('./version');

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  debug('_receiveInfo', rtt);
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info = objectUtils.extend(info, this._urlInfo);
  debug('info', info);
  // determine list of desired and supported transports
  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
  this._transports = enabledTransports.main;
  debug(this._transports.length + ' enabled transports');

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    debug('attempt', Transport.transportName);
    if (Transport.needBody) {
      if (!global.document.body ||
          (typeof global.document.readyState !== 'undefined' &&
            global.document.readyState !== 'complete' &&
            global.document.readyState !== 'interactive')) {
        debug('waiting for body');
        this._transports.unshift(Transport);
        eventUtils.attachEvent('load', this._connect.bind(this));
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    var options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    var transportObj = new Transport(transportUrl, this._transUrl, options);
    transportObj.on('message', this._transportMessage.bind(this));
    transportObj.once('close', this._transportClose.bind(this));
    transportObj.transportName = Transport.transportName;
    this._transport = transportObj;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  debug('_transportTimeout');
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transport) {
      this._transport.close();
    }

    this._transportClose(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  debug('_transportMessage', msg);
  var self = this
    , type = msg.slice(0, 1)
    , content = msg.slice(1)
    , payload
    ;

  // first check for messages that don't need a payload
  switch (type) {
    case 'o':
      this._open();
      return;
    case 'h':
      this.dispatchEvent(new Event('heartbeat'));
      debug('heartbeat', this.transport);
      return;
  }

  if (content) {
    try {
      payload = JSON3.parse(content);
    } catch (e) {
      debug('bad json', content);
    }
  }

  if (typeof payload === 'undefined') {
    debug('empty payload', content);
    return;
  }

  switch (type) {
    case 'a':
      if (Array.isArray(payload)) {
        payload.forEach(function(p) {
          debug('message', self.transport, p);
          self.dispatchEvent(new TransportMessageEvent(p));
        });
      }
      break;
    case 'm':
      debug('message', this.transport, payload);
      this.dispatchEvent(new TransportMessageEvent(payload));
      break;
    case 'c':
      if (Array.isArray(payload) && payload.length === 2) {
        this._close(payload[0], payload[1], true);
      }
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  debug('_transportClose', this.transport, code, reason);
  if (this._transport) {
    this._transport.removeAllListeners();
    this._transport = null;
    this.transport = null;
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this._close(code, reason);
};

SockJS.prototype._open = function() {
  debug('_open', this._transport && this._transport.transportName, this.readyState);
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event('open'));
    debug('connected', this.transport);
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._close = function(code, reason, wasClean) {
  debug('_close', this.transport, code, reason, wasClean, this.readyState);
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    this._transport = null;
    this.transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new Error('InvalidStateError: SockJS has already been closed');
  }

  this.readyState = SockJS.CLOSING;
  setTimeout(function() {
    this.readyState = SockJS.CLOSED;

    if (forceFail) {
      this.dispatchEvent(new Event('error'));
    }

    var e = new CloseEvent('close');
    e.wasClean = wasClean || false;
    e.code = code || 1000;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
    debug('disconnected');
  }.bind(this), 0);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function(rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function(availableTransports) {
  transports = transport(availableTransports);
  require('./iframe-bootstrap')(SockJS, availableTransports);
  return SockJS;
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":55,"inherits":57,"json3":58,"url-parse":61}],15:[function(require,module,exports){
/* eslint-disable */
/* jscs: disable */
'use strict';

// pulled specific shims from https://github.com/es-shims/es5-shim

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;

var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(num) {
    var n = +num;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function ToUint32(x) {
    return x >>> 0;
}

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });


var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline  ? 'm' : '') +
                        (separator.extended   ? 'x' : '') + // Proposed for ES6
                        (separator.sticky     ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);

},{}],16:[function(require,module,exports){
'use strict';

module.exports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xhr-streaming')
, require('./transport/xdr-streaming')
, require('./transport/eventsource')
, require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

  // polling transports
, require('./transport/htmlfile')
, require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
, require('./transport/xhr-polling')
, require('./transport/xdr-polling')
, require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
, require('./transport/jsonp-polling')
];

},{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , utils = require('../../utils/event')
  , urlUtils = require('../../utils/url')
  , XHR = global.XMLHttpRequest
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:browser:xhr');
}

function AbstractXHRObject(method, url, payload, opts) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function () {
    self._start(method, url, payload, opts);
  }, 0);
}

inherits(AbstractXHRObject, EventEmitter);

AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
  var self = this;

  try {
    this.xhr = new XHR();
  } catch (x) {
    // intentionally empty
  }

  if (!this.xhr) {
    debug('no xhr');
    this.emit('finish', 0, 'no xhr support');
    this._cleanup();
    return;
  }

  // several browsers cache POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  // Explorer tends to keep connection open, even after the
  // tab gets closed: http://bugs.jquery.com/ticket/5280
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload cleanup');
    self._cleanup(true);
  });
  try {
    this.xhr.open(method, url, true);
    if (this.timeout && 'timeout' in this.xhr) {
      this.xhr.timeout = this.timeout;
      this.xhr.ontimeout = function() {
        debug('xhr timeout');
        self.emit('finish', 0, '');
        self._cleanup(false);
      };
    }
  } catch (e) {
    debug('exception', e);
    // IE raises an exception on wrong port.
    this.emit('finish', 0, '');
    this._cleanup(false);
    return;
  }

  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
    debug('withCredentials');
    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
    // "This never affects same-site requests."

    this.xhr.withCredentials = true;
  }
  if (opts && opts.headers) {
    for (var key in opts.headers) {
      this.xhr.setRequestHeader(key, opts.headers[key]);
    }
  }

  this.xhr.onreadystatechange = function() {
    if (self.xhr) {
      var x = self.xhr;
      var text, status;
      debug('readyState', x.readyState);
      switch (x.readyState) {
      case 3:
        // IE doesn't like peeking into responseText or status
        // on Microsoft.XMLHTTP and readystate=3
        try {
          status = x.status;
          text = x.responseText;
        } catch (e) {
          // intentionally empty
        }
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        // IE does return readystate == 3 for 404 answers.
        if (status === 200 && text && text.length > 0) {
          debug('chunk');
          self.emit('chunk', status, text);
        }
        break;
      case 4:
        status = x.status;
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }
        // IE returns this for a bad port
        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
        if (status === 12005 || status === 12029) {
          status = 0;
        }

        debug('finish', status, x.responseText);
        self.emit('finish', status, x.responseText);
        self._cleanup(false);
        break;
      }
    }
  };

  try {
    self.xhr.send(payload);
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
};

AbstractXHRObject.prototype._cleanup = function(abort) {
  debug('cleanup');
  if (!this.xhr) {
    return;
  }
  this.removeAllListeners();
  utils.unloadDel(this.unloadRef);

  // IE needs this field to be a function
  this.xhr.onreadystatechange = function() {};
  if (this.xhr.ontimeout) {
    this.xhr.ontimeout = null;
  }

  if (abort) {
    try {
      this.xhr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

AbstractXHRObject.enabled = !!XHR;
// override XMLHttpRequest for IE6/7
// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (!AbstractXHRObject.enabled && (axo in global)) {
  debug('overriding xmlhttprequest');
  XHR = function() {
    try {
      return new global[axo]('Microsoft.XMLHTTP');
    } catch (e) {
      return null;
    }
  };
  AbstractXHRObject.enabled = !!new XHR();
}

var cors = false;
try {
  cors = 'withCredentials' in new XHR();
} catch (ignored) {
  // intentionally empty
}

AbstractXHRObject.supportsCORS = cors;

module.exports = AbstractXHRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],18:[function(require,module,exports){
(function (global){
module.exports = global.EventSource;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(require,module,exports){
(function (global){
'use strict';

var Driver = global.WebSocket || global.MozWebSocket;
if (Driver) {
	module.exports = function WebSocketBrowserDriver(url) {
		return new Driver(url);
	};
} else {
	module.exports = undefined;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , EventSourceReceiver = require('./receiver/eventsource')
  , XHRCorsObject = require('./sender/xhr-cors')
  , EventSourceDriver = require('eventsource')
  ;

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;

},{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18,"inherits":57}],21:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , HtmlfileReceiver = require('./receiver/htmlfile')
  , XHRLocalObject = require('./sender/xhr-local')
  , AjaxBasedTransport = require('./lib/ajax-based')
  ;

function HtmlFileTransport(transUrl) {
  if (!HtmlfileReceiver.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.enabled = function(info) {
  return HtmlfileReceiver.enabled && info.sameOrigin;
};

HtmlFileTransport.transportName = 'htmlfile';
HtmlFileTransport.roundTrips = 2;

module.exports = HtmlFileTransport;

},{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37,"inherits":57}],22:[function(require,module,exports){
(function (process){
'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = require('inherits')
  , JSON3 = require('json3')
  , EventEmitter = require('events').EventEmitter
  , version = require('../version')
  , urlUtils = require('../utils/url')
  , iframeUtils = require('../utils/iframe')
  , eventUtils = require('../utils/event')
  , random = require('../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:transport:iframe');
}

function IframeTransport(transport, transUrl, baseUrl) {
  if (!IframeTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  EventEmitter.call(this);

  var self = this;
  this.origin = urlUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
  debug(transport, transUrl, iframeUrl);

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.close();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {
      // intentionally empty
    }
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }

  var iframeMessage;
  try {
    iframeMessage = JSON3.parse(e.data);
  } catch (ignored) {
    debug('bad json', e.data);
    return;
  }

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  case 'c':
    var cdata;
    try {
      cdata = JSON3.parse(iframeMessage.data);
    } catch (ignored) {
      debug('bad json', iframeMessage.data);
      return;
    }
    this.emit('close', cdata[0], cdata[1]);
    this.close();
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function(message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  return iframeUtils.iframeEnabled;
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":55,"events":3,"inherits":57,"json3":58}],23:[function(require,module,exports){
(function (global){
'use strict';

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var inherits = require('inherits')
  , SenderReceiver = require('./lib/sender-receiver')
  , JsonpReceiver = require('./receiver/jsonp')
  , jsonpSender = require('./sender/jsonp')
  ;

function JsonPTransport(transUrl) {
  if (!JsonPTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
}

inherits(JsonPTransport, SenderReceiver);

JsonPTransport.enabled = function() {
  return !!global.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33,"inherits":57}],24:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , SenderReceiver = require('./sender-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./sender-receiver":28,"debug":55,"inherits":57}],25:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:buffered-sender');
}

function BufferedSender(url, sender) {
  debug(url);
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  debug('send', message);
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  debug('sendScheduleWait');
  var self = this;
  var tref;
  this.sendStop = function() {
    debug('sendStop');
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    debug('timeout');
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  debug('sendSchedule', this.sendBuffer.length);
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        debug('error', err);
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self.close();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

BufferedSender.prototype.close = function() {
  debug('close');
  this._cleanup();
  if (this.sendStop) {
    this.sendStop();
    this.sendStop = null;
  }
};

module.exports = BufferedSender;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],26:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , IframeTransport = require('../iframe')
  , objectUtils = require('../../utils/object')
  ;

module.exports = function(transport) {

  function IframeWrapTransport(transUrl, baseUrl) {
    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
  }

  inherits(IframeWrapTransport, IframeTransport);

  IframeWrapTransport.enabled = function(url, info) {
    if (!global.document) {
      return false;
    }

    var iframeInfo = objectUtils.extend({}, info);
    iframeInfo.sameOrigin = true;
    return transport.enabled(iframeInfo) && IframeTransport.enabled();
  };

  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
  IframeWrapTransport.needBody = true;
  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

  IframeWrapTransport.facadeTransport = transport;

  return IframeWrapTransport;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/object":49,"../iframe":22,"inherits":57}],27:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:polling');
}

function Polling(Receiver, receiveUrl, AjaxObject) {
  debug(receiveUrl);
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  debug('_scheduleReceiver');
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    debug('message', msg);
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    debug('close', code, reason, self.pollIsClosing);
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1006, reason);
        self.removeAllListeners();
      }
    }
  });
};

Polling.prototype.abort = function() {
  debug('abort');
  this.removeAllListeners();
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],28:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./polling')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.emit('close', code, reason);
    self.close();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  BufferedSender.prototype.close.call(this);
  debug('close');
  this.removeAllListeners();
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = SenderReceiver;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":55,"inherits":57}],29:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , EventSourceDriver = require('eventsource')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:eventsource');
}

function EventSourceReceiver(url) {
  debug(url);
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new EventSourceDriver(url);
  es.onmessage = function(e) {
    debug('message', e.data);
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function(e) {
    debug('error', es.readyState, e);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self._close(reason);
  };
}

inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function() {
  debug('cleanup');
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function(reason) {
  debug('close', reason);
  var self = this;
  // Safari and chrome < 15 crash if we close window before
  // waiting for ES cleanup. See:
  // https://code.google.com/p/chromium/issues/detail?id=89155
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"eventsource":18,"inherits":57}],30:[function(require,module,exports){
(function (process,global){
'use strict';

var inherits = require('inherits')
  , iframeUtils = require('../../utils/iframe')
  , urlUtils = require('../../utils/url')
  , EventEmitter = require('events').EventEmitter
  , random = require('../../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:htmlfile');
}

function HtmlfileReceiver(url) {
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function() {
      debug('start');
      self.iframeObj.loaded();
    }
  , message: function(data) {
      debug('message', data);
      self.emit('message', data);
    }
  , stop: function() {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructFunc(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function(reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in global) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}

HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

module.exports = HtmlfileReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],31:[function(require,module,exports){
(function (process,global){
'use strict';

var utils = require('../../utils/iframe')
  , random = require('../../utils/random')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:jsonp');
}

function JsonpReceiver(url) {
  debug(url);
  var self = this;
  EventEmitter.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

  global[utils.WPrefix][this.id] = this._callback.bind(this);
  this._createScript(urlWithId);

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.timeoutId = setTimeout(function() {
    debug('timeout');
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, JsonpReceiver.timeout);
}

inherits(JsonpReceiver, EventEmitter);

JsonpReceiver.prototype.abort = function() {
  debug('abort');
  if (global[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

JsonpReceiver.timeout = 35000;
JsonpReceiver.scriptErrorTimeout = 1000;

JsonpReceiver.prototype._callback = function(data) {
  debug('_callback', data);
  this._cleanup();

  if (this.aborting) {
    return;
  }

  if (data) {
    debug('message', data);
    this.emit('message', data);
  }
  this.emit('close', null, 'network');
  this.removeAllListeners();
};

JsonpReceiver.prototype._abort = function(err) {
  debug('_abort', err);
  this._cleanup();
  this.aborting = true;
  this.emit('close', err.code, err.message);
  this.removeAllListeners();
};

JsonpReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  clearTimeout(this.timeoutId);
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
  delete global[utils.WPrefix][this.id];
};

JsonpReceiver.prototype._scriptError = function() {
  debug('_scriptError');
  var self = this;
  if (this.errorTimer) {
    return;
  }

  this.errorTimer = setTimeout(function() {
    if (!self.loadedOkay) {
      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
    }
  }, JsonpReceiver.scriptErrorTimeout);
};

JsonpReceiver.prototype._createScript = function(url) {
  debug('_createScript', url);
  var self = this;
  var script = this.script = global.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  script.id = 'a' + random.string(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = this._scriptError.bind(this);
  script.onload = function() {
    debug('onload');
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  // IE9 fires 'error' event after onreadystatechange or before, in random order.
  // Use loadedOkay to determine if actually errored
  script.onreadystatechange = function() {
    debug('onreadystatechange', script.readyState);
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        self.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          script.onclick();
        } catch (x) {
          // intentionally empty
        }
      }
      if (script) {
        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };
  // IE: event/htmlFor/onclick trick.
  // One can't rely on proper order for onreadystatechange. In order to
  // make sure, set a 'htmlFor' and 'event' properties, so that
  // script code will be installed as 'onclick' handler for the
  // script object. Later, onreadystatechange, manually execute this
  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
  // set. For reference see:
  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
  // Also, read on that about script ordering:
  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  if (typeof script.async === 'undefined' && global.document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!browser.isOpera()) {
      // Naively assume we're in IE
      try {
        script.htmlFor = script.id;
        script.event = 'onclick';
      } catch (x) {
        // intentionally empty
      }
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = global.document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  var head = global.document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};

module.exports = JsonpReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],32:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:xhr');
}

function XhrReceiver(url, AjaxObject) {
  debug(url);
  EventEmitter.call(this);
  var self = this;

  this.bufferPosition = 0;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.once('finish', function(status, text) {
    debug('finish', status, text);
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    debug('close', reason);
    self.emit('close', null, reason);
    self._cleanup();
  });
}

inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function(status, text) {
  debug('_chunkHandler', status);
  if (status !== 200 || !text) {
    return;
  }

  for (var idx = -1; ; this.bufferPosition += idx + 1) {
    var buf = text.slice(this.bufferPosition);
    idx = buf.indexOf('\n');
    if (idx === -1) {
      break;
    }
    var msg = buf.slice(0, idx);
    if (msg) {
      debug('message', msg);
      this.emit('message', msg);
    }
  }
};

XhrReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  debug('abort');
  if (this.xo) {
    this.xo.close();
    debug('close');
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],33:[function(require,module,exports){
(function (process,global){
'use strict';

var random = require('../../utils/random')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:jsonp');
}

var form, area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return global.document.createElement('<iframe name="' + id + '">');
  } catch (x) {
    var iframe = global.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = global.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = global.document.createElement('textarea');
  area.name = 'd';
  form.appendChild(area);

  global.document.body.appendChild(form);
}

module.exports = function(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

  var iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.appendChild(iframe);

  try {
    area.value = payload;
  } catch (e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function(err) {
    debug('completed', id, err);
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
      debug('cleaning up', id);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(err);
  };
  iframe.onerror = function() {
    debug('onerror', id);
    completed();
  };
  iframe.onload = function() {
    debug('onload', id);
    completed();
  };
  iframe.onreadystatechange = function(e) {
    debug('onreadystatechange', id, iframe.readyState, e);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return function() {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/random":50,"../../utils/url":52,"debug":55}],34:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , eventUtils = require('../../utils/event')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self._start(method, url, payload);
  }, 0);
}

inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  debug('_start');
  var self = this;
  var xdr = new global.XDomainRequest();
  // IE caches even POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  xdr.onerror = function() {
    debug('onerror');
    self._error();
  };
  xdr.ontimeout = function() {
    debug('ontimeout');
    self._error();
  };
  xdr.onprogress = function() {
    debug('progress', xdr.responseText);
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    debug('load');
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = eventUtils.unloadAdd(function() {
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    if (this.timeout) {
      this.xdr.timeout = this.timeout;
    }
    this.xdr.send(payload);
  } catch (x) {
    this._error();
  }
};

XDRObject.prototype._error = function() {
  this.emit('finish', 0, '');
  this._cleanup(false);
};

XDRObject.prototype._cleanup = function(abort) {
  debug('cleanup', abort);
  if (!this.xdr) {
    return;
  }
  this.removeAllListeners();
  eventUtils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

// IE 8/9 if the request target uses the same scheme - #79
XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

module.exports = XDRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],35:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;

},{"../driver/xhr":17,"inherits":57}],36:[function(require,module,exports){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  ;

function XHRFake(/* method, url, payload, opts */) {
  var self = this;
  EventEmitter.call(this);

  this.to = setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, XHRFake.timeout);
}

inherits(XHRFake, EventEmitter);

XHRFake.prototype.close = function() {
  clearTimeout(this.to);
};

XHRFake.timeout = 2000;

module.exports = XHRFake;

},{"events":3,"inherits":57}],37:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;

},{"../driver/xhr":17,"inherits":57}],38:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('../utils/event')
  , urlUtils = require('../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , WebsocketDriver = require('./driver/websocket')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:websocket');
}

function WebSocketTransport(transUrl, ignore, options) {
  if (!WebSocketTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  EventEmitter.call(this);
  debug('constructor', transUrl);

  var self = this;
  var url = urlUtils.addPath(transUrl, '/websocket');
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url, [], options);
  this.ws.onmessage = function(e) {
    debug('message event', e.data);
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload');
    self.ws.close();
  });
  this.ws.onclose = function(e) {
    debug('close event', e.code, e.reason);
    self.emit('close', e.code, e.reason);
    self._cleanup();
  };
  this.ws.onerror = function(e) {
    debug('error event', e);
    self.emit('close', 1006, 'WebSocket connection broken');
    self._cleanup();
  };
}

inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  var msg = '[' + data + ']';
  debug('send', msg);
  this.ws.send(msg);
};

WebSocketTransport.prototype.close = function() {
  debug('close');
  var ws = this.ws;
  this._cleanup();
  if (ws) {
    ws.close();
  }
};

WebSocketTransport.prototype._cleanup = function() {
  debug('_cleanup');
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
  }
  utils.unloadDel(this.unloadRef);
  this.unloadRef = this.ws = null;
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  debug('enabled');
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":55,"events":3,"inherits":57}],39:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XdrStreamingTransport = require('./xdr-streaming')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40,"inherits":57}],40:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(info) {
  if (info.cookie_needed || info.nullOrigin) {
    return false;
  }
  return XDRObject.enabled && info.sameScheme;
};

XdrStreamingTransport.transportName = 'xdr-streaming';
XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"inherits":57}],41:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  ;

function XhrPollingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }

  if (XHRLocalObject.enabled && info.sameOrigin) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],42:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  , browser = require('../utils/browser')
  ;

function XhrStreamingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming #60
  // But it might be able to #92
  if (browser.isOpera()) {
    return false;
  }

  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
XhrStreamingTransport.needBody = !!global.document;

module.exports = XhrStreamingTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],43:[function(require,module,exports){
(function (global){
'use strict';

if (global.crypto && global.crypto.getRandomValues) {
  module.exports.randomBytes = function(length) {
    var bytes = new Uint8Array(length);
    global.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  module.exports.randomBytes = function(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],44:[function(require,module,exports){
(function (global){
'use strict';

module.exports = {
  isOpera: function() {
    return global.navigator &&
      /opera/i.test(global.navigator.userAgent);
  }

, isKonqueror: function() {
    return global.navigator &&
      /konqueror/i.test(global.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!global.document) {
      return true;
    }

    try {
      return !!global.document.domain;
    } catch (e) {
      return false;
    }
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],45:[function(require,module,exports){
'use strict';

var JSON3 = require('json3');

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex
var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
  , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unrollLookup = function(escapable) {
  var i;
  var unrolled = {};
  var c = [];
  for (i = 0; i < 65536; i++) {
    c.push( String.fromCharCode(i) );
  }
  escapable.lastIndex = 0;
  c.join('').replace(escapable, function(a) {
    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
module.exports = {
  quote: function(string) {
    var quoted = JSON3.stringify(string);

    // In most cases this should be very fast and good enough.
    extraEscapable.lastIndex = 0;
    if (!extraEscapable.test(quoted)) {
      return quoted;
    }

    if (!extraLookup) {
      extraLookup = unrollLookup(extraEscapable);
    }

    return quoted.replace(extraEscapable, function(a) {
      return extraLookup[a];
    });
  }
};

},{"json3":58}],46:[function(require,module,exports){
(function (global){
'use strict';

var random = require('./random');

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.addEventListener(event, listener, false);
    } else if (global.document && global.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      global.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      global.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.removeEventListener(event, listener, false);
    } else if (global.document && global.detachEvent) {
      global.document.detachEvent('on' + event, listener);
      global.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./random":50}],47:[function(require,module,exports){
(function (process,global){
'use strict';

var eventUtils = require('./event')
  , JSON3 = require('json3')
  , browser = require('./browser')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:iframe');
}

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(module.exports.WPrefix in global)) {
      global[module.exports.WPrefix] = {};
    }
  }

, postMessage: function(type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(JSON3.stringify({
        windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      debug('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function(iframeUrl, errorCallback) {
    var iframe = global.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      debug('unattach');
      clearTimeout(tref);
      // Explorer had problems with that.
      try {
        iframe.onload = null;
      } catch (x) {
        // intentionally empty
      }
      iframe.onerror = null;
    };
    var cleanup = function() {
      debug('cleanup');
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(err) {
      debug('onerror', err);
      if (iframe) {
        cleanup();
        errorCallback(err);
      }
    };
    var post = function(msg, origin) {
      debug('post', msg, origin);
      setTimeout(function() {
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
          }
        } catch (x) {
          // intentionally empty
        }
      }, 0);
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
      onerror('onerror');
    };
    iframe.onload = function() {
      debug('onload');
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function() {
        onerror('onload timeout');
      }, 2000);
    };
    global.document.body.appendChild(iframe);
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }

/* eslint no-undef: "off", new-cap: "off" */
, createHtmlfile: function(iframeUrl, errorCallback) {
    var axo = ['Active'].concat('Object').join('X');
    var doc = new global[axo]('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
      clearTimeout(tref);
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r) {
      debug('onerror', r);
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + global.document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    iframe.onerror = function() {
      onerror('onerror');
    };
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }
};

module.exports.iframeEnabled = false;
if (global.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
    typeof global.postMessage === 'object') && (!browser.isKonqueror());
}

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./browser":44,"./event":46,"debug":55,"json3":58}],48:[function(require,module,exports){
(function (global){
'use strict';

var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = global.console && global.console[level] && global.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return global.console[level].apply(global.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],49:[function(require,module,exports){
'use strict';

module.exports = {
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

, extend: function(obj) {
    if (!this.isObject(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};

},{}],50:[function(require,module,exports){
'use strict';

/* global crypto:true */
var crypto = require('crypto');

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = crypto.randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};

},{"crypto":43}],51:[function(require,module,exports){
(function (process){
'use strict';

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:transport');
}

module.exports = function(availableTransports) {
  return {
    filterToEnabled: function(transportsWhitelist, info) {
      var transports = {
        main: []
      , facade: []
      };
      if (!transportsWhitelist) {
        transportsWhitelist = [];
      } else if (typeof transportsWhitelist === 'string') {
        transportsWhitelist = [transportsWhitelist];
      }

      availableTransports.forEach(function(trans) {
        if (!trans) {
          return;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          return;
        }

        if (transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1) {
          debug('not in whitelist', trans.transportName);
          return;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      });
      return transports;
    }
  };
};

}).call(this,{ env: {} })

},{"debug":55}],52:[function(require,module,exports){
(function (process){
'use strict';

var URL = require('url-parse');

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:url');
}

module.exports = {
  getOrigin: function(url) {
    if (!url) {
      return null;
    }

    var p = new URL(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isOriginEqual: function(a, b) {
    var res = this.getOrigin(a) === this.getOrigin(b);
    debug('same', a, b, res);
    return res;
  }

, isSchemeEqual: function(a, b) {
    return (a.split(':')[0] === b.split(':')[0]);
  }

, addPath: function (url, path) {
    var qs = url.split('?');
    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
  }

, addQuery: function (url, q) {
    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
  }
};

}).call(this,{ env: {} })

},{"debug":55,"url-parse":61}],53:[function(require,module,exports){
module.exports = '1.4.0';

},{}],54:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],55:[function(require,module,exports){
(function (process){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = require('./common')(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};


}).call(this,{ env: {} })

},{"./common":56}],56:[function(require,module,exports){
"use strict";

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = require('ms');
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;


},{"ms":54}],57:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],58:[function(require,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],59:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

},{}],60:[function(require,module,exports){
'use strict';

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

},{}],61:[function(require,module,exports){
(function (global){
'use strict';

var required = require('requires-port')
  , qs = require('querystringify')
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var location = global && global.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.qs = qs;

module.exports = Url;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"querystringify":59,"requires-port":60}]},{},[1])(1)
});


//# sourceMappingURL=sockjs.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "./node_modules/sveltail/index.js":
/*!****************************************!*\
  !*** ./node_modules/sveltail/index.js ***!
  \****************************************/
/*! exports provided: Avatar, Banner, Bar, Button, Chip, Drawer, Icon, Image, Input, LayoutWeb, LayoutNative */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_components_Avatar_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/components/Avatar.svelte */ "./node_modules/sveltail/lib/components/Avatar.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Avatar", function() { return _lib_components_Avatar_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _lib_components_Banner_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/components/Banner.svelte */ "./node_modules/sveltail/lib/components/Banner.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Banner", function() { return _lib_components_Banner_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _lib_components_Bar_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/components/Bar.svelte */ "./node_modules/sveltail/lib/components/Bar.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bar", function() { return _lib_components_Bar_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _lib_components_Button_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/components/Button.svelte */ "./node_modules/sveltail/lib/components/Button.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _lib_components_Button_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _lib_components_Chip_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/components/Chip.svelte */ "./node_modules/sveltail/lib/components/Chip.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Chip", function() { return _lib_components_Chip_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _lib_components_Drawer_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/components/Drawer.svelte */ "./node_modules/sveltail/lib/components/Drawer.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drawer", function() { return _lib_components_Drawer_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _lib_components_Icon_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/components/Icon.svelte */ "./node_modules/sveltail/lib/components/Icon.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return _lib_components_Icon_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _lib_components_Image_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/components/Image.svelte */ "./node_modules/sveltail/lib/components/Image.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _lib_components_Image_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _lib_components_Input_svelte__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/components/Input.svelte */ "./node_modules/sveltail/lib/components/Input.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _lib_components_Input_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _lib_components_LayoutWeb_svelte__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/components/LayoutWeb.svelte */ "./node_modules/sveltail/lib/components/LayoutWeb.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutWeb", function() { return _lib_components_LayoutWeb_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _lib_components_LayoutNative_svelte__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/components/LayoutNative.svelte */ "./node_modules/sveltail/lib/components/LayoutNative.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutNative", function() { return _lib_components_LayoutNative_svelte__WEBPACK_IMPORTED_MODULE_10__["default"]; });














/***/ }),

/***/ "./node_modules/sveltail/lib/components/Avatar.svelte":
/*!************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Avatar.svelte ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.svelte */ "./node_modules/sveltail/lib/components/Icon.svelte");
/* harmony import */ var _Image_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Image.svelte */ "./node_modules/sveltail/lib/components/Image.svelte");
/* node_modules/sveltail/lib/components/Avatar.svelte generated by Svelte v3.30.0 */





const file = "node_modules/sveltail/lib/components/Avatar.svelte";

// (22:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_4(ctx) {
	let span;

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 22, 2, 892);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(22:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (26:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let div_class_value;
	let current;
	const if_block_creators = [create_if_block_1, create_if_block_2, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*props*/ ctx[0].icon) return 0;
		if (/*props*/ ctx[0].img) return 1;
		if (/*props*/ ctx[0].letter) return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx, -1))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block) if_block.c();

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", div_class_value = "\n        flex\n        justify-center\n        items-center\n        border\n        bg-" + /*props*/ ctx[0].colorBg + "\n        text-" + /*props*/ ctx[0].colorText + "\n        border-" + (/*props*/ ctx[0].colorBg === "transparent"
			? /*props*/ ctx[0].colorText
			: /*props*/ ctx[0].colorBg) + "\n        " + (/*props*/ ctx[0].circle ? "rounded-full" : "") + "\n        " + /*props*/ ctx[0].height + " \n        " + /*props*/ ctx[0].width + "\n        " + /*props*/ ctx[0].class + "\n      ");

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 26, 4, 993);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (if_block) if_block.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(26:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

// (46:29) 
function create_if_block_3(ctx) {
	let span;
	let t_value = /*props*/ ctx[0].letter + "";
	let t;

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(span, "font-size", /*props*/ ctx[0].fontSize + "px");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 46, 8, 1529);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span, t);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(46:29) ",
		ctx
	});

	return block;
}

// (44:26) 
function create_if_block_2(ctx) {
	let image;
	let current;

	image = new _Image_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: { img: /*props*/ ctx[0].img },
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(image.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(image, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(image.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(image.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(image, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(44:26) ",
		ctx
	});

	return block;
}

// (42:6) {#if props.icon}
function create_if_block_1(ctx) {
	let icon;
	let current;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				icon: /*props*/ ctx[0].icon,
				size: /*$$props*/ ctx[1].size
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*$$props*/ 2) icon_changes.size = /*$$props*/ ctx[1].size;
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(42:6) {#if props.icon}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (true) if_block1.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Avatar", slots, []);
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		class: helpers.isString($$props.class) ? $$props.class : "",
		icon: helpers.getIcon($$props.icon),
		img: helpers.isString($$props.img) ? $$props.img : null,
		letter: helpers.isString($$props.letter)
		? String($$props.letter).toUpperCase().substr(0, 1)
		: null,
		circle: helpers.getBoolean($$props.circle),
		colorBg: helpers.getColor($$props.colorBg, "primary"),
		colorText: helpers.getColor($$props.colorText, "white"),
		height: helpers.getHeight($$props.size, "md"),
		width: helpers.getWidth($$props.size, "md"),
		fontSize: helpers.getFontSize($$props.size, "md")
	};

	$$self.$$set = $$new_props => {
		$$invalidate(1, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
	};

	$$self.$capture_state = () => ({ getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"], Icon: _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"], Image: _Image_svelte__WEBPACK_IMPORTED_MODULE_3__["default"], helpers, props });

	$$self.$inject_state = $$new_props => {
		$$invalidate(1, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);
	return [props, $$props];
}

class Avatar extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Avatar",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Avatar);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Banner.svelte":
/*!************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Banner.svelte ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.svelte */ "./node_modules/sveltail/lib/components/Icon.svelte");
/* node_modules/sveltail/lib/components/Banner.svelte generated by Svelte v3.30.0 */




const file = "node_modules/sveltail/lib/components/Banner.svelte";

// (40:8) {#if props.icon}
function create_if_block_3(ctx) {
	let icon;
	let current;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				icon: /*props*/ ctx[1].icon,
				size: "md",
				class: "ml-1 mr-4"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(40:8) {#if props.icon}",
		ctx
	});

	return block;
}

// (42:10) {#if props.title}
function create_if_block_2(ctx) {
	let p;

	const block = {
		c: function create() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.textContent = `${/*props*/ ctx[1].title}`;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(p, "class", "font-bold");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 41, 27, 1161);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, p, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(p);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(42:10) {#if props.title}",
		ctx
	});

	return block;
}

// (43:10) {#if props.message}
function create_if_block_1(ctx) {
	let p;

	const block = {
		c: function create() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.textContent = `${/*props*/ ctx[1].message}`;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 42, 29, 1234);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, p, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(p);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(43:10) {#if props.message}",
		ctx
	});

	return block;
}

// (47:6) {#if props.dismissable}
function create_if_block(ctx) {
	let div;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				class: "ml-4 mr-1 cursor-pointer",
				icon: "fas fa-times-circle",
				size: "sm"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 47, 8, 1347);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, div, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(div, "click", /*dismiss*/ ctx[2], false, false, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(47:6) {#if props.dismissable}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div3;
	let div2;
	let div1;
	let t0;
	let div0;
	let t1;
	let t2;
	let t3;
	let div3_class_value;
	let current;
	let if_block0 = /*props*/ ctx[1].icon && create_if_block_3(ctx);
	let if_block1 = /*props*/ ctx[1].title && create_if_block_2(ctx);
	let if_block2 = /*props*/ ctx[1].message && create_if_block_1(ctx);
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
	let if_block3 = /*props*/ ctx[1].dismissable && create_if_block(ctx);

	const block = {
		c: function create() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block1) if_block1.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (default_slot) default_slot.c();
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block3) if_block3.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 40, 8, 1128);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "flex items-center");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 38, 6, 1004);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "flex justify-between items-center");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 37, 4, 950);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "role", "alert");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", div3_class_value = "\n      w-full\n      px-4\n      py-2\n      bg-" + /*props*/ ctx[1].colorBg + "\n      text-" + /*props*/ ctx[1].color + "\n      " + /*props*/ ctx[1].class + "\n    ");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 25, 2, 774);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			if (if_block0) if_block0.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);
			if (if_block1) if_block1.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t1);
			if (if_block2) if_block2.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t2);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t3);
			if (if_block3) if_block3.m(div2, null);
			/*div3_binding*/ ctx[5](div3);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*props*/ ctx[1].icon) if_block0.p(ctx, dirty);
			if (/*props*/ ctx[1].title) if_block1.p(ctx, dirty);
			if (/*props*/ ctx[1].message) if_block2.p(ctx, dirty);

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 8) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
				}
			}

			if (/*props*/ ctx[1].dismissable) if_block3.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(default_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block3);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(default_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block3);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div3);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (default_slot) default_slot.d(detaching);
			if (if_block3) if_block3.d();
			/*div3_binding*/ ctx[5](null);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Banner", slots, ['default']);
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		class: helpers.isString($$props.class) ? $$props.class : "",
		title: helpers.isString($$props.title) ? $$props.title : null,
		message: helpers.isString($$props.message)
		? $$props.message
		: null,
		icon: helpers.getIcon($$props.icon),
		dismissable: helpers.getBoolean($$props.dismissable),
		colorBg: helpers.getColor($$props.colorBg, "info"),
		colorText: helpers.getColor($$props.colorText, "white")
	};

	let banner;

	const dismiss = () => {
		if (true) {
			if (banner) banner.remove();
		}
	};

	function div3_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"][$$value ? "unshift" : "push"](() => {
			banner = $$value;
			$$invalidate(0, banner);
		});
	}

	$$self.$$set = $$new_props => {
		$$invalidate(7, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
		if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		Icon: _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		helpers,
		props,
		banner,
		dismiss
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(7, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
		if ("banner" in $$props) $$invalidate(0, banner = $$new_props.banner);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);
	return [banner, props, dismiss, $$scope, slots, div3_binding];
}

class Banner extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Banner",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Banner);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Bar.svelte":
/*!*********************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Bar.svelte ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _Button_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button.svelte */ "./node_modules/sveltail/lib/components/Button.svelte");
/* harmony import */ var _Image_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Image.svelte */ "./node_modules/sveltail/lib/components/Image.svelte");
/* node_modules/sveltail/lib/components/Bar.svelte generated by Svelte v3.30.0 */





const file = "node_modules/sveltail/lib/components/Bar.svelte";
const get_nav_end_slot_changes_1 = dirty => ({});
const get_nav_end_slot_context_1 = ctx => ({});
const get_nav_middle_slot_changes_1 = dirty => ({});
const get_nav_middle_slot_context_1 = ctx => ({});
const get_nav_start_slot_changes_1 = dirty => ({});
const get_nav_start_slot_context_1 = ctx => ({});
const get_nav_end_slot_changes = dirty => ({});
const get_nav_end_slot_context = ctx => ({});
const get_nav_middle_slot_changes = dirty => ({});
const get_nav_middle_slot_context = ctx => ({});
const get_nav_start_slot_changes = dirty => ({});
const get_nav_start_slot_context = ctx => ({});

// (28:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_5(ctx) {
	let actionBar;
	let t0;
	let stackLayout;
	let t1;
	let actionBar_backgroundcolor_value;
	let current;
	let if_block0 = /*props*/ ctx[1].leftMenu && create_if_block_8(ctx);
	const nav_middle_slot_template = /*#slots*/ ctx[6]["nav-middle"];
	const nav_middle_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(nav_middle_slot_template, ctx, /*$$scope*/ ctx[5], get_nav_middle_slot_context);
	const nav_middle_slot_or_fallback = nav_middle_slot || fallback_block_1(ctx);
	let if_block1 = /*props*/ ctx[1].rightMenu && create_if_block_6(ctx);

	const block = {
		c: function create() {
			actionBar = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("actionBar");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			stackLayout = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("stackLayout");
			if (nav_middle_slot_or_fallback) nav_middle_slot_or_fallback.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(stackLayout, "orientation", "horizontal");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(stackLayout, file, 38, 4, 1385);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(actionBar, "backgroundcolor", actionBar_backgroundcolor_value = /*helpers*/ ctx[0].getColor("brand"));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(actionBar, file, 28, 2, 989);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, actionBar, anchor);
			if (if_block0) if_block0.m(actionBar, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(actionBar, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(actionBar, stackLayout);

			if (nav_middle_slot_or_fallback) {
				nav_middle_slot_or_fallback.m(stackLayout, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(actionBar, t1);
			if (if_block1) if_block1.m(actionBar, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[1].leftMenu) if_block0.p(ctx, dirty);

			if (nav_middle_slot) {
				if (nav_middle_slot.p && dirty & /*$$scope*/ 32) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(nav_middle_slot, nav_middle_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_nav_middle_slot_changes, get_nav_middle_slot_context);
				}
			}

			if (/*props*/ ctx[1].rightMenu) if_block1.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(nav_middle_slot_or_fallback, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(nav_middle_slot_or_fallback, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(actionBar);
			if (if_block0) if_block0.d();
			if (nav_middle_slot_or_fallback) nav_middle_slot_or_fallback.d(detaching);
			if (if_block1) if_block1.d();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(28:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (31:4) {#if props.leftMenu}
function create_if_block_8(ctx) {
	let actionItem;
	let button;
	let t;
	let current;

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				colorBg: "current",
				colorText: "white",
				icon: "fas fa-bars f0c9",
				size: "md",
				flat: true
			},
			$$inline: true
		});

	button.$on("click", /*leftMenuClicked*/ ctx[2]);
	const nav_start_slot_template = /*#slots*/ ctx[6]["nav-start"];
	const nav_start_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(nav_start_slot_template, ctx, /*$$scope*/ ctx[5], get_nav_start_slot_context);

	const block = {
		c: function create() {
			actionItem = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("actionItem");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (nav_start_slot) nav_start_slot.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(actionItem, "ios.position", "left");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(actionItem, "android.position", "actionBar");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(actionItem, file, 31, 6, 1100);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, actionItem, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, actionItem, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(actionItem, t);

			if (nav_start_slot) {
				nav_start_slot.m(actionItem, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (nav_start_slot) {
				if (nav_start_slot.p && dirty & /*$$scope*/ 32) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(nav_start_slot, nav_start_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_nav_start_slot_changes, get_nav_start_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(nav_start_slot, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(nav_start_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(actionItem);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
			if (nav_start_slot) nav_start_slot.d(detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(31:4) {#if props.leftMenu}",
		ctx
	});

	return block;
}

// (44:8) {#if props.title}
function create_if_block_7(ctx) {
	let label;
	let label_text_value;
	let label_color_value;

	const block = {
		c: function create() {
			label = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(label, "text", label_text_value = /*props*/ ctx[1].title);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(label, "fontsize", "25");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(label, "for", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(label, "color", label_color_value = /*helpers*/ ctx[0].getColor("white"));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(label, file, 43, 25, 1637);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, label, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(label);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(44:8) {#if props.title}",
		ctx
	});

	return block;
}

// (41:30)          
function fallback_block_1(ctx) {
	let image;
	let t;
	let if_block_anchor;
	let current;

	image = new _Image_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				src: "res://" + /*props*/ ctx[1].img,
				stretch: "aspectFill",
				height: "25",
				class: "m-x-10"
			},
			$$inline: true
		});

	let if_block = /*props*/ ctx[1].title && create_if_block_7(ctx);

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(image.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(image, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[1].title) if_block.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(image.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(image.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(image, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: fallback_block_1.name,
		type: "fallback",
		source: "(41:30)          ",
		ctx
	});

	return block;
}

// (49:4) {#if props.rightMenu}
function create_if_block_6(ctx) {
	let actionItem;
	let t;
	let button;
	let current;
	const nav_end_slot_template = /*#slots*/ ctx[6]["nav-end"];
	const nav_end_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(nav_end_slot_template, ctx, /*$$scope*/ ctx[5], get_nav_end_slot_context);

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				colorBg: "current",
				colorText: "white",
				icon: "fas fa-bars f0c9",
				size: "md",
				flat: true
			},
			$$inline: true
		});

	button.$on("click", /*leftMenuClicked*/ ctx[2]);

	const block = {
		c: function create() {
			actionItem = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("actionItem");
			if (nav_end_slot) nav_end_slot.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(actionItem, "ios.position", "right");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(actionItem, "android.position", "popup");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(actionItem, file, 49, 6, 1815);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, actionItem, anchor);

			if (nav_end_slot) {
				nav_end_slot.m(actionItem, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(actionItem, t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, actionItem, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (nav_end_slot) {
				if (nav_end_slot.p && dirty & /*$$scope*/ 32) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(nav_end_slot, nav_end_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_nav_end_slot_changes, get_nav_end_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(nav_end_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(nav_end_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(actionItem);
			if (nav_end_slot) nav_end_slot.d(detaching);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(49:4) {#if props.rightMenu}",
		ctx
	});

	return block;
}

// (59:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block(ctx) {
	let nav;
	let div0;
	let t0;
	let t1;
	let div1;
	let t2;
	let div2;
	let t3;
	let nav_class_value;
	let current;
	let if_block0 = /*props*/ ctx[1].leftMenu && create_if_block_4(ctx);
	const nav_start_slot_template = /*#slots*/ ctx[6]["nav-start"];
	const nav_start_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(nav_start_slot_template, ctx, /*$$scope*/ ctx[5], get_nav_start_slot_context_1);
	const nav_start_slot_or_fallback = nav_start_slot || fallback_block(ctx);
	const nav_middle_slot_template = /*#slots*/ ctx[6]["nav-middle"];
	const nav_middle_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(nav_middle_slot_template, ctx, /*$$scope*/ ctx[5], get_nav_middle_slot_context_1);
	const nav_end_slot_template = /*#slots*/ ctx[6]["nav-end"];
	const nav_end_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(nav_end_slot_template, ctx, /*$$scope*/ ctx[5], get_nav_end_slot_context_1);
	let if_block1 = /*props*/ ctx[1].rightMenu && create_if_block_1(ctx);

	const block = {
		c: function create() {
			nav = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("nav");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (nav_start_slot_or_fallback) nav_start_slot_or_fallback.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (nav_middle_slot) nav_middle_slot.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (nav_end_slot) nav_end_slot.c();
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "flex items-center justify-start");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 60, 4, 2287);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "flex items-center justify-start");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 76, 4, 3016);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "flex flex-1 items-center justify-end");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 81, 4, 3139);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(nav, "class", nav_class_value = "z-20 w-full flex items-center py-2 " + /*props*/ ctx[1].class + " " + (/*props*/ ctx[1].dense ? "h-12" : "h-16"));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(nav, file, 59, 2, 2188);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, nav, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, div0);
			if (if_block0) if_block0.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t0);

			if (nav_start_slot_or_fallback) {
				nav_start_slot_or_fallback.m(div0, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, div1);

			if (nav_middle_slot) {
				nav_middle_slot.m(div1, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, div2);

			if (nav_end_slot) {
				nav_end_slot.m(div2, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t3);
			if (if_block1) if_block1.m(div2, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[1].leftMenu) if_block0.p(ctx, dirty);

			if (nav_start_slot) {
				if (nav_start_slot.p && dirty & /*$$scope*/ 32) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(nav_start_slot, nav_start_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_nav_start_slot_changes_1, get_nav_start_slot_context_1);
				}
			}

			if (nav_middle_slot) {
				if (nav_middle_slot.p && dirty & /*$$scope*/ 32) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(nav_middle_slot, nav_middle_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_nav_middle_slot_changes_1, get_nav_middle_slot_context_1);
				}
			}

			if (nav_end_slot) {
				if (nav_end_slot.p && dirty & /*$$scope*/ 32) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(nav_end_slot, nav_end_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_nav_end_slot_changes_1, get_nav_end_slot_context_1);
				}
			}

			if (/*props*/ ctx[1].rightMenu) if_block1.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(nav_start_slot_or_fallback, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(nav_middle_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(nav_end_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(nav_start_slot_or_fallback, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(nav_middle_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(nav_end_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(nav);
			if (if_block0) if_block0.d();
			if (nav_start_slot_or_fallback) nav_start_slot_or_fallback.d(detaching);
			if (nav_middle_slot) nav_middle_slot.d(detaching);
			if (nav_end_slot) nav_end_slot.d(detaching);
			if (if_block1) if_block1.d();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(59:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

// (63:6) {#if props.leftMenu}
function create_if_block_4(ctx) {
	let button;
	let current;

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				colorBg: "brand",
				colorText: "white",
				icon: "fas fa-bars f0c9",
				size: /*props*/ ctx[1].dense ? "sm" : "md",
				flat: true
			},
			$$inline: true
		});

	button.$on("click", /*leftMenuClicked*/ ctx[2]);

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(63:6) {#if props.leftMenu}",
		ctx
	});

	return block;
}

// (71:10) {#if props.img}
function create_if_block_3(ctx) {
	let image;
	let current;

	image = new _Image_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				img: "assets/" + /*props*/ ctx[1].img,
				class: "object-contain mr-2 " + (/*props*/ ctx[1].dense ? "h-8" : "h-12")
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(image.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(image, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(image.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(image.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(image, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(71:10) {#if props.img}",
		ctx
	});

	return block;
}

// (72:10) {#if props.title}
function create_if_block_2(ctx) {
	let span;

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span.textContent = `${/*props*/ ctx[1].title}`;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", "font-semibold text-xl tracking-tight");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 71, 27, 2894);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(72:10) {#if props.title}",
		ctx
	});

	return block;
}

// (68:29)          
function fallback_block(ctx) {
	let div;
	let t;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*props*/ ctx[1].img && create_if_block_3(ctx);
	let if_block1 = /*props*/ ctx[1].title && create_if_block_2(ctx);

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "flex items-center justify-start mx-3 cursor-pointer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 69, 8, 2653);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
			if (if_block1) if_block1.m(div, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(div, "click", /*brandClicked*/ ctx[4], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[1].img) if_block0.p(ctx, dirty);
			if (/*props*/ ctx[1].title) if_block1.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: fallback_block.name,
		type: "fallback",
		source: "(68:29)          ",
		ctx
	});

	return block;
}

// (87:6) {#if props.rightMenu}
function create_if_block_1(ctx) {
	let button;
	let current;

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				colorBg: "brand",
				colorText: "white",
				icon: "fas fa-bars f0c9",
				size: /*props*/ ctx[1].dense ? "sm" : "md",
				flat: true
			},
			$$inline: true
		});

	button.$on("click", /*rightMenuClicked*/ ctx[3]);

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(87:6) {#if props.rightMenu}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (false) {}
			if (true) if_block1.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Bar", slots, ['nav-start','nav-middle','nav-end']);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		class: helpers.isString($$props.class)
		? $$props.class
		: "bg-brand text-white",
		img: helpers.isString($$props.img) ? $$props.img : null,
		title: helpers.isString($$props.title) ? $$props.title : null,
		leftMenu: helpers.getBoolean($$props.leftMenu),
		rightMenu: helpers.getBoolean($$props.rightMenu),
		dense: helpers.getBoolean($$props.dense)
	};

	const leftMenuClicked = () => {
		dispatch("leftMenuClicked");
	};

	const rightMenuClicked = () => {
		dispatch("rightMenuClicked");
	};

	const brandClicked = () => {
		dispatch("brandClicked");
	};

	$$self.$$set = $$new_props => {
		$$invalidate(8, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		Button: _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Image: _Image_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		dispatch,
		helpers,
		props,
		leftMenuClicked,
		rightMenuClicked,
		brandClicked
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(8, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);

	return [
		helpers,
		props,
		leftMenuClicked,
		rightMenuClicked,
		brandClicked,
		$$scope,
		slots
	];
}

class Bar extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Bar",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Bar);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Button.svelte":
/*!************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Button.svelte ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.svelte */ "./node_modules/sveltail/lib/components/Icon.svelte");
/* node_modules/sveltail/lib/components/Button.svelte generated by Svelte v3.30.0 */




const file = "node_modules/sveltail/lib/components/Button.svelte";

// (29:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_4(ctx) {
	let button;
	let formattedString;
	let t0;
	let t1;
	let formattedString_color_value;
	let button_backgroundcolor_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*props*/ ctx[1].icon && create_if_block_7(ctx);
	let if_block1 = /*props*/ ctx[1].label && create_if_block_6(ctx);
	let if_block2 = /*props*/ ctx[1].iconRight && create_if_block_5(ctx);

	const block = {
		c: function create() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			formattedString = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("formattedString");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(formattedString, "color", formattedString_color_value = /*props*/ ctx[1].colorText);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(formattedString, file, 30, 4, 1157);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(button, "backgroundcolor", button_backgroundcolor_value = /*props*/ ctx[1].colorBg);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(button, file, 29, 2, 1094);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, button, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, formattedString);
			if (if_block0) if_block0.m(formattedString, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(formattedString, t0);
			if (if_block1) if_block1.m(formattedString, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(formattedString, t1);
			if (if_block2) if_block2.m(formattedString, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(button, "tap", /*onClick*/ ctx[2], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[1].icon) if_block0.p(ctx, dirty);
			if (/*props*/ ctx[1].label) if_block1.p(ctx, dirty);
			if (/*props*/ ctx[1].iconRight) if_block2.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(button);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(29:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (32:6) {#if props.icon}
function create_if_block_7(ctx) {
	let icon;
	let current;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				icon: /*props*/ ctx[1].icon.text,
				class: /*props*/ ctx[1].icon.class
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(32:6) {#if props.icon}",
		ctx
	});

	return block;
}

// (33:6) {#if props.label}
function create_if_block_6(ctx) {
	let span;
	let span_text_value;

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "text", span_text_value = /*props*/ ctx[1].label);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 32, 23, 1306);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(33:6) {#if props.label}",
		ctx
	});

	return block;
}

// (34:6) {#if props.iconRight}
function create_if_block_5(ctx) {
	let icon;
	let current;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				icon: /*props*/ ctx[1].iconRight.text,
				class: /*props*/ ctx[1].iconRight.class
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(34:6) {#if props.iconRight}",
		ctx
	});

	return block;
}

// (39:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block(ctx) {
	let div1;
	let button;
	let div0;
	let div0_class_value;
	let t0;
	let t1;
	let t2;
	let button_class_value;
	let button_aria_label_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*props*/ ctx[1].icon && create_if_block_3(ctx);
	let if_block1 = /*props*/ ctx[1].label && create_if_block_2(ctx);
	let if_block2 = /*props*/ ctx[1].iconRight && create_if_block_1(ctx);

	const block = {
		c: function create() {
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", div0_class_value = "ripple bg-" + (/*props*/ ctx[1].colorBg === "transparent"
			? /*props*/ ctx[1].colorText
			: /*props*/ ctx[1].colorBg));

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 62, 6, 2282);

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(button, "class", button_class_value = "\n        flex\n        justify-center\n        items-center\n        relative\n        focus:outline-none\n        hover:opacity-90\n        bg-" + /*props*/ ctx[1].colorBg + "\n        text-" + /*props*/ ctx[1].colorText + "       \n        " + (/*props*/ ctx[1].flat
			? ""
			: `border border-${/*props*/ ctx[1].colorBg === "transparent"
				? /*props*/ ctx[1].colorText
				: /*props*/ ctx[1].colorBg}`) + "\n        " + (/*props*/ ctx[1].rounded || /*props*/ ctx[1].pill
			? "rounded"
			: "") + "\n        " + (/*props*/ ctx[1].pill || /*props*/ ctx[1].circle
			? "rounded-full"
			: "") + "\n        " + (/*props*/ ctx[1].pill ? "p-4" : "p-2") + "\n        " + (/*props*/ ctx[1].circle ? /*props*/ ctx[1].width : "") + "\n        " + /*props*/ ctx[1].height + "\n        " + /*props*/ ctx[1].class + "\n      ");

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(button, "aria-label", button_aria_label_value = /*props*/ ctx[1].label
			? `Button ${/*props*/ ctx[1].label}`
			: "Action Button");

			button.disabled = /*loading*/ ctx[0];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(button, file, 40, 4, 1573);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 39, 2, 1563);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, button);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, t0);
			if (if_block0) if_block0.m(button, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, t1);
			if (if_block1) if_block1.m(button, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, t2);
			if (if_block2) if_block2.m(button, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(button, "click", /*onClick*/ ctx[2], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[1].icon) if_block0.p(ctx, dirty);
			if (/*props*/ ctx[1].label) if_block1.p(ctx, dirty);
			if (/*props*/ ctx[1].iconRight) if_block2.p(ctx, dirty);

			if (!current || dirty & /*loading*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prop_dev"])(button, "disabled", /*loading*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div1);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(39:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

// (64:6) {#if props.icon}
function create_if_block_3(ctx) {
	let icon;
	let current;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				icon: /*props*/ ctx[1].icon,
				class: "mx-1",
				size: /*$$props*/ ctx[3].size
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*$$props*/ 8) icon_changes.size = /*$$props*/ ctx[3].size;
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(64:6) {#if props.icon}",
		ctx
	});

	return block;
}

// (67:6) {#if props.label}
function create_if_block_2(ctx) {
	let div;
	let t_value = /*props*/ ctx[1].label + "";
	let t;
	let div_class_value;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", div_class_value = "" + (/*props*/ ctx[1].textSize + " whitespace-nowrap"));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 66, 23, 2502);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(67:6) {#if props.label}",
		ctx
	});

	return block;
}

// (68:6) {#if props.iconRight}
function create_if_block_1(ctx) {
	let icon;
	let current;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				icon: /*props*/ ctx[1].iconRight,
				class: "mx-1",
				size: /*$$props*/ ctx[3].size
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*$$props*/ 8) icon_changes.size = /*$$props*/ ctx[3].size;
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(68:6) {#if props.iconRight}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (false) {}
			if (true) if_block1.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Button", slots, []);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		class: helpers.isString($$props.class) ? $$props.class : "",
		label: helpers.isString($$props.label) ? $$props.label : null,
		icon: helpers.getIcon($$props.icon),
		iconRight: helpers.getIcon($$props.iconRight),
		flat: helpers.getBoolean($$props.flat),
		circle: helpers.getBoolean($$props.circle),
		rounded: helpers.getBoolean($$props.rounded),
		pill: helpers.getBoolean($$props.pill),
		colorBg: helpers.getColor($$props.colorBg, "primary"),
		colorText: helpers.getColor($$props.colorText, "white"),
		height: helpers.getHeight($$props.size, "md"),
		width: helpers.getWidth($$props.size, "md"),
		textSize: helpers.getTextSize($$props.size, "md")
	};

	const onClick = () => {
		dispatch("click");
	};

	let { loading = false } = $$props;

	$$self.$$set = $$new_props => {
		$$invalidate(3, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
		if ("loading" in $$new_props) $$invalidate(0, loading = $$new_props.loading);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		Icon: _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		dispatch,
		helpers,
		props,
		onClick,
		loading
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(3, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
		if ("loading" in $$props) $$invalidate(0, loading = $$new_props.loading);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);
	return [loading, props, onClick, $$props];
}

class Button extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { loading: 0 });

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment.name
		});
	}

	get loading() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set loading(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Button);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Chip.svelte":
/*!**********************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Chip.svelte ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.svelte */ "./node_modules/sveltail/lib/components/Icon.svelte");
/* node_modules/sveltail/lib/components/Chip.svelte generated by Svelte v3.30.0 */




const file = "node_modules/sveltail/lib/components/Chip.svelte";

// (29:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_4(ctx) {
	let span;

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 29, 2, 945);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(29:0) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (33:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block(ctx) {
	let div;
	let t0;
	let t1;
	let div_class_value;
	let div_resize_listener;
	let current;
	let if_block0 = /*props*/ ctx[2].icon && create_if_block_3(ctx);
	let if_block1 = /*props*/ ctx[2].label && create_if_block_2(ctx);
	let if_block2 = /*props*/ ctx[2].dismissable && create_if_block_1(ctx);

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", div_class_value = "\n      inline-flex\n      justify-center\n      items-center\n      border\n      rounded\n      py-2\n      bg-" + /*props*/ ctx[2].colorBg + "\n      text-" + /*props*/ ctx[2].colorText + "\n      border-" + (/*props*/ ctx[2].colorBg === "transparent"
			? /*props*/ ctx[2].colorText
			: /*props*/ ctx[2].colorBg) + "\n      " + (/*props*/ ctx[2].pill ? "rounded-full px-4" : "px-2") + "\n      " + /*props*/ ctx[2].class + "\n      " + /*props*/ ctx[2].textSize + "\n    ");

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*div_elementresize_handler*/ ctx[6].call(div));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 33, 2, 1044);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t0);
			if (if_block1) if_block1.m(div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t1);
			if (if_block2) if_block2.m(div, null);
			/*div_binding*/ ctx[5](div);
			div_resize_listener = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_resize_listener"])(div, /*div_elementresize_handler*/ ctx[6].bind(div));
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[2].icon) if_block0.p(ctx, dirty);
			if (/*props*/ ctx[2].label) if_block1.p(ctx, dirty);
			if (/*props*/ ctx[2].dismissable) if_block2.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			/*div_binding*/ ctx[5](null);
			div_resize_listener();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(33:0) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

// (52:4) {#if props.icon}
function create_if_block_3(ctx) {
	let icon;
	let current;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				icon: /*props*/ ctx[2].icon,
				class: "ml-1 mr-2",
				size: /*$$props*/ ctx[4].size
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*$$props*/ 16) icon_changes.size = /*$$props*/ ctx[4].size;
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(52:4) {#if props.icon}",
		ctx
	});

	return block;
}

// (53:4) {#if props.label}
function create_if_block_2(ctx) {
	let div;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div.textContent = `${/*props*/ ctx[2].label}`;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 52, 21, 1566);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(53:4) {#if props.label}",
		ctx
	});

	return block;
}

// (54:4) {#if props.dismissable}
function create_if_block_1(ctx) {
	let div;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				class: "ml-4 mr-1 cursor-pointer",
				icon: "fas fa-times-circle",
				fontSize: /*chipHeight*/ ctx[1] / 3
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 54, 6, 1630);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, div, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(div, "click", /*dismiss*/ ctx[3], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*chipHeight*/ 2) icon_changes.fontSize = /*chipHeight*/ ctx[1] / 3;
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(54:4) {#if props.dismissable}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (true) if_block1.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Chip", slots, []);
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		class: helpers.isString($$props.class) ? $$props.class : "",
		icon: helpers.getIcon($$props.icon),
		label: helpers.isString($$props.label) ? $$props.label : null,
		pill: helpers.getBoolean($$props.pill),
		dismissable: helpers.getBoolean($$props.dismissable),
		colorBg: helpers.getColor($$props.colorBg, "primary"),
		colorText: helpers.getColor($$props.colorText, "white"),
		height: helpers.getHeight($$props.size, "md"),
		textSize: helpers.getTextSize($$props.size, "md")
	};

	let chip;
	let chipHeight;

	const dismiss = () => {
		if (true) {
			if (chip) chip.remove();
		}
	};

	function div_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"][$$value ? "unshift" : "push"](() => {
			chip = $$value;
			$$invalidate(0, chip);
		});
	}

	function div_elementresize_handler() {
		chipHeight = this.clientHeight;
		$$invalidate(1, chipHeight);
	}

	$$self.$$set = $$new_props => {
		$$invalidate(4, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
	};

	$$self.$capture_state = () => ({
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		Icon: _Icon_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		helpers,
		props,
		chip,
		chipHeight,
		dismiss
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(4, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
		if ("chip" in $$props) $$invalidate(0, chip = $$new_props.chip);
		if ("chipHeight" in $$props) $$invalidate(1, chipHeight = $$new_props.chipHeight);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);

	return [
		chip,
		chipHeight,
		props,
		dismiss,
		$$props,
		div_binding,
		div_elementresize_handler
	];
}

class Chip extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Chip",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Chip);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Drawer.svelte":
/*!************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Drawer.svelte ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* node_modules/sveltail/lib/components/Drawer.svelte generated by Svelte v3.30.0 */



const file = "node_modules/sveltail/lib/components/Drawer.svelte";

// (37:0) {#if visible}
function create_if_block(ctx) {
	let if_block_anchor;
	let current;
	let if_block =  true && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (true) if_block.p(ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(37:0) {#if visible}",
		ctx
	});

	return block;
}

// (38:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block_1(ctx) {
	let div2;
	let div0;
	let t0;
	let aside;
	let div1;
	let t1;
	let div1_class_value;
	let aside_class_value;
	let aside_intro;
	let aside_outro;
	let current;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			aside = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("aside");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Hello World");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "fixed bg-black dark:bg-white inset-0 opacity-50");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 39, 6, 992);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", div1_class_value = "h-full w-full p-5 " + /*props*/ ctx[3].class);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 45, 8, 1349);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(aside, "class", aside_class_value = "fixed w-80 h-full bg-white text-black dark:bg-black dark:text-white " + (/*props*/ ctx[3].right ? "right-0" : ""));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(aside, file, 40, 6, 1078);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "absolute z-10 h-screen w-screen top-0 left-0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 38, 4, 927);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, aside);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(aside, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t1);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(div0, "click", /*hide*/ ctx[0], false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		i: function intro(local) {
			if (current) return;

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
				if (aside_outro) aside_outro.end(1);

				if (!aside_intro) aside_intro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_in_transition"])(aside, /*fly*/ ctx[2], {
					x: /*props*/ ctx[3].right ? 200 : -200,
					duration: 500
				});

				aside_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (aside_intro) aside_intro.invalidate();

			aside_outro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_out_transition"])(aside, /*fly*/ ctx[2], {
				x: /*props*/ ctx[3].right ? 200 : -200,
				duration: 500
			});

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div2);
			if (detaching && aside_outro) aside_outro.end();
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(38:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*visible*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*visible*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*visible*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Drawer", slots, []);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		class: helpers.isString($$props.class) ? $$props.class : "",
		right: helpers.getBoolean($$props.right)
	};

	const emitEvent = vis => {
		if (vis) dispatch("show"); else dispatch("hide");
	};

	let visible = false;

	const show = () => {
		$$invalidate(1, visible = true);
		dispatch("show");
	};

	const hide = () => {
		$$invalidate(1, visible = false);
	};

	const toggle = () => {
		$$invalidate(1, visible = !visible);
	};

	let fly;

	if (true) {
		__webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! svelte/transition */ "./node_modules/svelte/transition/index.mjs")).then(module => {
			$$invalidate(2, fly = module.fly);
		});
	}

	$$self.$$set = $$new_props => {
		$$invalidate(9, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
	};

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		dispatch,
		helpers,
		props,
		emitEvent,
		visible,
		show,
		hide,
		toggle,
		fly
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(9, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
		if ("visible" in $$props) $$invalidate(1, visible = $$new_props.visible);
		if ("fly" in $$props) $$invalidate(2, fly = $$new_props.fly);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*visible*/ 2) {
			$: emitEvent(visible);
		}
	};

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);
	return [hide, visible, fly, props, show, toggle];
}

class Drawer extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { show: 4, hide: 0, toggle: 5 });

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Drawer",
			options,
			id: create_fragment.name
		});
	}

	get show() {
		return this.$$.ctx[4];
	}

	set show(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hide() {
		return this.$$.ctx[0];
	}

	set hide(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get toggle() {
		return this.$$.ctx[5];
	}

	set toggle(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Drawer);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Icon.svelte":
/*!**********************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Icon.svelte ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* node_modules/sveltail/lib/components/Icon.svelte generated by Svelte v3.30.0 */



const file = "node_modules/sveltail/lib/components/Icon.svelte";

// (14:0) {#if props.icon}
function create_if_block(ctx) {
	let t;
	let if_block1_anchor;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (false) {}
			if (true) if_block1.p(ctx, dirty);
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(14:0) {#if props.icon}",
		ctx
	});

	return block;
}

// (15:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_2(ctx) {
	let span;
	let span_text_value;
	let span_class_value;

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "text", span_text_value = String.fromCharCode(/*props*/ ctx[0].icon.text));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", span_class_value = "" + (/*props*/ ctx[0].class + " " + /*props*/ ctx[0].icon.class));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 15, 4, 504);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*props*/ 1 && span_text_value !== (span_text_value = String.fromCharCode(/*props*/ ctx[0].icon.text))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "text", span_text_value);
			}

			if (dirty & /*props*/ 1 && span_class_value !== (span_class_value = "" + (/*props*/ ctx[0].class + " " + /*props*/ ctx[0].icon.class))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", span_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(15:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (19:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block_1(ctx) {
	let i;
	let i_class_value;

	const block = {
		c: function create() {
			i = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i, "class", i_class_value = "" + (/*props*/ ctx[0].class + " " + /*props*/ ctx[0].icon));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(i, "font-size", /*props*/ ctx[0].fontSize + "px");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i, file, 19, 4, 694);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, i, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*props*/ 1 && i_class_value !== (i_class_value = "" + (/*props*/ ctx[0].class + " " + /*props*/ ctx[0].icon))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i, "class", i_class_value);
			}

			if (dirty & /*props*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(i, "font-size", /*props*/ ctx[0].fontSize + "px");
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(i);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(19:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*props*/ ctx[0].icon && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*props*/ ctx[0].icon) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Icon", slots, []);
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		icon: helpers.isString($$props.icon)
		? helpers.getIcon($$props.icon)
		: null,
		class: helpers.isString($$props.class) ? $$props.class : "",
		fontSize: helpers.getFontSize($$props.size, "md")
	};

	if ($$props.fontSize) props.fontSize = $$props.fontSize;

	$$self.$$set = $$new_props => {
		$$invalidate(2, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
	};

	$$self.$capture_state = () => ({ getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"], helpers, props });

	$$self.$inject_state = $$new_props => {
		$$invalidate(2, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);
	return [props];
}

class Icon extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Icon);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Image.svelte":
/*!***********************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Image.svelte ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* node_modules/sveltail/lib/components/Image.svelte generated by Svelte v3.30.0 */



const file = "node_modules/sveltail/lib/components/Image.svelte";

// (12:0) {#if props.img}
function create_if_block(ctx) {
	let t;
	let if_block1_anchor;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (false) {}
			if (true) if_block1.p(ctx, dirty);
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(12:0) {#if props.img}",
		ctx
	});

	return block;
}

// (13:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_2(ctx) {
	let image;
	let image_src_value;
	let image_class_value;

	const block = {
		c: function create() {
			image = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["svg_element"])("image");
			if (image.src !== (image_src_value = "res://" + /*props*/ ctx[0].img)) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(image, "src", image_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(image, "class", image_class_value = /*props*/ ctx[0].class);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(image, file, 13, 4, 367);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, image, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(image);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(13:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (17:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block_1(ctx) {
	let img;
	let img_class_value;
	let img_src_value;

	const block = {
		c: function create() {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "class", img_class_value = /*props*/ ctx[0].class);
			if (img.src !== (img_src_value = /*props*/ ctx[0].img)) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 17, 4, 517);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, img, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(img);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(17:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*props*/ ctx[0].img && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*props*/ ctx[0].img) if_block.p(ctx, dirty);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Image", slots, []);
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");

	const props = {
		img: helpers.isString($$props.img) ? $$props.img : null,
		class: helpers.isString($$props.class) ? $$props.class : ""
	};

	$$self.$$set = $$new_props => {
		$$invalidate(2, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
	};

	$$self.$capture_state = () => ({ getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"], helpers, props });

	$$self.$inject_state = $$new_props => {
		$$invalidate(2, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);
	return [props];
}

class Image extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Image",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Image);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Input.svelte":
/*!***********************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Input.svelte ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* node_modules/sveltail/lib/components/Input.svelte generated by Svelte v3.30.0 */


const file = "node_modules/sveltail/lib/components/Input.svelte";

function create_fragment(ctx) {
	const block = {
		c: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"]
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Input", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Input> was created with unknown prop '${key}'`);
	});

	return [];
}

class Input extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Input",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Input);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/LayoutNative.svelte":
/*!******************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/LayoutNative.svelte ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _src_i18n_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/src/i18n/index */ "./src/i18n/index.js");
/* harmony import */ var _src_router_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/src/router/hooks */ "./src/router/hooks.js");
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/src/router/routes */ "./src/router/routes.js");
/* harmony import */ var _src_store_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/src/store/state */ "./src/store/state.js");
/* harmony import */ var _js_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/helpers */ "./node_modules/sveltail/lib/js/helpers.js");
/* harmony import */ var _Loader_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Loader.svelte */ "./node_modules/sveltail/lib/components/Loader.svelte");
/* harmony import */ var _RouterView_svelte__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RouterView.svelte */ "./node_modules/sveltail/lib/components/RouterView.svelte");
/* node_modules/sveltail/lib/components/LayoutNative.svelte generated by Svelte v3.30.0 */


const { Object: Object_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__["globals"];








const file = "node_modules/sveltail/lib/components/LayoutNative.svelte";
const get_header_slot_changes = dirty => ({});
const get_header_slot_context = ctx => ({});

// (38:4) {#if isReady}
function create_if_block(ctx) {
	let stackLayout;
	let routerview;
	let current;

	routerview = new _RouterView_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: {
				onBefore: _src_router_hooks__WEBPACK_IMPORTED_MODULE_3__["default"].onBefore,
				onAfter: _src_router_hooks__WEBPACK_IMPORTED_MODULE_3__["default"].onAfter,
				routes: _src_router_routes__WEBPACK_IMPORTED_MODULE_4__["default"]
			},
			$$inline: true
		});

	routerview.$on("ready", /*updateAppContext*/ ctx[1]);

	const block = {
		c: function create() {
			stackLayout = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("stackLayout");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(routerview.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(stackLayout, file, 38, 6, 795);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, stackLayout, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(routerview, stackLayout, null);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(routerview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(routerview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(stackLayout);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(routerview);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(38:4) {#if isReady}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let page;
	let t0;
	let absoluteLayout;
	let t1;
	let loader;
	let current;
	const header_slot_template = /*#slots*/ ctx[4].header;
	const header_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(header_slot_template, ctx, /*$$scope*/ ctx[3], get_header_slot_context);
	let if_block = /*isReady*/ ctx[0] && create_if_block(ctx);
	loader = new _Loader_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({ $$inline: true });
	loader.$on("ready", /*updateAppContext*/ ctx[1]);

	const block = {
		c: function create() {
			page = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("page");
			if (header_slot) header_slot.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			absoluteLayout = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("absoluteLayout");
			if (if_block) if_block.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(loader.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(absoluteLayout, file, 36, 2, 754);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(page, file, 34, 0, 720);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, page, anchor);

			if (header_slot) {
				header_slot.m(page, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(page, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(page, absoluteLayout);
			if (if_block) if_block.m(absoluteLayout, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(absoluteLayout, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(loader, absoluteLayout, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (header_slot) {
				if (header_slot.p && dirty & /*$$scope*/ 8) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(header_slot, header_slot_template, ctx, /*$$scope*/ ctx[3], dirty, get_header_slot_changes, get_header_slot_context);
				}
			}

			if (/*isReady*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isReady*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(absoluteLayout, t1);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(header_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(loader.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(header_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(loader.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(page);
			if (header_slot) header_slot.d(detaching);
			if (if_block) if_block.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(loader);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("LayoutNative", slots, ['header']);
	let app = { state: _src_store_state__WEBPACK_IMPORTED_MODULE_5__["default"], languages: _src_i18n_index__WEBPACK_IMPORTED_MODULE_2__["default"], helpers: Object(_js_helpers__WEBPACK_IMPORTED_MODULE_6__["default"])() };

	const updateAppContext = ({ detail }) => {
		$$invalidate(2, app = Object.assign(app, detail));
	};

	// App Ready
	let isReady = false;

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		$$invalidate(0, isReady = true);

		// Load Fonts
		__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../js/fonts */ "./node_modules/sveltail/lib/js/fonts.js"));
	});

	const writable_props = [];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LayoutNative> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		setContext: svelte__WEBPACK_IMPORTED_MODULE_1__["setContext"],
		languages: _src_i18n_index__WEBPACK_IMPORTED_MODULE_2__["default"],
		hooks: _src_router_hooks__WEBPACK_IMPORTED_MODULE_3__["default"],
		routes: _src_router_routes__WEBPACK_IMPORTED_MODULE_4__["default"],
		state: _src_store_state__WEBPACK_IMPORTED_MODULE_5__["default"],
		helpers: _js_helpers__WEBPACK_IMPORTED_MODULE_6__["default"],
		Loader: _Loader_svelte__WEBPACK_IMPORTED_MODULE_7__["default"],
		RouterView: _RouterView_svelte__WEBPACK_IMPORTED_MODULE_8__["default"],
		app,
		updateAppContext,
		isReady
	});

	$$self.$inject_state = $$props => {
		if ("app" in $$props) $$invalidate(2, app = $$props.app);
		if ("isReady" in $$props) $$invalidate(0, isReady = $$props.isReady);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*app*/ 4) {
			$: Object(svelte__WEBPACK_IMPORTED_MODULE_1__["setContext"])("$$app", app);
		}
	};

	return [isReady, updateAppContext, app, $$scope, slots];
}

class LayoutNative extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "LayoutNative",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (LayoutNative);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/LayoutWeb.svelte":
/*!***************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/LayoutWeb.svelte ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
/* harmony import */ var _src_i18n_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/src/i18n/index */ "./src/i18n/index.js");
/* harmony import */ var _src_router_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/src/router/hooks */ "./src/router/hooks.js");
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/src/router/routes */ "./src/router/routes.js");
/* harmony import */ var _src_store_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/src/store/state */ "./src/store/state.js");
/* harmony import */ var _js_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/helpers */ "./node_modules/sveltail/lib/js/helpers.js");
/* harmony import */ var _Loader_svelte__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Loader.svelte */ "./node_modules/sveltail/lib/components/Loader.svelte");
/* harmony import */ var _RouterView_svelte__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./RouterView.svelte */ "./node_modules/sveltail/lib/components/RouterView.svelte");
/* harmony import */ var _Users_mac_Coding_Svelte_sveltail_example_node_modules_sveltail_lib_components_LayoutWeb_svelte_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/sveltail/lib/components/LayoutWeb.svelte.css */ "./node_modules/sveltail/lib/components/LayoutWeb.svelte.css");
/* node_modules/sveltail/lib/components/LayoutWeb.svelte generated by Svelte v3.30.0 */











const file = "node_modules/sveltail/lib/components/LayoutWeb.svelte";
const get_footer_slot_changes = dirty => ({});
const get_footer_slot_context = ctx => ({});
const get_header_slot_changes_1 = dirty => ({});
const get_header_slot_context_1 = ctx => ({});
const get_drawer_slot_changes = dirty => ({});
const get_drawer_slot_context = ctx => ({});
const get_header_slot_changes = dirty => ({});
const get_header_slot_context = ctx => ({});

// (78:2) {#if isReady}
function create_if_block(ctx) {
	let section1;
	let t0;
	let t1;
	let section0;
	let t2;
	let main;
	let routerview;
	let t3;
	let footer;
	let section1_class_value;
	let current;
	let if_block0 = /*props*/ ctx[8].fixedHeader && create_if_block_2(ctx);
	const drawer_slot_template = /*#slots*/ ctx[10].drawer;
	const drawer_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(drawer_slot_template, ctx, /*$$scope*/ ctx[9], get_drawer_slot_context);
	let if_block1 = !/*props*/ ctx[8].fixedHeader && create_if_block_1(ctx);

	routerview = new _RouterView_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]({
			props: {
				onBefore: _src_router_hooks__WEBPACK_IMPORTED_MODULE_4__["default"].onBefore,
				onAfter: _src_router_hooks__WEBPACK_IMPORTED_MODULE_4__["default"].onAfter,
				routes: _src_router_routes__WEBPACK_IMPORTED_MODULE_5__["default"]
			},
			$$inline: true
		});

	routerview.$on("ready", /*updateAppContext*/ ctx[7]);
	const footer_slot_template = /*#slots*/ ctx[10].footer;
	const footer_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(footer_slot_template, ctx, /*$$scope*/ ctx[9], get_footer_slot_context);

	const block = {
		c: function create() {
			section1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (drawer_slot) drawer_slot.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			section0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			if (if_block1) if_block1.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			main = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("main");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(routerview.$$.fragment);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("footer");
			if (footer_slot) footer_slot.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(main, "class", "w-screen flex-wrap overflow-x-hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(main, file, 91, 8, 2977);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section0, "class", "w-screen overflow-auto");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(section0, "height", "calc(100vh - " + /*headerHeight*/ ctx[2] + "px)");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section0, file, 85, 6, 2683);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(footer, file, 95, 6, 3188);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section1, "class", section1_class_value = "" + ((/*app*/ ctx[0].platform === "Cordova" ? "cordova" : "") + " relative z-0 safe-area dark:bg-black dark:text-white" + " svelte-n4zwdo"));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section1, file, 78, 4, 2310);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section1, anchor);
			if (if_block0) if_block0.m(section1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section1, t0);

			if (drawer_slot) {
				drawer_slot.m(section1, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section1, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section1, section0);
			if (if_block1) if_block1.m(section0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section0, main);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(routerview, main, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section1, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section1, footer);

			if (footer_slot) {
				footer_slot.m(footer, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[8].fixedHeader) if_block0.p(ctx, dirty);

			if (drawer_slot) {
				if (drawer_slot.p && dirty & /*$$scope*/ 512) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(drawer_slot, drawer_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_drawer_slot_changes, get_drawer_slot_context);
				}
			}

			if (!/*props*/ ctx[8].fixedHeader) if_block1.p(ctx, dirty);

			if (!current || dirty & /*headerHeight*/ 4) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(section0, "height", "calc(100vh - " + /*headerHeight*/ ctx[2] + "px)");
			}

			if (footer_slot) {
				if (footer_slot.p && dirty & /*$$scope*/ 512) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(footer_slot, footer_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_footer_slot_changes, get_footer_slot_context);
				}
			}

			if (!current || dirty & /*app*/ 1 && section1_class_value !== (section1_class_value = "" + ((/*app*/ ctx[0].platform === "Cordova" ? "cordova" : "") + " relative z-0 safe-area dark:bg-black dark:text-white" + " svelte-n4zwdo"))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section1, "class", section1_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(drawer_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(routerview.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(footer_slot, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(drawer_slot, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(routerview.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(footer_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section1);
			if (if_block0) if_block0.d();
			if (drawer_slot) drawer_slot.d(detaching);
			if (if_block1) if_block1.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(routerview);
			if (footer_slot) footer_slot.d(detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(78:2) {#if isReady}",
		ctx
	});

	return block;
}

// (80:6) {#if props.fixedHeader}
function create_if_block_2(ctx) {
	let header;
	let header_class_value;
	let header_resize_listener;
	let current;
	const header_slot_template = /*#slots*/ ctx[10].header;
	const header_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(header_slot_template, ctx, /*$$scope*/ ctx[9], get_header_slot_context);

	const block = {
		c: function create() {
			header = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("header");
			if (header_slot) header_slot.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(header, "class", header_class_value = "" + ((/*app*/ ctx[0].platform === "Cordova" ? "bg-brand" : "") + " safe-area-top w-screen" + " svelte-n4zwdo"));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*header_elementresize_handler*/ ctx[11].call(header));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(header, file, 80, 8, 2465);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, header, anchor);

			if (header_slot) {
				header_slot.m(header, null);
			}

			header_resize_listener = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_resize_listener"])(header, /*header_elementresize_handler*/ ctx[11].bind(header));
			current = true;
		},
		p: function update(ctx, dirty) {
			if (header_slot) {
				if (header_slot.p && dirty & /*$$scope*/ 512) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(header_slot, header_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_header_slot_changes, get_header_slot_context);
				}
			}

			if (!current || dirty & /*app*/ 1 && header_class_value !== (header_class_value = "" + ((/*app*/ ctx[0].platform === "Cordova" ? "bg-brand" : "") + " safe-area-top w-screen" + " svelte-n4zwdo"))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(header, "class", header_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(header_slot, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(header_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(header);
			if (header_slot) header_slot.d(detaching);
			header_resize_listener();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(80:6) {#if props.fixedHeader}",
		ctx
	});

	return block;
}

// (87:8) {#if !props.fixedHeader}
function create_if_block_1(ctx) {
	let header;
	let header_class_value;
	let current;
	const header_slot_template = /*#slots*/ ctx[10].header;
	const header_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(header_slot_template, ctx, /*$$scope*/ ctx[9], get_header_slot_context_1);

	const block = {
		c: function create() {
			header = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("header");
			if (header_slot) header_slot.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(header, "class", header_class_value = "" + ((/*app*/ ctx[0].platform === "Cordova" ? "bg-brand" : "") + " safe-area-top w-full" + " svelte-n4zwdo"));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(header, file, 87, 10, 2815);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, header, anchor);

			if (header_slot) {
				header_slot.m(header, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (header_slot) {
				if (header_slot.p && dirty & /*$$scope*/ 512) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(header_slot, header_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_header_slot_changes_1, get_header_slot_context_1);
				}
			}

			if (!current || dirty & /*app*/ 1 && header_class_value !== (header_class_value = "" + ((/*app*/ ctx[0].platform === "Cordova" ? "bg-brand" : "") + " safe-area-top w-full" + " svelte-n4zwdo"))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(header, "class", header_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(header_slot, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(header_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(header);
			if (header_slot) header_slot.d(detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(87:8) {#if !props.fixedHeader}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let section;
	let loader;
	let t0;
	let switch_instance0;
	let t1;
	let switch_instance1;
	let t2;
	let switch_instance2;
	let t3;
	let switch_instance3;
	let t4;
	let if_block_anchor;
	let current;
	loader = new _Loader_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ $$inline: true });
	loader.$on("ready", /*updateAppContext*/ ctx[7]);
	var switch_value = /*Alerter*/ ctx[3];

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance0 = new switch_value(switch_props(ctx));
		switch_instance0.$on("ready", /*updateAppContext*/ ctx[7]);
	}

	var switch_value_1 = /*Notifier*/ ctx[4];

	function switch_props_1(ctx) {
		return { $$inline: true };
	}

	if (switch_value_1) {
		switch_instance1 = new switch_value_1(switch_props_1(ctx));
		switch_instance1.$on("ready", /*updateAppContext*/ ctx[7]);
	}

	var switch_value_2 = /*Toaster*/ ctx[5];

	function switch_props_2(ctx) {
		return { $$inline: true };
	}

	if (switch_value_2) {
		switch_instance2 = new switch_value_2(switch_props_2(ctx));
		switch_instance2.$on("ready", /*updateAppContext*/ ctx[7]);
	}

	var switch_value_3 = /*LocalStorage*/ ctx[6];

	function switch_props_3(ctx) {
		return { $$inline: true };
	}

	if (switch_value_3) {
		switch_instance3 = new switch_value_3(switch_props_3(ctx));
		switch_instance3.$on("ready", /*updateAppContext*/ ctx[7]);
	}

	let if_block = /*isReady*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(loader.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (switch_instance0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance0.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (switch_instance1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance1.$$.fragment);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (switch_instance2) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance2.$$.fragment);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (switch_instance3) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance3.$$.fragment);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "id", "st-notifier");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "class", "relative z-10");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section, file, 68, 2, 1903);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(loader, section, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, t0);

			if (switch_instance0) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance0, section, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, t1);

			if (switch_instance1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance1, section, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, t2);

			if (switch_instance2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance2, section, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, t3);

			if (switch_instance3) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance3, section, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (switch_value !== (switch_value = /*Alerter*/ ctx[3])) {
				if (switch_instance0) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
					const old_component = switch_instance0;

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(old_component.$$.fragment, 1, 0, () => {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(old_component, 1);
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (switch_value) {
					switch_instance0 = new switch_value(switch_props(ctx));
					switch_instance0.$on("ready", /*updateAppContext*/ ctx[7]);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance0.$$.fragment);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance0.$$.fragment, 1);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance0, section, t1);
				} else {
					switch_instance0 = null;
				}
			} else if (switch_value) {
				
			}

			if (switch_value_1 !== (switch_value_1 = /*Notifier*/ ctx[4])) {
				if (switch_instance1) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
					const old_component = switch_instance1;

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(old_component.$$.fragment, 1, 0, () => {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(old_component, 1);
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (switch_value_1) {
					switch_instance1 = new switch_value_1(switch_props_1(ctx));
					switch_instance1.$on("ready", /*updateAppContext*/ ctx[7]);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance1.$$.fragment);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance1.$$.fragment, 1);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance1, section, t2);
				} else {
					switch_instance1 = null;
				}
			} else if (switch_value_1) {
				
			}

			if (switch_value_2 !== (switch_value_2 = /*Toaster*/ ctx[5])) {
				if (switch_instance2) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
					const old_component = switch_instance2;

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(old_component.$$.fragment, 1, 0, () => {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(old_component, 1);
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (switch_value_2) {
					switch_instance2 = new switch_value_2(switch_props_2(ctx));
					switch_instance2.$on("ready", /*updateAppContext*/ ctx[7]);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance2.$$.fragment);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance2.$$.fragment, 1);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance2, section, t3);
				} else {
					switch_instance2 = null;
				}
			} else if (switch_value_2) {
				
			}

			if (switch_value_3 !== (switch_value_3 = /*LocalStorage*/ ctx[6])) {
				if (switch_instance3) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
					const old_component = switch_instance3;

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(old_component.$$.fragment, 1, 0, () => {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(old_component, 1);
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (switch_value_3) {
					switch_instance3 = new switch_value_3(switch_props_3(ctx));
					switch_instance3.$on("ready", /*updateAppContext*/ ctx[7]);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance3.$$.fragment);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance3.$$.fragment, 1);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance3, section, null);
				} else {
					switch_instance3 = null;
				}
			} else if (switch_value_3) {
				
			}

			if (/*isReady*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isReady*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(loader.$$.fragment, local);
			if (switch_instance0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance0.$$.fragment, local);
			if (switch_instance1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance1.$$.fragment, local);
			if (switch_instance2) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance2.$$.fragment, local);
			if (switch_instance3) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(loader.$$.fragment, local);
			if (switch_instance0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(switch_instance0.$$.fragment, local);
			if (switch_instance1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(switch_instance1.$$.fragment, local);
			if (switch_instance2) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(switch_instance2.$$.fragment, local);
			if (switch_instance3) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(switch_instance3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(loader);
			if (switch_instance0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(switch_instance0);
			if (switch_instance1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(switch_instance1);
			if (switch_instance2) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(switch_instance2);
			if (switch_instance3) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(switch_instance3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t4);
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("LayoutWeb", slots, ['header','drawer','footer']);

	_src_i18n_index__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(lang => {
		Object(svelte_i18n__WEBPACK_IMPORTED_MODULE_2__["register"])(lang, () => __webpack_require__("./src/i18n/languages lazy recursive ^\\.\\/.*\\.js$")(`./${lang}.js`));
	});

	Object(svelte_i18n__WEBPACK_IMPORTED_MODULE_2__["init"])({
		fallbackLocale: "en",
		initialLocale: Object(svelte_i18n__WEBPACK_IMPORTED_MODULE_2__["getLocaleFromNavigator"])()
	});

	// Include Store and Utilities
	let app = {
		mode:  true ? "prod" : undefined,
		platform: "Cordova",
		state: _src_store_state__WEBPACK_IMPORTED_MODULE_6__["default"],
		languages: _src_i18n_index__WEBPACK_IMPORTED_MODULE_3__["default"],
		helpers: Object(_js_helpers__WEBPACK_IMPORTED_MODULE_7__["default"])()
	};

	const updateAppContext = ({ detail }) => {
		$$invalidate(0, app = Object.assign(app, detail));
	};

	// Globals
	const props = {
		fixedHeader: app.helpers.getBoolean($$props.fixedHeader)
	};

	// App Ready
	let isReady = false;

	let headerHeight = 0;

	// Utilities
	let Alerter;

	let Notifier;
	let Toaster;
	let LocalStorage;

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		$$invalidate(1, isReady = true);

		// Load Fonts
		__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../js/fonts */ "./node_modules/sveltail/lib/js/fonts.js"));

		// Load Utilities
		const utilities = {"productName":"Sveltail Demo","productDescription":"A Sveltail Example","productVersion":"1.0.0","platform":"Cordova","PROD":false,"utilities":["LocalStorage","Alerter","Notifier","Toaster"]}.utilities;

		Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../js/utilities */ "./node_modules/sveltail/lib/js/utilities.js")).then(module => {
			if (utilities.findIndex(i => i === "Alerter") > -1) $$invalidate(3, Alerter = module.Alerter);
			if (utilities.findIndex(i => i === "Notifier") > -1) $$invalidate(4, Notifier = module.Notifier);
			if (utilities.findIndex(i => i === "Toaster") > -1) $$invalidate(5, Toaster = module.Toaster);
			if (utilities.findIndex(i => i === "LocalStorage") > -1) $$invalidate(6, LocalStorage = module.LocalStorage);
		});
	});

	function header_elementresize_handler() {
		headerHeight = this.clientHeight;
		$$invalidate(2, headerHeight);
	}

	$$self.$$set = $$new_props => {
		$$invalidate(12, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
		if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		setContext: svelte__WEBPACK_IMPORTED_MODULE_1__["setContext"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		register: svelte_i18n__WEBPACK_IMPORTED_MODULE_2__["register"],
		init: svelte_i18n__WEBPACK_IMPORTED_MODULE_2__["init"],
		getLocaleFromNavigator: svelte_i18n__WEBPACK_IMPORTED_MODULE_2__["getLocaleFromNavigator"],
		languages: _src_i18n_index__WEBPACK_IMPORTED_MODULE_3__["default"],
		hooks: _src_router_hooks__WEBPACK_IMPORTED_MODULE_4__["default"],
		routes: _src_router_routes__WEBPACK_IMPORTED_MODULE_5__["default"],
		state: _src_store_state__WEBPACK_IMPORTED_MODULE_6__["default"],
		helpers: _js_helpers__WEBPACK_IMPORTED_MODULE_7__["default"],
		Loader: _Loader_svelte__WEBPACK_IMPORTED_MODULE_8__["default"],
		RouterView: _RouterView_svelte__WEBPACK_IMPORTED_MODULE_9__["default"],
		app,
		updateAppContext,
		props,
		isReady,
		headerHeight,
		Alerter,
		Notifier,
		Toaster,
		LocalStorage
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(12, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
		if ("app" in $$props) $$invalidate(0, app = $$new_props.app);
		if ("isReady" in $$props) $$invalidate(1, isReady = $$new_props.isReady);
		if ("headerHeight" in $$props) $$invalidate(2, headerHeight = $$new_props.headerHeight);
		if ("Alerter" in $$props) $$invalidate(3, Alerter = $$new_props.Alerter);
		if ("Notifier" in $$props) $$invalidate(4, Notifier = $$new_props.Notifier);
		if ("Toaster" in $$props) $$invalidate(5, Toaster = $$new_props.Toaster);
		if ("LocalStorage" in $$props) $$invalidate(6, LocalStorage = $$new_props.LocalStorage);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*app*/ 1) {
			$: Object(svelte__WEBPACK_IMPORTED_MODULE_1__["setContext"])("$$app", app);
		}
	};

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);

	return [
		app,
		isReady,
		headerHeight,
		Alerter,
		Notifier,
		Toaster,
		LocalStorage,
		updateAppContext,
		props,
		$$scope,
		slots,
		header_elementresize_handler
	];
}

class LayoutWeb extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "LayoutWeb",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (LayoutWeb);




/***/ }),

/***/ "./node_modules/sveltail/lib/components/LayoutWeb.svelte.css":
/*!*******************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/LayoutWeb.svelte.css ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/sveltail/lib/components/Loader.svelte":
/*!************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/Loader.svelte ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _Image_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Image.svelte */ "./node_modules/sveltail/lib/components/Image.svelte");
/* node_modules/sveltail/lib/components/Loader.svelte generated by Svelte v3.30.0 */




const file = "node_modules/sveltail/lib/components/Loader.svelte";

// (45:0) {#if render}
function create_if_block(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(45:0) {#if render}",
		ctx
	});

	return block;
}

// (46:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_2(ctx) {
	let gridLayout;
	let image;
	let current;

	image = new _Image_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { img: "assets/logo.png" },
			$$inline: true
		});

	const block = {
		c: function create() {
			gridLayout = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("gridLayout");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(image.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(gridLayout, "width", "100%");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(gridLayout, "height", "100%");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(gridLayout, file, 46, 4, 1023);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, gridLayout, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(image, gridLayout, null);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(image.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(image.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(gridLayout);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(image);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(46:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (52:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block_1(ctx) {
	let div3;
	let div0;
	let t;
	let div2;
	let div1;
	let image;
	let current;

	image = new _Image_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				class: "mx-auto h-16 w-16 animate-bounce bg-loader",
				img: "assets/logo.png"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(image.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "fixed inset-0 opacity-75");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 53, 6, 1268);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "w-full h-full flex items-center justify-center");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 55, 8, 1373);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "fixed h-full w-full overflow-y-auto");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 54, 6, 1315);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "relative z-30 h-screen w-screen");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 52, 4, 1216);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(image, div1, null);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(image.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(image.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(image);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(52:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*render*/ ctx[0] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*render*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*render*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Loader", slots, []);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();
	let render = true;
	let show;
	let hide;

	// Native
	if (false) {}

	// Web / Hybrid
	if (true) {
		show = () => {
			const html = document.querySelector("html");
			html.classList.add("overflow-hidden");
			$$invalidate(0, render = true);
		};

		hide = () => {
			const html = document.querySelector("html");
			html.classList.remove("overflow-hidden");
			$$invalidate(0, render = false);
		};
	}

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		dispatch("ready", { loader: { show, hide } });
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Loader> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		Image: _Image_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		dispatch,
		render,
		show,
		hide
	});

	$$self.$inject_state = $$props => {
		if ("render" in $$props) $$invalidate(0, render = $$props.render);
		if ("show" in $$props) show = $$props.show;
		if ("hide" in $$props) hide = $$props.hide;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [render];
}

class Loader extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Loader",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Loader);


/***/ }),

/***/ "./node_modules/sveltail/lib/components/RouterView.svelte":
/*!****************************************************************!*\
  !*** ./node_modules/sveltail/lib/components/RouterView.svelte ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* node_modules/sveltail/lib/components/RouterView.svelte generated by Svelte v3.30.0 */



const file = "node_modules/sveltail/lib/components/RouterView.svelte";

// (97:0) {#if ready}
function create_if_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*Route*/ ctx[0];

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance.$$.fragment);
			switch_instance_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance, target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = /*Route*/ ctx[0])) {
				if (switch_instance) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
					const old_component = switch_instance;

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(old_component.$$.fragment, 1, 0, () => {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(old_component, 1);
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance.$$.fragment);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance.$$.fragment, 1);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(switch_instance_anchor);
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(switch_instance, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(97:0) {#if ready}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*ready*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*ready*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*ready*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("RouterView", slots, []);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();
	const { loader } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");
	let Route = null;
	let currPath = null;
	let ready = false;
	let page;

	const beforeRouteUpdate = async (ctx, next) => {
		loader.show();

		if (true) {
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(async () => {
					const result = await $$props.onBefore();
					if (result) next(); else loader.hide();
				});
			});
		}

		if (false) {}
	};

	const updateRoute = (ctx, next) => {
		const { path } = ctx;
		const routeIndex = $$props.routes.findIndex(i => i.path === path);
		const { name } = $$props.routes[routeIndex > -1 ? routeIndex : $$props.routes.length - 1];

		__webpack_require__("./src/pages lazy recursive ^\\.\\/.*\\.svelte$")(`./${name}.svelte`).then(module => {
			$$invalidate(0, Route = module.default);
			currPath = path;
			next();
		});
	};

	const afterRouteUpdate = () => {
		$$props.onAfter();
	};

	const navigateTo = path => {
		if (path !== currPath) {
			if ($$props.routes.findIndex(i => i.path === path) > -1) page.redirect(path); else navigateTo("/*");
		}
	};

	if (true) {
		__webpack_require__.e(/*! import() */ 3).then(__webpack_require__.t.bind(null, /*! page */ "./node_modules/page/page.js", 7)).then(module => {
			page = module.default;

			$$props.routes.forEach(navRoute => {
				page(navRoute.path, beforeRouteUpdate, updateRoute, afterRouteUpdate);
			});

			page.base("/#");
			page();
			$$invalidate(1, ready = true);
		});
	}

	if (false) {}

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		dispatch("ready", {
			router: { routes: $$props.routes, navigateTo }
		});
	});

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["afterUpdate"])(() => {
		loader.hide();
	});

	$$self.$$set = $$new_props => {
		$$invalidate(10, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$new_props)));
	};

	$$self.$capture_state = () => ({
		afterUpdate: svelte__WEBPACK_IMPORTED_MODULE_1__["afterUpdate"],
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		dispatch,
		loader,
		Route,
		currPath,
		ready,
		page,
		beforeRouteUpdate,
		updateRoute,
		afterRouteUpdate,
		navigateTo
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(10, $$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, $$props), $$new_props));
		if ("Route" in $$props) $$invalidate(0, Route = $$new_props.Route);
		if ("currPath" in $$props) currPath = $$new_props.currPath;
		if ("ready" in $$props) $$invalidate(1, ready = $$new_props.ready);
		if ("page" in $$props) page = $$new_props.page;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["exclude_internal_props"])($$props);
	return [Route, ready];
}

class RouterView extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "RouterView",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (RouterView);


/***/ }),

/***/ "./node_modules/sveltail/lib/js/helpers.js":
/*!*************************************************!*\
  !*** ./node_modules/sveltail/lib/js/helpers.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable max-len */
const colors = JSON.parse("{\"black\":\"#000\",\"white\":\"#fff\",\"gray\":{\"50\":\"#f9fafb\",\"100\":\"#f3f4f6\",\"200\":\"#e5e7eb\",\"300\":\"#d1d5db\",\"400\":\"#9ca3af\",\"500\":\"#6b7280\",\"600\":\"#4b5563\",\"700\":\"#374151\",\"800\":\"#1f2937\",\"900\":\"#111827\"},\"brand\":\"#68b0ab\",\"accent\":\"#e6b89c\",\"primary\":\"#0496ff\",\"secondary\":\"#5eb1bf\",\"info\":\"#9cafb7\",\"success\":\"#90be6d\",\"warning\":\"#ff9f1c\",\"danger\":\"#d81159\"}");
const screens = JSON.parse("{\"sm\":\"640px\",\"md\":\"768px\",\"lg\":\"1024px\"}");

/* harmony default export */ __webpack_exports__["default"] = (() => ({
  isString: (value) => typeof value === 'string' || value instanceof String,
  isNumber: (value) => typeof value === 'number' && value !== Infinity,
  isBoolean: (value) => typeof value === 'boolean',
  isArray: (value) => value && typeof value === 'object' && value.constructor === Array,
  isObject: (value) => value && typeof value === 'object' && value.constructor === Object,
  isFunction: (value) => typeof value === 'function',
  isNull: (value) => value === null,
  isUndefined: (value) => typeof value === 'undefined',
  isAllowedColor: (value) => [...Object.keys(colors), 'transparent'].findIndex((i) => i.split('-')[0] === value) > -1,
  isAllowedSize: (value) => ['xs', 'sm', 'md', 'lg', 'xl', 'auto'].findIndex((i) => i === value) > -1,
  isAllowedBreakpoint: (value) => Object.keys(screens).findIndex((i) => i === value) > -1,
  getSize(size, defaultVal) {
    let sizeClass = '';

    let calcSize = size;
    if (defaultVal) calcSize = this.isAllowedSize(size) ? size : defaultVal;

    if (calcSize === 'xs') sizeClass += 'h-8 w-8 ';
    else if (calcSize === 'sm') sizeClass += 'h-10 w-10 ';
    else if (calcSize === 'md') sizeClass += 'h-12 w-12 ';
    else if (calcSize === 'lg') sizeClass += 'h-16 w-16 ';
    else if (calcSize === 'xl') sizeClass += 'h-20 w-20 ';
    else if (calcSize === 'auto') sizeClass += '';

    return sizeClass;
  },
  getHeight(size, defaultVal) {
    let heightClass = '';

    let calcSize = size;
    if (defaultVal) calcSize = this.isAllowedSize(size) ? size : defaultVal;

    if (calcSize === 'xs') heightClass += 'h-8 ';
    else if (calcSize === 'sm') heightClass += 'h-10 ';
    else if (calcSize === 'md') heightClass += 'h-12 ';
    else if (calcSize === 'lg') heightClass += 'h-16 ';
    else if (calcSize === 'xl') heightClass += 'h-20 ';
    else if (calcSize === 'auto') heightClass += '';

    return heightClass;
  },
  getWidth(size, defaultVal) {
    let widthClass = '';

    let calcSize = size;
    if (defaultVal) calcSize = this.isAllowedSize(size) ? size : defaultVal;

    if (calcSize === 'xs') widthClass += 'w-8 ';
    else if (calcSize === 'sm') widthClass += 'w-10 ';
    else if (calcSize === 'md') widthClass += 'w-12 ';
    else if (calcSize === 'lg') widthClass += 'w-16 ';
    else if (calcSize === 'xl') widthClass += 'w-20 ';
    else if (calcSize === 'auto') widthClass += '';

    return widthClass;
  },
  getTextSize(size, defaultVal) {
    let textClass = '';

    let calcSize = size;
    if (defaultVal) calcSize = this.isAllowedSize(size) ? size : defaultVal;

    if (calcSize === 'xs') textClass += 'text-xs leading-none ';
    else if (calcSize === 'sm') textClass += 'text-sm leading-none ';
    else if (calcSize === 'md') textClass += 'text-lg leading-none ';
    else if (calcSize === 'lg') textClass += 'text-2xl leading-none ';
    else if (calcSize === 'xl') textClass += 'text-3xl leading-none ';
    else if (calcSize === 'auto') textClass += '';

    return textClass;
  },
  getFontSize(size, defaultVal) {
    let fontSize = 0;

    let calcSize = size;
    if (defaultVal) calcSize = this.isAllowedSize(size) ? size : defaultVal;

    if (calcSize === 'xs') fontSize = 16;
    else if (calcSize === 'sm') fontSize = 20;
    else if (calcSize === 'md') fontSize = 28;
    else if (calcSize === 'lg') fontSize = 40;
    else if (calcSize === 'xl') fontSize = 56;

    return fontSize;
  },
  getIcon(icn) {
    let icon = icn;
    if (this.isUndefined(icn) || this.isNull(icn) || !this.isString(icn)) icon = null;
    if (false) {}
    return icon;
  },
  getColor(val, defaultVal) {
    let color = val;
    if (this.isUndefined(val) || this.isNull(val) || !this.isString(val) || !this.isAllowedColor(val)) color = defaultVal;
    if (false) {}
    return color;
  },
  getArray(items) {
    let arr = [];
    if (this.isArray(items)) arr = items;
    else if (this.isObject(items)) arr = [items];
    return arr;
  },
  getBoolean(val, def) {
    let bool = def || val;
    if (this.isUndefined(val) || this.isNull(val) || !this.isBoolean(val)) bool = false;
    return bool;
  },
}));


/***/ }),

/***/ "./node_modules/svelte-i18n/dist/runtime.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/svelte-i18n/dist/runtime.esm.js ***!
  \******************************************************/
/*! exports provided: _, addMessages, date, defineMessages, dictionary, format, getDateFormatter, getLocaleFromHash, getLocaleFromHostname, getLocaleFromNavigator, getLocaleFromPathname, getLocaleFromQueryString, getMessageFormatter, getNumberFormatter, getTimeFormatter, init, isLoading, json, locale, locales, number, register, t, time, waitLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return te; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMessages", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "date", function() { return re; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defineMessages", function() { return le; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dictionary", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return te; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateFormatter", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocaleFromHash", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocaleFromHostname", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocaleFromNavigator", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocaleFromPathname", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocaleFromQueryString", function() { return z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMessageFormatter", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNumberFormatter", function() { return K; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeFormatter", function() { return R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoading", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "json", function() { return ae; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locales", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return ie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return te; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return oe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitLocale", function() { return se; });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dlv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dlv */ "./node_modules/dlv/dist/dlv.umd.js");
/* harmony import */ var dlv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dlv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! intl-messageformat */ "./node_modules/intl-messageformat/lib/index.js");
let i;const a=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])({});function l(e){return e in i}function s(e,n){if(!l(e))return null;const t=function(e){return i[e]||null}(e);if(n in t)return t[n];return dlv__WEBPACK_IMPORTED_MODULE_2___default()(t,n)}function u(e){return null==e||l(e)?e:u(D(e))}function c(e,...n){a.update((o=>(o[e]=deepmerge__WEBPACK_IMPORTED_MODULE_1___default.a.all([o[e]||{},...n]),o)))}const m=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["derived"])([a],(([e])=>Object.keys(e)));a.subscribe((e=>i=e));const f={};function d(e){return f[e]}function w(e){return I(e).reverse().some((e=>{var n;return null===(n=d(e))||void 0===n?void 0:n.size}))}function g(e,n){return Promise.all(n.map((n=>(function(e,n){f[e].delete(n),0===f[e].size&&delete f[e]}(e,n),n().then((e=>e.default||e)))))).then((n=>c(e,...n)))}const h={};function p(e){if(!w(e))return e in h?h[e]:void 0;const n=function(e){return I(e).reverse().map((e=>{const n=d(e);return[e,n?[...n]:[]]})).filter((([,e])=>e.length>0))}(e);return h[e]=Promise.all(n.map((([e,n])=>g(e,n)))).then((()=>{if(w(e))return p(e);delete h[e]})),h[e]}function b(e,n){d(e)||function(e){f[e]=new Set}(e);const t=d(e);d(e).has(n)||(l(e)||a.update((n=>(n[e]={},n))),t.add(n))}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function y(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t}const v={fallbackLocale:null,initialLocale:null,loadingDelay:200,formats:{number:{scientific:{notation:"scientific"},engineering:{notation:"engineering"},compactLong:{notation:"compact",compactDisplay:"long"},compactShort:{notation:"compact",compactDisplay:"short"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},warnOnMissingMessages:!0};function O(){return v}function j(e){const{formats:n}=e,t=y(e,["formats"]),o=e.initialLocale||e.fallbackLocale;return Object.assign(v,t,{initialLocale:o}),n&&("number"in n&&Object.assign(v.formats.number,n.number),"date"in n&&Object.assign(v.formats.date,n.date),"time"in n&&Object.assign(v.formats.time,n.time)),x.set(o)}const L=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])(!1);let k;const x=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])(null);function $(e,n){return 0===n.indexOf(e)&&e!==n}function E(e,n){return e===n||$(e,n)||$(n,e)}function D(e){const n=e.lastIndexOf("-");if(n>0)return e.slice(0,n);const{fallbackLocale:t}=O();return t&&!E(e,t)?t:null}function I(e){const n=e.split("-").map(((e,n,t)=>t.slice(0,n+1).join("-"))),{fallbackLocale:t}=O();return t&&!E(e,t)?n.concat(I(t)):n}function M(){return k}x.subscribe((e=>{k=e,"undefined"!=typeof window&&document.documentElement.setAttribute("lang",e)}));const N=x.set;x.set=e=>{if(u(e)&&w(e)){const{loadingDelay:n}=O();let t;return"undefined"!=typeof window&&null!=M()&&n?t=window.setTimeout((()=>L.set(!0)),n):L.set(!0),p(e).then((()=>{N(e)})).finally((()=>{clearTimeout(t),L.set(!1)}))}return N(e)},x.update=e=>N(e(k));const P=(e,n)=>{const t=e.split("&").find((e=>0===e.indexOf(n+"=")));return t?t.split("=").pop():null},S=(e,n)=>{const t=n.exec(e);return t&&t[1]||null},T=e=>"undefined"==typeof window?null:S(window.location.hostname,e),A=e=>"undefined"==typeof window?null:S(window.location.pathname,e),F=()=>"undefined"==typeof window?null:window.navigator.language||window.navigator.languages[0],z=e=>"undefined"==typeof window?null:P(window.location.search.substr(1),e),Z=e=>"undefined"==typeof window?null:P(window.location.hash.substr(1),e),C={},G=(e,n)=>{if(null==n)return;const t=s(n,e);return t||G(e,D(n))},J=(e,n)=>{if(n in C&&e in C[n])return C[n][e];const t=G(e,n);return t?((e,n,t)=>t?(n in C||(C[n]={}),e in C[n]||(C[n][e]=t),t):t)(e,n,t):void 0},U=e=>{const n=Object.create(null);return t=>{const o=JSON.stringify(t);return o in n?n[o]:n[o]=e(t)}},_=(e,n)=>{const{formats:t}=O();if(e in t&&n in t[e])return t[e][n];throw new Error(`[svelte-i18n] Unknown "${n}" ${e} format.`)},q=U((e=>{var{locale:n,format:t}=e,o=y(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format numbers');return t&&(o=_("number",t)),new Intl.NumberFormat(n,o)})),B=U((e=>{var{locale:n,format:t}=e,o=y(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format dates');return t?o=_("date",t):0===Object.keys(o).length&&(o=_("date","short")),new Intl.DateTimeFormat(n,o)})),H=U((e=>{var{locale:n,format:t}=e,o=y(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format time values');return t?o=_("time",t):0===Object.keys(o).length&&(o=_("time","short")),new Intl.DateTimeFormat(n,o)})),K=(e={})=>{var{locale:n=M()}=e,t=y(e,["locale"]);return q(Object.assign({locale:n},t))},Q=(e={})=>{var{locale:n=M()}=e,t=y(e,["locale"]);return B(Object.assign({locale:n},t))},R=(e={})=>{var{locale:n=M()}=e,t=y(e,["locale"]);return H(Object.assign({locale:n},t))},V=U(((e,n=M())=>new intl_messageformat__WEBPACK_IMPORTED_MODULE_3__["default"](e,n,O().formats))),W=(e,n={})=>{"object"==typeof e&&(e=(n=e).id);const{values:t,locale:o=M(),default:r}=n;if(null==o)throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");let i=J(e,o);if(i){if("string"!=typeof i)return console.warn(`[svelte-i18n] Message with id "${e}" must be of type "string", found: "${typeof i}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`),i}else O().warnOnMissingMessages&&console.warn(`[svelte-i18n] The message "${e}" was not found in "${I(o).join('", "')}".${w(M())?"\n\nNote: there are at least one loader still registered to this locale that wasn't executed.":""}`),i=r||e;return t?V(i,o).format(t):i},X=(e,n)=>R(n).format(e),Y=(e,n)=>Q(n).format(e),ee=(e,n)=>K(n).format(e),ne=(e,n=M())=>J(e,n),te=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["derived"])([x,a],(()=>W)),oe=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["derived"])([x],(()=>X)),re=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["derived"])([x],(()=>Y)),ie=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["derived"])([x],(()=>ee)),ae=Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["derived"])([x,a],(()=>ne));function le(e){return e}function se(e){return p(e||M()||O().initialLocale)}


/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/*! exports provided: SvelteComponent, afterUpdate, beforeUpdate, createEventDispatcher, getContext, onDestroy, onMount, setContext, tick */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SvelteComponent", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterUpdate", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["afterUpdate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeUpdate", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["beforeUpdate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEventDispatcher", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["createEventDispatcher"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["getContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onDestroy", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["onDestroy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onMount", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["onMount"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["setContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["tick"]; });




/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/*! exports provided: HtmlTag, SvelteComponent, SvelteComponentDev, SvelteElement, action_destroyer, add_attribute, add_classes, add_flush_callback, add_location, add_render_callback, add_resize_listener, add_transform, afterUpdate, append, append_dev, assign, attr, attr_dev, attribute_to_object, beforeUpdate, bind, binding_callbacks, blank_object, bubble, check_outros, children, claim_component, claim_element, claim_space, claim_text, clear_loops, component_subscribe, compute_rest_props, compute_slots, createEventDispatcher, create_animation, create_bidirectional_transition, create_component, create_in_transition, create_out_transition, create_slot, create_ssr_component, current_component, custom_event, dataset_dev, debug, destroy_block, destroy_component, destroy_each, detach, detach_after_dev, detach_before_dev, detach_between_dev, detach_dev, dirty_components, dispatch_dev, each, element, element_is, empty, escape, escaped, exclude_internal_props, fix_and_destroy_block, fix_and_outro_and_destroy_block, fix_position, flush, getContext, get_binding_group_value, get_current_component, get_custom_elements_slots, get_slot_changes, get_slot_context, get_spread_object, get_spread_update, get_store_value, globals, group_outros, handle_promise, hasContext, has_prop, identity, init, insert, insert_dev, intros, invalid_attribute_name_character, is_client, is_crossorigin, is_empty, is_function, is_promise, listen, listen_dev, loop, loop_guard, missing_component, mount_component, noop, not_equal, now, null_to_empty, object_without_properties, onDestroy, onMount, once, outro_and_destroy_block, prevent_default, prop_dev, query_selector_all, raf, run, run_all, safe_not_equal, schedule_update, select_multiple_value, select_option, select_options, select_value, self, setContext, set_attributes, set_current_component, set_custom_element_data, set_data, set_data_dev, set_input_type, set_input_value, set_now, set_raf, set_store_value, set_style, set_svg_attributes, space, spread, stop_propagation, subscribe, svg_element, text, tick, time_ranges_to_array, to_number, toggle_class, transition_in, transition_out, update_keyed_each, update_slot, update_slot_spread, validate_component, validate_each_argument, validate_each_keys, validate_slots, validate_store, xlink_attr */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlTag", function() { return HtmlTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteComponent", function() { return SvelteComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteComponentDev", function() { return SvelteComponentDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteElement", function() { return SvelteElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action_destroyer", function() { return action_destroyer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_attribute", function() { return add_attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_classes", function() { return add_classes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_flush_callback", function() { return add_flush_callback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_location", function() { return add_location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_render_callback", function() { return add_render_callback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_resize_listener", function() { return add_resize_listener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_transform", function() { return add_transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterUpdate", function() { return afterUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_dev", function() { return append_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr", function() { return attr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr_dev", function() { return attr_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attribute_to_object", function() { return attribute_to_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeUpdate", function() { return beforeUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binding_callbacks", function() { return binding_callbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blank_object", function() { return blank_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bubble", function() { return bubble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check_outros", function() { return check_outros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "children", function() { return children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_component", function() { return claim_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_element", function() { return claim_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_space", function() { return claim_space; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_text", function() { return claim_text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear_loops", function() { return clear_loops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "component_subscribe", function() { return component_subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compute_rest_props", function() { return compute_rest_props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compute_slots", function() { return compute_slots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventDispatcher", function() { return createEventDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_animation", function() { return create_animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_bidirectional_transition", function() { return create_bidirectional_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_component", function() { return create_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_in_transition", function() { return create_in_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_out_transition", function() { return create_out_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_slot", function() { return create_slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_ssr_component", function() { return create_ssr_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "current_component", function() { return current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "custom_event", function() { return custom_event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataset_dev", function() { return dataset_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_block", function() { return destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_component", function() { return destroy_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_each", function() { return destroy_each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach", function() { return detach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_after_dev", function() { return detach_after_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_before_dev", function() { return detach_before_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_between_dev", function() { return detach_between_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_dev", function() { return detach_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dirty_components", function() { return dirty_components; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch_dev", function() { return dispatch_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "each", function() { return each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element", function() { return element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element_is", function() { return element_is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escaped", function() { return escaped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exclude_internal_props", function() { return exclude_internal_props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_and_destroy_block", function() { return fix_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_and_outro_and_destroy_block", function() { return fix_and_outro_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_position", function() { return fix_position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return flush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return getContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_binding_group_value", function() { return get_binding_group_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_current_component", function() { return get_current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_custom_elements_slots", function() { return get_custom_elements_slots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_slot_changes", function() { return get_slot_changes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_slot_context", function() { return get_slot_context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_spread_object", function() { return get_spread_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_spread_update", function() { return get_spread_update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_store_value", function() { return get_store_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "group_outros", function() { return group_outros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handle_promise", function() { return handle_promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasContext", function() { return hasContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has_prop", function() { return has_prop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return insert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_dev", function() { return insert_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intros", function() { return intros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalid_attribute_name_character", function() { return invalid_attribute_name_character; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_client", function() { return is_client; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_crossorigin", function() { return is_crossorigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_empty", function() { return is_empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_function", function() { return is_function; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_promise", function() { return is_promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen_dev", function() { return listen_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return loop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop_guard", function() { return loop_guard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "missing_component", function() { return missing_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mount_component", function() { return mount_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "not_equal", function() { return not_equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "null_to_empty", function() { return null_to_empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object_without_properties", function() { return object_without_properties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDestroy", function() { return onDestroy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMount", function() { return onMount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outro_and_destroy_block", function() { return outro_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prevent_default", function() { return prevent_default; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prop_dev", function() { return prop_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query_selector_all", function() { return query_selector_all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run_all", function() { return run_all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safe_not_equal", function() { return safe_not_equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schedule_update", function() { return schedule_update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_multiple_value", function() { return select_multiple_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_option", function() { return select_option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_options", function() { return select_options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_value", function() { return select_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "self", function() { return self; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return setContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_attributes", function() { return set_attributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_current_component", function() { return set_current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_custom_element_data", function() { return set_custom_element_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data", function() { return set_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data_dev", function() { return set_data_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_input_type", function() { return set_input_type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_input_value", function() { return set_input_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_now", function() { return set_now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_raf", function() { return set_raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_store_value", function() { return set_store_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_style", function() { return set_style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_svg_attributes", function() { return set_svg_attributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "space", function() { return space; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spread", function() { return spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop_propagation", function() { return stop_propagation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg_element", function() { return svg_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time_ranges_to_array", function() { return time_ranges_to_array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "to_number", function() { return to_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggle_class", function() { return toggle_class; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition_in", function() { return transition_in; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition_out", function() { return transition_out; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_keyed_each", function() { return update_keyed_each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_slot", function() { return update_slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_slot_spread", function() { return update_slot_spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_component", function() { return validate_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_each_argument", function() { return validate_each_argument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_each_keys", function() { return validate_each_keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_slots", function() { return validate_slots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_store", function() { return validate_store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xlink_attr", function() { return xlink_attr; });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot_spread(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_spread_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_spread_changes_fn(dirty) | get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value = ret) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            const remove = [];
            while (j < node.attributes.length) {
                const attribute = node.attributes[j++];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            for (let k = 0; k < remove.length; k++) {
                node.removeAttribute(remove[k]);
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    const z_index = (parseInt(computed_style.zIndex) || 0) - 1;
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        `overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${z_index};`);
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(anchor = null) {
        this.a = anchor;
        this.e = this.n = null;
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.h(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            info.blocks[i] = null;
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, classes_to_add) {
    const attributes = Object.assign({}, ...args);
    if (classes_to_add) {
        if (attributes.class == null) {
            attributes.class = classes_to_add;
        }
        else {
            attributes.class += ' ' + classes_to_add;
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${String(value).replace(/"/g, '&#34;').replace(/'/g, '&#39;')}"`;
        }
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.30.0' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}




/***/ }),

/***/ "./node_modules/svelte/store/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/svelte/store/index.mjs ***!
  \*********************************************/
/*! exports provided: get, derived, readable, writable */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "derived", function() { return derived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readable", function() { return readable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writable", function() { return writable; });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["get_store_value"]; });




const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"]) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"])(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"]) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["is_function"])(result) ? result : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
            }
        };
        const unsubscribers = stores_array.map((store, i) => Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["subscribe"])(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["run_all"])(unsubscribers);
            cleanup();
        };
    });
}




/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/BaseClient.js":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client/clients/BaseClient.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports = /*#__PURE__*/function () {
  function BaseClient() {
    _classCallCheck(this, BaseClient);
  }

  _createClass(BaseClient, null, [{
    key: "getClientPath",
    value: function getClientPath(options) {
      throw new Error('Client needs implementation');
    }
  }]);

  return BaseClient;
}();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js":
/*!***********************************************************!*\
  !*** (webpack)-dev-server/client/clients/SockJSClient.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");

var BaseClient = __webpack_require__(/*! ./BaseClient */ "./node_modules/webpack-dev-server/client/clients/BaseClient.js");

module.exports = /*#__PURE__*/function (_BaseClient) {
  _inherits(SockJSClient, _BaseClient);

  var _super = _createSuper(SockJSClient);

  function SockJSClient(url) {
    var _this;

    _classCallCheck(this, SockJSClient);

    _this = _super.call(this);
    _this.sock = new SockJS(url);

    _this.sock.onerror = function (err) {// TODO: use logger to log the error event once client and client-src
      // are reorganized to have the same directory structure
    };

    return _this;
  }

  _createClass(SockJSClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.sock.onopen = f;
    }
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.sock.onclose = f;
    } // call f with the message string as the first argument

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.sock.onmessage = function (e) {
        f(e.data);
      };
    }
  }], [{
    key: "getClientPath",
    value: function getClientPath(options) {
      return /*require.resolve*/(/*! ./SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
    }
  }]);

  return SockJSClient;
}(BaseClient);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost:8080":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client?http://localhost:8080 ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {
/* global __resourceQuery WorkerGlobalScope self */

/* eslint prefer-destructuring: off */

var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log,
    setLogLevel = _require.setLogLevel;

var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

var status = {
  isUnloading: false,
  currentHash: ''
};
var options = {
  hot: false,
  hotReload: true,
  liveReload: false,
  initial: true,
  useWarningOverlay: false,
  useErrorOverlay: false,
  useProgress: false
};
var socketUrl = createSocketUrl(__resourceQuery);
self.addEventListener('beforeunload', function () {
  status.isUnloading = true;
});

if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  options.hotReload = qs.indexOf('hotreload=false') === -1;
}

var onSocketMessage = {
  hot: function hot() {
    options.hot = true;
    log.info('[WDS] Hot Module Replacement enabled.');
  },
  liveReload: function liveReload() {
    options.liveReload = true;
    log.info('[WDS] Live Reloading enabled.');
  },
  invalid: function invalid() {
    log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('Invalid');
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  'still-ok': function stillOk() {
    log.info('[WDS] Nothing changed.');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('StillOk');
  },
  'log-level': function logLevel(level) {
    var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }

    setLogLevel(level);
  },
  overlay: function overlay(value) {
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        options.useWarningOverlay = false;
        options.useErrorOverlay = value;
      } else if (value) {
        options.useWarningOverlay = value.warnings;
        options.useErrorOverlay = value.errors;
      }
    }
  },
  progress: function progress(_progress) {
    if (typeof document !== 'undefined') {
      options.useProgress = _progress;
    }
  },
  'progress-update': function progressUpdate(data) {
    if (options.useProgress) {
      log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage('Progress', data);
  },
  ok: function ok() {
    sendMessage('Ok');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  'content-changed': function contentChanged() {
    log.info('[WDS] Content base changed. Reloading...');
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('[WDS] Warnings while compiling.');

    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });

    sendMessage('Warnings', strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }

    if (options.useWarningOverlay) {
      overlay.showMessage(_warnings);
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  errors: function errors(_errors) {
    log.error('[WDS] Errors while compiling. Reload prevented.');

    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });

    sendMessage('Errors', strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }

    if (options.useErrorOverlay) {
      overlay.showMessage(_errors);
    }

    options.initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('[WDS] Disconnected!');
    sendMessage('Close');
  }
};
socket(socketUrl, onSocketMessage);
/* WEBPACK VAR INJECTION */}.call(this, "?http://localhost:8080"))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!**********************************************!*\
  !*** (webpack)-dev-server/client/overlay.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");

var _require = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js"),
    AllHtmlEntities = _require.AllHtmlEntities;

var entities = new AllHtmlEntities();
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};
var overlayIframe = null;
var overlayDiv = null;
var lastOnOverlayDivReady = null;
ansiHTML.setColors(colors);

function createOverlayIframe(onIframeLoad) {
  var iframe = document.createElement('iframe');
  iframe.id = 'webpack-dev-server-client-overlay';
  iframe.src = 'about:blank';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.top = 0;
  iframe.style.right = 0;
  iframe.style.bottom = 0;
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.zIndex = 9999999999;
  iframe.onload = onIframeLoad;
  return iframe;
}

function addOverlayDivTo(iframe) {
  var div = iframe.contentDocument.createElement('div');
  div.id = 'webpack-dev-server-client-overlay-div';
  div.style.position = 'fixed';
  div.style.boxSizing = 'border-box';
  div.style.left = 0;
  div.style.top = 0;
  div.style.right = 0;
  div.style.bottom = 0;
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  div.style.color = '#E8E8E8';
  div.style.fontFamily = 'Menlo, Consolas, monospace';
  div.style.fontSize = 'large';
  div.style.padding = '2rem';
  div.style.lineHeight = '1.2';
  div.style.whiteSpace = 'pre-wrap';
  div.style.overflow = 'auto';
  iframe.contentDocument.body.appendChild(div);
  return div;
}

function ensureOverlayDivExists(onOverlayDivReady) {
  if (overlayDiv) {
    // Everything is ready, call the callback right away.
    onOverlayDivReady(overlayDiv);
    return;
  } // Creating an iframe may be asynchronous so we'll schedule the callback.
  // In case of multiple calls, last callback wins.


  lastOnOverlayDivReady = onOverlayDivReady;

  if (overlayIframe) {
    // We've already created it.
    return;
  } // Create iframe and, when it is ready, a div inside it.


  overlayIframe = createOverlayIframe(function () {
    overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!

    lastOnOverlayDivReady(overlayDiv);
  }); // Zalgo alert: onIframeLoad() will be called either synchronously
  // or asynchronously depending on the browser.
  // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.

  document.body.appendChild(overlayIframe);
} // Successful compilation.


function clear() {
  if (!overlayDiv) {
    // It is not there in the first place.
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(overlayIframe);
  overlayDiv = null;
  overlayIframe = null;
  lastOnOverlayDivReady = null;
} // Compilation with errors (e.g. syntax error or missing modules).


function showMessage(messages) {
  ensureOverlayDivExists(function (div) {
    // Make it look similar to our terminal.
    div.innerHTML = "<span style=\"color: #".concat(colors.red, "\">Failed to compile.</span><br><br>").concat(ansiHTML(entities.encode(messages[0])));
  });
}

module.exports = {
  clear: clear,
  showMessage: showMessage
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!*********************************************!*\
  !*** (webpack)-dev-server/client/socket.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_dev_server_client__) {
/* global __webpack_dev_server_client__ */

/* eslint-disable
  camelcase
*/
// this SockJSClient is here as a default fallback, in case inline mode
// is off or the client is not injected. This will be switched to
// WebsocketClient when it becomes the default
// important: the path to SockJSClient here is made to work in the 'client'
// directory, but is updated via the webpack compilation when compiled from
// the 'client-src' directory

var Client = typeof __webpack_dev_server_client__ !== 'undefined' ? __webpack_dev_server_client__ : // eslint-disable-next-line import/no-unresolved
__webpack_require__(/*! ./clients/SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
var retries = 0;
var client = null;

var socket = function initSocket(url, handlers) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries <= 10) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  });
  client.onMessage(function (data) {
    var msg = JSON.parse(data);

    if (handlers[msg.type]) {
      handlers[msg.type](msg.data);
    }
  });
};

module.exports = socket;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)-dev-server/client/clients/SockJSClient.js */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js")))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js":
/*!************************************************************!*\
  !*** (webpack)-dev-server/client/utils/createSocketUrl.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global self */

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var getCurrentScriptSource = __webpack_require__(/*! ./getCurrentScriptSource */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

function createSocketUrl(resourceQuery, currentLocation) {
  var urlParts;

  if (typeof resourceQuery === 'string' && resourceQuery !== '') {
    // If this bundle is inlined, use the resource query to get the correct url.
    // format is like `?http://0.0.0.0:8096&sockPort=8097&sockHost=localhost`
    urlParts = url.parse(resourceQuery // strip leading `?` from query string to get a valid URL
    .substr(1) // replace first `&` with `?` to have a valid query string
    .replace('&', '?'), true);
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptHost = getCurrentScriptSource();
    urlParts = url.parse(scriptHost || '/', true, true);
  } // Use parameter to allow passing location in unit tests


  if (typeof currentLocation === 'string' && currentLocation !== '') {
    currentLocation = url.parse(currentLocation);
  } else {
    currentLocation = self.location;
  }

  return getSocketUrl(urlParts, currentLocation);
}
/*
 * Gets socket URL based on Script Source/Location
 * (scriptSrc: URL, location: URL) -> URL
 */


function getSocketUrl(urlParts, loc) {
  var auth = urlParts.auth,
      query = urlParts.query;
  var hostname = urlParts.hostname,
      protocol = urlParts.protocol,
      port = urlParts.port;

  if (!port || port === '0') {
    port = loc.port;
  } // check ipv4 and ipv6 `all hostname`
  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384


  if ((hostname === '0.0.0.0' || hostname === '::') && loc.hostname && loc.protocol.indexOf('http') === 0) {
    hostname = loc.hostname;
  } // `hostname` can be empty when the script path is relative. In that case, specifying
  // a protocol would result in an invalid URL.
  // When https is used in the app, secure websockets are always necessary
  // because the browser doesn't accept non-secure websockets.


  if (hostname && hostname !== '127.0.0.1' && (loc.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
    protocol = loc.protocol;
  } // all of these sock url params are optionally passed in through
  // resourceQuery, so we need to fall back to the default if
  // they are not provided


  var sockHost = query.sockHost || hostname;
  var sockPath = query.sockPath || '/sockjs-node';
  var sockPort = query.sockPort || port;

  if (sockPort === 'location') {
    sockPort = loc.port;
  }

  return url.format({
    protocol: protocol,
    auth: auth,
    hostname: sockHost,
    port: sockPort,
    // If sockPath is provided it'll be passed in via the resourceQuery as a
    // query param so it has to be parsed out of the querystring in order for the
    // client to open the socket to the correct location.
    pathname: sockPath
  });
}

module.exports = createSocketUrl;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!*******************************************************************!*\
  !*** (webpack)-dev-server/client/utils/getCurrentScriptSource.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute('src');
  } // Fall back to getting all scripts in the document.


  var scriptElements = document.scripts || [];
  var currentScript = scriptElements[scriptElements.length - 1];

  if (currentScript) {
    return currentScript.getAttribute('src');
  } // Fail as there was no script to use.


  throw new Error('[WDS] Failed to get current script source.');
}

module.exports = getCurrentScriptSource;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!************************************************!*\
  !*** (webpack)-dev-server/client/utils/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');

var INFO = 'info';
var WARN = 'warn';
var ERROR = 'error';
var DEBUG = 'debug';
var TRACE = 'trace';
var SILENT = 'silent'; // deprecated
// TODO: remove these at major released
// https://github.com/webpack/webpack-dev-server/pull/1825

var WARNING = 'warning';
var NONE = 'none'; // Set the default log level

log.setDefaultLevel(INFO);

function setLogLevel(level) {
  switch (level) {
    case INFO:
    case WARN:
    case ERROR:
    case DEBUG:
    case TRACE:
      log.setLevel(level);
      break;
    // deprecated

    case WARNING:
      // loglevel's warning name is different from webpack's
      log.setLevel('warn');
      break;
    // deprecated

    case NONE:
    case SILENT:
      log.disableAll();
      break;

    default:
      log.error("[WDS] Unknown clientLogLevel '".concat(level, "'"));
  }
}

module.exports = {
  log: log,
  setLogLevel: setLogLevel
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!******************************************************!*\
  !*** (webpack)-dev-server/client/utils/reloadApp.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global WorkerGlobalScope self */

var _require = __webpack_require__(/*! ./log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log;

function reloadApp(_ref, _ref2) {
  var hotReload = _ref.hotReload,
      hot = _ref.hot,
      liveReload = _ref.liveReload;
  var isUnloading = _ref2.isUnloading,
      currentHash = _ref2.currentHash;

  if (isUnloading || !hotReload) {
    return;
  }

  if (hot) {
    log.info('[WDS] App hot update...');

    var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");

    hotEmitter.emit('webpackHotUpdate', currentHash);

    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentHash), '*');
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload) {
      var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

      var intervalId = self.setInterval(function () {
        if (rootWindow.location.protocol !== 'about:') {
          // reload immediately if protocol is valid
          applyReload(rootWindow, intervalId);
        } else {
          rootWindow = rootWindow.parent;

          if (rootWindow.parent === rootWindow) {
            // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
            applyReload(rootWindow, intervalId);
          }
        }
      });
    }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    log.info('[WDS] App updated. Reloading...');
    rootWindow.location.reload();
  }
}

module.exports = reloadApp;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!********************************************************!*\
  !*** (webpack)-dev-server/client/utils/sendMessage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global __resourceQuery WorkerGlobalScope self */
// Send messages to the outside, so plugins can consume it.

function sendMsg(type, data) {
  if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, '*');
  }
}

module.exports = sendMsg;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!********************************!*\
  !*** (webpack)/hot/emitter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layouts_Web_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layouts/Web.svelte */ "./src/layouts/Web.svelte");


/* harmony default export */ __webpack_exports__["default"] = (new _layouts_Web_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]({
  target: document.body,
}));


/***/ }),

/***/ "./src/i18n/index.js":
/*!***************************!*\
  !*** ./src/i18n/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Add language files in ./languages folder
/* harmony default export */ __webpack_exports__["default"] = ([
  'en-US',
]);


/***/ }),

/***/ "./src/i18n/languages lazy recursive ^\\.\\/.*\\.js$":
/*!***************************************************************!*\
  !*** ./src/i18n/languages lazy ^\.\/.*\.js$ namespace object ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en-US.js": [
		"./src/i18n/languages/en-US.js",
		6
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/i18n/languages lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/layouts/Web.svelte":
/*!********************************!*\
  !*** ./src/layouts/Web.svelte ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var sveltail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sveltail */ "./node_modules/sveltail/index.js");
/* src/layouts/Web.svelte generated by Svelte v3.30.0 */



const file = "src/layouts/Web.svelte";

// (8:2) <div slot="header">
function create_header_slot(ctx) {
	let div;
	let bar;
	let current;

	bar = new sveltail__WEBPACK_IMPORTED_MODULE_1__["Bar"]({
			props: {
				img: "logo.png",
				title: "Sveltail Cross Platform App",
				leftMenu: true,
				rightMenu: true,
				dense: true
			},
			$$inline: true
		});

	bar.$on("leftMenuClicked", /*leftMenuClicked_handler*/ ctx[2]);
	bar.$on("rightMenuClicked", /*rightMenuClicked_handler*/ ctx[3]);

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(bar.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "slot", "header");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 7, 2, 136);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(bar, div, null);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(bar.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(bar.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(bar);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_header_slot.name,
		type: "slot",
		source: "(8:2) <div slot=\\\"header\\\">",
		ctx
	});

	return block;
}

// (19:2) <div slot="drawer">
function create_drawer_slot(ctx) {
	let div;
	let drawer0;
	let t;
	let drawer1;
	let current;
	let drawer0_props = {};
	drawer0 = new sveltail__WEBPACK_IMPORTED_MODULE_1__["Drawer"]({ props: drawer0_props, $$inline: true });
	/*drawer0_binding*/ ctx[4](drawer0);
	let drawer1_props = { right: true };
	drawer1 = new sveltail__WEBPACK_IMPORTED_MODULE_1__["Drawer"]({ props: drawer1_props, $$inline: true });
	/*drawer1_binding*/ ctx[5](drawer1);

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(drawer0.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(drawer1.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "slot", "drawer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 18, 2, 397);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(drawer0, div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(drawer1, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const drawer0_changes = {};
			drawer0.$set(drawer0_changes);
			const drawer1_changes = {};
			drawer1.$set(drawer1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(drawer0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(drawer1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(drawer0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(drawer1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			/*drawer0_binding*/ ctx[4](null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(drawer0);
			/*drawer1_binding*/ ctx[5](null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(drawer1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_drawer_slot.name,
		type: "slot",
		source: "(19:2) <div slot=\\\"drawer\\\">",
		ctx
	});

	return block;
}

// (7:0) <LayoutWeb fixedHeader>
function create_default_slot(ctx) {
	let t;
	let current;

	const block = {
		c: function create() {
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(7:0) <LayoutWeb fixedHeader>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let layoutweb;
	let current;

	layoutweb = new sveltail__WEBPACK_IMPORTED_MODULE_1__["LayoutWeb"]({
			props: {
				fixedHeader: true,
				$$slots: {
					default: [create_default_slot],
					drawer: [create_drawer_slot],
					header: [create_header_slot]
				},
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(layoutweb.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(layoutweb, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layoutweb_changes = {};

			if (dirty & /*$$scope, rightDrawer, leftDrawer*/ 67) {
				layoutweb_changes.$$scope = { dirty, ctx };
			}

			layoutweb.$set(layoutweb_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(layoutweb.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(layoutweb.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(layoutweb, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Web", slots, []);
	let leftDrawer;
	let rightDrawer;
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Web> was created with unknown prop '${key}'`);
	});

	const leftMenuClicked_handler = () => leftDrawer.toggle();
	const rightMenuClicked_handler = () => rightDrawer.toggle();

	function drawer0_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"][$$value ? "unshift" : "push"](() => {
			leftDrawer = $$value;
			$$invalidate(0, leftDrawer);
		});
	}

	function drawer1_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"][$$value ? "unshift" : "push"](() => {
			rightDrawer = $$value;
			$$invalidate(1, rightDrawer);
		});
	}

	$$self.$capture_state = () => ({
		LayoutWeb: sveltail__WEBPACK_IMPORTED_MODULE_1__["LayoutWeb"],
		Bar: sveltail__WEBPACK_IMPORTED_MODULE_1__["Bar"],
		Drawer: sveltail__WEBPACK_IMPORTED_MODULE_1__["Drawer"],
		leftDrawer,
		rightDrawer
	});

	$$self.$inject_state = $$props => {
		if ("leftDrawer" in $$props) $$invalidate(0, leftDrawer = $$props.leftDrawer);
		if ("rightDrawer" in $$props) $$invalidate(1, rightDrawer = $$props.rightDrawer);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		leftDrawer,
		rightDrawer,
		leftMenuClicked_handler,
		rightMenuClicked_handler,
		drawer0_binding,
		drawer1_binding
	];
}

class Web extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Web",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Web);


/***/ }),

/***/ "./src/pages lazy recursive ^\\.\\/.*\\.svelte$":
/*!**********************************************************!*\
  !*** ./src/pages lazy ^\.\/.*\.svelte$ namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Error.svelte": [
		"./src/pages/Error.svelte",
		5
	],
	"./Index.svelte": [
		"./src/pages/Index.svelte",
		4
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/pages lazy recursive ^\\.\\/.*\\.svelte$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/router/hooks.js":
/*!*****************************!*\
  !*** ./src/router/hooks.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line arrow-body-style
/* harmony default export */ __webpack_exports__["default"] = ({
  onBefore() {
    // Add your hook here
    // If you return false, route update would be prevented
    return true;
  },
  onAfter() {

  },
});


/***/ }),

/***/ "./src/router/routes.js":
/*!******************************!*\
  !*** ./src/router/routes.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
  { path: '/', name: 'Index' },
  { path: '/*', name: 'Error' },
]);


/***/ }),

/***/ "./src/store/state.js":
/*!****************************!*\
  !*** ./src/store/state.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  // Put your App State Here
  // foo: bar,
});


/***/ }),

/***/ 0:
/*!****************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:8080 ./src/app.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/mac/Coding/Svelte/sveltail-example/node_modules/webpack-dev-server/client/index.js?http://localhost:8080 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:8080");
module.exports = __webpack_require__(/*! /Users/mac/Coding/Svelte/sveltail-example/src/app.js */"./src/app.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/store2/dist/store2.js":
/*!********************************************!*\
  !*** ./node_modules/store2/dist/store2.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! store2 - v2.12.0 - 2020-08-12
* Copyright (c) 2020 Nathan Bubna; Licensed (MIT OR GPL-3.0) */
;(function(window, define) {
    var _ = {
        version: "2.12.0",
        areas: {},
        apis: {},

        // utilities
        inherit: function(api, o) {
            for (var p in api) {
                if (!o.hasOwnProperty(p)) {
                    Object.defineProperty(o, p, Object.getOwnPropertyDescriptor(api, p));
                }
            }
            return o;
        },
        stringify: function(d) {
            return d === undefined || typeof d === "function" ? d+'' : JSON.stringify(d);
        },
        parse: function(s, fn) {
            // if it doesn't parse, return as is
            try{ return JSON.parse(s,fn||_.revive); }catch(e){ return s; }
        },

        // extension hooks
        fn: function(name, fn) {
            _.storeAPI[name] = fn;
            for (var api in _.apis) {
                _.apis[api][name] = fn;
            }
        },
        get: function(area, key){ return area.getItem(key); },
        set: function(area, key, string){ area.setItem(key, string); },
        remove: function(area, key){ area.removeItem(key); },
        key: function(area, i){ return area.key(i); },
        length: function(area){ return area.length; },
        clear: function(area){ area.clear(); },

        // core functions
        Store: function(id, area, namespace) {
            var store = _.inherit(_.storeAPI, function(key, data, overwrite) {
                if (arguments.length === 0){ return store.getAll(); }
                if (typeof data === "function"){ return store.transact(key, data, overwrite); }// fn=data, alt=overwrite
                if (data !== undefined){ return store.set(key, data, overwrite); }
                if (typeof key === "string" || typeof key === "number"){ return store.get(key); }
                if (typeof key === "function"){ return store.each(key); }
                if (!key){ return store.clear(); }
                return store.setAll(key, data);// overwrite=data, data=key
            });
            store._id = id;
            try {
                var testKey = '__store2_test';
                area.setItem(testKey, 'ok');
                store._area = area;
                area.removeItem(testKey);
            } catch (e) {
                store._area = _.storage('fake');
            }
            store._ns = namespace || '';
            if (!_.areas[id]) {
                _.areas[id] = store._area;
            }
            if (!_.apis[store._ns+store._id]) {
                _.apis[store._ns+store._id] = store;
            }
            return store;
        },
        storeAPI: {
            // admin functions
            area: function(id, area) {
                var store = this[id];
                if (!store || !store.area) {
                    store = _.Store(id, area, this._ns);//new area-specific api in this namespace
                    if (!this[id]){ this[id] = store; }
                }
                return store;
            },
            namespace: function(namespace, singleArea) {
                if (!namespace){
                    return this._ns ? this._ns.substring(0,this._ns.length-1) : '';
                }
                var ns = namespace, store = this[ns];
                if (!store || !store.namespace) {
                    store = _.Store(this._id, this._area, this._ns+ns+'.');//new namespaced api
                    if (!this[ns]){ this[ns] = store; }
                    if (!singleArea) {
                        for (var name in _.areas) {
                            store.area(name, _.areas[name]);
                        }
                    }
                }
                return store;
            },
            isFake: function(){ return this._area.name === 'fake'; },
            toString: function() {
                return 'store'+(this._ns?'.'+this.namespace():'')+'['+this._id+']';
            },

            // storage functions
            has: function(key) {
                if (this._area.has) {
                    return this._area.has(this._in(key));//extension hook
                }
                return !!(this._in(key) in this._area);
            },
            size: function(){ return this.keys().length; },
            each: function(fn, fill) {// fill is used by keys(fillList) and getAll(fillList))
                for (var i=0, m=_.length(this._area); i<m; i++) {
                    var key = this._out(_.key(this._area, i));
                    if (key !== undefined) {
                        if (fn.call(this, key, this.get(key), fill) === false) {
                            break;
                        }
                    }
                    if (m > _.length(this._area)) { m--; i--; }// in case of removeItem
                }
                return fill || this;
            },
            keys: function(fillList) {
                return this.each(function(k, v, list){ list.push(k); }, fillList || []);
            },
            get: function(key, alt) {
                var s = _.get(this._area, this._in(key)),
                    fn;
                if (typeof alt === "function") {
                    fn = alt;
                    alt = null;
                }
                return s !== null ? _.parse(s, fn) :
                    alt != null ? alt : s;
            },
            getAll: function(fillObj) {
                return this.each(function(k, v, all){ all[k] = v; }, fillObj || {});
            },
            transact: function(key, fn, alt) {
                var val = this.get(key, alt),
                    ret = fn(val);
                this.set(key, ret === undefined ? val : ret);
                return this;
            },
            set: function(key, data, overwrite) {
                var d = this.get(key);
                if (d != null && overwrite === false) {
                    return data;
                }
                return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;
            },
            setAll: function(data, overwrite) {
                var changed, val;
                for (var key in data) {
                    val = data[key];
                    if (this.set(key, val, overwrite) !== val) {
                        changed = true;
                    }
                }
                return changed;
            },
            add: function(key, data) {
                var d = this.get(key);
                if (d instanceof Array) {
                    data = d.concat(data);
                } else if (d !== null) {
                    var type = typeof d;
                    if (type === typeof data && type === 'object') {
                        for (var k in data) {
                            d[k] = data[k];
                        }
                        data = d;
                    } else {
                        data = d + data;
                    }
                }
                _.set(this._area, this._in(key), _.stringify(data));
                return data;
            },
            remove: function(key, alt) {
                var d = this.get(key, alt);
                _.remove(this._area, this._in(key));
                return d;
            },
            clear: function() {
                if (!this._ns) {
                    _.clear(this._area);
                } else {
                    this.each(function(k){ _.remove(this._area, this._in(k)); }, 1);
                }
                return this;
            },
            clearAll: function() {
                var area = this._area;
                for (var id in _.areas) {
                    if (_.areas.hasOwnProperty(id)) {
                        this._area = _.areas[id];
                        this.clear();
                    }
                }
                this._area = area;
                return this;
            },

            // internal use functions
            _in: function(k) {
                if (typeof k !== "string"){ k = _.stringify(k); }
                return this._ns ? this._ns + k : k;
            },
            _out: function(k) {
                return this._ns ?
                    k && k.indexOf(this._ns) === 0 ?
                        k.substring(this._ns.length) :
                        undefined : // so each() knows to skip it
                    k;
            }
        },// end _.storeAPI
        storage: function(name) {
            return _.inherit(_.storageAPI, { items: {}, name: name });
        },
        storageAPI: {
            length: 0,
            has: function(k){ return this.items.hasOwnProperty(k); },
            key: function(i) {
                var c = 0;
                for (var k in this.items){
                    if (this.has(k) && i === c++) {
                        return k;
                    }
                }
            },
            setItem: function(k, v) {
                if (!this.has(k)) {
                    this.length++;
                }
                this.items[k] = v;
            },
            removeItem: function(k) {
                if (this.has(k)) {
                    delete this.items[k];
                    this.length--;
                }
            },
            getItem: function(k){ return this.has(k) ? this.items[k] : null; },
            clear: function(){ for (var k in this.items){ this.removeItem(k); } }
        }// end _.storageAPI
    };

    var store =
        // safely set this up (throws error in IE10/32bit mode for local files)
        _.Store("local", (function(){try{ return localStorage; }catch(e){}})());
    store.local = store;// for completeness
    store._ = _;// for extenders and debuggers...
    // safely setup store.session (throws exception in FF for file:/// urls)
    store.area("session", (function(){try{ return sessionStorage; }catch(e){}})());
    store.area("page", _.storage("page"));

    if (typeof define === 'function' && define.amd !== undefined) {
        define('store2', [], function () {
            return store;
        });
    } else if ( true && module.exports) {
        module.exports = store;
    } else {
        // expose the primary store fn to the global object and save conflicts
        if (window.store){ _.conflict = window.store; }
        window.store = store;
    }

})(this, this && this.define);


/***/ }),

/***/ "./node_modules/sveltail/lib/js/utilities.js":
/*!***************************************************!*\
  !*** ./node_modules/sveltail/lib/js/utilities.js ***!
  \***************************************************/
/*! exports provided: Alerter, Notifier, LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_Alerter_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/Alerter.svelte */ "./node_modules/sveltail/lib/utilities/Alerter.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Alerter", function() { return _utilities_Alerter_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _utilities_Notifier_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/Notifier.svelte */ "./node_modules/sveltail/lib/utilities/Notifier.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notifier", function() { return _utilities_Notifier_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _utilities_LocalStorage_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/LocalStorage.svelte */ "./node_modules/sveltail/lib/utilities/LocalStorage.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return _utilities_LocalStorage_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./node_modules/sveltail/lib/utilities/Alerter.svelte":
/*!************************************************************!*\
  !*** ./node_modules/sveltail/lib/utilities/Alerter.svelte ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var _components_Icon_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Icon.svelte */ "./node_modules/sveltail/lib/components/Icon.svelte");
/* harmony import */ var _components_Button_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Button.svelte */ "./node_modules/sveltail/lib/components/Button.svelte");
/* harmony import */ var _Users_mac_Coding_Svelte_sveltail_example_node_modules_sveltail_lib_utilities_Alerter_svelte_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/sveltail/lib/utilities/Alerter.svelte.css */ "./node_modules/sveltail/lib/utilities/Alerter.svelte.css");
/* node_modules/sveltail/lib/utilities/Alerter.svelte generated by Svelte v3.30.0 */






const file = "node_modules/sveltail/lib/utilities/Alerter.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (79:0) {#if props}
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
		p: function update(ctx, dirty) {
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
		id: create_if_block.name,
		type: "if",
		source: "(79:0) {#if props}",
		ctx
	});

	return block;
}

// (80:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_4(ctx) {
	let gridLayout;

	const block = {
		c: function create() {
			gridLayout = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("gridLayout");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(gridLayout, "width", "100%");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(gridLayout, "height", "100%");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(gridLayout, file, 80, 4, 2329);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, gridLayout, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(gridLayout);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(80:2) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (85:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block_1(ctx) {
	let div3;
	let div0;
	let t0;
	let div2;
	let t1;
	let div1;
	let p;
	let t2_value = /*props*/ ctx[0].message + "";
	let t2;
	let t3;
	let div2_transition;
	let current;
	let mounted;
	let dispose;
	let if_block0 = !/*props*/ ctx[0].hideBar && create_if_block_3(ctx);
	let if_block1 = /*props*/ ctx[0].actions.length > 0 && create_if_block_2(ctx);

	const block = {
		c: function create() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block0) if_block0.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "fixed bg-black dark:bg-white inset-0 opacity-50");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 86, 6, 2549);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 100, 10, 3197);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "p-5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 99, 8, 3169);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "z-10 m-auto st-alerter rounded bg-black text-white dark:bg-white dark:text-black svelte-17pc42y");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 92, 6, 2714);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "absolute h-screen w-screen top-0 left-0 flex");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 85, 4, 2484);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			if (if_block0) if_block0.m(div2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t3);
			if (if_block1) if_block1.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(div0, "click", /*click_handler*/ ctx[2], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!/*props*/ ctx[0].hideBar) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*props*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					if_block0.m(div2, t1);
				}
			} else if (if_block0) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if ((!current || dirty & /*props*/ 1) && t2_value !== (t2_value = /*props*/ ctx[0].message + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t2, t2_value);

			if (/*props*/ ctx[0].actions.length > 0) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*props*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
				if (!div2_transition) div2_transition = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_bidirectional_transition"])(div2, svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fade"], { duration: 300 }, true);
				div2_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			if (!div2_transition) div2_transition = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_bidirectional_transition"])(div2, svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fade"], { duration: 300 }, false);
			div2_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div3);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (detaching && div2_transition) div2_transition.end();
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(85:2) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

// (94:8) {#if !props.hideBar}
function create_if_block_3(ctx) {
	let div2;
	let div0;
	let t0_value = /*props*/ ctx[0].title + "";
	let t0;
	let t1;
	let div1;
	let icon;
	let div2_class_value;
	let current;
	let mounted;
	let dispose;

	icon = new _components_Icon_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: { icon: "fas fa-times", size: "md" },
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 95, 12, 3001);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "cursor-pointer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 96, 12, 3038);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", div2_class_value = "flex h-12 p-5 items-center justify-between bg-" + /*props*/ ctx[0].barColorBg + " text-" + /*props*/ ctx[0].barColorText + " svelte-17pc42y");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 94, 10, 2884);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, div1, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(div1, "click", /*dismiss*/ ctx[1], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*props*/ 1) && t0_value !== (t0_value = /*props*/ ctx[0].title + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);

			if (!current || dirty & /*props*/ 1 && div2_class_value !== (div2_class_value = "flex h-12 p-5 items-center justify-between bg-" + /*props*/ ctx[0].barColorBg + " text-" + /*props*/ ctx[0].barColorText + " svelte-17pc42y")) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", div2_class_value);
			}
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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(94:8) {#if !props.hideBar}",
		ctx
	});

	return block;
}

// (102:10) {#if props.actions.length > 0}
function create_if_block_2(ctx) {
	let br;
	let t;
	let div;
	let div_class_value;
	let current;
	let each_value = /*props*/ ctx[0].actions;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			br = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("br");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(br, file, 102, 14, 3275);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", div_class_value = "inline-flex w-full " + /*props*/ ctx[0].actionsClass + " svelte-17pc42y");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 103, 14, 3294);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, br, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*props*/ 1) {
				each_value = /*props*/ ctx[0].actions;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (!current || dirty & /*props*/ 1 && div_class_value !== (div_class_value = "inline-flex w-full " + /*props*/ ctx[0].actionsClass + " svelte-17pc42y")) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", div_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(br);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(102:10) {#if props.actions.length > 0}",
		ctx
	});

	return block;
}

// (105:16) {#each props.actions as action}
function create_each_block(ctx) {
	let button;
	let current;

	button = new _components_Button_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				flat: true,
				rounded: true,
				class: "mx-1",
				label: /*action*/ ctx[7].label,
				size: /*action*/ ctx[7].size,
				colorBg: /*action*/ ctx[7].colorBg,
				colorText: /*action*/ ctx[7].colorText
			},
			$$inline: true
		});

	button.$on("click", function () {
		if (Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["is_function"])(/*action*/ ctx[7].onClick)) /*action*/ ctx[7].onClick.apply(this, arguments);
	});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const button_changes = {};
			if (dirty & /*props*/ 1) button_changes.label = /*action*/ ctx[7].label;
			if (dirty & /*props*/ 1) button_changes.size = /*action*/ ctx[7].size;
			if (dirty & /*props*/ 1) button_changes.colorBg = /*action*/ ctx[7].colorBg;
			if (dirty & /*props*/ 1) button_changes.colorText = /*action*/ ctx[7].colorText;
			button.$set(button_changes);
		},
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
		id: create_each_block.name,
		type: "each",
		source: "(105:16) {#each props.actions as action}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*props*/ ctx[0] && create_if_block(ctx);

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
			if (/*props*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*props*/ 1) {
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
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Alerter", slots, []);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");
	let props = null;
	let msg;
	let confirm;

	const dismiss = () => {
		$$invalidate(0, props = null);
	};

	// Native
	if (false) {} //

	// Web / Hybrid
	if (true) {
		msg = ({ title, message, icon, hideBar, barColorBg, barColorText, persistant, actions, actionsClass }) => {
			const html = document.querySelector("html");
			html.classList.add("overflow-hidden");

			$$invalidate(0, props = {
				title: helpers.isString(title) ? title : null,
				message: helpers.isString(message) ? message : null,
				icon: helpers.getIcon(icon),
				hideBar: helpers.getBoolean(hideBar),
				barColorBg: helpers.getColor(barColorBg, "primary"),
				barColorText: helpers.getColor(barColorText, "white"),
				persistant: helpers.getBoolean(persistant),
				actions: helpers.isArray(actions)
				? actions.map((i, index) => {
						return {
							id: index,
							label: i.label,
							size: i.size,
							icon: i.icon,
							colorBg: i.colorBg,
							colorText: i.colorText,
							onClick() {
								if (helpers.isFunction(i.onClick)) result = i.onClick();
								dismiss();
							}
						};
					})
				: [
						{
							label: "Okay",
							size: "sm",
							colorBg: "primary",
							onClick: dismiss
						}
					],
				actionsClass: helpers.isString(actionsClass)
				? actionsClass
				: "justify-end"
			});
		};

		confirm = () => {
			const html = document.querySelector("html");
			html.classList.remove("overflow-hidden");
		};
	}

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		dispatch("ready", { alerter: { msg, confirm } });
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Alerter> was created with unknown prop '${key}'`);
	});

	const click_handler = () => {
		if (!props.persistant) dismiss();
	};

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		fade: svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fade"],
		Icon: _components_Icon_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Button: _components_Button_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		dispatch,
		helpers,
		props,
		msg,
		confirm,
		dismiss
	});

	$$self.$inject_state = $$props => {
		if ("props" in $$props) $$invalidate(0, props = $$props.props);
		if ("msg" in $$props) msg = $$props.msg;
		if ("confirm" in $$props) confirm = $$props.confirm;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [props, dismiss, click_handler];
}

class Alerter extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Alerter",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Alerter);




/***/ }),

/***/ "./node_modules/sveltail/lib/utilities/Alerter.svelte.css":
/*!****************************************************************!*\
  !*** ./node_modules/sveltail/lib/utilities/Alerter.svelte.css ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/sveltail/lib/utilities/LocalStorage.svelte":
/*!*****************************************************************!*\
  !*** ./node_modules/sveltail/lib/utilities/LocalStorage.svelte ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var store2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store2 */ "./node_modules/store2/dist/store2.js");
/* harmony import */ var store2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(store2__WEBPACK_IMPORTED_MODULE_2__);
/* node_modules/sveltail/lib/utilities/LocalStorage.svelte generated by Svelte v3.30.0 */




const file = "node_modules/sveltail/lib/utilities/LocalStorage.svelte";

function create_fragment(ctx) {
	let div;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 18, 0, 322);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
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
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("LocalStorage", slots, []);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		dispatch("ready", {
			localStorage: { get: store2__WEBPACK_IMPORTED_MODULE_2__["get"], set: store2__WEBPACK_IMPORTED_MODULE_2__["set"], getAll: store2__WEBPACK_IMPORTED_MODULE_2__["getAll"], setAll: store2__WEBPACK_IMPORTED_MODULE_2__["setAll"] }
		});
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LocalStorage> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		get: store2__WEBPACK_IMPORTED_MODULE_2__["get"],
		set: store2__WEBPACK_IMPORTED_MODULE_2__["set"],
		getAll: store2__WEBPACK_IMPORTED_MODULE_2__["getAll"],
		setAll: store2__WEBPACK_IMPORTED_MODULE_2__["setAll"],
		dispatch
	});

	return [];
}

class LocalStorage extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "LocalStorage",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (LocalStorage);


/***/ }),

/***/ "./node_modules/sveltail/lib/utilities/Notifier.svelte":
/*!*************************************************************!*\
  !*** ./node_modules/sveltail/lib/utilities/Notifier.svelte ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var _components_Icon_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Icon.svelte */ "./node_modules/sveltail/lib/components/Icon.svelte");
/* harmony import */ var _components_Button_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Button.svelte */ "./node_modules/sveltail/lib/components/Button.svelte");
/* harmony import */ var _Users_mac_Coding_Svelte_sveltail_example_node_modules_sveltail_lib_utilities_Notifier_svelte_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/sveltail/lib/utilities/Notifier.svelte.css */ "./node_modules/sveltail/lib/utilities/Notifier.svelte.css");
/* node_modules/sveltail/lib/utilities/Notifier.svelte generated by Svelte v3.30.0 */






const file = "node_modules/sveltail/lib/utilities/Notifier.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	child_ctx[8] = list;
	child_ctx[9] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

// (119:0) {#if notifications.length > 0}
function create_if_block(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = /*notifications*/ ctx[0];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	const get_key = ctx => /*item*/ ctx[7].id;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_keys"])(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*getStyle, notifications, process*/ 3) {
				const each_value = /*notifications*/ ctx[0];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_keys"])(ctx, each_value, get_each_context, get_key);
				each_blocks = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_keyed_each"])(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["outro_and_destroy_block"], create_each_block, each_1_anchor, get_each_context);
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(each_1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(119:0) {#if notifications.length > 0}",
		ctx
	});

	return block;
}

// (121:4) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}
function create_if_block_8(ctx) {
	let gridLayout;

	const block = {
		c: function create() {
			gridLayout = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("gridLayout");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(gridLayout, "width", "100%");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(gridLayout, "height", "100%");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(gridLayout, file, 121, 6, 4078);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, gridLayout, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(gridLayout);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(121:4) {#if process.env.platform === 'ns-android' || process.env.platform === 'ns-ios'}",
		ctx
	});

	return block;
}

// (126:4) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}
function create_if_block_1(ctx) {
	let div2;
	let div1;
	let t0;
	let t1;
	let div0;
	let t2;
	let t3;
	let t4;
	let t5;
	let div2_style_value;
	let div2_resize_listener;
	let div2_intro;
	let div2_outro;
	let current;
	let if_block0 = /*item*/ ctx[7].badge > 1 && create_if_block_7(ctx);
	let if_block1 = /*item*/ ctx[7].icon && create_if_block_6(ctx);
	let if_block2 = /*item*/ ctx[7].title && create_if_block_5(ctx);
	let if_block3 = /*item*/ ctx[7].message && create_if_block_4(ctx);
	let if_block4 = /*item*/ ctx[7].actions.length > 0 && create_if_block_3(ctx);
	let if_block5 = /*item*/ ctx[7].dismissable && create_if_block_2(ctx);

	function div2_elementresize_handler() {
		/*div2_elementresize_handler*/ ctx[2].call(div2, /*each_value*/ ctx[8], /*i*/ ctx[9]);
	}

	const block = {
		c: function create() {
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block2) if_block2.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block3) if_block3.c();
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block4) if_block4.c();
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block5) if_block5.c();
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 136, 10, 4846);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "relative flex");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 133, 8, 4591);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "fixed z-30 m-5 p-5 rounded max-w-xs md:max-w-sm bg-black text-white dark:bg-white dark:text-black");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "style", div2_style_value = /*getStyle*/ ctx[1](/*i*/ ctx[9], /*item*/ ctx[7].position, /*item*/ ctx[7].id));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => div2_elementresize_handler.call(div2));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 126, 6, 4241);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			if (if_block0) if_block0.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t0);
			if (if_block1) if_block1.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);
			if (if_block2) if_block2.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t2);
			if (if_block3) if_block3.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t3);
			if (if_block4) if_block4.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t4);
			if (if_block5) if_block5.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t5);
			div2_resize_listener = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_resize_listener"])(div2, div2_elementresize_handler.bind(div2));
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (/*item*/ ctx[7].badge > 1) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_7(ctx);
					if_block0.c();
					if_block0.m(div1, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*item*/ ctx[7].icon) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*notifications*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					if_block1.m(div1, t1);
				}
			} else if (if_block1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (/*item*/ ctx[7].title) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_5(ctx);
					if_block2.c();
					if_block2.m(div0, t2);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*item*/ ctx[7].message) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_4(ctx);
					if_block3.c();
					if_block3.m(div0, t3);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (/*item*/ ctx[7].actions.length > 0) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty & /*notifications*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block_3(ctx);
					if_block4.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block4, 1);
					if_block4.m(div0, null);
				}
			} else if (if_block4) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (/*item*/ ctx[7].dismissable) {
				if (if_block5) {
					if_block5.p(ctx, dirty);

					if (dirty & /*notifications*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block5, 1);
					}
				} else {
					if_block5 = create_if_block_2(ctx);
					if_block5.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block5, 1);
					if_block5.m(div1, null);
				}
			} else if (if_block5) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block5, 1, 1, () => {
					if_block5 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (!current || dirty & /*getStyle, notifications*/ 3 && div2_style_value !== (div2_style_value = /*getStyle*/ ctx[1](/*i*/ ctx[9], /*item*/ ctx[7].position, /*item*/ ctx[7].id))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "style", div2_style_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block5);

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
				if (div2_outro) div2_outro.end(1);

				if (!div2_intro) div2_intro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_in_transition"])(div2, svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fly"], {
					y: /*item*/ ctx[7].isTop ? -50 : 50,
					duration: 500
				});

				div2_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block5);
			if (div2_intro) div2_intro.invalidate();

			div2_outro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_out_transition"])(div2, svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fly"], {
				y: /*item*/ ctx[7].isTop ? -50 : 50,
				duration: 500
			});

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div2);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			div2_resize_listener();
			if (detaching && div2_outro) div2_outro.end();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(126:4) {#if process.env.platform !== 'ns-android' && process.env.platform !== 'ns-ios'}",
		ctx
	});

	return block;
}

// (135:10) {#if item.badge > 1}
function create_if_block_7(ctx) {
	let div;
	let t_value = /*item*/ ctx[7].badge + "";
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "fixed top-0 rounded left-0 st-notifier-badge text-white px-2 py-1 svelte-g7yftx");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 134, 30, 4649);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*notifications*/ 1 && t_value !== (t_value = /*item*/ ctx[7].badge + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(135:10) {#if item.badge > 1}",
		ctx
	});

	return block;
}

// (136:10) {#if item.icon}
function create_if_block_6(ctx) {
	let icon;
	let current;

	icon = new _components_Icon_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				icon: /*item*/ ctx[7].icon,
				class: "ml-1 mr-2",
				size: "md"
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
			if (dirty & /*notifications*/ 1) icon_changes.icon = /*item*/ ctx[7].icon;
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
		id: create_if_block_6.name,
		type: "if",
		source: "(136:10) {#if item.icon}",
		ctx
	});

	return block;
}

// (138:12) {#if item.title}
function create_if_block_5(ctx) {
	let div;
	let t_value = /*item*/ ctx[7].title + "";
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 137, 28, 4880);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*notifications*/ 1 && t_value !== (t_value = /*item*/ ctx[7].title + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(138:12) {#if item.title}",
		ctx
	});

	return block;
}

// (139:12) {#if item.message}
function create_if_block_4(ctx) {
	let div;
	let t_value = /*item*/ ctx[7].message + "";
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 138, 30, 4939);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*notifications*/ 1 && t_value !== (t_value = /*item*/ ctx[7].message + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(139:12) {#if item.message}",
		ctx
	});

	return block;
}

// (141:12) {#if item.actions.length > 0}
function create_if_block_3(ctx) {
	let br;
	let t;
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let div_class_value;
	let current;
	let each_value_1 = /*item*/ ctx[7].actions;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value_1);
	const get_key = ctx => /*action*/ ctx[10].id;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_keys"])(ctx, each_value_1, get_each_context_1, get_key);

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
	}

	const block = {
		c: function create() {
			br = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("br");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(br, file, 141, 14, 5027);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", div_class_value = "inline-flex w-full " + /*item*/ ctx[7].actionsClass + " svelte-g7yftx");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 142, 14, 5046);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, br, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*notifications*/ 1) {
				const each_value_1 = /*item*/ ctx[7].actions;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value_1);
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_keys"])(ctx, each_value_1, get_each_context_1, get_key);
				each_blocks = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_keyed_each"])(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, div, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["outro_and_destroy_block"], create_each_block_1, null, get_each_context_1);
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (!current || dirty & /*notifications*/ 1 && div_class_value !== (div_class_value = "inline-flex w-full " + /*item*/ ctx[7].actionsClass + " svelte-g7yftx")) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", div_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(br);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(141:12) {#if item.actions.length > 0}",
		ctx
	});

	return block;
}

// (144:16) {#each item.actions as action (action.id)}
function create_each_block_1(key_1, ctx) {
	let first;
	let button;
	let current;

	button = new _components_Button_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				flat: true,
				rounded: true,
				class: "mx-1",
				label: /*action*/ ctx[10].label,
				size: /*action*/ ctx[10].size,
				colorBg: /*action*/ ctx[10].colorBg,
				colorText: /*action*/ ctx[10].colorText
			},
			$$inline: true
		});

	button.$on("click", function () {
		if (Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["is_function"])(/*action*/ ctx[10].onClick)) /*action*/ ctx[10].onClick.apply(this, arguments);
	});

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
			this.first = first;
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, first, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const button_changes = {};
			if (dirty & /*notifications*/ 1) button_changes.label = /*action*/ ctx[10].label;
			if (dirty & /*notifications*/ 1) button_changes.size = /*action*/ ctx[10].size;
			if (dirty & /*notifications*/ 1) button_changes.colorBg = /*action*/ ctx[10].colorBg;
			if (dirty & /*notifications*/ 1) button_changes.colorText = /*action*/ ctx[10].colorText;
			button.$set(button_changes);
		},
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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(first);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(144:16) {#each item.actions as action (action.id)}",
		ctx
	});

	return block;
}

// (159:10) {#if item.dismissable}
function create_if_block_2(ctx) {
	let span;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new _components_Icon_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				class: "ml-4 mr-1 cursor-pointer",
				icon: "fas fa-times-circle",
				size: "sm"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 159, 12, 5636);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, span, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(
					span,
					"click",
					function () {
						if (Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["is_function"])(/*item*/ ctx[7].dismiss)) /*item*/ ctx[7].dismiss.apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(159:10) {#if item.dismissable}",
		ctx
	});

	return block;
}

// (120:2) {#each notifications as item, i (item.id)}
function create_each_block(key_1, ctx) {
	let first;
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = ( false) && false;
	let if_block1 =  true && create_if_block_1(ctx);

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			if (if_block0) if_block0.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			this.first = first;
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, first, anchor);
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(first);
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(120:2) {#each notifications as item, i (item.id)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*notifications*/ ctx[0].length > 0 && create_if_block(ctx);

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
			if (/*notifications*/ ctx[0].length > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*notifications*/ 1) {
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
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Notifier", slots, []);
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();
	const { helpers } = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"])("$$app");
	let notifications = [];
	let show;

	// Native
	if (false) {}

	// Web / Hybrid
	let getStyle;

	let getPosition;

	if (true) {
		getStyle = (i, pos, id) => {
			let style = "";
			const isTop = pos.indexOf("top") === 0;
			const isRight = pos.indexOf("right") > -1;
			const isCenter = pos.indexOf("center") > -1;
			if (isRight) style += "right: 0;";
			if (isCenter) style += "left: 50vw; transform: translateX(-50%);";
			let height = 0;

			for (let index = i - 1; index >= 0; --index) {
				height += notifications[index].height;
			}

			let previous = notifications[i - 1] ? notifications[i - 1] : null;
			previous = previous ? previous.isTop !== isTop : null;
			if (isTop) style += ` top: ${i * 20 + height}px;`; else style += ` bottom: ${i * 20 + height}px;`;
			return style;
		};

		getPosition = pos => {
			let position = "top-right";

			position = [
				"top-right",
				"top-left",
				"top-center",
				"bottom-right",
				"bottom-left",
				"bottom-center"
			].findIndex(i => i === pos) > -1
			? pos
			: position;

			return position;
		};

		show = ({ title, message, icon, dismissable, position, timeout, persistant, onDismiss, actions, actionsClass }) => {
			const newTitle = helpers.isString(title) ? title : null;
			const newMessage = helpers.isString(message) ? message : null;
			const newIcon = helpers.getIcon(icon);
			const foundIndex = notifications.findIndex(i => i.title === newTitle && i.message === newMessage && i.icon === newIcon);

			if (foundIndex < 0) {
				const id = `notify-${new Date().getTime() + notifications.length}`;

				const dismiss = () => {
					$$invalidate(0, notifications = [...notifications.filter(i => i.id !== id)]);
					if (helpers.isFunction(onDismiss)) onDismiss();
				};

				$$invalidate(0, notifications = [
					...notifications,
					{
						id,
						height: 0,
						title: newTitle,
						message: newMessage,
						icon: newIcon,
						dismissable: helpers.getBoolean(dismissable),
						dismiss,
						timer: persistant ? null : setTimeout(dismiss, timeout || 3000),
						position: getPosition(position),
						isTop: getPosition(position).indexOf("bottom") !== 0,
						badge: 1,
						actions: helpers.isArray(actions)
						? actions.map((i, index) => {
								return {
									id: index,
									label: i.label,
									size: i.size,
									icon: i.icon,
									colorBg: i.colorBg,
									colorText: i.colorText,
									onClick() {
										let result = true;
										if (helpers.isFunction(i.onClick)) result = i.onClick();
										if (helpers.isNull(result) || helpers.isUndefined(result)) result = true;
										if (result) dismiss();
									}
								};
							})
						: [],
						actionsClass: helpers.isString(actionsClass)
						? actionsClass
						: "justify-end"
					}
				]);
			} else {
				const tempArray = notifications.map(i => i);
				tempArray[foundIndex].badge += 1;
				$$invalidate(0, notifications = tempArray);
			}
		};
	}

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		dispatch("ready", { notifier: { show } });
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Notifier> was created with unknown prop '${key}'`);
	});

	function div2_elementresize_handler(each_value, i) {
		each_value[i].height = this.clientHeight;
		$$invalidate(0, notifications);
	}

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__["getContext"],
		fly: svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fly"],
		Icon: _components_Icon_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Button: _components_Button_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		dispatch,
		helpers,
		notifications,
		show,
		getStyle,
		getPosition
	});

	$$self.$inject_state = $$props => {
		if ("notifications" in $$props) $$invalidate(0, notifications = $$props.notifications);
		if ("show" in $$props) show = $$props.show;
		if ("getStyle" in $$props) $$invalidate(1, getStyle = $$props.getStyle);
		if ("getPosition" in $$props) getPosition = $$props.getPosition;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [notifications, getStyle, div2_elementresize_handler];
}

class Notifier extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Notifier",
			options,
			id: create_fragment.name
		});
	}
}


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Notifier);




/***/ }),

/***/ "./node_modules/sveltail/lib/utilities/Notifier.svelte.css":
/*!*****************************************************************!*\
  !*** ./node_modules/sveltail/lib/utilities/Notifier.svelte.css ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=2.js.map
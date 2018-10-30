// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	var App = __webpack_require__(558)
	App.el = '#root'
	new Vue(App)


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _router = __webpack_require__(6);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var modal = weex.requireModule('modal');
	var event = weex.requireModule('event');
	var syncData = weex.requireModule("syncData");
	var storage = weex.requireModule('storage');

	var globalEvent = weex.requireModule('globalEvent');

	var merge = function merge(target, source) {
	    if (target && source) {
	        for (var k in source) {
	            if (target[k] == undefined) {
	                target[k] = source[k];
	            }
	        }
	    }
	};
	exports.default = {
	    isIOS: weex.config.env.platform == 'iOS',
	    host: "",
	    toast: function toast(message) {
	        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	        modal.toast({ message: message, duration: duration });
	    },
	    openUrl: function openUrl(url, params) {
	        //打开一个页面
	        event.openURL(url, params);
	    },
	    openJsbundle: function openJsbundle(url, params, callbackId) {
	        //打开js包
	        event.openJsbundle(url, params, callbackId);
	    },
	    isLogin: function isLogin() {
	        if (syncData) {
	            return syncData.isLogin();
	        }
	    }, // TODO deleted by caowen 2017-07-18 15:10
	    getPageParams: function getPageParams() {
	        return event.getPageParams();
	    },
	    setTitleBarConfig: function setTitleBarConfig(config) {
	        merge(config, { textColor: "#FFFFFF" });
	        event.setTitleBarConfig(config);
	    },
	    getCallbackId: function getCallbackId() {
	        //如果这个页面是别的页面的条件页面，则在执行页面操作后进行回掉处理
	        return event.getCallbackId();
	    },
	    setResult: function setResult(status, message) {
	        var callbackId = event.getCallbackId();

	        console.log("callbackId:" + callbackId + "\n");
	        if (callbackId) {
	            setTimeout(function () {
	                var Hulk = new BroadcastChannel(callbackId);
	                Hulk.postMessage({ status: status, message: message });
	                Hulk.close();
	            }, 100);

	            return true;
	        }

	        return false;
	    },
	    notifyUserChange: function notifyUserChange() {
	        //通知用户信息发生改变,需要的地方自行监听
	        var userInfoChange = new BroadcastChannel("userInfoChange");
	        userInfoChange.postMessage({ status: 1 });
	        userInfoChange.close();
	        event.notifyUserInfoChange();
	        //event.fireNativeGlobalEvent("userInfoChange");
	    },
	    listenUserChange: function listenUserChange(callback) {
	        var self = this;
	        var userInfoChange = new BroadcastChannel("userInfoChange");
	        userInfoChange.onmessage = function (e) {
	            callback(e);
	        };
	        // globalEvent.addEventListener("userInfoChange", function (e) {
	        //     self.toast("userInfoChange");
	        //     callback(e);
	        // });
	    },
	    setTitle: function setTitle(title) {
	        if (!event.setTitle) return;
	        event.setTitle(title);
	    },
	    setRightButton: function setRightButton(icon, title, click) {
	        if (!event.setRightButton) return;
	        event.setRightButton({ icon: icon, name: title });
	        globalEvent.addEventListener("__rightButtonClick__", function (e) {
	            click(e);
	        });
	    },
	    hideTitleBar: function hideTitleBar() {
	        event.hideTitleBar();
	    },
	    saveUser: function saveUser(userinfo) {
	        syncData.setUserInfo(userinfo);
	    },
	    removeUser: function removeUser() {
	        syncData.removeUserInfo();
	    },
	    setHeadImage: function setHeadImage(params, onuploading, callback) {
	        event.setHeadImage(params, onuploading, callback);
	    },
	    getUser: function getUser() {
	        return syncData.getUser();
	    },
	    saveUserData: function saveUserData(key, value) {
	        //使用系统轻量级存储
	        event.saveUserData(key, value);
	    },
	    getUserData: function getUserData(key) {
	        return event.getUserData(key);
	    },
	    setPageModel: function setPageModel(model) {
	        event.setPageModel(model);
	    },
	    saveData: function saveData(key, value, callback) {
	        storage.setItem(key, JSON.stringify({ data: value }), callback);
	    },
	    getData: function getData(key, callback) {

	        storage.getItem(key, function (event) {
	            debugger;
	            var val = event.data;
	            if (val && val != 'undefined') {
	                callback(JSON.parse(val).data);
	            } else {
	                callback(null);
	            }
	        });
	    },
	    removeData: function removeData(key) {
	        storage.removeItem(key);
	    },
	    addData: function addData(key, data) {

	        storage.getItem(key, function (event) {
	            //debugger;
	            var val = event.data;
	            if (val && val != 'undefined') {
	                var origin = JSON.parse(val).data;
	                if (origin instanceof Array) {
	                    origin.push(data);
	                } else {
	                    origin = [origin];
	                    origin.push(data);
	                }
	                storage.setItem(key, JSON.stringify({ data: origin }));
	            } else {
	                storage.setItem(key, JSON.stringify({ data: [data] }));
	            }
	        });
	    },
	    showLoading: function showLoading(message) {
	        event.showLoading(message);
	    },
	    hideLoading: function hideLoading() {
	        event.hideLoading();
	    },
	    sendPageMessage: function sendPageMessage() {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        event.sendPageMessage(data);
	    },
	    popToViewNum: function popToViewNum() {
	        var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	        event.popToViewNum(num);
	    },
	    callPlugin: function callPlugin(name, params, callback) {

	        event.callPlugin(name, params, callback);
	    }
	};

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _app_context = __webpack_require__(5);

	var _app_context2 = _interopRequireDefault(_app_context);

	var _routerConfig = __webpack_require__(7);

	var _routerConfig2 = _interopRequireDefault(_routerConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var event = weex.requireModule("event");
	//import { host } from "./api"

	var globalEvent = weex.requireModule('globalEvent');

	// const routers = {
	//     smallChange: {
	//         url: "http://www.baidu.com",
	//         validater: function () {
	//             if (!context.isLogin()) {
	//                 context.openJsbundle("/dist/mine.weex.js?test=123", { name: "zhangsan" });
	//                 return false;
	//             }
	//             return true;
	//         }
	//     },
	//     login: {
	//         jsbundle: "/dist/login.weex.js"
	//     }

	// }


	exports.default = {
	    register: function register() {
	        event.syncRouter(_routerConfig2.default); // TODO deleted by caowen 2017-07-18 15:10
	        var self = this;
	        globalEvent.addEventListener("wxcallRouter", function (params) {
	            self.goTo(params.name, params.params);
	        });
	    },
	    unregister: function unregister() {
	        globalEvent.removeEventListener("wxcallRouter");
	    },
	    goBeforeRouter: function goBeforeRouter(name, before, params, callback) {
	        var callbackId = name + "-" + before;
	        var Stack = new BroadcastChannel(callbackId);
	        var target = _routerConfig2.default[before];
	        if (!target) {
	            console.log("路由不存在:" + name);
	            return;
	        }
	        if (target.status()) {
	            callback();
	            return;
	        }
	        Stack.onmessage = function (event) {
	            //context.toast("接收到消息");
	            if (event.data.status) {
	                callback();
	            } else {
	                _app_context2.default.toast(event.data.message || "操作失败");
	            }
	            Stack.close();
	        };
	        _app_context2.default.openJsbundle(target.jsbundle, params, callbackId);
	    },

	    goTo: function goTo(name, params) {
	        //context.toast(name);
	        //context.toast(routers[name] + "");
	        var target = _routerConfig2.default[name];

	        params = params || {};
	        if (target) {
	            if (target.validater && !target.validater()) {
	                return false;
	            }
	            console.error("打开：" + target.jsbundle);
	            var callback = function callback() {
	                if (target.jsbundle) {
	                    console.log("打开：" + target.jsbundle);
	                    _app_context2.default.openJsbundle(target.jsbundle, params);
	                } else if (target.url) {
	                    _app_context2.default.openUrl(target.url, params);
	                }
	            };

	            if (target.before) {
	                this.goBeforeRouter(name, target.before, params, callback);
	            } else {
	                callback();
	            }

	            return true;
	        }
	        return false;
	    }
	};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _app_context = __webpack_require__(5);

	var _app_context2 = _interopRequireDefault(_app_context);

	var _router = __webpack_require__(6);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    smallChange: {
	        jsbundle: "wallet.js",
	        before: "login" //这种写法不需要自己判断状态，和跳转
	    },
	    login: {
	        jsbundle: "login.js",
	        status: function status() {
	            //路由即可以路由也可以作为别的路由条件，作为条件的时候，需要获取一个此路由的状态，来判断是否满足条件
	            return _app_context2.default.isLogin();
	        },
	        validater: function validater() {
	            //验证为此页面打开的条件,一般与状态相反
	            if (this.status()) {
	                _app_context2.default.toast("已经登录");
	            }
	            return !this.status();
	        }
	    },
	    settings: {
	        jsbundle: "settings.js"
	    },
	    fundDetail: {
	        jsbundle: "fundDetail.js"
	        //before:"login"
	    },
	    start: {
	        jsbundle: 'start.js'
	    },
	    chartTest: {
	        jsbundle: "index.js"
	    },
	    riskTest: {
	        jsbundle: 'riskTest.js'
	    },
	    riskResult: {
	        jsbundle: 'riskResult.js'
	    },
	    fundDetailCompany: {
	        jsbundle: 'fundDetailCompany.js'
	    },
	    fundDetailAnalyze: {
	        jsbundle: 'fundDetailAnalyze.js'
	    },
	    fundDetailManager: {
	        jsbundle: 'fundDetailManager.js'
	    },
	    fundDetailNav: {
	        jsbundle: 'fundDetailNav.js'
	    },
	    fundDetailNotice: {
	        jsbundle: 'fundDetailNotice.js'
	    },
	    fundDetailRate: {
	        jsbundle: 'fundDetailRate.js'
	    },
	    helper: {
	        jsbundle: 'helper.js'
	    },
	    register: {
	        jsbundle: 'register.js'
	    },
	    walletCharge: {
	        jsbundle: 'walletCharge.js'
	    },
	    accountManager: {
	        jsbundle: 'accountManager.js',
	        before: "login"
	    }
	};

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(559)
	)

	/* script */
	__vue_exports__ = __webpack_require__(560)

	/* template */
	var __vue_template__ = __webpack_require__(561)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/can/Documents/web/wx-project/src/riskResult.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-31e4d6a0"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),

/***/ 559:
/***/ (function(module, exports) {

	module.exports = {
	  "emf-button": {
	    "color": "#f14042",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#f14042",
	    "width": 400,
	    "padding": 15,
	    "borderRadius": 15,
	    "textAlign": "center",
	    "backgroundColor:active": "#FFcccc"
	  },
	  "emf-button2": {
	    "backgroundColor": "#fb585b",
	    "borderRadius": 15,
	    "marginLeft": 25,
	    "marginRight": 25,
	    "color": "#FFFFFF",
	    "textAlign": "center",
	    "height": 78,
	    "fontSize": 30,
	    "lineHeight": 78,
	    "backgroundColor:active": "#f14042"
	  }
	}

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _app_context = __webpack_require__(5);

	var _app_context2 = _interopRequireDefault(_app_context);

	var _router = __webpack_require__(6);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var navigator = weex.requireModule('navigator'); //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
	    created: function created() {
	        _app_context2.default.setTitle("测评结果");
	    },

	    data: {
	        isIOS: _app_context2.default.isIOS
	    },
	    methods: {
	        retest: function retest() {
	            _app_context2.default.setPageModel('finishPage');
	            _router2.default.goTo('riskTest');
	        },
	        back: function back() {
	            navigator.pop();
	        }
	    }
	};

/***/ }),

/***/ 561:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    style: {
	      'padding-top': _vm.isIOS ? '64wx' : '0px'
	    }
	  }, [_vm._m(0), _c('text', {
	    staticClass: ["emf-button2"],
	    staticStyle: {
	      marginTop: "20px"
	    },
	    on: {
	      "click": _vm.retest
	    }
	  }, [_vm._v("重新测评")]), _c('text', {
	    staticClass: ["emf-button2"],
	    staticStyle: {
	      marginTop: "20px"
	    },
	    on: {
	      "click": _vm.back
	    }
	  }, [_vm._v("完成")])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticStyle: {
	      alignItems: "center",
	      padding: "40px"
	    }
	  }, [_c('image', {
	    staticStyle: {
	      width: "100px",
	      height: "130px"
	    },
	    attrs: {
	      "src": "res/risk-ok.png"
	    }
	  }), _c('text', {
	    staticStyle: {
	      color: "#f14042",
	      marginTop: "20px",
	      fontSize: "30px"
	    }
	  }, [_vm._v("您的风险承受能力为:平衡型")])])
	}]}
	module.exports.render._withStripped = true

/***/ })

/******/ });
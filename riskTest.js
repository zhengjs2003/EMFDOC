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

	var App = __webpack_require__(562)
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

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(56);
	//exports.bannerData =bannerData;


	var stream = weex.requireModule('stream');

	exports.host = "192.168.75.15:8080";

	var fundBaseUrl = "http://11.8.42.63:8080";

	var apiURL = {

	    baseurl: "http://" + exports.host + "/",
	    getBanner: 'data/bannerData.json',
	    getFinanceData1: "data/financeData.json",
	    getMyFinance: 'iap/finance/getMyFinance',
	    getIndexCombModuleInfo: 'iap/comb/getIndexCombModuleInfo',
	    getHotFund: 'iap/finance/fund/getHotFund',
	    getFundList: 'hzzf/ect888/product/product/getEctProductList.json'
	};

	var $get = function $get(url, params, callback, opt) {

	    if (typeof arguments[1] == "function") {
	        params = null;
	        callback = arguments[1];
	        opt = arguments[2];
	    }
	    // stream.fetch({
	    //     method: 'GET',
	    //     type: 'json',
	    //     url: url,
	    //     body:params
	    // }, callback);
	    opt = opt || {};
	    stream.get(url, params, callback, opt);
	};

	var $gwPost = function $gwPost(url, params, callback) {
	    //stream的post和get方法是走的网关请求
	    if (typeof arguments[1] == "function" || arguments[1] == null) {
	        stream.gwpost(url, null, arguments[1]);
	    } else {
	        stream.gwpost(url, params, callback);
	    }
	};
	var $gwGet = function $gwGet(url, params, callback, opt) {

	    if (typeof arguments[1] == "function") {
	        params = {};
	        callback = arguments[1];
	        opt = arguments[2];
	    }
	    opt = opt || {};
	    console.log("gwGet");
	    stream.gwget(url, params, callback, opt);
	};

	//#########################################################3

	exports.getBannerData = function (callback) {

	    // getData(apiURL.baseurl+apiURL.getBanner,callback);
	    //当参数为字符串的时候，参数将作为body传过去
	    //当参数为字典的时候，将被格式成字符串
	    var params = 'txnCode=cmsMobile&jsonArg={"functionCode":"getAppsBigImg","businessName":"1","columnCode":"iap"}';
	    $gwPost('fm/invokeHttpOtherUnauth', params, callback);
	};
	exports.getFinanceData1 = function (callback) {
	    getData(apiURL.baseurl + apiURL.getFinanceData1, callback);
	};

	exports.getMyFinance = function (callback) {
	    $gwGet(apiURL.getMyFinance, callback);
	};

	exports.getHotFund = function (callback) {
	    $gwGet(apiURL.getHotFund, callback);
	};

	exports.getIndexCombModuleInfo = function (callback) {
	    $gwGet(apiURL.getIndexCombModuleInfo, { userId: "", type: 2, beginCount: 0, endCount: 3 }, callback);
	};

	exports.getFundList = function (params, callback) {
	    // if(true){
	    //     callback({ok:true,data:{result:fundData}});
	    //     return;
	    // }

	    // $get('http://11.8.42.63:8080/hzzf/ect888/ectDao/fundchannelclient/getEctClientInfo.json?jsonpCallback=hundsun_getEctClientInfo1501236493807&encodeChannelUserInfo=gzaXjp03NaQLVXCb4cXNuQjoCvctIbP1tlGVbx+fV9t74Bq30L+VUbKRFChEBq4EjveYYrAoBPhHRsuwMYxs9HiDJTB60BD47vWqlLM6naHvbXQqrlBH21NKg5YLEYW6QITvEpj4g5O42GUYgTpsiRenQXVolvhr/gkcarSPWmc=&nsukey=h1b0XVCDIpQBt7qb0OWE72Xqq%2FyNvj8EF7uPdOZzL5miSRLeKcJC9%2Fr%2B2gi8DFE28tKL7dA1PX%2By1E6Epw0NQg4RxlvH8tzhtBbJofyurfgYpA1qbepBJjJD0tYFbCJQy0nYPfClKnXf62umEK%2BbZJVMxfPkgzB%2B9JXj9wxWTVEje76tTQhVvb%2Bt1BK9v%2B8n&timestamp=1501236493807&_=1501236457865',res=>{
	    $gwGet(apiURL.getFundList, params, callback, { encrypt: false });
	    //});

	};

	var fundTread = {
	    "result": "[{\"result\":\"success\",\"income_jzList\":[[\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\",\"0.00\"]],\"jzName\":\"中债综合指数\",\"fundCode\":\"550016\",\"fundName\":\"信诚岁岁添金\",\"incomeList\":[\"0.00\",\"0.10\",\"0.21\",\"0.21\",\"0.21\",\"0.31\",\"0.21\",\"0.21\",\"0.21\",\"0.10\",\"0.10\",\"0.21\",\"0.21\",\"0.10\",\"-0.10\",\"-0.31\",\"-0.31\",\"-0.31\",\"-0.21\",\"-0.21\"],\"dateList\":[\"2017-02-17\",\"2017-02-20\",\"2017-02-21\",\"2017-02-22\",\"2017-02-23\",\"2017-02-24\",\"2017-02-27\",\"2017-02-28\",\"2017-03-01\",\"2017-03-02\",\"2017-03-03\",\"2017-03-06\",\"2017-03-07\",\"2017-03-08\",\"2017-03-09\",\"2017-03-13\",\"2017-03-14\",\"2017-03-15\",\"2017-03-16\",\"2017-03-17\"]}]",
	    "message": "查询日涨跌走势成功",
	    "code": "ETS-5BP00000",
	    "successful": true
	};

	exports.getFundtread = function (params, callback) {
	    if (!params) {
	        callback({ data: fundTread, ok: true });
	        return;
	    }
	    $gwGet('hzzf/onlineStore/increaseTrend/getInceaseTread.json', params, callback, { type: 'json', encrypt: false });
	};

	exports.getPerformanceResult = function (params, callback) {
	    $gwGet('hzzf/ect888/ectDao/performanceResult/getPerformanceResult.json', params, callback, { type: 'json', encrypt: false });
	};

	exports.getHistoryDetail = function (params, callback) {

	    $gwGet('hzzf/ect888/ectDao/historydetail/getHistoryDetail.json', params, callback, { type: 'json', encrypt: false });
	};

	exports.getModifyRiskForm = function (callback) {

	    $get('http://11.16.0.132:8603/appServer/account/risk/getModifyRiskForm.json?dsClientId=4818', callback, { type: 'json' });
	};

	exports.getHelperData = function (callback) {

	    var params = 'txnCode=messageMobile&jsonArg={"functionCode":"getHelpList","page":"1","columnCode":"111111350"}';
	    $gwPost('fm/invokeHttpOtherUnauth', params, callback);
	};

	exports.register = function (params, callback) {

	    $get("http://11.8.41.94:8080/tg/user/reg", params, callback, { type: 'json' });
	};

	exports.login = function (params, callback) {
	    $get("http://11.8.41.94:8080/tg/user/login", params, callback, { type: 'json' });
	};

	exports.wallet = function (params, callback) {
	    $get('http://11.8.41.94:8080/tg/user/wallet', params, callback, { type: 'json' });
	};

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(563)
	)
	__vue_styles__.push(__webpack_require__(564)
	)

	/* script */
	__vue_exports__ = __webpack_require__(565)

	/* template */
	var __vue_template__ = __webpack_require__(566)
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
	__vue_options__.__file = "/Users/can/Documents/web/wx-project/src/riskTest.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-092faf55"
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

/***/ 563:
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

/***/ 564:
/***/ (function(module, exports) {

	module.exports = {
	  "select": {
	    "borderRadius": 30,
	    "width": 30,
	    "height": 30,
	    "borderWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "button": {
	    "backgroundColor": "#fb585b",
	    "borderRadius": 15,
	    "marginLeft": 25,
	    "marginRight": 25,
	    "color": "#FFFFFF",
	    "textAlign": "center",
	    "height": 78,
	    "fontSize": 30,
	    "lineHeight": 78
	  }
	}

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _api = __webpack_require__(55);

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
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var questions = { "result": [{ "invest_risk_tolerance": "3", "resultlist": [{ "qtitle": "您属于哪个年龄阶层？", "qno": "1", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.65岁以上" }, { "itemvalue": "1.00", "itemtitle": "B.51-65岁" }, { "itemvalue": "3.00", "itemtitle": "C.41-50岁" }, { "itemvalue": "4.00", "itemtitle": "D.31-40岁" }, { "itemvalue": "5.00", "itemtitle": "E.18-30岁" }] } }, { "qtitle": "您的家庭收入可支配年收入为（折合人民币）", "qno": "2", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.10万元以下" }, { "itemvalue": "2.00", "itemtitle": "B.10万元至20万元" }, { "itemvalue": "3.00", "itemtitle": "C.20万元至50万元" }, { "itemvalue": "4.00", "itemtitle": "D.50万元至100万元" }, { "itemvalue": "5.00", "itemtitle": "E.100万元以上" }] } }, { "qtitle": "在您每年的家庭可支配收入中，可用于金融投资（储蓄存款除外）的比例为？", "qno": "3", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.小于10%" }, { "itemvalue": "2.00", "itemtitle": "B.10%-30%" }, { "itemvalue": "3.00", "itemtitle": "C.30%-50%" }, { "itemvalue": "4.00", "itemtitle": "D.50%-90%" }, { "itemvalue": "5.00", "itemtitle": "E.大于90%" }] } }, { "qtitle": "以下哪项最能说明您的投资经验？", "qno": "4", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A. 除银行储蓄外，基本没有其他投资经验" }, { "itemvalue": "2.00", "itemtitle": "B. 购买过债券、保险等理财产品" }, { "itemvalue": "3.00", "itemtitle": "C. 参与过基金等产品的交易" }, { "itemvalue": "4.00", "itemtitle": "D. 参与过股票的交易" }, { "itemvalue": "5.00", "itemtitle": "E. 参与过权证、期货、期权等产品或其他杠杆类、融资类的交易" }] } }, { "qtitle": "您有多少年投资基金、股票、信托、私募证券或金融衍生品等风险投资品的经验？", "qno": "5", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.没有" }, { "itemvalue": "2.00", "itemtitle": "B.有, 少于1年" }, { "itemvalue": "3.00", "itemtitle": "C.有, 1-5年之间" }, { "itemvalue": "4.00", "itemtitle": "D.有, 5-10年之间" }, { "itemvalue": "5.00", "itemtitle": "E.有, 超过10年" }] } }, { "qtitle": "如果您有一笔闲散资金, 您计划偏好投资于哪种产品？", "qno": "6", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.现金、存款、货币型基金" }, { "itemvalue": "2.00", "itemtitle": "B.债券或债券型基金、固定收益信托等" }, { "itemvalue": "3.00", "itemtitle": "C.外币、结构型产品、投资型保单" }, { "itemvalue": "4.00", "itemtitle": "D.股票、偏股型基金" }, { "itemvalue": "5.00", "itemtitle": "E.金融衍生品(期权、期货、认股权证等)" }] } }, { "qtitle": "您计划的投资期限是多久？", "qno": "7", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.1年以内" }, { "itemvalue": "2.00", "itemtitle": "B.1-2年" }, { "itemvalue": "3.00", "itemtitle": "C.2-3年" }, { "itemvalue": "4.00", "itemtitle": "D.3-5年" }, { "itemvalue": "5.00", "itemtitle": "E.5年以上" }] } }, { "qtitle": "您的投资目的是？", "qno": "8", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.资产保值" }, { "itemvalue": "2.00", "itemtitle": "B.资产保值，可有固定收益" }, { "itemvalue": "3.00", "itemtitle": "C.资产稳健增长" }, { "itemvalue": "4.00", "itemtitle": "D.资产快速且稳健增长" }, { "itemvalue": "5.00", "itemtitle": "E.资产迅速增长" }] } }, { "qtitle": "您认为自己能承受的最大投资损失是多少？", "qno": "9", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.10%以内" }, { "itemvalue": "2.00", "itemtitle": "B.10%-30%" }, { "itemvalue": "3.00", "itemtitle": "C.30%-50%" }, { "itemvalue": "4.00", "itemtitle": "D.50%-70%" }, { "itemvalue": "4.00", "itemtitle": "E.70%以上" }] } }, { "qtitle": "以下哪项描述最符合您的投资态度？", "qno": "10", "qitem": { "list": [{ "itemvalue": "1.00", "itemtitle": "A.厌恶风险，不希望本金损失，希望获得稳定回报" }, { "itemvalue": "2.00", "itemtitle": "B.保守投资，不希望本金损失，愿意承担一定幅度的收益波动" }, { "itemvalue": "3.00", "itemtitle": "C.对风险不是很反感，愿意承担一定风险并持续获得收益" }, { "itemvalue": "4.00", "itemtitle": "D.寻求资金的较高收益和成长性，愿意为此承担有限本金损失" }, { "itemvalue": "5.00", "itemtitle": "E.希望赚取高回报，愿意为此承担较大本金损失" }] } }] }], "code": "ETS-5BP00000", "pagesize": "10", "resultCode": "1", "message": "查询成功", "totalrecords": "10", "successful": true };

	exports.default = {
	    data: {
	        isIOS: _app_context2.default.isIOS,
	        selected: [],
	        finish: 0,
	        submit: 1,
	        questions: questions.result[0].resultlist,
	        invest_risk_tolerance: questions.result[0].invest_risk_tolerance,
	        custRiskDict: {
	            "1": "保守型",
	            "2": "稳健型",
	            "3": "平衡型",
	            "4": "成长型",
	            "5": "进取型"
	        }
	    },
	    created: function created() {
	        var self = this;
	        _app_context2.default.setTitle('风险测评');
	        // getModifyRiskForm(res => {

	        //     if (res.ok) {
	        //         debugger;

	        //         self.questions = res.data.result[0].resultlist;
	        //         self.invest_risk_tolerance = res.data.result[0].invest_risk_tolerance;
	        //         console.log(self.questions);
	        //     }

	        // });
	    },


	    methods: {
	        viewdisappear: function viewdisappear(event) {
	            // debugger;
	            //context.toast("viewdisappear");
	        },
	        onselect: function onselect(event) {

	            console.log(event.target.attr);
	            var status = event.target.attr.status;
	            this.selected[status['qustion']] = status['select'];
	            //this.selected = this.selected.concat();
	            this.finish = 0;
	            for (var i in this.selected) {

	                if (i) {
	                    this.finish++;
	                }
	            }
	        },
	        Submit: function Submit(event) {
	            this.submit = 1;
	            //navigator.push({url:weex.config.bundleUrl+'/riskResult.js'});
	            if (this.finish == this.questions.length) {
	                this.submit = 1;
	                _app_context2.default.setPageModel('finishPage');
	                //navigator.pop({animated:false});
	                _router2.default.goTo('riskResult');
	            }
	        }
	    }
	};

/***/ }),

/***/ 566:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    style: {
	      'padding-top': _vm.isIOS ? '64wx' : '0px'
	    },
	    on: {
	      "viewdisappear": _vm.viewdisappear
	    }
	  }, [_c('div', {
	    staticStyle: {
	      flex: "1",
	      width: "750px"
	    }
	  }, [_c('div', {
	    staticStyle: {
	      flexDirection: "row",
	      padding: "25px",
	      backgroundColor: "#FFF",
	      height: "120px",
	      justilyContent: "center",
	      alignItems: "center"
	    }
	  }, [_c('text', {
	    staticStyle: {
	      fontSize: "30px"
	    }
	  }, [_vm._v("您当前的风险等级是")]), _c('text', {
	    staticStyle: {
	      marginLeft: "10px",
	      fontWeight: "500",
	      flex: "1",
	      fontSize: "30px"
	    }
	  }, [_vm._v(_vm._s(_vm.custRiskDict[_vm.invest_risk_tolerance]))]), _c('text', {
	    staticStyle: {
	      fontSize: "30px"
	    }
	  }, [_vm._v("你已完成")]), _c('text', {
	    staticStyle: {
	      fontSize: "30px",
	      color: "#f14042"
	    }
	  }, [_vm._v(" " + _vm._s(this.finish))]), _c('text', {
	    staticStyle: {
	      fontSize: "30px"
	    }
	  }, [_vm._v("/10")])]), _c('scroller', {
	    staticStyle: {
	      backgroundColor: "#ebebeb"
	    }
	  }, [_vm._l((_vm.questions), function(item, qustionIndex) {
	    return _c('div', {
	      key: item,
	      staticStyle: {
	        marginTop: "10px",
	        backgroundColor: "#fff",
	        marginTop: "20px",
	        padding: "25px"
	      }
	    }, [_c('text', {
	      staticStyle: {
	        fontSize: "30px"
	      }
	    }, [_vm._v(_vm._s(qustionIndex + 1) + "、" + _vm._s(item.qtitle))]), _vm._l((item.qitem.list), function(option, index) {
	      return _c('div', {
	        key: option,
	        staticStyle: {
	          flexDirection: "row",
	          alignItems: "center",
	          height: "65px",
	          justilyContent: "center"
	        },
	        attrs: {
	          "status": {
	            qustion: qustionIndex,
	            select: index
	          }
	        },
	        on: {
	          "click": _vm.onselect
	        }
	      }, [_c('div', {
	        staticClass: ["select"],
	        style: {
	          'background-color': _vm.selected[qustionIndex] == index ? '#fb585b' : '#FFF'
	        }
	      }), _c('text', {
	        staticStyle: {
	          fontSize: "25px",
	          marginLeft: "10px"
	        }
	      }, [_vm._v(_vm._s(option.itemtitle))])])
	    })], 2)
	  }), _c('text', {
	    staticClass: ["button"],
	    style: {
	      margin: '20px',
	      'background-color': _vm.questions.length == _vm.finish ? '#fb585b' : '#ccc'
	    },
	    on: {
	      "click": _vm.Submit
	    }
	  }, [_vm._v("提交")])], 2)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });
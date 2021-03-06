(function(modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            })
        }
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"]
        } : function getModuleExports() {
            return module
        };
        __webpack_require__.d(getter, "a", getter);
        return getter
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 3)
})([function(module, exports, __webpack_require__) {
    "use strict";
    (function(process) {
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            log: function log() {
                if (process.env.NODE_ENV !== "production") {
                    var _console;
                    (_console = console).log.apply(_console, arguments)
                }
            },
            warn: function warn() {
                var _console2;
                return (_console2 = console).warn.apply(_console2, arguments)
            },
            error: function error() {
                var _console3;
                return (_console3 = console).error.apply(_console3, arguments)
            }
        }
    }).call(exports, __webpack_require__(19))
}, function(module, exports, __webpack_require__) {
    (function(global) {
        var rng;
        var crypto = global.crypto || global.msCrypto;
        if (crypto && crypto.getRandomValues) {
            var rnds8 = new Uint8Array(16);
            rng = function whatwgRNG() {
                crypto.getRandomValues(rnds8);
                return rnds8
            }
        }
        if (!rng) {
            var rnds = new Array(16);
            rng = function() {
                for (var i = 0, r; i < 16; i++) {
                    if ((i & 3) === 0) r = Math.random() * 4294967296;
                    rnds[i] = r >>> ((i & 3) << 3) & 255
                }
                return rnds
            }
        }
        module.exports = rng
    }).call(exports, __webpack_require__(13))
}, function(module, exports) {
    var byteToHex = [];
    for (var i = 0; i < 256; ++i) {
        byteToHex[i] = (i + 256).toString(16).substr(1)
    }

    function bytesToUuid(buf, offset) {
        var i = offset || 0;
        var bth = byteToHex;
        return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]]
    }
    module.exports = bytesToUuid
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(4)
}, function(module, exports, __webpack_require__) {
    __webpack_require__(5);
    __webpack_require__(6)
}, function(module, exports) {}, function(module, exports, __webpack_require__) {
    "use strict";
    var _cernerSmartEmbeddableLib = __webpack_require__(7);
    var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        }
    }
    _cernerSmartEmbeddableLib2.default.init();
    _cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();
    window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
    window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _provider = __webpack_require__(8);
    var _provider2 = _interopRequireDefault(_provider);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        }
    }
    var CernerSmartEmbeddableLib = {
        init: function init() {
            _provider2.default.init({
                acls: ["https://embedded.cerner.com", "https://embedded.sandboxcerner.com", "https://embedded.devcerner.com"]
            })
        },
        calcFrameHeight: function calcFrameHeight() {
            return window.document.getElementsByTagName("html")[0].scrollHeight
        },
        setFrameHeight: function setFrameHeight(h) {
            _provider2.default.trigger("iframeCustomResizer", {
                height: h
            })
        },
        listenForCustomFrameHeight: function listenForCustomFrameHeight() {
            _provider2.default.on("iframeCustomResizer", function() {
                var height = window.CernerSmartEmbeddableLib.calcFrameHeight() + "px";
                CernerSmartEmbeddableLib.setFrameHeight(height)
            })
        }
    };
    exports.default = CernerSmartEmbeddableLib
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _application = __webpack_require__(9);
    var _application2 = _interopRequireDefault(_application);
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        }
    }
    var Provider = {
        init: function init(config) {
            if (window.self !== window.top && !document.documentElement.hasAttribute("hidden")) {
                document.documentElement.setAttribute("hidden", null);
                _logger2.default.warn("Security warning: Hidden attribute not detected on document and has been added.")
            }
            this.application = new _application2.default;
            this.application.init(config);
            this.application.launch()
        },
        on: function on(eventName, listener) {
            this.application.on(eventName, listener)
        },
        fullscreen: function fullscreen(source) {
            this.application.fullscreen(source)
        },
        httpError: function httpError(error) {
            this.application.httpError(error)
        },
        trigger: function trigger(event, detail) {
            this.application.trigger(event, detail)
        },
        loadPage: function loadPage(url) {
            this.application.loadPage(url)
        }
    };
    exports.default = Provider
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor
        }
    }();
    var _jsonrpcDispatch = __webpack_require__(10);
    var _jsonrpcDispatch2 = _interopRequireDefault(_jsonrpcDispatch);
    var _string = __webpack_require__(16);
    var _events = __webpack_require__(17);
    var _uri = __webpack_require__(18);
    var _uri2 = _interopRequireDefault(_uri);
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    var _dimension = __webpack_require__(20);
    var _mutationObserver = __webpack_require__(21);
    var _mutationObserver2 = _interopRequireDefault(_mutationObserver);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function")
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
    }
    var Application = function(_EventEmitter) {
        _inherits(Application, _EventEmitter);

        function Application() {
            _classCallCheck(this, Application);
            return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).apply(this, arguments))
        }
        _createClass(Application, [{
            key: "init",
            value: function init(_ref) {
                var _ref$acls = _ref.acls,
                    acls = _ref$acls === undefined ? [] : _ref$acls,
                    _ref$secret = _ref.secret,
                    secret = _ref$secret === undefined ? null : _ref$secret,
                    _ref$onReady = _ref.onReady,
                    onReady = _ref$onReady === undefined ? null : _ref$onReady;
                this.acls = [].concat(acls);
                this.secret = secret;
                this.onReady = onReady;
                this.resizeConfig = null;
                this.requestResize = this.requestResize.bind(this);
                this.handleConsumerMessage = this.handleConsumerMessage.bind(this);
                this.authorizeConsumer = this.authorizeConsumer.bind(this);
                this.verifyChallenge = this.verifyChallenge.bind(this);
                this.emitError = this.emitError.bind(this);
                var parentOrigin = new _uri2.default(document.referrer).origin;
                if (this.acls.includes(parentOrigin)) {
                    this.activeACL = parentOrigin
                }
                var self = this;
                this.JSONRPC = new _jsonrpcDispatch2.default(self.send.bind(self), {
                    event: function event(_event, detail) {
                        self.emit(_event, detail);
                        return Promise.resolve()
                    },
                    resize: function resize() {
                        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                        self.resizeConfig = config;
                        self.requestResize();
                        var observer = new _mutationObserver2.default(function(mutations) {
                            return self.requestResize()
                        });
                        observer.observe(document.body, {
                            attributes: true,
                            childList: true,
                            characterData: true,
                            subtree: true
                        });
                        var interval = 100;
                        var resizeTimer = null;
                        window.onresize = function(event) {
                            clearTimeout(resizeTimer);
                            resizeTimer = setTimeout(function() {
                                return self.requestResize()
                            }, interval)
                        };
                        return Promise.resolve()
                    }
                })
            }
        }, {
            key: "requestResize",
            value: function requestResize() {
                if (this.resizeConfig.customCal) {
                    this.JSONRPC.notification("resize")
                } else if (this.resizeConfig.autoResizeWidth) {
                    var width = (0, _dimension.calculateWidth)(this.resizeConfig.WidthCalculationMethod);
                    this.JSONRPC.notification("resize", [null, width + "px"])
                } else {
                    var height = (0, _dimension.calculateHeight)(this.resizeConfig.heightCalculationMethod);
                    this.JSONRPC.notification("resize", [height + "px"])
                }
            }
        }, {
            key: "trigger",
            value: function trigger(event, detail) {
                this.JSONRPC.notification("event", [event, detail])
            }
        }, {
            key: "fullscreen",
            value: function fullscreen(url) {
                this.trigger("xfc.fullscreen", url)
            }
        }, {
            key: "httpError",
            value: function httpError() {
                var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                this.trigger("xfc.provider.httpError", error)
            }
        }, {
            key: "loadPage",
            value: function loadPage(url) {
                this.JSONRPC.notification("loadPage", [url])
            }
        }, {
            key: "launch",
            value: function launch() {
                if (window.self !== window.top) {
                    window.addEventListener("message", this.handleConsumerMessage);
                    this.JSONRPC.notification("launch");
                    if (this.acls.some(function(x) {
                            return x !== "*"
                        })) {
                        this.JSONRPC.request("authorizeConsumer", []).then(this.authorizeConsumer).catch(this.emitError)
                    }
                    if (this.secret) {
                        this.JSONRPC.request("challengeConsumer", []).then(this.verifyChallenge).catch(this.emitError)
                    }
                } else {
                    this.authorizeConsumer()
                }
            }
        }, {
            key: "handleConsumerMessage",
            value: function handleConsumerMessage(event) {
                if (!event.data.jsonrpc || event.source !== window.parent) {
                    return
                }
                _logger2.default.log("<< provider", event.origin, event.data);
                var origin = event.origin || event.originalEvent.origin;
                if (!this.activeACL && this.acls.includes(origin)) {
                    this.activeACL = origin
                }
                if (this.acls.includes("*") || this.acls.includes(origin)) {
                    this.JSONRPC.handle(event.data)
                }
            }
        }, {
            key: "send",
            value: function send(message) {
                if (window.self === window.top) {
                    return
                }
                if (this.acls.length < 1) {
                    _logger2.default.error("Message not sent, no acls provided.")
                }
                if (message) {
                    _logger2.default.log(">> provider", this.acls, message);
                    if (this.activeACL) {
                        parent.postMessage(message, this.activeACL)
                    } else {
                        this.acls.forEach(function(uri) {
                            return parent.postMessage(message, uri)
                        })
                    }
                }
            }
        }, {
            key: "verifyChallenge",
            value: function verifyChallenge(secretAttempt) {
                var _this2 = this;
                var authorize = function authorize() {
                    _this2.acls = ["*"];
                    _this2.authorizeConsumer()
                };
                if (typeof this.secret === "string" && (0, _string.fixedTimeCompare)(this.secret, secretAttempt)) {
                    authorize()
                } else if (typeof this.secret === "function") {
                    this.secret.call(this, secretAttempt).then(authorize)
                }
            }
        }, {
            key: "authorizeConsumer",
            value: function authorizeConsumer() {
                document.documentElement.removeAttribute("hidden");
                this.emit("xfc.ready");
                this.JSONRPC.notification("authorized", [{
                    url: window.location.href
                }]);
                if (typeof this.onReady === "function") {
                    this.onReady.call(this)
                }
            }
        }, {
            key: "emitError",
            value: function emitError(error) {
                this.emit("xfc.error", error)
            }
        }]);
        return Application
    }(_events.EventEmitter);
    exports.default = Application
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor
        }
    }();
    var _uuid = __webpack_require__(11);
    var _uuid2 = _interopRequireDefault(_uuid);
    var _errors = __webpack_require__(15);
    var _errors2 = _interopRequireDefault(_errors);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function")
        }
    }
    var JSONRPCVersion = "2.0";
    var JSONRPC = function() {
        function JSONRPC(dispatcher) {
            var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            _classCallCheck(this, JSONRPC);
            this.version = JSONRPCVersion;
            this.deferreds = {};
            this.methods = methods;
            this.dispatcher = dispatcher
        }
        _createClass(JSONRPC, [{
            key: "send",
            value: function send(message) {
                var data = Object.assign({}, message);
                data.jsonrpc = this.version;
                this.dispatcher(data)
            }
        }, {
            key: "notification",
            value: function notification(method) {
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                this.send({
                    method: method,
                    params: params
                })
            }
        }, {
            key: "request",
            value: function request(method) {
                var _this = this;
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                return new Promise(function(resolve, reject) {
                    var id = _uuid2.default.v4();
                    _this.deferreds[id] = {
                        resolve: resolve,
                        reject: reject
                    };
                    _this.send({
                        id: id,
                        method: method,
                        params: params
                    })
                })
            }
        }, {
            key: "handle",
            value: function handle(message) {
                if (message.method) {
                    if (message.id) {
                        this.handleRequest(message)
                    } else {
                        this.handleNotification(message)
                    }
                } else if (message.id) {
                    this.handleResponse(message)
                }
            }
        }, {
            key: "handleResponse",
            value: function handleResponse(response) {
                var deferred = this.deferreds[response.id];
                if (deferred === undefined) {
                    return
                }
                if (response.error) {
                    deferred.reject(response.error)
                } else {
                    deferred.resolve(response.result)
                }
                delete this.deferreds[response.id]
            }
        }, {
            key: "handleRequest",
            value: function handleRequest(request) {
                var _this2 = this;
                var method = this.methods[request.method];
                if (typeof method !== "function") {
                    var error = {
                        message: "The method " + method + " was not found.",
                        code: _errors2.default.METHOD_NOT_FOUND
                    };
                    this.send({
                        id: request.id,
                        error: error
                    });
                    return
                }
                method.apply(request, request.params).then(function(result) {
                    _this2.send({
                        id: request.id,
                        result: result
                    })
                }).catch(function(message) {
                    var error = {
                        message: message,
                        code: _errors2.default.INTERNAL_ERROR
                    };
                    _this2.send({
                        id: request.id,
                        error: error
                    })
                })
            }
        }, {
            key: "handleNotification",
            value: function handleNotification(request) {
                var method = this.methods[request.method];
                if (method && typeof method === "function") {
                    method.apply(request, request.params)
                }
            }
        }]);
        return JSONRPC
    }();
    exports.default = Object.freeze(JSONRPC)
}, function(module, exports, __webpack_require__) {
    "use strict";
    var v1 = __webpack_require__(12);
    var v4 = __webpack_require__(14);
    var uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    module.exports = uuid
}, function(module, exports, __webpack_require__) {
    var rng = __webpack_require__(1);
    var bytesToUuid = __webpack_require__(2);
    var _seedBytes = rng();
    var _nodeId = [_seedBytes[0] | 1, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];
    var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 16383;
    var _lastMSecs = 0,
        _lastNSecs = 0;

    function v1(options, buf, offset) {
        var i = buf && offset || 0;
        var b = buf || [];
        options = options || {};
        var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
        var msecs = options.msecs !== undefined ? options.msecs : (new Date).getTime();
        var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
        var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
        if (dt < 0 && options.clockseq === undefined) {
            clockseq = clockseq + 1 & 16383
        }
        if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
            nsecs = 0
        }
        if (nsecs >= 1e4) {
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
        }
        _lastMSecs = msecs;
        _lastNSecs = nsecs;
        _clockseq = clockseq;
        msecs += 122192928e5;
        var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
        b[i++] = tl >>> 24 & 255;
        b[i++] = tl >>> 16 & 255;
        b[i++] = tl >>> 8 & 255;
        b[i++] = tl & 255;
        var tmh = msecs / 4294967296 * 1e4 & 268435455;
        b[i++] = tmh >>> 8 & 255;
        b[i++] = tmh & 255;
        b[i++] = tmh >>> 24 & 15 | 16;
        b[i++] = tmh >>> 16 & 255;
        b[i++] = clockseq >>> 8 | 128;
        b[i++] = clockseq & 255;
        var node = options.node || _nodeId;
        for (var n = 0; n < 6; ++n) {
            b[i + n] = node[n]
        }
        return buf ? buf : bytesToUuid(b)
    }
    module.exports = v1
}, function(module, exports) {
    var g;
    g = function() {
        return this
    }();
    try {
        g = g || Function("return this")() || (1, eval)("this")
    } catch (e) {
        if (typeof window === "object") g = window
    }
    module.exports = g
}, function(module, exports, __webpack_require__) {
    var rng = __webpack_require__(1);
    var bytesToUuid = __webpack_require__(2);

    function v4(options, buf, offset) {
        var i = buf && offset || 0;
        if (typeof options == "string") {
            buf = options == "binary" ? new Array(16) : null;
            options = null
        }
        options = options || {};
        var rnds = options.random || (options.rng || rng)();
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
            for (var ii = 0; ii < 16; ++ii) {
                buf[i + ii] = rnds[ii]
            }
        }
        return buf || bytesToUuid(rnds)
    }
    module.exports = v4
}, function(module, exports, __webpack_require__) {
    "use strict";
    var PARSE_ERROR = Object.freeze({
        message: "Parse error",
        code: -32700
    });
    var INVALID_REQUEST = Object.freeze({
        message: "Invalid request",
        code: -32600
    });
    var METHOD_NOT_FOUND = Object.freeze({
        message: "Method not found",
        code: -32601
    });
    var INVALID_PARAMS = Object.freeze({
        message: "Invalid params",
        code: -32602
    });
    var INTERNAL_ERROR = Object.freeze({
        message: "Internal error",
        code: -32603
    });
    module.exports = Object.freeze({
        PARSE_ERROR: PARSE_ERROR,
        INVALID_REQUEST: INVALID_REQUEST,
        METHOD_NOT_FOUND: METHOD_NOT_FOUND,
        INVALID_PARAMS: INVALID_PARAMS,
        INTERNAL_ERROR: INTERNAL_ERROR
    })
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function fixedTimeCompare(v1, v2) {
        var compare = function compare(value, current, index) {
            return value | v1.charCodeAt(index) ^ v2.charCodeAt(index)
        };
        return v1.split("").reduce(compare, v1.length ^ v2.length) < 1
    }
    exports.fixedTimeCompare = fixedTimeCompare
}, function(module, exports) {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this
    };
    EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;
        if (!this._events) this._events = {};
        if (type === "error") {
            if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er
                } else {
                    var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
                    err.context = er;
                    throw err
                }
            }
        }
        handler = this._events[type];
        if (isUndefined(handler)) return false;
        if (isFunction(handler)) {
            switch (arguments.length) {
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args)
            }
        } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++) listeners[i].apply(this, args)
        }
        return true
    };
    EventEmitter.prototype.addListener = function(type, listener) {
        var m;
        if (!isFunction(listener)) throw TypeError("listener must be a function");
        if (!this._events) this._events = {};
        if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
        if (!this._events[type]) this._events[type] = listener;
        else if (isObject(this._events[type])) this._events[type].push(listener);
        else this._events[type] = [this._events[type], listener];
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners
            } else {
                m = EventEmitter.defaultMaxListeners
            }
            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
                if (typeof console.trace === "function") {
                    console.trace()
                }
            }
        }
        return this
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener)) throw TypeError("listener must be a function");
        var fired = false;

        function g() {
            this.removeListener(type, g);
            if (!fired) {
                fired = true;
                listener.apply(this, arguments)
            }
        }
        g.listener = listener;
        this.on(type, g);
        return this
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;
        if (!isFunction(listener)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[type]) return this;
        list = this._events[type];
        length = list.length;
        position = -1;
        if (list === listener || isFunction(list.listener) && list.listener === listener) {
            delete this._events[type];
            if (this._events.removeListener) this.emit("removeListener", type, listener)
        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                    position = i;
                    break
                }
            }
            if (position < 0) return this;
            if (list.length === 1) {
                list.length = 0;
                delete this._events[type]
            } else {
                list.splice(position, 1)
            }
            if (this._events.removeListener) this.emit("removeListener", type, listener)
        }
        return this
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;
        if (!this._events) return this;
        if (!this._events.removeListener) {
            if (arguments.length === 0) this._events = {};
            else if (this._events[type]) delete this._events[type];
            return this
        }
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === "removeListener") continue;
                this.removeAllListeners(key)
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this
        }
        listeners = this._events[type];
        if (isFunction(listeners)) {
            this.removeListener(type, listeners)
        } else if (listeners) {
            while (listeners.length) this.removeListener(type, listeners[listeners.length - 1])
        }
        delete this._events[type];
        return this
    };
    EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type]) ret = [];
        else if (isFunction(this._events[type])) ret = [this._events[type]];
        else ret = this._events[type].slice();
        return ret
    };
    EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
            var evlistener = this._events[type];
            if (isFunction(evlistener)) return 1;
            else if (evlistener) return evlistener.length
        }
        return 0
    };
    EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type)
    };

    function isFunction(arg) {
        return typeof arg === "function"
    }

    function isNumber(arg) {
        return typeof arg === "number"
    }

    function isObject(arg) {
        return typeof arg === "object" && arg !== null
    }

    function isUndefined(arg) {
        return arg === void 0
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function")
        }
    }
    var URI = function URI(uri) {
        _classCallCheck(this, URI);
        var a = document.createElement("a");
        a.href = uri;
        this.protocol = a.protocol;
        this.pathname = a.pathname;
        var portMatch = this.protocol === "http:" ? /(:80)$/ : /(:443)$/;
        this.host = a.host.replace(portMatch, "");
        this.origin = this.protocol + "//" + this.host
    };
    exports.default = URI
}, function(module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined")
    }(function() {
        try {
            if (typeof setTimeout === "function") {
                cachedSetTimeout = setTimeout
            } else {
                cachedSetTimeout = defaultSetTimout
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout
        }
        try {
            if (typeof clearTimeout === "function") {
                cachedClearTimeout = clearTimeout
            } else {
                cachedClearTimeout = defaultClearTimeout
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout
        }
    })();

    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0)
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0)
        }
        try {
            return cachedSetTimeout(fun, 0)
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, fun, 0)
            } catch (e) {
                return cachedSetTimeout.call(this, fun, 0)
            }
        }
    }

    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker)
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker)
        }
        try {
            return cachedClearTimeout(marker)
        } catch (e) {
            try {
                return cachedClearTimeout.call(null, marker)
            } catch (e) {
                return cachedClearTimeout.call(this, marker)
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue)
        } else {
            queueIndex = -1
        }
        if (queue.length) {
            drainQueue()
        }
    }

    function drainQueue() {
        if (draining) {
            return
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run()
                }
            }
            queueIndex = -1;
            len = queue.length
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout)
    }
    process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i]
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue)
        }
    };

    function Item(fun, array) {
        this.fun = fun;
        this.array = array
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array)
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
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
    process.listeners = function(name) {
        return []
    };
    process.binding = function(name) {
        throw new Error("process.binding is not supported")
    };
    process.cwd = function() {
        return "/"
    };
    process.chdir = function(dir) {
        throw new Error("process.chdir is not supported")
    };
    process.umask = function() {
        return 0
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.calculateHeight = calculateHeight;
    exports.calculateWidth = calculateWidth;
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        }
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i]
            }
            return arr2
        } else {
            return Array.from(arr)
        }
    }

    function getComputedStyle(prop) {
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
        var result = null;
        if ("getComputedStyle" in window) {
            result = window.getComputedStyle(el, null)
        } else {
            result = document.defaultView.getComputedStyle(el, null)
        }
        return result !== null ? parseInt(result[prop], 10) : 0
    }

    function getAllMeasures(dimension) {
        return [dimension.bodyOffset(), dimension.bodyScroll(), dimension.documentElementOffset(), dimension.documentElementScroll()]
    }
    var getHeight = {
        bodyOffset: function bodyOffset() {
            return document.body.offsetHeight + getComputedStyle("marginTop") + getComputedStyle("marginBottom")
        },
        bodyScroll: function bodyScroll() {
            return document.body.scrollHeight
        },
        documentElementOffset: function documentElementOffset() {
            return document.documentElement.offsetHeight
        },
        documentElementScroll: function documentElementScroll() {
            return document.documentElement.scrollHeight
        },
        max: function max() {
            return Math.max.apply(Math, _toConsumableArray(getAllMeasures(getHeight)))
        },
        min: function min() {
            return Math.min.apply(Math, _toConsumableArray(getAllMeasures(getHeight)))
        }
    };
    var getWidth = {
        bodyOffset: function bodyOffset() {
            return document.body.offsetWidth
        },
        bodyScroll: function bodyScroll() {
            return document.body.scrollWidth
        },
        documentElementOffset: function documentElementOffset() {
            return document.documentElement.offsetWidth
        },
        documentElementScroll: function documentElementScroll() {
            return document.documentElement.scrollWidth
        },
        scroll: function scroll() {
            return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll())
        },
        max: function max() {
            return Math.max.apply(Math, _toConsumableArray(getAllMeasures(getWidth)))
        },
        min: function min() {
            return Math.min.apply(Math, _toConsumableArray(getAllMeasures(getWidth)))
        }
    };

    function calculateHeight() {
        var calMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "bodyOffset";
        if (!(calMethod in getHeight)) {
            _logger2.default.error("'" + calMethod + "' is not a valid method name!")
        }
        return getHeight[calMethod]()
    }

    function calculateWidth() {
        var calMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "scroll";
        if (!(calMethod in getWidth)) {
            _logger2.default.error("'" + calMethod + "' is not a valid method name!")
        }
        return getWidth[calMethod]()
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var WeakMap = window.WeakMap;
    if (typeof WeakMap === "undefined") {
        var defineProperty = Object.defineProperty;
        var counter = Date.now() % 1e9;
        WeakMap = function WeakMap() {
            this.name = "__st" + (Math.random() * 1e9 >>> 0) + (counter++ + "__")
        };
        WeakMap.prototype = {
            set: function set(key, value) {
                var entry = key[this.name];
                if (entry && entry[0] === key) entry[1] = value;
                else defineProperty(key, this.name, {
                    value: [key, value],
                    writable: true
                });
                return this
            },
            get: function get(key) {
                var entry;
                return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined
            },
            delete: function _delete(key) {
                var entry = key[this.name];
                if (!entry) return false;
                var hasValue = entry[0] === key;
                entry[0] = entry[1] = undefined;
                return hasValue
            },
            has: function has(key) {
                var entry = key[this.name];
                if (!entry) return false;
                return entry[0] === key
            }
        }
    }
    var registrationsTable = new WeakMap;
    var setImmediate = window.msSetImmediate;
    if (!setImmediate) {
        var setImmediateQueue = [];
        var sentinel = String(Math.random());
        window.addEventListener("message", function(e) {
            if (e.data === sentinel) {
                var queue = setImmediateQueue;
                setImmediateQueue = [];
                queue.forEach(function(func) {
                    func()
                })
            }
        });
        setImmediate = function setImmediate(func) {
            setImmediateQueue.push(func);
            window.postMessage(sentinel, "*")
        }
    }
    var isScheduled = false;
    var scheduledObservers = [];

    function scheduleCallback(observer) {
        scheduledObservers.push(observer);
        if (!isScheduled) {
            isScheduled = true;
            setImmediate(dispatchCallbacks)
        }
    }

    function wrapIfNeeded(node) {
        return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node
    }

    function dispatchCallbacks() {
        isScheduled = false;
        var observers = scheduledObservers;
        scheduledObservers = [];
        observers.sort(function(o1, o2) {
            return o1.uid_ - o2.uid_
        });
        var anyNonEmpty = false;
        observers.forEach(function(observer) {
            var queue = observer.takeRecords();
            removeTransientObserversFor(observer);
            if (queue.length) {
                observer.callback_(queue, observer);
                anyNonEmpty = true
            }
        });
        if (anyNonEmpty) dispatchCallbacks()
    }

    function removeTransientObserversFor(observer) {
        observer.nodes_.forEach(function(node) {
            var registrations = registrationsTable.get(node);
            if (!registrations) return;
            registrations.forEach(function(registration) {
                if (registration.observer === observer) registration.removeTransientObservers()
            })
        })
    }

    function forEachAncestorAndObserverEnqueueRecord(target, callback) {
        for (var node = target; node; node = node.parentNode) {
            var registrations = registrationsTable.get(node);
            if (registrations) {
                for (var j = 0; j < registrations.length; j++) {
                    var registration = registrations[j];
                    var options = registration.options;
                    if (node !== target && !options.subtree) continue;
                    var record = callback(options);
                    if (record) registration.enqueue(record)
                }
            }
        }
    }
    var uidCounter = 0;

    function JsMutationObserver(callback) {
        this.callback_ = callback;
        this.nodes_ = [];
        this.records_ = [];
        this.uid_ = ++uidCounter
    }
    JsMutationObserver.prototype = {
        observe: function observe(target, options) {
            target = wrapIfNeeded(target);
            if (!options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData) {
                throw new SyntaxError
            }
            var registrations = registrationsTable.get(target);
            if (!registrations) registrationsTable.set(target, registrations = []);
            var registration;
            for (var i = 0; i < registrations.length; i++) {
                if (registrations[i].observer === this) {
                    registration = registrations[i];
                    registration.removeListeners();
                    registration.options = options;
                    break
                }
            }
            if (!registration) {
                registration = new Registration(this, target, options);
                registrations.push(registration);
                this.nodes_.push(target)
            }
            registration.addListeners()
        },
        disconnect: function disconnect() {
            this.nodes_.forEach(function(node) {
                var registrations = registrationsTable.get(node);
                for (var i = 0; i < registrations.length; i++) {
                    var registration = registrations[i];
                    if (registration.observer === this) {
                        registration.removeListeners();
                        registrations.splice(i, 1);
                        break
                    }
                }
            }, this);
            this.records_ = []
        },
        takeRecords: function takeRecords() {
            var copyOfRecords = this.records_;
            this.records_ = [];
            return copyOfRecords
        }
    };

    function MutationRecord(type, target) {
        this.type = type;
        this.target = target;
        this.addedNodes = [];
        this.removedNodes = [];
        this.previousSibling = null;
        this.nextSibling = null;
        this.attributeName = null;
        this.attributeNamespace = null;
        this.oldValue = null
    }

    function copyMutationRecord(original) {
        var record = new MutationRecord(original.type, original.target);
        record.addedNodes = original.addedNodes.slice();
        record.removedNodes = original.removedNodes.slice();
        record.previousSibling = original.previousSibling;
        record.nextSibling = original.nextSibling;
        record.attributeName = original.attributeName;
        record.attributeNamespace = original.attributeNamespace;
        record.oldValue = original.oldValue;
        return record
    }
    var currentRecord, recordWithOldValue;

    function getRecord(type, target) {
        return currentRecord = new MutationRecord(type, target)
    }

    function getRecordWithOldValue(oldValue) {
        if (recordWithOldValue) return recordWithOldValue;
        recordWithOldValue = copyMutationRecord(currentRecord);
        recordWithOldValue.oldValue = oldValue;
        return recordWithOldValue
    }

    function clearRecords() {
        currentRecord = recordWithOldValue = undefined
    }

    function recordRepresentsCurrentMutation(record) {
        return record === recordWithOldValue || record === currentRecord
    }

    function selectRecord(lastRecord, newRecord) {
        if (lastRecord === newRecord) return lastRecord;
        if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;
        return null
    }

    function Registration(observer, target, options) {
        this.observer = observer;
        this.target = target;
        this.options = options;
        this.transientObservedNodes = []
    }
    Registration.prototype = {
        enqueue: function enqueue(record) {
            var records = this.observer.records_;
            var length = records.length;
            if (records.length > 0) {
                var lastRecord = records[length - 1];
                var recordToReplaceLast = selectRecord(lastRecord, record);
                if (recordToReplaceLast) {
                    records[length - 1] = recordToReplaceLast;
                    return
                }
            } else {
                scheduleCallback(this.observer)
            }
            records[length] = record
        },
        addListeners: function addListeners() {
            this.addListeners_(this.target)
        },
        addListeners_: function addListeners_(node) {
            var options = this.options;
            if (options.attributes) node.addEventListener("DOMAttrModified", this, true);
            if (options.characterData) node.addEventListener("DOMCharacterDataModified", this, true);
            if (options.childList) node.addEventListener("DOMNodeInserted", this, true);
            if (options.childList || options.subtree) node.addEventListener("DOMNodeRemoved", this, true)
        },
        removeListeners: function removeListeners() {
            this.removeListeners_(this.target)
        },
        removeListeners_: function removeListeners_(node) {
            var options = this.options;
            if (options.attributes) node.removeEventListener("DOMAttrModified", this, true);
            if (options.characterData) node.removeEventListener("DOMCharacterDataModified", this, true);
            if (options.childList) node.removeEventListener("DOMNodeInserted", this, true);
            if (options.childList || options.subtree) node.removeEventListener("DOMNodeRemoved", this, true)
        },
        addTransientObserver: function addTransientObserver(node) {
            if (node === this.target) return;
            this.addListeners_(node);
            this.transientObservedNodes.push(node);
            var registrations = registrationsTable.get(node);
            if (!registrations) registrationsTable.set(node, registrations = []);
            registrations.push(this)
        },
        removeTransientObservers: function removeTransientObservers() {
            var transientObservedNodes = this.transientObservedNodes;
            this.transientObservedNodes = [];
            transientObservedNodes.forEach(function(node) {
                this.removeListeners_(node);
                var registrations = registrationsTable.get(node);
                for (var i = 0; i < registrations.length; i++) {
                    if (registrations[i] === this) {
                        registrations.splice(i, 1);
                        break
                    }
                }
            }, this)
        },
        handleEvent: function handleEvent(e) {
            e.stopImmediatePropagation();
            switch (e.type) {
                case "DOMAttrModified":
                    var name = e.attrName;
                    var namespace = e.relatedNode.namespaceURI;
                    var target = e.target;
                    var record = new getRecord("attributes", target);
                    record.attributeName = name;
                    record.attributeNamespace = namespace;
                    var oldValue = null;
                    if (!(typeof MutationEvent !== "undefined" && e.attrChange === MutationEvent.ADDITION)) oldValue = e.prevValue;
                    forEachAncestorAndObserverEnqueueRecord(target, function(options) {
                        if (!options.attributes) return;
                        if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
                            return
                        }
                        if (options.attributeOldValue) return getRecordWithOldValue(oldValue);
                        return record
                    });
                    break;
                case "DOMCharacterDataModified":
                    var target = e.target;
                    var record = getRecord("characterData", target);
                    var oldValue = e.prevValue;
                    forEachAncestorAndObserverEnqueueRecord(target, function(options) {
                        if (!options.characterData) return;
                        if (options.characterDataOldValue) return getRecordWithOldValue(oldValue);
                        return record
                    });
                    break;
                case "DOMNodeRemoved":
                    this.addTransientObserver(e.target);
                case "DOMNodeInserted":
                    var target = e.relatedNode;
                    var changedNode = e.target;
                    var addedNodes, removedNodes;
                    if (e.type === "DOMNodeInserted") {
                        addedNodes = [changedNode];
                        removedNodes = []
                    } else {
                        addedNodes = [];
                        removedNodes = [changedNode]
                    }
                    var previousSibling = changedNode.previousSibling;
                    var nextSibling = changedNode.nextSibling;
                    var record = getRecord("childList", target);
                    record.addedNodes = addedNodes;
                    record.removedNodes = removedNodes;
                    record.previousSibling = previousSibling;
                    record.nextSibling = nextSibling;
                    forEachAncestorAndObserverEnqueueRecord(target, function(options) {
                        if (!options.childList) return;
                        return record
                    })
            }
            clearRecords()
        }
    };
    if (!MutationObserver) {
        MutationObserver = JsMutationObserver
    }
    module.exports = MutationObserver
}]);
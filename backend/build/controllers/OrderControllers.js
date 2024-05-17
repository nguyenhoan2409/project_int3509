"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Orders = require("../models/Orders");
var Products = require("../models/Products");
var moment = require('moment/moment');
var Timeline = require("../models/Timeline");
var _require = require("sequelize"),
  Op = _require.Op,
  or = _require.or,
  QueryTypes = _require.QueryTypes;
var _require2 = require("../config/database"),
  database = _require2.database;
exports.getAllOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var orders;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return database.query("\n        SELECT o.*, p.product_name, p.thumbnail, p.product_type, s.description, u.fullname, u.email, u.phone_number\n        FROM orders o\n        LEFT JOIN products p ON o.product_id = p.product_id\n        LEFT JOIN status s ON o.status = s.status_id\n        LEFT JOIN users u ON u.user_id = o.user_id\n    ", {
            type: QueryTypes.SELECT
          });
        case 3:
          orders = _context.sent;
          return _context.abrupt("return", res.status(200).json(orders));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(400).json({
            msg: _context.t0
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getOrderById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var order_id, order;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          order_id = req.params.order_id;
          _context2.prev = 1;
          _context2.next = 4;
          return Orders.findOne({
            where: {
              order_id: order_id
            }
          });
        case 4:
          order = _context2.sent;
          if (order) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            error: "Order not found"
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json(order));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.error("Error getting order by id:", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            error: "Internal server error"
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getOrderByStatus = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var status, orders;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          status = req.params.status;
          _context3.prev = 1;
          _context3.next = 4;
          return Orders.findAll({
            where: {
              status: status
            }
          });
        case 4:
          orders = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(orders));
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error("Error getting orders by status:", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            error: "Internal server error"
          }));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getRemainingProductQuantity = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var product_id, product;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          product_id = req.params.product_id; // const totalOrderedQuantity = await Orders.sum("quantity", {
          //   where: {
          //     product_id: product_id,
          //     status: 2,
          //   },
          // });
          _context4.next = 4;
          return Products.findByPk(product_id);
        case 4:
          product = _context4.sent;
          if (product) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "Không tìm thấy sản phẩm."
          }));
        case 7:
          return _context4.abrupt("return", res.status(200).json({
            remainingQuantity: product.quantity
          }));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Lỗi Server"
          }));
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.confirmOrderStatus = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, orderId, productId, quantity, newStatus, order, product, remainingProductQuantity, quantityAfterReturning;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, orderId = _req$body.orderId, productId = _req$body.productId, quantity = _req$body.quantity, newStatus = _req$body.newStatus;
          _context5.prev = 1;
          _context5.next = 4;
          return Orders.findOne({
            where: {
              order_id: orderId
            }
          });
        case 4:
          order = _context5.sent;
          _context5.next = 7;
          return Products.findOne({
            where: {
              product_id: productId
            }
          });
        case 7:
          product = _context5.sent;
          if (order) {
            _context5.next = 10;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: "Không tìm thấy đơn hàng"
          }));
        case 10:
          if (product) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "Không tìm thấy sản phẩm"
          }));
        case 12:
          if (!(newStatus < 1 || newStatus > 12)) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "Trạng thái đơn hàng không hợp lệ"
          }));
        case 14:
          if (newStatus == 2 || newStatus == 10) {
            remainingProductQuantity = product.quantity - quantity;
            product.update({
              quantity: remainingProductQuantity
            });
          }
          if (newStatus == 4) {
            quantityAfterReturning = product.quantity + quantity;
            product.update({
              quantity: quantityAfterReturning
            });
            order.update({
              return_time: moment().format('YYYY-MM-DD HH:mm:ss')
            });
          }
          if (newStatus == 8 || newStatus == 12) {
            order.update({
              return_time: moment().format('YYYY-MM-DD HH:mm:ss')
            });
          }
          _context5.next = 19;
          return order.update({
            status: newStatus
          });
        case 19:
          return _context5.abrupt("return", res.status(200).json({
            success: "Đã cập nhật trạng thái đơn hàng thành công"
          }));
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            error: "Lỗi server"
          }));
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 22]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.createOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body2, user_id, product_id, quantity, total_money, timeline_id, rental_date, return_date, status, note, product, timeLine, rental_time, return_time, bookedOrders, _iterator, _step, bookedOrder, bookedOrderRentalDate, bookedOrderReturnDate, order;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, user_id = _req$body2.user_id, product_id = _req$body2.product_id, quantity = _req$body2.quantity, total_money = _req$body2.total_money, timeline_id = _req$body2.timeline_id, rental_date = _req$body2.rental_date, return_date = _req$body2.return_date, status = _req$body2.status, note = _req$body2.note;
          _context6.prev = 1;
          _context6.next = 4;
          return Products.findOne({
            where: {
              product_id: product_id
            }
          });
        case 4:
          product = _context6.sent;
          if (product) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: "Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m v\u1EDBi product_id: ".concat(product_id)
          }));
        case 7:
          _context6.next = 9;
          return Timeline.findOne({
            where: {
              timeline_id: timeline_id
            }
          });
        case 9:
          timeLine = _context6.sent;
          if (!timeLine) {
            timeLine = {
              start_time: moment().locale('vi').format('HH:mm:ss'),
              end_time: moment().locale('vi').add(5, 'days').format('HH:mm:ss')
            };
          }
          rental_time = rental_date + " " + timeLine.start_time;
          return_time = return_date + " " + timeLine.end_time;
          if (!(product.product_type == 1 || product.product_type == 2)) {
            _context6.next = 16;
            break;
          }
          if (!(quantity > product.quantity)) {
            _context6.next = 16;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "S\u1ED1 l\u01B0\u1EE3ng c\xF2n l\u1EA1i kh\xF4ng \u0111\u1EE7 \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u. Vui l\xF2ng ch\u1ECDn s\u1ED1 l\u01B0\u1EE3ng nh\u1ECF h\u01A1n ".concat(product.quantity)
          }));
        case 16:
          if (!(product.product_type == 3)) {
            _context6.next = 39;
            break;
          }
          _context6.next = 19;
          return Orders.findAll({
            where: {
              status: _defineProperty({}, Op.or, [5, 6])
            }
          });
        case 19:
          bookedOrders = _context6.sent;
          _iterator = _createForOfIteratorHelper(bookedOrders);
          _context6.prev = 21;
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context6.next = 31;
            break;
          }
          bookedOrder = _step.value;
          bookedOrderRentalDate = moment.utc(bookedOrder.rental_time).format('YYYY-MM-DD');
          bookedOrderReturnDate = moment.utc(bookedOrder.return_time).format('YYYY-MM-DD');
          if (!(rental_date == bookedOrderRentalDate && timeline_id == bookedOrder.timeline)) {
            _context6.next = 29;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "Đã có lịch được đặt trong khoảng thời gian từ " + rental_time + " tới " + return_time + "."
          }));
        case 29:
          _context6.next = 23;
          break;
        case 31:
          _context6.next = 36;
          break;
        case 33:
          _context6.prev = 33;
          _context6.t0 = _context6["catch"](21);
          _iterator.e(_context6.t0);
        case 36:
          _context6.prev = 36;
          _iterator.f();
          return _context6.finish(36);
        case 39:
          _context6.next = 41;
          return Orders.create({
            order_id: null,
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
            total_money: total_money,
            timeline: timeline_id,
            rental_time: rental_time,
            return_time: return_time,
            status: status,
            note: note
          });
        case 41:
          order = _context6.sent;
          return _context6.abrupt("return", res.status(201).json({
            success: true,
            message: "Yêu cầu đã được tạo thành công và vui lòng đợi admin xác nhận.",
            order: order
          }));
        case 45:
          _context6.prev = 45;
          _context6.t1 = _context6["catch"](1);
          console.error(_context6.t1);
          return _context6.abrupt("return", res.status(500).json({
            message: "Lỗi server"
          }));
        case 49:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 45], [21, 33, 36, 39]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// exports.createOrderForRentingOrBuying = async (req, res) => {
//   const {
//     user_id,
//     product_id,
//     quantity,
//     total_money,
//     rental_time,
//     return_time,
//     status,
//   } = req.body;

//   try {
//     const product = await Products.findOne({ where: { product_id } });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ error: `Product not found with productId: ${product_id}` });
//     }

//     const totalOrderedQuantity = await Orders.sum("quantity", {
//       where: {
//         product_id: product_id,
//         status: 2,
//       },
//     });

//     const remainingQuantity = product.quantity - totalOrderedQuantity;

//     if (remainingQuantity < quantity) {
//       return res
//         .status(400)
//         .json({ error: "Số lượng còn lại không đủ để đặt hàng" });
//     }

//     const order = await Orders.create({
//       order_id: null,
//       user_id: user_id,
//       product_id: product_id,
//       quantity: quantity,
//       total_money: total_money,
//       rental_time: rental_time,
//       return_time: return_time,
//       status: status,
//     });

//     return res
//       .status(201)
//       .json({ success: true, message: "Order was created successfully!" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Lỗi server" });
//   }
// };

// exports.createOrderForScheduling = async (req, res) => {
//   const {
//     user_id,
//     product_id,
//     quantity,
//     total_money,
//     rental_time,
//     return_time,
//     status,
//   } = req.body;

//   try {
//     const product = await Products.findOne({ where: { product_id } });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ error: `Product not found with productId: ${product_id}` });
//     }

//     const bookingOrders = await Orders.findAll({
//       where: {
//         status: 6
//       }
//     })

//     for (const bookingOrder of bookingOrders) {
//       let bookingOrderRentalTime = moment.utc(bookingOrder.rental_time).format('YYYY-MM-DD HH:mm:ss'); 
//       let bookingOrderReturnTime = moment.utc(bookingOrder.return_time).format('YYYY-MM-DD HH:mm:ss')
//       if(rental_time < bookingOrderReturnTime 
//       && return_time > bookingOrderRentalTime) {
//         if (rental_time < bookingOrderRentalTime && return_time < bookingOrderReturnTime) {
//           return res.status(400).json({ error: 'The schedule was conflicted. You can choose return_time < ' 
//           + moment.utc(bookingOrder.rental_time).hour() 
//           + ":"
//           + moment.utc(bookingOrder.rental_time).minutes()});
//         }

//         if (rental_time > bookingOrderRentalTime && return_time < bookingOrderReturnTime) {
//             return res.status(400).json({ error: 'The schedule was conflicted. There is the renting scheduled from ' 
//             + moment.utc(bookingOrder.rental_time).hour() + ":" + moment.utc(bookingOrder.rental_time).minutes()
//             + " to "
//             + moment.utc(bookingOrder.return_time).hour() + ":" + moment.utc(bookingOrder.return_time).minutes()}) 
//           };

//           if (rental_time > bookingOrderRentalTime && return_time > bookingOrderReturnTime) {
//             return res.status(400).json({ error: 'The schedule was conflicted. You can choose rental_time > ' 
//             + moment.utc(bookingOrder.return_time).hour() + ":" + moment.utc(bookingOrder.return_time).minutes()
//             }) 
//           };
//         }
//       }

//   // const lastOrder = await Orders.findOne({ order: [['order_id', 'DESC']] }); 
//   // const lastOrderReturnTime = moment.utc(lastOrder.return_time).format('YYYY-MM-DD HH:mm:ss'); 
//   // if (lastOrder && (rental_time <= lastOrderReturnTime)) {
//   //   return res.status(400).json({ error: 'The schedule was conflicted. Choose another rental_time.' });
//   // }

//     const order = await Orders.create({
//       order_id: null,
//       user_id: user_id,
//       product_id: product_id,
//       quantity: quantity,
//       total_money: total_money,
//       rental_time: rental_time,
//       return_time: return_time,
//       status: status,
//     });

//     return res
//       .status(201)
//       .json({ success: true, message: "Order was created successfully!", order: order});

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Lỗi server" });
//   }
// };
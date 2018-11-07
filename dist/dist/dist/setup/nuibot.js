'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

require('dotenv').config();

function EnableGettingStarted() {
    var _this = this;

    return new Promise(function () {
        var _ref = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.t0 = resolve;
                            _context.next = 3;
                            return require('axios').post('http://api.chatbot.ngxson.com/graph/me/messenger_profile?access_token=' + process.env.TOKEN_NUI, {
                                get_started: {
                                    payload: 'GETTING_STARTED'
                                }
                            });

                        case 3:
                            _context.t1 = _context.sent;
                            (0, _context.t0)(_context.t1);

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());
}

function EnablePersistent_menu() {
    var _this2 = this;

    return new Promise(function () {
        var _ref2 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.t0 = resolve;
                            _context2.next = 3;
                            return require('axios').post('http://api.chatbot.ngxson.com/graph/me/messenger_profile?access_token=' + process.env.TOKEN_NUI, {
                                persistent_menu: [{
                                    locale: 'default',
                                    call_to_actions: [{
                                        type: 'postback',
                                        title: 'Hướng dẫn sử dụng',
                                        payload: 'INSTRODUCTION'
                                    }, {
                                        type: 'postback',
                                        title: 'Đổi sở thích',
                                        payload: 'CHANGE_FAVORITE'
                                    }]
                                }]
                            });

                        case 3:
                            _context2.t1 = _context2.sent;
                            (0, _context2.t0)(_context2.t1);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }());
}

(0, _asyncToGenerator3.default)(
/*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var gettingStarted, Persistent_menu;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return EnableGettingStarted();

                case 2:
                    gettingStarted = _context3.sent;

                    console.log('Getting Started', gettingStarted.status === 200);
                    _context3.next = 6;
                    return EnablePersistent_menu();

                case 6:
                    Persistent_menu = _context3.sent;

                    console.log('The Persistent Menu', gettingStarted.status === 200);

                case 8:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, undefined);
}))();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleText = exports.processPostback = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var processPostback = exports.processPostback = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(senderId, payload, timestamp) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.t0 = payload;
                        _context.next = _context.t0 === "GETTING_STARTED" ? 3 : _context.t0 === "INSTRODUCTION" ? 4 : _context.t0 === "CHANGE_FAVORITE" ? 5 : _context.t0 === "CHANGE_MALE" ? 6 : _context.t0 === "CHANGE_FEMALE" ? 7 : _context.t0 === "CHANGE_ANY" ? 8 : 9;
                        break;

                    case 3:
                        return _context.abrupt("return", (0, _newUser2.default)(senderId, timestamp).then(function () {
                            (0, _NuiAPI.sendTemplatedMessage)(senderId, process.env.WELCOME_TEXT_TITLE || _lang.WELCOME_TEXT_TITLE, process.env.WELCOME_TEXT || _lang.WELCOME_TEXT);
                        }));

                    case 4:
                        return _context.abrupt("return", (0, _NuiAPI.sendTemplatedMessage)(senderId, process.env.INTRODUCTION_TITLE || _lang.INTRODUCTION_TITLE, process.env.INSTRODUCTION || _lang.INSTRODUCTION));

                    case 5:
                        return _context.abrupt("return", (0, _NuiAPI.sendQuickReplies)(senderId, process.env.CHANGE_GENDER || _lang.CHANGE_GENDER, [(0, _quickreplies2.default)("text", "Nam", "https://xn--i-7iq.ws/emoji-image/%F0%9F%91%A6.png?format=ios", "CHANGE_MALE"), (0, _quickreplies2.default)("text", "Nữ", "https://xn--i-7iq.ws/emoji-image/%F0%9F%91%A7.png?format=ios", "CHANGE_FEMALE"), (0, _quickreplies2.default)("text", "Anyone", "https://xn--i-7iq.ws/emoji-image/%F0%9F%91%AB.png?format=ios", "CHANGE_ANY")]));

                    case 6:
                        return _context.abrupt("return", (0, _changeFavorite2.default)(senderId, "male"));

                    case 7:
                        return _context.abrupt("return", (0, _changeFavorite2.default)(senderId, "female"));

                    case 8:
                        return _context.abrupt("return", (0, _changeFavorite2.default)(senderId, "any"));

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function processPostback(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var handleText = exports.handleText = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(senderId, message, timestamp) {
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var status;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(message === "#id")) {
                            _context2.next = 2;
                            break;
                        }

                        return _context2.abrupt("return", (0, _NuiAPI.sendText)(senderId, senderId.toString()));

                    case 2:
                        _context2.next = 4;
                        return (0, _findUser2.default)(senderId, timestamp);

                    case 4:
                        status = _context2.sent;

                        if (!(status === 0)) {
                            _context2.next = 10;
                            break;
                        }

                        _context2.next = 8;
                        return (0, _userSendRequest2.default)(senderId, timestamp);

                    case 8:
                        (0, _findPair2.default)();
                        return _context2.abrupt("return", (0, _NuiAPI.sendTemplatedMessage)(senderId, process.env.REQUEST_MSG_TITLE || _lang.REQUEST_MSG_TITLE, process.env.REQUEST_MSG || _lang.REQUEST_MSG));

                    case 10:
                        processText(senderId, status, message, type);

                    case 11:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function handleText(_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
    };
}();

var _NuiAPI = require("../../api/NuiAPI");

var _newUser = require("../../feature/Chatible/newUser");

var _newUser2 = _interopRequireDefault(_newUser);

var _findUser = require("../../feature/Chatible/findUser");

var _findUser2 = _interopRequireDefault(_findUser);

var _userSendRequest = require("../../feature/Chatible/userSendRequest");

var _userSendRequest2 = _interopRequireDefault(_userSendRequest);

var _findPair = require("../../feature/Chatible/findPair");

var _findPair2 = _interopRequireDefault(_findPair);

var _bye = require("../../feature/Chatible/bye");

var _bye2 = _interopRequireDefault(_bye);

var _changeFavorite = require("../../feature/Chatible/changeFavorite");

var _changeFavorite2 = _interopRequireDefault(_changeFavorite);

var _lang = require("../../variable/lang");

var _quickreplies = require("../../util/quickreplies");

var _quickreplies2 = _interopRequireDefault(_quickreplies);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function processText(senderId, status, message) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    switch (message.toLowerCase()) {
        case "pp":
            {
                if (status === 1) return (0, _bye2.default)(senderId);
                return (0, _bye2.default)(senderId, status);
            }
        default:
            if (status === 1) return (0, _NuiAPI.sendTemplatedMessage)(senderId, process.env.REQUESTED_MSG_TITLE || REQUESTED_MSG_TITLE, process.env.REQUESTED_MSG || _lang.REQUESTED_MSG);
            if (type) return (0, _NuiAPI.sendAttachment)(status, type, message);
            return (0, _NuiAPI.sendText)(status, message);
    }
}
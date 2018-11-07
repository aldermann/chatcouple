"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.sendTemplatedMessage = sendTemplatedMessage;
exports.sendText = sendText;
exports.getUserData = getUserData;
exports.sendButton = sendButton;
exports.sendQuickReplies = sendQuickReplies;
exports.sendAttachment = sendAttachment;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function sendTemplatedMessage(senderId, title, msg) {
    _axios2.default.post("http://api.chatbot.ngxson.com/graph/me/messages?access_token=" + process.env.TOKEN_NUI, {
        messaging_type: "RESPONSE",
        recipient: {
            id: senderId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: title,
                        subtitle: msg
                    }]
                }
            }
        }
    }).catch(function (err) {
        return console.error("Error sending message: ", err);
    });
}

function sendText(senderId, msg) {
    _axios2.default.post("http://api.chatbot.ngxson.com/graph/me/messages?access_token=" + process.env.TOKEN_NUI, {
        messaging_type: "RESPONSE",
        recipient: {
            id: senderId
        },
        message: {
            text: msg
        }
    }).catch(function (err) {
        return console.error("Error sending message: ", err);
    });
}

function getUserData(senderId) {
    var _this = this;

    return new Promise(function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.t0 = resolve;
                            _context.next = 3;
                            return _axios2.default.get("http://api.chatbot.ngxson.com/graph/" + senderId + "?access_token=" + process.env.TOKEN_NUI);

                        case 3:
                            _context.t1 = _context.sent.data;
                            (0, _context.t0)(_context.t1);

                        case 5:
                        case "end":
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

function sendButton(senderId, title, buttons) {
    _axios2.default.post("http://api.chatbot.ngxson.com/graph/me/messages?access_token=" + process.env.TOKEN_NUI, {
        messaging_type: "RESPONSE",
        recipient: {
            id: senderId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: title,
                    buttons: buttons
                }
            }
        }
    }).catch(function (err) {
        return console.error("Error sending message: ", err);
    });
}

function sendQuickReplies(senderId, title, buttons) {
    _axios2.default.post("http://api.chatbot.ngxson.com/graph/me/messages?access_token=" + process.env.TOKEN_NUI, {
        messaging_type: "RESPONSE",
        recipient: {
            id: senderId
        },
        message: {
            text: title,
            quick_replies: buttons
        }
    }).catch(function (err) {
        return console.error("Error sending message: ", err);
    });
}

function sendAttachment(senderId, type, payload) {
    _axios2.default.post("http://api.chatbot.ngxson.com/graph/me/messages?access_token=" + process.env.TOKEN_NUI, {
        messaging_type: "RESPONSE",
        recipient: {
            id: senderId
        },
        message: {
            attachment: {
                type: type,
                payload: {
                    url: payload,
                    is_reusable: true
                }
            }
        }
    }).catch(function (err) {
        return console.error("Error sending message: ", err);
    });
}
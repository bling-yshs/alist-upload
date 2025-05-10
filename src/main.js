"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var core = require("@actions/core");
var glob = require("@actions/glob");
// 获取 Alist token
function getToken(url, username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    core.info('正在获取 token...');
                    return [4 /*yield*/, fetch("".concat(url, "/api/auth/login"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: '*/*',
                            },
                            body: JSON.stringify({
                                username: username,
                                password: password,
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.code === 200 && data.data && data.data.token) {
                        core.info('token 获取成功!');
                        return [2 /*return*/, data.data.token];
                    }
                    else {
                        throw new Error("\u83B7\u53D6 token \u5931\u8D25: ".concat(JSON.stringify(data)));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        throw new Error("\u83B7\u53D6 token \u65F6\u53D1\u751F\u9519\u8BEF: ".concat(error_1.message));
                    }
                    throw new Error("\u83B7\u53D6 token \u65F6\u53D1\u751F\u9519\u8BEF: ".concat(String(error_1)));
                case 4: return [2 /*return*/];
            }
        });
    });
}
// 上传文件
function uploadFile(url, filePath, remotePath, token) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    fileContent = fs.readFileSync(filePath);
                    core.info("\u4E0A\u4F20\u6587\u4EF6 ".concat(filePath, " \u5230 ").concat(remotePath));
                    return [4 /*yield*/, fetch("".concat(url, "/api/fs/put"), {
                            method: 'PUT',
                            headers: {
                                Authorization: token,
                                'File-Path': remotePath,
                                'As-Task': 'true',
                                'Content-Type': 'application/octet-stream',
                            },
                            body: fileContent,
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    core.info("\u4E0A\u4F20\u54CD\u5E94: ".concat(JSON.stringify(data)));
                    return [2 /*return*/, response.ok];
                case 3:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error) {
                        core.error("\u4E0A\u4F20\u6587\u4EF6 ".concat(filePath, " \u5931\u8D25: ").concat(error_2.message));
                    }
                    else {
                        core.error("\u4E0A\u4F20\u6587\u4EF6 ".concat(filePath, " \u5931\u8D25: ").concat(String(error_2)));
                    }
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var alistUrl, alistUsername, alistPassword, filePath, remoteDir, overwriteExistFile, token, globber, files, successCount, failCount, _i, files_1, file, stats, fileName, remotePath, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    alistUrl = core.getInput('alist-url', { required: true });
                    alistUsername = core.getInput('alist-username', { required: true });
                    alistPassword = core.getInput('alist-password', { required: true });
                    filePath = core.getInput('file-path', { required: true });
                    remoteDir = core.getInput('remote-dir', { required: true });
                    overwriteExistFile = core.getInput('overwrite-exist-file') === 'true';
                    // 处理远程路径格式
                    if (!remoteDir.startsWith('/')) {
                        remoteDir = "/".concat(remoteDir);
                    }
                    if (!remoteDir.endsWith('/')) {
                        remoteDir += '/';
                    }
                    return [4 /*yield*/, getToken(alistUrl, alistUsername, alistPassword)
                        // 获取匹配的文件
                    ];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, glob.create(filePath)];
                case 2:
                    globber = _a.sent();
                    return [4 /*yield*/, globber.glob()];
                case 3:
                    files = _a.sent();
                    if (files.length === 0) {
                        core.warning("\u6CA1\u6709\u627E\u5230\u5339\u914D ".concat(filePath, " \u7684\u6587\u4EF6"));
                        return [2 /*return*/];
                    }
                    successCount = 0;
                    failCount = 0;
                    _i = 0, files_1 = files;
                    _a.label = 4;
                case 4:
                    if (!(_i < files_1.length)) return [3 /*break*/, 7];
                    file = files_1[_i];
                    stats = fs.statSync(file);
                    if (stats.isDirectory()) {
                        core.info("".concat(file, " \u662F\u76EE\u5F55\uFF0C\u8DF3\u8FC7"));
                        return [3 /*break*/, 6];
                    }
                    fileName = path.basename(file);
                    remotePath = "".concat(remoteDir).concat(fileName);
                    return [4 /*yield*/, uploadFile(alistUrl, file, remotePath, token)];
                case 5:
                    // 上传文件
                    if (_a.sent()) {
                        successCount++;
                    }
                    else {
                        failCount++;
                    }
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    // 输出结果
                    core.info('\n上传完成!');
                    core.info("\u6210\u529F: ".concat(successCount, " \u4E2A\u6587\u4EF6"));
                    core.info("\u5931\u8D25: ".concat(failCount, " \u4E2A\u6587\u4EF6"));
                    // 设置输出
                    core.setOutput('time', new Date().toTimeString());
                    return [3 /*break*/, 9];
                case 8:
                    error_3 = _a.sent();
                    core.setFailed("Action \u5931\u8D25: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
main();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var federation_constants_1 = require("./federation.constants");
exports.GATEWAY_BUILD_SERVICE = federation_constants_1.GATEWAY_BUILD_SERVICE;
tslib_1.__exportStar(require("./graphql-federation.factory"), exports);
tslib_1.__exportStar(require("./graphql-federation.module"), exports);
tslib_1.__exportStar(require("./graphql-gateway.module"), exports);

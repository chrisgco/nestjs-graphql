"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
let TypeFieldsAccessor = class TypeFieldsAccessor {
    extractFromInputType(gqlType) {
        const fieldsMap = gqlType.getFields();
        const fieldsConfig = {};
        for (const key in fieldsMap) {
            const targetField = fieldsMap[key];
            fieldsConfig[key] = {
                type: targetField.type,
                description: targetField.description,
                defaultValue: targetField.defaultValue,
            };
        }
        return fieldsConfig;
    }
    extractFromInterfaceOrObjectType(type) {
        const fieldsMap = type.getFields();
        const fieldsConfig = {};
        for (const key in fieldsMap) {
            const targetField = fieldsMap[key];
            const args = {};
            targetField.args.forEach((item) => {
                args[item.name] = lodash_1.omit(item, 'name');
            });
            fieldsConfig[key] = {
                type: targetField.type,
                description: targetField.description,
                deprecationReason: targetField.deprecationReason,
                args,
            };
        }
        return fieldsConfig;
    }
};
TypeFieldsAccessor = tslib_1.__decorate([
    common_1.Injectable()
], TypeFieldsAccessor);
exports.TypeFieldsAccessor = TypeFieldsAccessor;

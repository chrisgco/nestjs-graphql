"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const graphql_1 = require("graphql");
const return_type_cannot_be_resolved_error_1 = require("../errors/return-type-cannot-be-resolved.error");
const type_fields_accessor_1 = require("../services/type-fields.accessor");
const type_definitions_storage_1 = require("../storages/type-definitions.storage");
const type_metadata_storage_1 = require("../storages/type-metadata.storage");
const output_type_factory_1 = require("./output-type.factory");
const resolve_type_factory_1 = require("./resolve-type.factory");
const args_factory_1 = require("./args.factory");
let InterfaceDefinitionFactory = class InterfaceDefinitionFactory {
    constructor(resolveTypeFactory, typeDefinitionsStorage, outputTypeFactory, typeFieldsAccessor, argsFactory) {
        this.resolveTypeFactory = resolveTypeFactory;
        this.typeDefinitionsStorage = typeDefinitionsStorage;
        this.outputTypeFactory = outputTypeFactory;
        this.typeFieldsAccessor = typeFieldsAccessor;
        this.argsFactory = argsFactory;
    }
    create(metadata, options) {
        const resolveType = this.createResolveTypeFn(metadata);
        return {
            target: metadata.target,
            isAbstract: metadata.isAbstract || false,
            type: new graphql_1.GraphQLInterfaceType({
                name: metadata.name,
                description: metadata.description,
                fields: this.generateFields(metadata, options),
                resolveType,
                interfaces: this.generateInterfaces(metadata),
            }),
        };
    }
    createResolveTypeFn(metadata) {
        const objectTypesMetadata = type_metadata_storage_1.TypeMetadataStorage.getObjectTypesMetadata();
        const implementedTypes = objectTypesMetadata
            .filter(objectType => objectType.interfaces &&
            objectType.interfaces.includes(metadata.target))
            .map(objectType => objectType.target);
        return metadata.resolveType
            ? this.resolveTypeFactory.getResolveTypeFunction(metadata.resolveType)
            : (instance) => {
                const target = implementedTypes.find(Type => instance instanceof Type);
                if (!target) {
                    throw new return_type_cannot_be_resolved_error_1.ReturnTypeCannotBeResolvedError(metadata.name);
                }
                return this.typeDefinitionsStorage.getObjectTypeByTarget(target).type;
            };
    }
    generateFields(metadata, options) {
        const prototype = Object.getPrototypeOf(metadata.target);
        const getParentType = () => {
            const parentTypeDefinition = this.typeDefinitionsStorage.getInterfaceByTarget(prototype);
            return parentTypeDefinition ? parentTypeDefinition.type : undefined;
        };
        return () => {
            let fields = {};
            metadata.properties.forEach(property => {
                fields[property.schemaName] = {
                    args: this.argsFactory.create(property.methodArgs, options),
                    description: property.description,
                    type: this.outputTypeFactory.create(property.name, property.typeFn(), options, property.options),
                };
            });
            if (!shared_utils_1.isUndefined(prototype.prototype)) {
                const parentClassRef = getParentType();
                if (parentClassRef) {
                    const parentFields = this.typeFieldsAccessor.extractFromInterfaceOrObjectType(parentClassRef);
                    fields = Object.assign(Object.assign({}, parentFields), fields);
                }
            }
            return fields;
        };
    }
    generateInterfaces(metadata) {
        const prototype = Object.getPrototypeOf(metadata.target);
        const getParentType = () => {
            const parentTypeDefinition = this.typeDefinitionsStorage.getInterfaceByTarget(prototype);
            return parentTypeDefinition ? parentTypeDefinition.type : undefined;
        };
        return () => {
            const interfaces = (metadata.interfaces || []).map((item) => this.typeDefinitionsStorage.getInterfaceByTarget(item).type);
            if (!shared_utils_1.isUndefined(prototype)) {
                const parentClass = getParentType();
                if (!parentClass) {
                    return interfaces;
                }
                const parentInterfaces = parentClass.getInterfaces();
                return Array.from(new Set([...interfaces, ...parentInterfaces]));
            }
            return interfaces;
        };
    }
};
InterfaceDefinitionFactory = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [resolve_type_factory_1.ResolveTypeFactory,
        type_definitions_storage_1.TypeDefinitionsStorage,
        output_type_factory_1.OutputTypeFactory,
        type_fields_accessor_1.TypeFieldsAccessor,
        args_factory_1.ArgsFactory])
], InterfaceDefinitionFactory);
exports.InterfaceDefinitionFactory = InterfaceDefinitionFactory;

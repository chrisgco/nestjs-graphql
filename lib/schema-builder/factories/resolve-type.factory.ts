import { Injectable } from '@nestjs/common';
import { isString } from '@nestjs/common/utils/shared.utils';
import { GraphQLTypeResolver } from 'graphql';
import { ResolveTypeFn } from '../../interfaces';
import { TypeDefinitionsStorage } from '../storages/type-definitions.storage';

@Injectable()
export class ResolveTypeFactory {
  constructor(
    private readonly typeDefinitionsStorage: TypeDefinitionsStorage,
  ) {}

  public getResolveTypeFunction<TSource = any, TContext = any>(
    resolveType: ResolveTypeFn<TSource, TContext>,
  ): GraphQLTypeResolver<TSource, TContext> {
    return async (...args) => {
      const resolvedType = await resolveType(...args);

      if (isString(resolvedType)) {
        const interfaceDef = this.typeDefinitionsStorage
          .getAllInterfaceDefinitions()
          .find((def) => def.type.name === resolvedType);
        if (interfaceDef) return interfaceDef.type.resolveType(...args);

        return resolvedType;
      }

      const interfaceDef = this.typeDefinitionsStorage.getInterfaceByTarget(
        resolvedType,
      );
      if (interfaceDef) return interfaceDef.type.resolveType(...args);

      const typeDef = this.typeDefinitionsStorage.getObjectTypeByTarget(
        resolvedType,
      );
      return typeDef.type;
    };
  }
}

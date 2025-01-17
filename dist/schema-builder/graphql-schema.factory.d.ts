import { GraphQLSchema } from 'graphql';
import { BuildSchemaOptions } from '../interfaces';
import { MutationTypeFactory } from './factories/mutation-type.factory';
import { OrphanedTypesFactory } from './factories/orphaned-types.factory';
import { QueryTypeFactory } from './factories/query-type.factory';
import { SubscriptionTypeFactory } from './factories/subscription-type.factory';
import { TypeDefinitionsGenerator } from './type-definitions.generator';
export declare class GraphQLSchemaFactory {
  private readonly queryTypeFactory;
  private readonly mutationTypeFactory;
  private readonly subscriptionTypeFactory;
  private readonly orphanedTypesFactory;
  private readonly typeDefinitionsGenerator;
  constructor(
    queryTypeFactory: QueryTypeFactory,
    mutationTypeFactory: MutationTypeFactory,
    subscriptionTypeFactory: SubscriptionTypeFactory,
    orphanedTypesFactory: OrphanedTypesFactory,
    typeDefinitionsGenerator: TypeDefinitionsGenerator,
  );
  create(
    resolvers: Function[],
    options?: BuildSchemaOptions,
  ): Promise<GraphQLSchema>;
}

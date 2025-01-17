import { Type } from '@nestjs/common';
import { ArgsType, InputType, InterfaceType, ObjectType } from '../decorators';
export declare type ClassDecoratorFactory =
  | typeof ArgsType
  | typeof ObjectType
  | typeof InterfaceType
  | typeof InputType;
export declare function applyIsOptionalDecorator(
  targetClass: Function,
  propertyKey: string,
): void;
export declare function inheritValidationMetadata(
  parentClass: Type<any>,
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean,
): void;
export declare function inheritTransformationMetadata(
  parentClass: Type<any>,
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean,
): void;

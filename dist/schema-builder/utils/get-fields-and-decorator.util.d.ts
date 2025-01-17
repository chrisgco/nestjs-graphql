import { Type } from '@nestjs/common';
import 'reflect-metadata';
import {
  ArgsType,
  InputType,
  InterfaceType,
  ObjectType,
} from '../../decorators';
export declare function getFieldsAndDecoratorForType<T>(
  objType: Type<T>,
): {
  fields: import('../metadata').PropertyMetadata[];
  decoratorFactory: ClassDecorator;
};
declare type ClassDecorator =
  | typeof ArgsType
  | typeof InterfaceType
  | typeof ObjectType
  | typeof InputType;
export {};

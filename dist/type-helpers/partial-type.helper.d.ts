import { Type } from '@nestjs/common';
import { ClassDecoratorFactory } from './type-helpers.utils';
export declare function PartialType<T>(
  classRef: Type<T>,
  decorator?: ClassDecoratorFactory,
): Type<Partial<T>>;

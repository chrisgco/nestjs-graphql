import { Type } from '@nestjs/common';
import { ClassDecoratorFactory } from './type-helpers.utils';
export declare function PickType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: K[],
  decorator?: ClassDecoratorFactory,
): Type<Pick<T, typeof keys[number]>>;

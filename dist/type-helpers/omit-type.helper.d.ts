import { Type } from '@nestjs/common';
import { ClassDecoratorFactory } from './type-helpers.utils';
export declare function OmitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: K[],
  decorator?: ClassDecoratorFactory,
): Type<Omit<T, typeof keys[number]>>;

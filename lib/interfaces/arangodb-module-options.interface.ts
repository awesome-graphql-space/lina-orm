import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { ConfigOptions } from './config.interface';

export interface ArangoDbModuleOptions extends ConfigOptions {}

export interface ArangoDbOptionsFactory {
  createArangoDbOptions():
    | Promise<ArangoDbModuleOptions>
    | ArangoDbModuleOptions;
}

export interface ArangoDbModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ArangoDbOptionsFactory>;
  useClass?: Type<ArangoDbOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ArangoDbModuleOptions> | ArangoDbModuleOptions;
  inject?: any[];
}

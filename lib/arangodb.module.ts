import { DynamicModule, Module, Provider } from '@nestjs/common';
import { createArangoDbClient } from './arangodb-client.provider';
import { ARANGODB_MODULE_OPTIONS } from './arangodb.constants';
import { ArangoDbService } from './arangodb.service';
import {
  ArangoDbModuleAsyncOptions,
  ArangoDbModuleOptions,
  ArangoDbOptionsFactory
} from './interfaces/arangodb-module-options.interface';

@Module({
  providers: [ArangoDbService],
  exports: [ArangoDbService]
})
export class ArangoDbModule {
  static register(options: ArangoDbModuleOptions): DynamicModule {
    return {
      module: ArangoDbModule,
      providers: [
        createArangoDbClient(),
        { provide: ARANGODB_MODULE_OPTIONS, useValue: options }
      ]
    };
  }

  static registerAsync(
    options: ArangoDbModuleAsyncOptions
  ): DynamicModule {
    return {
      module: ArangoDbModule,
      imports: options.imports || [],
      providers: [
        createArangoDbClient(),
        ...this.createAsyncProviders(options)
      ]
    };
  }

  private static createAsyncProviders(
    options: ArangoDbModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: ArangoDbModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ARANGODB_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: ARANGODB_MODULE_OPTIONS,
      useFactory: async (optionsFactory: ArangoDbOptionsFactory) =>
        await optionsFactory.createArangoDbOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}

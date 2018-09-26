import { ARANGODB_MODULE_OPTIONS } from './arangodb.constants';
import { ArangoDbModuleOptions } from './interfaces';
import ArangoDb from 'final-orm';

export const ARANGODB_CLIENT = 'ARANGODB_CLIENT';

export const createArangoDbClient = () => ({
  provide: ARANGODB_MODULE_OPTIONS,
  useFactory: (options: ArangoDbModuleOptions) => {
    return ArangoDb.connect(options);
  },
  inject: [ARANGODB_MODULE_OPTIONS]
});

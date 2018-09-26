<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://awesomeql.com/img/lina_logo_text.svg" width="320" alt="Lina Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/awesome-graphql-space/lina.svg?branch=master
[travis-url]: https://travis-ci.org/awesome-graphql-space/nest
[linux-image]: https://img.shields.io/travis/nestjs/awesome-graphql-space/lina.svg?label=linux
[linux-url]: https://travis-ci.org/awesome-graphql-space/lina

  <p align="center">An easy, highly extensible, full app progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, in Graphql</p>
    <p align="center">


## Description

ArangoDb module for [Lina](https://github.com/awesome-graphql-space/lina) based on the official [arangojs](https://www.npmjs.com/package/arangojs) package.

## Installation

```bash
$ npm i --save @linaframework/arango
```

## Usage

Import `ArangoDbModule`:

```typescript
@Module({
  imports: [ArangoDbModule.register({ 
    database: 'test', // db name
    // You can initialize the database using just a url.
    url: 'http://root:@localhost:8529',
    // Or supply each of these values. You do not need both.
    host: 'localhost',
    port: '8529',
    username: 'root',
    password: '',
    // You can also supply a protocol. If localhost, it's `http` by default, otherwise `https`
    protocol: 'tcp'
  })],
  providers: [...],
})
export class UserModule {}
```

Inject `UserService`:

```typescript
@Injectable()
export class UserService {
  constructor(private readonly arangoDbService: ArangoDbService) {}
}
```


## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**
```typescript
ArangoDbModule.registerAsync({
  useFactory: () => ({
    database: 'test',
    url: 'http://root:@localhost:8529',
    host: 'localhost',
    port: '8529',
    username: 'root',
    password: '',
    protocol: 'tcp'
  }),
})
```
Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
ArangoDbModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    database: configService.getString('ARANGO_DATABASE_NAME'),
    // You can initialize the database using just a url.
    url: configService.getString('ARANGO_HOST_URL'),,
    // Or supply each of these values. You do not need both.
    host: configService.getString('ARANGO_HOST'),,
    port: configService.getString('ARANGO_PORT'),,
    username: configService.getString('ARANGO_USERNAME'),,
    password: configService.getString('ARANGO_PASSWORD'),,
    // You can also supply a protocol. If localhost, it's `http` by default, otherwise `https`
    protocol: configService.getString('ARANGO_PROTOCOL'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**
```typescript
ArangoDbModule.registerAsync({
  useClass: ArangoDbConfigService,
})
```
Above construction will instantiate `ArangoDbConfigService` inside `ArangoDbModule` and will leverage it to create options object.
```typescript
class ArangoDbConfigService implements ArangoDbOptionsFactory {
  createElasticsearchOptions(): ArangoDbModuleOptions {
    return {
      database: 'test',
      url: 'http://root:@localhost:8529',
      host: 'localhost',
      port: '8529',
      username: 'root',
      password: '',
      protocol: 'tcp'
    };
  }
}
```

**3. Use existing**
```typescript
ArangoDbModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```
It works the same as `useClass` with one critical difference - `ArangoDbModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `ArangoDbService` exposes native [Arango](https://www.npmjs.com/package/arangojs) methods and wraps them in the Observable, [read more](https://github.com/arangodb/arangojs/blob/master/docs/Drivers/JS/Reference/Database/README.md). The `ArangoDbModule.register()` takes `options` object as an argument, [read more](https://github.com/arangodb/arangojs/blob/master/docs/Drivers/JS/Reference/Database/README.md).

## Support

Lina is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.awesomegql.com/support).

## Stay in touch

* Website - [https://awesomegql.com](https://awesomegql.com/)
* Twitter - [@linaframeworkframework](https://twitter.com/nestframework)

## License

Awesome-Graphql-Space is [MIT licensed](LICENSE).

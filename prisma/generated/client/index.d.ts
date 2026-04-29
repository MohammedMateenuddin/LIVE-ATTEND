
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model AttendanceRecord
 * 
 */
export type AttendanceRecord = $Result.DefaultSelection<Prisma.$AttendanceRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.attendanceRecord`: Exposes CRUD operations for the **AttendanceRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttendanceRecords
    * const attendanceRecords = await prisma.attendanceRecord.findMany()
    * ```
    */
  get attendanceRecord(): Prisma.AttendanceRecordDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Session: 'Session',
    AttendanceRecord: 'AttendanceRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "session" | "attendanceRecord"
      txIsolationLevel: never
    }
    model: {
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SessionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SessionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      AttendanceRecord: {
        payload: Prisma.$AttendanceRecordPayload<ExtArgs>
        fields: Prisma.AttendanceRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findFirst: {
            args: Prisma.AttendanceRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findMany: {
            args: Prisma.AttendanceRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          create: {
            args: Prisma.AttendanceRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          createMany: {
            args: Prisma.AttendanceRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AttendanceRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          update: {
            args: Prisma.AttendanceRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          deleteMany: {
            args: Prisma.AttendanceRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          aggregate: {
            args: Prisma.AttendanceRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendanceRecord>
          }
          groupBy: {
            args: Prisma.AttendanceRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AttendanceRecordFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AttendanceRecordAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AttendanceRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    attendees: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendees?: boolean | SessionCountOutputTypeCountAttendeesArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountAttendeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type SessionSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    professorName: string | null
    courseCode: string | null
    createdAt: Date | null
    isActive: boolean | null
    expiresAt: Date | null
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    professorName: string | null
    courseCode: string | null
    createdAt: Date | null
    isActive: boolean | null
    expiresAt: Date | null
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    professorName: number
    courseCode: number
    createdAt: number
    isActive: number
    expiresAt: number
    latitude: number
    longitude: number
    radius: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type SessionSumAggregateInputType = {
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    professorName?: true
    courseCode?: true
    createdAt?: true
    isActive?: true
    expiresAt?: true
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    professorName?: true
    courseCode?: true
    createdAt?: true
    isActive?: true
    expiresAt?: true
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    professorName?: true
    courseCode?: true
    createdAt?: true
    isActive?: true
    expiresAt?: true
    latitude?: true
    longitude?: true
    radius?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    professorName: string
    courseCode: string
    createdAt: Date
    isActive: boolean
    expiresAt: Date | null
    latitude: number
    longitude: number
    radius: number
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professorName?: boolean
    courseCode?: boolean
    createdAt?: boolean
    isActive?: boolean
    expiresAt?: boolean
    latitude?: boolean
    longitude?: boolean
    radius?: boolean
    attendees?: boolean | Session$attendeesArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>


  export type SessionSelectScalar = {
    id?: boolean
    professorName?: boolean
    courseCode?: boolean
    createdAt?: boolean
    isActive?: boolean
    expiresAt?: boolean
    latitude?: boolean
    longitude?: boolean
    radius?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendees?: boolean | Session$attendeesArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      attendees: Prisma.$AttendanceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professorName: string
      courseCode: string
      createdAt: Date
      isActive: boolean
      expiresAt: Date | null
      latitude: number
      longitude: number
      radius: number
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * @param {SessionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const session = await prisma.session.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: SessionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Session.
     * @param {SessionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const session = await prisma.session.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SessionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendees<T extends Session$attendeesArgs<ExtArgs> = {}>(args?: Subset<T, Session$attendeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly professorName: FieldRef<"Session", 'String'>
    readonly courseCode: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly isActive: FieldRef<"Session", 'Boolean'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly latitude: FieldRef<"Session", 'Float'>
    readonly longitude: FieldRef<"Session", 'Float'>
    readonly radius: FieldRef<"Session", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session findRaw
   */
  export type SessionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Session aggregateRaw
   */
  export type SessionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Session.attendees
   */
  export type Session$attendeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    cursor?: AttendanceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model AttendanceRecord
   */

  export type AggregateAttendanceRecord = {
    _count: AttendanceRecordCountAggregateOutputType | null
    _avg: AttendanceRecordAvgAggregateOutputType | null
    _sum: AttendanceRecordSumAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  export type AttendanceRecordAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type AttendanceRecordSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type AttendanceRecordMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    studentName: string | null
    rollNumber: string | null
    timestamp: Date | null
    latitude: number | null
    longitude: number | null
    deviceFingerprint: string | null
  }

  export type AttendanceRecordMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    studentName: string | null
    rollNumber: string | null
    timestamp: Date | null
    latitude: number | null
    longitude: number | null
    deviceFingerprint: string | null
  }

  export type AttendanceRecordCountAggregateOutputType = {
    id: number
    sessionId: number
    studentName: number
    rollNumber: number
    timestamp: number
    latitude: number
    longitude: number
    deviceFingerprint: number
    _all: number
  }


  export type AttendanceRecordAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type AttendanceRecordSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type AttendanceRecordMinAggregateInputType = {
    id?: true
    sessionId?: true
    studentName?: true
    rollNumber?: true
    timestamp?: true
    latitude?: true
    longitude?: true
    deviceFingerprint?: true
  }

  export type AttendanceRecordMaxAggregateInputType = {
    id?: true
    sessionId?: true
    studentName?: true
    rollNumber?: true
    timestamp?: true
    latitude?: true
    longitude?: true
    deviceFingerprint?: true
  }

  export type AttendanceRecordCountAggregateInputType = {
    id?: true
    sessionId?: true
    studentName?: true
    rollNumber?: true
    timestamp?: true
    latitude?: true
    longitude?: true
    deviceFingerprint?: true
    _all?: true
  }

  export type AttendanceRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecord to aggregate.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttendanceRecords
    **/
    _count?: true | AttendanceRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type GetAttendanceRecordAggregateType<T extends AttendanceRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendanceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendanceRecord[P]>
      : GetScalarType<T[P], AggregateAttendanceRecord[P]>
  }




  export type AttendanceRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithAggregationInput | AttendanceRecordOrderByWithAggregationInput[]
    by: AttendanceRecordScalarFieldEnum[] | AttendanceRecordScalarFieldEnum
    having?: AttendanceRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceRecordCountAggregateInputType | true
    _avg?: AttendanceRecordAvgAggregateInputType
    _sum?: AttendanceRecordSumAggregateInputType
    _min?: AttendanceRecordMinAggregateInputType
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type AttendanceRecordGroupByOutputType = {
    id: string
    sessionId: string
    studentName: string
    rollNumber: string
    timestamp: Date
    latitude: number | null
    longitude: number | null
    deviceFingerprint: string | null
    _count: AttendanceRecordCountAggregateOutputType | null
    _avg: AttendanceRecordAvgAggregateOutputType | null
    _sum: AttendanceRecordSumAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  type GetAttendanceRecordGroupByPayload<T extends AttendanceRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    studentName?: boolean
    rollNumber?: boolean
    timestamp?: boolean
    latitude?: boolean
    longitude?: boolean
    deviceFingerprint?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>


  export type AttendanceRecordSelectScalar = {
    id?: boolean
    sessionId?: boolean
    studentName?: boolean
    rollNumber?: boolean
    timestamp?: boolean
    latitude?: boolean
    longitude?: boolean
    deviceFingerprint?: boolean
  }

  export type AttendanceRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $AttendanceRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttendanceRecord"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      studentName: string
      rollNumber: string
      timestamp: Date
      latitude: number | null
      longitude: number | null
      deviceFingerprint: string | null
    }, ExtArgs["result"]["attendanceRecord"]>
    composites: {}
  }

  type AttendanceRecordGetPayload<S extends boolean | null | undefined | AttendanceRecordDefaultArgs> = $Result.GetResult<Prisma.$AttendanceRecordPayload, S>

  type AttendanceRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AttendanceRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AttendanceRecordCountAggregateInputType | true
    }

  export interface AttendanceRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttendanceRecord'], meta: { name: 'AttendanceRecord' } }
    /**
     * Find zero or one AttendanceRecord that matches the filter.
     * @param {AttendanceRecordFindUniqueArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceRecordFindUniqueArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AttendanceRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AttendanceRecordFindUniqueOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AttendanceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceRecordFindFirstArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AttendanceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AttendanceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany()
     * 
     * // Get first 10 AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceRecordFindManyArgs>(args?: SelectSubset<T, AttendanceRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AttendanceRecord.
     * @param {AttendanceRecordCreateArgs} args - Arguments to create a AttendanceRecord.
     * @example
     * // Create one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.create({
     *   data: {
     *     // ... data to create a AttendanceRecord
     *   }
     * })
     * 
     */
    create<T extends AttendanceRecordCreateArgs>(args: SelectSubset<T, AttendanceRecordCreateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AttendanceRecords.
     * @param {AttendanceRecordCreateManyArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceRecordCreateManyArgs>(args?: SelectSubset<T, AttendanceRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AttendanceRecord.
     * @param {AttendanceRecordDeleteArgs} args - Arguments to delete one AttendanceRecord.
     * @example
     * // Delete one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.delete({
     *   where: {
     *     // ... filter to delete one AttendanceRecord
     *   }
     * })
     * 
     */
    delete<T extends AttendanceRecordDeleteArgs>(args: SelectSubset<T, AttendanceRecordDeleteArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AttendanceRecord.
     * @param {AttendanceRecordUpdateArgs} args - Arguments to update one AttendanceRecord.
     * @example
     * // Update one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceRecordUpdateArgs>(args: SelectSubset<T, AttendanceRecordUpdateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AttendanceRecords.
     * @param {AttendanceRecordDeleteManyArgs} args - Arguments to filter AttendanceRecords to delete.
     * @example
     * // Delete a few AttendanceRecords
     * const { count } = await prisma.attendanceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceRecordDeleteManyArgs>(args?: SelectSubset<T, AttendanceRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceRecordUpdateManyArgs>(args: SelectSubset<T, AttendanceRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AttendanceRecord.
     * @param {AttendanceRecordUpsertArgs} args - Arguments to update or create a AttendanceRecord.
     * @example
     * // Update or create a AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.upsert({
     *   create: {
     *     // ... data to create a AttendanceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttendanceRecord we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceRecordUpsertArgs>(args: SelectSubset<T, AttendanceRecordUpsertArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more AttendanceRecords that matches the filter.
     * @param {AttendanceRecordFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const attendanceRecord = await prisma.attendanceRecord.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: AttendanceRecordFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a AttendanceRecord.
     * @param {AttendanceRecordAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const attendanceRecord = await prisma.attendanceRecord.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AttendanceRecordAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordCountArgs} args - Arguments to filter AttendanceRecords to count.
     * @example
     * // Count the number of AttendanceRecords
     * const count = await prisma.attendanceRecord.count({
     *   where: {
     *     // ... the filter for the AttendanceRecords we want to count
     *   }
     * })
    **/
    count<T extends AttendanceRecordCountArgs>(
      args?: Subset<T, AttendanceRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceRecordAggregateArgs>(args: Subset<T, AttendanceRecordAggregateArgs>): Prisma.PrismaPromise<GetAttendanceRecordAggregateType<T>>

    /**
     * Group by AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceRecordGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttendanceRecord model
   */
  readonly fields: AttendanceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttendanceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AttendanceRecord model
   */ 
  interface AttendanceRecordFieldRefs {
    readonly id: FieldRef<"AttendanceRecord", 'String'>
    readonly sessionId: FieldRef<"AttendanceRecord", 'String'>
    readonly studentName: FieldRef<"AttendanceRecord", 'String'>
    readonly rollNumber: FieldRef<"AttendanceRecord", 'String'>
    readonly timestamp: FieldRef<"AttendanceRecord", 'DateTime'>
    readonly latitude: FieldRef<"AttendanceRecord", 'Float'>
    readonly longitude: FieldRef<"AttendanceRecord", 'Float'>
    readonly deviceFingerprint: FieldRef<"AttendanceRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AttendanceRecord findUnique
   */
  export type AttendanceRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findUniqueOrThrow
   */
  export type AttendanceRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findFirst
   */
  export type AttendanceRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findFirstOrThrow
   */
  export type AttendanceRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findMany
   */
  export type AttendanceRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecords to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord create
   */
  export type AttendanceRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a AttendanceRecord.
     */
    data: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
  }

  /**
   * AttendanceRecord createMany
   */
  export type AttendanceRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[]
  }

  /**
   * AttendanceRecord update
   */
  export type AttendanceRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a AttendanceRecord.
     */
    data: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
    /**
     * Choose, which AttendanceRecord to update.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord updateMany
   */
  export type AttendanceRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput
  }

  /**
   * AttendanceRecord upsert
   */
  export type AttendanceRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the AttendanceRecord to update in case it exists.
     */
    where: AttendanceRecordWhereUniqueInput
    /**
     * In case the AttendanceRecord found by the `where` argument doesn't exist, create a new AttendanceRecord with this data.
     */
    create: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
    /**
     * In case the AttendanceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
  }

  /**
   * AttendanceRecord delete
   */
  export type AttendanceRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter which AttendanceRecord to delete.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord deleteMany
   */
  export type AttendanceRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecords to delete
     */
    where?: AttendanceRecordWhereInput
  }

  /**
   * AttendanceRecord findRaw
   */
  export type AttendanceRecordFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AttendanceRecord aggregateRaw
   */
  export type AttendanceRecordAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AttendanceRecord without action
   */
  export type AttendanceRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const SessionScalarFieldEnum: {
    id: 'id',
    professorName: 'professorName',
    courseCode: 'courseCode',
    createdAt: 'createdAt',
    isActive: 'isActive',
    expiresAt: 'expiresAt',
    latitude: 'latitude',
    longitude: 'longitude',
    radius: 'radius'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AttendanceRecordScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    studentName: 'studentName',
    rollNumber: 'rollNumber',
    timestamp: 'timestamp',
    latitude: 'latitude',
    longitude: 'longitude',
    deviceFingerprint: 'deviceFingerprint'
  };

  export type AttendanceRecordScalarFieldEnum = (typeof AttendanceRecordScalarFieldEnum)[keyof typeof AttendanceRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    professorName?: StringFilter<"Session"> | string
    courseCode?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    isActive?: BoolFilter<"Session"> | boolean
    expiresAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    latitude?: FloatFilter<"Session"> | number
    longitude?: FloatFilter<"Session"> | number
    radius?: FloatFilter<"Session"> | number
    attendees?: AttendanceRecordListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    professorName?: SortOrder
    courseCode?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    attendees?: AttendanceRecordOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    professorName?: StringFilter<"Session"> | string
    courseCode?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    isActive?: BoolFilter<"Session"> | boolean
    expiresAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    latitude?: FloatFilter<"Session"> | number
    longitude?: FloatFilter<"Session"> | number
    radius?: FloatFilter<"Session"> | number
    attendees?: AttendanceRecordListRelationFilter
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    professorName?: SortOrder
    courseCode?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    professorName?: StringWithAggregatesFilter<"Session"> | string
    courseCode?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Session"> | boolean
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    latitude?: FloatWithAggregatesFilter<"Session"> | number
    longitude?: FloatWithAggregatesFilter<"Session"> | number
    radius?: FloatWithAggregatesFilter<"Session"> | number
  }

  export type AttendanceRecordWhereInput = {
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    sessionId?: StringFilter<"AttendanceRecord"> | string
    studentName?: StringFilter<"AttendanceRecord"> | string
    rollNumber?: StringFilter<"AttendanceRecord"> | string
    timestamp?: DateTimeFilter<"AttendanceRecord"> | Date | string
    latitude?: FloatNullableFilter<"AttendanceRecord"> | number | null
    longitude?: FloatNullableFilter<"AttendanceRecord"> | number | null
    deviceFingerprint?: StringNullableFilter<"AttendanceRecord"> | string | null
    session?: XOR<SessionRelationFilter, SessionWhereInput>
  }

  export type AttendanceRecordOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    studentName?: SortOrder
    rollNumber?: SortOrder
    timestamp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deviceFingerprint?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type AttendanceRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId_rollNumber?: AttendanceRecordSessionIdRollNumberCompoundUniqueInput
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    sessionId?: StringFilter<"AttendanceRecord"> | string
    studentName?: StringFilter<"AttendanceRecord"> | string
    rollNumber?: StringFilter<"AttendanceRecord"> | string
    timestamp?: DateTimeFilter<"AttendanceRecord"> | Date | string
    latitude?: FloatNullableFilter<"AttendanceRecord"> | number | null
    longitude?: FloatNullableFilter<"AttendanceRecord"> | number | null
    deviceFingerprint?: StringNullableFilter<"AttendanceRecord"> | string | null
    session?: XOR<SessionRelationFilter, SessionWhereInput>
  }, "id" | "sessionId_rollNumber">

  export type AttendanceRecordOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    studentName?: SortOrder
    rollNumber?: SortOrder
    timestamp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deviceFingerprint?: SortOrder
    _count?: AttendanceRecordCountOrderByAggregateInput
    _avg?: AttendanceRecordAvgOrderByAggregateInput
    _max?: AttendanceRecordMaxOrderByAggregateInput
    _min?: AttendanceRecordMinOrderByAggregateInput
    _sum?: AttendanceRecordSumOrderByAggregateInput
  }

  export type AttendanceRecordScalarWhereWithAggregatesInput = {
    AND?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    OR?: AttendanceRecordScalarWhereWithAggregatesInput[]
    NOT?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    sessionId?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    studentName?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    rollNumber?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AttendanceRecord"> | Date | string
    latitude?: FloatNullableWithAggregatesFilter<"AttendanceRecord"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"AttendanceRecord"> | number | null
    deviceFingerprint?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
  }

  export type SessionCreateInput = {
    id?: string
    professorName: string
    courseCode: string
    createdAt?: Date | string
    isActive?: boolean
    expiresAt?: Date | string | null
    latitude: number
    longitude: number
    radius?: number
    attendees?: AttendanceRecordCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    professorName: string
    courseCode: string
    createdAt?: Date | string
    isActive?: boolean
    expiresAt?: Date | string | null
    latitude: number
    longitude: number
    radius?: number
    attendees?: AttendanceRecordUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    professorName?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: FloatFieldUpdateOperationsInput | number
    attendees?: AttendanceRecordUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    professorName?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: FloatFieldUpdateOperationsInput | number
    attendees?: AttendanceRecordUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    professorName: string
    courseCode: string
    createdAt?: Date | string
    isActive?: boolean
    expiresAt?: Date | string | null
    latitude: number
    longitude: number
    radius?: number
  }

  export type SessionUpdateManyMutationInput = {
    professorName?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: FloatFieldUpdateOperationsInput | number
  }

  export type SessionUncheckedUpdateManyInput = {
    professorName?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: FloatFieldUpdateOperationsInput | number
  }

  export type AttendanceRecordCreateInput = {
    id?: string
    studentName: string
    rollNumber: string
    timestamp?: Date | string
    latitude?: number | null
    longitude?: number | null
    deviceFingerprint?: string | null
    session: SessionCreateNestedOneWithoutAttendeesInput
  }

  export type AttendanceRecordUncheckedCreateInput = {
    id?: string
    sessionId: string
    studentName: string
    rollNumber: string
    timestamp?: Date | string
    latitude?: number | null
    longitude?: number | null
    deviceFingerprint?: string | null
  }

  export type AttendanceRecordUpdateInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    rollNumber?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    session?: SessionUpdateOneRequiredWithoutAttendeesNestedInput
  }

  export type AttendanceRecordUncheckedUpdateInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    rollNumber?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceRecordCreateManyInput = {
    id?: string
    sessionId: string
    studentName: string
    rollNumber: string
    timestamp?: Date | string
    latitude?: number | null
    longitude?: number | null
    deviceFingerprint?: string | null
  }

  export type AttendanceRecordUpdateManyMutationInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    rollNumber?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceRecordUncheckedUpdateManyInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    rollNumber?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AttendanceRecordListRelationFilter = {
    every?: AttendanceRecordWhereInput
    some?: AttendanceRecordWhereInput
    none?: AttendanceRecordWhereInput
  }

  export type AttendanceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    professorName?: SortOrder
    courseCode?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    professorName?: SortOrder
    courseCode?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    professorName?: SortOrder
    courseCode?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type SessionRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type AttendanceRecordSessionIdRollNumberCompoundUniqueInput = {
    sessionId: string
    rollNumber: string
  }

  export type AttendanceRecordCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    studentName?: SortOrder
    rollNumber?: SortOrder
    timestamp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deviceFingerprint?: SortOrder
  }

  export type AttendanceRecordAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type AttendanceRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    studentName?: SortOrder
    rollNumber?: SortOrder
    timestamp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deviceFingerprint?: SortOrder
  }

  export type AttendanceRecordMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    studentName?: SortOrder
    rollNumber?: SortOrder
    timestamp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deviceFingerprint?: SortOrder
  }

  export type AttendanceRecordSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type AttendanceRecordCreateNestedManyWithoutSessionInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type AttendanceRecordUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AttendanceRecordUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput | AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput | AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutSessionInput | AttendanceRecordUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput | AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput | AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutSessionInput | AttendanceRecordUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutAttendeesInput = {
    create?: XOR<SessionCreateWithoutAttendeesInput, SessionUncheckedCreateWithoutAttendeesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutAttendeesInput
    connect?: SessionWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type SessionUpdateOneRequiredWithoutAttendeesNestedInput = {
    create?: XOR<SessionCreateWithoutAttendeesInput, SessionUncheckedCreateWithoutAttendeesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutAttendeesInput
    upsert?: SessionUpsertWithoutAttendeesInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutAttendeesInput, SessionUpdateWithoutAttendeesInput>, SessionUncheckedUpdateWithoutAttendeesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type AttendanceRecordCreateWithoutSessionInput = {
    id?: string
    studentName: string
    rollNumber: string
    timestamp?: Date | string
    latitude?: number | null
    longitude?: number | null
    deviceFingerprint?: string | null
  }

  export type AttendanceRecordUncheckedCreateWithoutSessionInput = {
    id?: string
    studentName: string
    rollNumber: string
    timestamp?: Date | string
    latitude?: number | null
    longitude?: number | null
    deviceFingerprint?: string | null
  }

  export type AttendanceRecordCreateOrConnectWithoutSessionInput = {
    where: AttendanceRecordWhereUniqueInput
    create: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput>
  }

  export type AttendanceRecordCreateManySessionInputEnvelope = {
    data: AttendanceRecordCreateManySessionInput | AttendanceRecordCreateManySessionInput[]
  }

  export type AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput = {
    where: AttendanceRecordWhereUniqueInput
    update: XOR<AttendanceRecordUpdateWithoutSessionInput, AttendanceRecordUncheckedUpdateWithoutSessionInput>
    create: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput>
  }

  export type AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput = {
    where: AttendanceRecordWhereUniqueInput
    data: XOR<AttendanceRecordUpdateWithoutSessionInput, AttendanceRecordUncheckedUpdateWithoutSessionInput>
  }

  export type AttendanceRecordUpdateManyWithWhereWithoutSessionInput = {
    where: AttendanceRecordScalarWhereInput
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyWithoutSessionInput>
  }

  export type AttendanceRecordScalarWhereInput = {
    AND?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    OR?: AttendanceRecordScalarWhereInput[]
    NOT?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    sessionId?: StringFilter<"AttendanceRecord"> | string
    studentName?: StringFilter<"AttendanceRecord"> | string
    rollNumber?: StringFilter<"AttendanceRecord"> | string
    timestamp?: DateTimeFilter<"AttendanceRecord"> | Date | string
    latitude?: FloatNullableFilter<"AttendanceRecord"> | number | null
    longitude?: FloatNullableFilter<"AttendanceRecord"> | number | null
    deviceFingerprint?: StringNullableFilter<"AttendanceRecord"> | string | null
  }

  export type SessionCreateWithoutAttendeesInput = {
    id?: string
    professorName: string
    courseCode: string
    createdAt?: Date | string
    isActive?: boolean
    expiresAt?: Date | string | null
    latitude: number
    longitude: number
    radius?: number
  }

  export type SessionUncheckedCreateWithoutAttendeesInput = {
    id?: string
    professorName: string
    courseCode: string
    createdAt?: Date | string
    isActive?: boolean
    expiresAt?: Date | string | null
    latitude: number
    longitude: number
    radius?: number
  }

  export type SessionCreateOrConnectWithoutAttendeesInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutAttendeesInput, SessionUncheckedCreateWithoutAttendeesInput>
  }

  export type SessionUpsertWithoutAttendeesInput = {
    update: XOR<SessionUpdateWithoutAttendeesInput, SessionUncheckedUpdateWithoutAttendeesInput>
    create: XOR<SessionCreateWithoutAttendeesInput, SessionUncheckedCreateWithoutAttendeesInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutAttendeesInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutAttendeesInput, SessionUncheckedUpdateWithoutAttendeesInput>
  }

  export type SessionUpdateWithoutAttendeesInput = {
    professorName?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: FloatFieldUpdateOperationsInput | number
  }

  export type SessionUncheckedUpdateWithoutAttendeesInput = {
    professorName?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: FloatFieldUpdateOperationsInput | number
  }

  export type AttendanceRecordCreateManySessionInput = {
    id?: string
    studentName: string
    rollNumber: string
    timestamp?: Date | string
    latitude?: number | null
    longitude?: number | null
    deviceFingerprint?: string | null
  }

  export type AttendanceRecordUpdateWithoutSessionInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    rollNumber?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceRecordUncheckedUpdateWithoutSessionInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    rollNumber?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutSessionInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    rollNumber?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use SessionCountOutputTypeDefaultArgs instead
     */
    export type SessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AttendanceRecordDefaultArgs instead
     */
    export type AttendanceRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AttendanceRecordDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
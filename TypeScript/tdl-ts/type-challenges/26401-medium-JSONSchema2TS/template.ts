type JSONItem = {
  type: any,
  enum?: unknown[],
  items?: JSONItem,
  properties?: {
    [index: string]: JSONItem
  }
  required?: string[]
}

type PMap = {
  'string': string,
  'number': number,
  'boolean': boolean
}

// primitive and +enum
// T['enum'] extends unknown[] 
// ? T['enum'][number] 
// : PMap[T['type']]

// {
//   [p in keyof T['properties']]: JSONSchema2TS<T['properties'][p]>
// }

// type JSONSchema2TS<T extends JSONItem> =
//   T['type'] extends 'object'
//   ? 'properties' extends keyof T
//   ? {} extends T['properties']
//   ? {}
//   : {
//     [p in keyof T['properties']]?:
//     T['properties'][p] extends JSONItem
//     ? JSONSchema2TS<T['properties'][p]>
//     : Record<string, any>
//   }
//   : Record<string, unknown>
//   : T['type'] extends 'array'
//   ? {} extends T['items']
//   ? unknown[]
//   : T extends { type: string, items: JSONItem }
//   ? JSONSchema2TS<T['items']>[]
//   : never
//   : T['enum'] extends unknown[]
//   ? T['enum'][number]
//   : PMap[T['type']]

type RequiredByArr<T extends Record<string, any>, RequiredUnion extends PropertyKey> =
  {
    [K in keyof T as K extends RequiredUnion ? never : K]?: Exclude<T[K], undefined>
  } & {
    [K in RequiredUnion]-?: K extends keyof T ? Exclude<T[K], undefined> : never
  }

type o = { a?: string, b?: number, c?: boolean, d?: Record<string, any> }
type c = RequiredByArr<o, 'a' | 'b'>

type MyRequired<T extends Record<string, any>, RequiredUnion extends keyof T> = {
  [K in keyof T as K extends RequiredUnion ? never : K]: T[K]
} & Required<Pick<T, RequiredUnion>>

type t = { a?: number | undefined, b?: string | undefined, c?: boolean }
// type t1 = MyRequired<t, 'b'>
// const a: t1 = { b: 'x' }

// MyRequired<{
//   [p in keyof T['properties']]:
//   T['properties'][p] extends JSONItem
//   ? JSONSchema2TS<T['properties'][p]>
//   : PMap[T['properties'][p]['type']]
// }, T['required'][number]>
//   : {
//   [p in keyof T['properties']] ?:
//     T['properties'][p] extends JSONItem
//       ? JSONSchema2TS<T['properties'][p]>
//       : Record<string, unknown>
// }

// 到这个版本，除了case14过不了，其他都过了，主要问题就是必选参数还带undefined
// type JSONSchema2TS<T extends JSONItem> =
//   T['type'] extends 'object'
//   ? 'properties' extends keyof T
//     ? {} extends T['properties']
//       ? {}
//       : T extends { type: string, properties: JSONItem, required: string[] }
//         ? MyRequired<{
//           [p in keyof T['properties']]:
//           T['properties'][p] extends JSONItem
//           ? JSONSchema2TS<T['properties'][p]>
//           : PMap[T['properties'][p]['type']]
//         }, T['required'][number]>
//         : {
//           [p in keyof T['properties']]?:
//           T['properties'][p] extends JSONItem
//           ? JSONSchema2TS<T['properties'][p]>
//           : Record<string, unknown>
//         }
//     : Record<string, unknown>
//   : T['type'] extends 'array'
//     ? {} extends T['items']
//       ? unknown[]
//       : T extends { type: string, items: JSONItem }
//         ? JSONSchema2TS<T['items']>[]
//         : never
//     : T['enum'] extends unknown[]
//       ? T['enum'][number]
//       : PMap[T['type']]

// [optimal solution]
type JSONSchema2TS<T extends JSONItem> =
  T['type'] extends 'object'
  ? T extends { properties: infer Properties extends Record<string, unknown> }
  ? T extends { required: infer Required extends unknown[] }
  ? Omit<
    {
      [K in Required[number] & keyof Properties]: Properties[K] extends JSONItem ? JSONSchema2TS<Properties[K]> : never
    } & {
      [K in Exclude<keyof Properties, Required[number]>]?: Properties[K] extends JSONItem ? JSONSchema2TS<Properties[K]> : never
    },
    never
  >
  : { [K in keyof Properties]?: Properties[K] extends JSONItem ? JSONSchema2TS<Properties[K]> : never }
  : Record<string, unknown>
  : T['type'] extends 'array'
  ? {} extends T['items']
  ? unknown[]
  : T extends { type: string, items: JSONItem }
  ? JSONSchema2TS<T['items']>[]
  : never
  : T['enum'] extends unknown[]
  ? T['enum'][number]
  : PMap[T['type']]

// reference: https://github.com/type-challenges/type-challenges/issues/26864

export { JSONSchema2TS };

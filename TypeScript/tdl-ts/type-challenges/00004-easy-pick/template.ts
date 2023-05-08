/* 第一次尝试，这种是不对的，没有考虑 K 是否是 T 的属性 */

// type MyPick<T, K> = {
// 	[key in keyof T as key extends K ? key : never]: T[key];
// };

/* 正解 */
type MyPick<T, K extends keyof T> = {
	[P in K]: T[P];
};

interface Todo {
	title: string;
	description: string;
	completed: boolean;
}
// type MyPickRes = MyPick<Todo, "title" | "completed" | "invalid">;
type MyPickRes = MyPick<Todo, "title" | "completed">;

interface userInfo {
	name: string;
	age: number;
}
type keyofValue = keyof userInfo;
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type res = IsUnion<keyofValue>;

type testKey = "title" | "completed" | "invalid";
// type testKey = "title" | "completed";
type K = testKey extends keyof Todo ? true : false;

export default MyPick;

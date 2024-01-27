const NOTHING: unique symbol = Symbol.for('immer-nothing');
type ValidRecipeReturnType<State> =
	| State
	| void
	| undefined
	| (State extends undefined ? typeof NOTHING : never);
export type Producer<T> = (draft: Draft<T>) => ValidRecipeReturnType<Draft<T>>;

export type WritableDraft<T> = { -readonly [K in keyof T]: Draft<T[K]> };

export type IfAvailable<T, Fallback = void> =
	// fallback if any
	true | false extends (T extends never ? true : false)
		? Fallback // fallback if empty type
		: keyof T extends never
			? Fallback // original type
			: T;

type WeakReferences =
	| IfAvailable<WeakMap<any, any>>
	| IfAvailable<WeakSet<any>>;

type PrimitiveType = number | string | boolean;

/** Object types that should never be mapped */
type AtomicObject = Function | Promise<any> | Date | RegExp;

/** Convert a readonly type into a mutable type, if possible */
export type Draft<T> = T extends PrimitiveType
	? T
	: T extends AtomicObject
		? T
		: T extends ReadonlyMap<infer K, infer V> // Map extends ReadonlyMap
			? Map<Draft<K>, Draft<V>>
			: T extends ReadonlySet<infer V> // Set extends ReadonlySet
				? Set<Draft<V>>
				: T extends WeakReferences
					? T
					: T extends object
						? WritableDraft<T>
						: T;

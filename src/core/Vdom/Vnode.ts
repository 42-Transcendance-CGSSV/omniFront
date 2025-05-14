export interface Vnode {
	/**
	 * The name of the component.
	 */
	name: string;
	/**
	 * The properties of the component.
	 */
	props: Record<string, any>;
	/**
	 * The children of the component.
	 */
	children?: Vnode[];
}

interface VNode {
	tag?: string;
	props?: Record<string, any>;
	children?: VNode[];
	text: string;
}

export default VNode;

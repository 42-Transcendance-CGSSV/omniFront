import { parse } from "@babel/parser";
import { File } from "@babel/types";

export interface TemplateNode {
	type: "Element" | "Text" | "Expression";
	name?: string;
	attributes?: Record<string, string | Expression>;
	children?: TemplateNode[];
	value?: string;
	expression?: string;
}

export interface Expression {
	type: "Expression";
	code: string;
}

export function transformBabelAstToTemplateNode(ast: File): TemplateNode {
	const traverseNode = (node: any): TemplateNode => {
		switch (node.type) {
			case "JSXElement":
				return {
					type: "Element",
					name: node.openingElement.name.name,
					attributes: node.openingElement.attributes.reduce(
						(acc: Record<string, string | Expression>, attr: any) => {
							if (attr.type === "JSXAttribute") {
								acc[attr.name.name] =
									attr.value?.type === "JSXExpressionContainer"
										? { type: "Expression", code: attr.value.expression.code }
										: attr.value?.value || "";
							}
							return acc;
						},
						{}
					),
					children: node.children.map(traverseNode),
				};
			case "JSXText":
				return {
					type: "Text",
					value: node.value.trim(),
				};
			case "JSXExpressionContainer":
				return {
					type: "Expression",
					expression: node.expression.code,
				};
			default:
				throw new Error(`Unsupported node type: ${node.type}`);
		}
	};

	return traverseNode(ast.program.body[0]);
}

export function parseTemplate(source: string): TemplateNode {
	/* Parse  */
	const ast = parse(source, {
		sourceType: "module",
		plugins: ["jsx", "typescript"],
		errorRecovery: true,
		tokens: true,
	});
	return transformBabelAstToTemplateNode(ast);
}

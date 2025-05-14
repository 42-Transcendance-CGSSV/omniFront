import { AComponent } from '../AComponent.js';


export class TextComponent extends AComponent {

	constructor(props: any) {
		super({ ...props, _tagname: 'div' })
	}
}

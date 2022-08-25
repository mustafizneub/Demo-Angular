import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'common'
})
export class CommonPipe implements PipeTransform {

	transform(value: unknown, ...args: unknown[]): unknown {
		return null;
	}

}

import { Directive, computed, input } from '@angular/core';
import type { ClassValue } from 'clsx';
import { hlm } from '../../../utils/src';

@Directive({
	selector: '[hlmCardDescription]',
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmCardDescription {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() => hlm('text-muted-foreground text-sm', this.userClass()));
}

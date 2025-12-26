import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-skeleton-card',
    imports: [SkeletonModule, Card, Divider],
    template: `
    <p-card class="w-72">
        <ng-template #header>
            <div class="p-4 h-20">
                <div class="flex justify-between gap-2">
                <div>
                    <p-skeleton width="10rem" class="mb-2" />
                    <p-skeleton height=".5rem" />
                </div>
                    <p-skeleton width="4rem" class="mb-2" />
                </div>
            </div>
        </ng-template>
    
        <p-skeleton width="100%" height="2.5rem" />

        <p-divider></p-divider>
        <div class="flex items-center justify-between text-surface-600">
                <p-skeleton width="4rem" height="2rem" />
                <p-skeleton width="4rem" height="2rem" />
        </div>
    </p-card>
    `,
})
export class SkeletonCardComponent {}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export type PageableParams = {
    size: number;
    page: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
};

export type PageableResponse<R> = {
    pageNumber: number;
    pageSize: number;
    content: R[];
    totalPages: number;
    totalElements: number;
};

export abstract class Service {
    http = inject(HttpClient);
    managerUrl = `${environment.managerUrl}/api/sensors`;

    parsePageableParams = (pageable: PageableParams): HttpParams => {
        const params = new HttpParams()
            .append('size', pageable.size)
            .append('page', pageable.page);

        if (pageable.sortField) {
            params.append(
                'sort',
                this.parseSort(
                    pageable.sortField,
                    pageable.sortOrder ?? 'desc',
                ),
            );
        }
        return params;
    };

    private parseSort = (sortField: string, sortOrder: 'asc' | 'desc') =>
        `${sortField},${sortOrder}`;
}

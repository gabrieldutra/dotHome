import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DataComponent } from './data.component';
import { DataDetailComponent } from './data-detail.component';
import { DataPopupComponent } from './data-dialog.component';
import { DataDeletePopupComponent } from './data-delete-dialog.component';

@Injectable()
export class DataResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const dataRoute: Routes = [
    {
        path: 'data',
        component: DataComponent,
        resolve: {
            'pagingParams': DataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dotHomeApp.data.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data/:id',
        component: DataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dotHomeApp.data.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataPopupRoute: Routes = [
    {
        path: 'data-new',
        component: DataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dotHomeApp.data.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data/:id/edit',
        component: DataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dotHomeApp.data.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data/:id/delete',
        component: DataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dotHomeApp.data.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DotHomeSharedModule } from '../../shared';
import {
    DataService,
    DataPopupService,
    DataComponent,
    DataDetailComponent,
    DataDialogComponent,
    DataPopupComponent,
    DataDeletePopupComponent,
    DataDeleteDialogComponent,
    dataRoute,
    dataPopupRoute,
    DataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dataRoute,
    ...dataPopupRoute,
];

@NgModule({
    imports: [
        DotHomeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataComponent,
        DataDetailComponent,
        DataDialogComponent,
        DataDeleteDialogComponent,
        DataPopupComponent,
        DataDeletePopupComponent,
    ],
    entryComponents: [
        DataComponent,
        DataDialogComponent,
        DataPopupComponent,
        DataDeleteDialogComponent,
        DataDeletePopupComponent,
    ],
    providers: [
        DataService,
        DataPopupService,
        DataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DotHomeDataModule {}

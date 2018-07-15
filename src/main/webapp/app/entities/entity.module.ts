import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DotHomeDataModule } from './data/data.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DotHomeDataModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DotHomeEntityModule {}

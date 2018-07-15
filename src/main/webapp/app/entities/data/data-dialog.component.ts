import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Data } from './data.model';
import { DataPopupService } from './data-popup.service';
import { DataService } from './data.service';

@Component({
    selector: 'jhi-data-dialog',
    templateUrl: './data-dialog.component.html'
})
export class DataDialogComponent implements OnInit {

    data: Data;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataService: DataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.data.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataService.update(this.data));
        } else {
            this.subscribeToSaveResponse(
                this.dataService.create(this.data));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Data>>) {
        result.subscribe((res: HttpResponse<Data>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Data) {
        this.eventManager.broadcast({ name: 'dataListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-data-popup',
    template: ''
})
export class DataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataPopupService: DataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataPopupService
                    .open(DataDialogComponent as Component, params['id']);
            } else {
                this.dataPopupService
                    .open(DataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

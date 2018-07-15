import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Data } from './data.model';
import { DataPopupService } from './data-popup.service';
import { DataService } from './data.service';

@Component({
    selector: 'jhi-data-delete-dialog',
    templateUrl: './data-delete-dialog.component.html'
})
export class DataDeleteDialogComponent {

    data: Data;

    constructor(
        private dataService: DataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataListModification',
                content: 'Deleted an data'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-delete-popup',
    template: ''
})
export class DataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataPopupService: DataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataPopupService
                .open(DataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Data } from './data.model';
import { DataService } from './data.service';

@Component({
    selector: 'jhi-data-detail',
    templateUrl: './data-detail.component.html'
})
export class DataDetailComponent implements OnInit, OnDestroy {

    data: Data;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataService: DataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInData();
    }

    load(id) {
        this.dataService.find(id)
            .subscribe((dataResponse: HttpResponse<Data>) => {
                this.data = dataResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInData() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataListModification',
            (response) => this.load(this.data.id)
        );
    }
}

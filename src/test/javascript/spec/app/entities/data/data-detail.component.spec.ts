/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DotHomeTestModule } from '../../../test.module';
import { DataDetailComponent } from '../../../../../../main/webapp/app/entities/data/data-detail.component';
import { DataService } from '../../../../../../main/webapp/app/entities/data/data.service';
import { Data } from '../../../../../../main/webapp/app/entities/data/data.model';

describe('Component Tests', () => {

    describe('Data Management Detail Component', () => {
        let comp: DataDetailComponent;
        let fixture: ComponentFixture<DataDetailComponent>;
        let service: DataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DotHomeTestModule],
                declarations: [DataDetailComponent],
                providers: [
                    DataService
                ]
            })
            .overrideTemplate(DataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Data(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.data).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

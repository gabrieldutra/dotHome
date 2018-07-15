/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DotHomeTestModule } from '../../../test.module';
import { DataComponent } from '../../../../../../main/webapp/app/entities/data/data.component';
import { DataService } from '../../../../../../main/webapp/app/entities/data/data.service';
import { Data } from '../../../../../../main/webapp/app/entities/data/data.model';

describe('Component Tests', () => {

    describe('Data Management Component', () => {
        let comp: DataComponent;
        let fixture: ComponentFixture<DataComponent>;
        let service: DataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DotHomeTestModule],
                declarations: [DataComponent],
                providers: [
                    DataService
                ]
            })
            .overrideTemplate(DataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Data(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.data[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

import { inject, TestBed } from '@angular/core/testing';

import { NgxSmartModalService } from './../../index';

describe('NgxSmartModalService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NgxSmartModalService
            ]
        });
    });

    it('should be calculate the sum',
        inject([NgxSmartModalService],
            (ngxSmartModalService: NgxSmartModalService) => {
                expect(1).toEqual(1);
            })
    );

});

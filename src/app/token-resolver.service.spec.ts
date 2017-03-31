/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenResolverService } from './token-resolver.service';

describe('Service: TokenResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenResolverService]
    });
  });

  it('should ...', inject([TokenResolverService], (service: TokenResolverService) => {
    expect(service).toBeTruthy();
  }));
});

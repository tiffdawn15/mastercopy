import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

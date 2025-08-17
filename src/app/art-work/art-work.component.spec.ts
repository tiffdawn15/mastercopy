import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorkComponent } from './art-work.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtWorkComponent', () => {
  let component: ArtWorkComponent;
  let fixture: ComponentFixture<ArtWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ArtWorkComponent,
        ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
    
    fixture = TestBed.createComponent(ArtWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

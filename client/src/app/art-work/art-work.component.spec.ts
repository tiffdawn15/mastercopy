import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorkComponent } from './art-work.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('ArtWorkComponent', () => {
  let component: ArtWorkComponent;
  let fixture: ComponentFixture<ArtWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtWorkComponent, 
        HttpClientModule, 
        RouterModule.forRoot([])
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(ArtWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

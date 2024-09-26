import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureBoardComponent } from './picture-board.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('PictureBoardComponent', () => {
  let component: PictureBoardComponent;
  let fixture: ComponentFixture<PictureBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PictureBoardComponent,
        HttpClientModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PictureBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

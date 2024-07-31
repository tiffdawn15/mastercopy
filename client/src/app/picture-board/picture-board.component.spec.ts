import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureBoardComponent } from './picture-board.component';

describe('PictureBoardComponent', () => {
  let component: PictureBoardComponent;
  let fixture: ComponentFixture<PictureBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PictureBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTestComponent } from './client-test.component';

describe('ClientTestComponent', () => {
  let component: ClientTestComponent;
  let fixture: ComponentFixture<ClientTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

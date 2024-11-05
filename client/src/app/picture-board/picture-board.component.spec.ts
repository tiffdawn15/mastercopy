import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Photo, PictureBoardComponent } from './picture-board.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('PictureBoardComponent', () => {
  let component: PictureBoardComponent;
  let fixture: ComponentFixture<PictureBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        PictureBoardComponent,
        HttpClientModule,
        MatPaginatorModule,
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

  it('should handle page events', () => {
    spyOn(component, 'handlePageEvent');

    const paginator = fixture.debugElement.query(
      By.css('mat-paginator')
    ).componentInstance;
    paginator.page.emit({ pageIndex: 1, pageSize: 10, length: 50 });

    fixture.detectChanges();

    expect(component.handlePageEvent).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 10,
      length: 50,
    });
  });

  it('should have correct initial paginator settings', () => {
    const paginator = fixture.debugElement.query(
      By.css('mat-paginator')
    ).componentInstance;

    expect(paginator.length).toBe(component.length);
    expect(paginator.pageSize).toBe(component.page.limit);
    expect(paginator.disabled).toBe(component.disabled);
    expect(paginator.showFirstLastButtons).toBe(component.showFirstLastButtons);
    expect(paginator.pageSizeOptions).toEqual(
      component.showPageSizeOptions ? component.pageSizeOptions : []
    );
    expect(paginator.hidePageSize).toBe(component.hidePageSize);
    expect(paginator.pageIndex).toBe(component.page.page);
  });

  it('should get Images', () => {
    spyOn(component, 'getImages').and.callThrough();
    const page = {
      page: 0,
      limit: 25,
    };
    component.getImages(page);
    expect(component.getImages).toHaveBeenCalled();
  });

  it('should render data correctly', () => {
    // Assuming data is stored in a property called items
    const photo: Photo = {
      id: 0,
      url: 'url',
      title: 'title',
    };
    component.images = [photo];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.image-container').length).toBe(1);
  });

  // TODO TIFF: Update these unit tests

  // it('should handle errors gracefully', () => {
  //   // Assuming handleError is a method that handles errors
  //   spyOn(component, 'handleError');
  //   // Simulate an error
  //   component.handleError(new Error('Test error'));
  //   expect(component.handleError).toHaveBeenCalledWith(jasmine.any(Error));
  //   // Add more expectations based on how errors are handled in the component
  // });

  // it('should handle user interactions', () => {
  //   // Assuming there's a method to handle user interactions like clicks
  //   spyOn(component, 'onPictureClick');
  //   const pictureElement = fixture.debugElement.query(By.css('.picture-item'));
  //   pictureElement.triggerEventHandler('click', null);
  //   expect(component.onPictureClick).toHaveBeenCalled();
  // });

  // it('should conditionally render elements', () => {
  //   // Assuming there's a condition that controls the rendering of an element
  //   component.showElement = true;
  //   fixture.detectChanges();
  //   let element = fixture.debugElement.query(By.css('.conditional-element'));
  //   expect(element).toBeTruthy();

  //   component.showElement = false;
  //   fixture.detectChanges();
  //   element = fixture.debugElement.query(By.css('.conditional-element'));
  //   expect(element).toBeFalsy();
  // });
});

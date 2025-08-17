import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatPaginatorModule } from "@angular/material/paginator";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { Photo, PictureBoardComponent } from "./picture-board.component";

describe("PictureBoardComponent", () => {
  let component: PictureBoardComponent;
  let fixture: ComponentFixture<PictureBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule,
        PictureBoardComponent,
        MatPaginatorModule,
        RouterModule.forRoot([])],
    providers: [provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();

    fixture = TestBed.createComponent(PictureBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should handle page events", () => {
    spyOn(component, "handlePageEvent");

    const paginator = fixture.debugElement.query(
      By.css("mat-paginator")
    ).componentInstance;
    paginator.page.emit({ pageIndex: 1, pageSize: 10, length: 50 });

    fixture.detectChanges();

    expect(component.handlePageEvent).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 10,
      length: 50,
    });
  });

  it("should have correct initial paginator settings", () => {
    const paginator = fixture.debugElement.query(
      By.css("mat-paginator")
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

  it("should get Images", () => {
    spyOn(component, "getImages").and.callThrough();
    const page = {
      page: 0,
      limit: 25,
    };
    component.getImages(page);
    expect(component.getImages).toHaveBeenCalled();
  });

  it("should render data correctly", () => {
    const photo: Photo = {
      id: 0,
      imageId: 0,
      url: "url",
      title: "title",
    };
    component.images = [photo];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll(".image-container").length).toBe(1);
  });
});

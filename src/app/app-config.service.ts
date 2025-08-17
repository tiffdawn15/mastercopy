import {
  afterNextRender,
  ElementRef,
  Injectable,
  ViewChild,
} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  @ViewChild("content") contentRef!: ElementRef;
  private REDIRECT_URI: string = "";

  constructor() {
    afterNextRender(() => {
      this.REDIRECT_URI = window.location.origin;
    });
  }

  getOrigin(): string {
    return this.REDIRECT_URI;
  }
}

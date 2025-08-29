import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.min(3)),
    email: new FormControl('', Validators.min(3)),
    message: new FormControl('', Validators.min(3)),
  });

  constructor() {}


}

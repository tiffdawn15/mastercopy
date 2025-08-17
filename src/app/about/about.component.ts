import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ParallaxDirective } from '../parallax.directive';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContactService } from '../contact.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.min(3)),
    email: new FormControl('', Validators.min(3)),
    message: new FormControl('', Validators.min(3)),
  });

  constructor(private contactService: ContactService) {}

  onSearch(term: string) {
    console.log(term);

    // TODO: Implement this function
  }

  onSubmit() {
    const from = {
      name:
        this.contactForm?.get('name')?.value !== null
          ? this.contactForm.get('name')?.value
          : '',
      email: this.contactForm.get('email')?.value,
    };

    const to = [
      {
        name: 'Tiff',
        email: 'tiffanymesser15@gmail.com',
      },
    ];
    // TODO: Implement Good object practices here
    const message = {
      sender: from,
      to: to,
      htmlContent: this.contactForm.get('message')?.value,
      subject: 'Email from our Website',
      replyTo: from,
    };

    console.log(message);

    this.contactService.sendEmail(message).subscribe(
      (response) => console.log('Success!', response),
      (error) => console.error('Error!', error)
    );
  }
}

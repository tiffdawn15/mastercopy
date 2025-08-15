import { Component } from '@angular/core';

import { ContactService } from '../contact.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-about',
    imports: [CommonModule, MatFormField, MatLabel, ReactiveFormsModule, FormsModule, RouterModule],
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
    email: new FormControl('', Validators.minLength(3)),
    message: new FormControl('', Validators.minLength(3)),
  });

  constructor(private contactService: ContactService) {}

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

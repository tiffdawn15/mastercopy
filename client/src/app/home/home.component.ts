import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginButtonComponent } from '../shared/components/buttons/login-button.component';
import { SignupButtonComponent } from '../shared/components/buttons/signup-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    LoginButtonComponent,
    SignupButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

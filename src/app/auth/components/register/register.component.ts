import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from 'src/app/utils/validators';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, MyValidators.validPassword]],
      type: ['company',[Validators.required]],
      companyName: ['',[Validators.required]],
    }, {
      validator: MyValidators.matchPassword
    });

    this.typeField.valueChanges
    .subscribe(value => {
      console.log(value);
      if (value === "company") {
        this.companyNameField.setValidators([Validators.required]);
      } else {
        this.companyNameField.setValidators(null);
      }
      this.companyNameField.updateValueAndValidity();
    })
  }

  get typeField () {
    return this.form.get('type');
  }

  get companyNameField(){
    return this.form.get('companyName');
  }

}

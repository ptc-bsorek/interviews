import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";
import {first} from "rxjs/internal/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  error: string;
  constructor(private authservice: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void{
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  loginProcess(): void {

    if (this.formGroup.valid)
    {
      this.authservice.login(this.formGroup.value).subscribe(
        result => this.router.navigate(['main']),
        err => this.error = 'Could not authenticate');
    }
  }
}

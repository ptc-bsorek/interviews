import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Services} from '../services';

@Component({
  selector: 'app-jobform',
  templateUrl: './jobform.component.html',
  styleUrls: ['./jobform.component.css']
})
export class JobformComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private service: Services) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void{
    this.formGroup = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      frequency: new FormControl('', [Validators.required])
    });
  }

  addJob(): void
  {
    if (this.formGroup.valid)
    {
      this.service.addJob(this.formGroup.value).subscribe((response) => {
          if (response.error)
          {
            alert('fucked');
          }
          else
          {
            alert('added');
          }
        });
    }
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../auth-service.service";
import {Services} from "../services";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  eventsSubject: Subject<string> = new Subject<string>();
  timeOutIDs:number[] = [];
// component property

  emitEventToChild(param: string): void {
    this.eventsSubject.next(param);
  }

  constructor(private authservice: AuthServiceService, private router: Router, private service: Services) { }

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
          alert('error');
        }
        else
        {
          alert('added successfully');
          const url = response.results.image_original_url;
       //   this.timeOutIDs.push(
        let id =  setTimeout(() => {
            this.emitEventToChild(url);
          }, response.results.frequency*1000)
          this.timeOutIDs.push(id);
        //  );
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.stopJobs();
  }
  logout(): void {
    this.authservice.logout();
    this.router.navigate(['login']);
  }

  stopJobs(): void {

    this.emitEventToChild('stop');
    this.timeOutIDs.forEach(id => clearTimeout(id));
    //this.timeoutIDs.forEach(id => clearTimeout(id));


  }
}

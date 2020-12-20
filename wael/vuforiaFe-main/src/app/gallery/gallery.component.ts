import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Services} from '../services';
import {Observable, of, Subscription} from "rxjs/index";
import {map} from "rxjs/internal/operators";
import * as _ from 'lodash'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  imagesurl: Observable<string[]>;
  timeOutIDs:number[] = [];
  private eventsSubscription: Subscription;

  @Input() events: Observable<string>;
  constructor(private service: Services) { }

  ngOnInit(): void {

    this.eventsSubscription = this.events.subscribe((data) => {
      this.imagesurl.subscribe(current => {
        if(data == 'stop')
        {
          this.stopJobs();
        }
        else
        {
          current.push(data);
        }

       // this.imagesurl.next(current);
      })
    });
    this.imagesurl = of([]);
    this.fetchData();
  }

  fetchData(): void
  {
    this.service.getGallery().subscribe((result) => {
      if (result.error)
      {

      }
      else
      {
        if (result)
        {
          for (const job of result.results)
          {
            const freq = job.frequency;
           const url = job.image_original_url;

          let id = setTimeout(() => {
             this.imagesurl.subscribe(current => {
               current.push(job.image_original_url);
             //  this.imagesurl.next(current);
             });
           }, freq*1000);
            this.timeOutIDs.push(id);
          }



         // this.imagesurl = of(_.map(result.data, 'image_original_url'));
        }

      }
    });
  }

  stopJobs(): void {
    this.timeOutIDs.forEach(id => clearTimeout(id));

    this.imagesurl = of([]);
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
    this.stopJobs();

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GifService } from 'src/app/gif.service';
import { TaskService } from 'src/app/task.service';
import { Category, Job } from './job';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss']
})
export class JobsViewComponent implements OnInit {
  public list: Array<Job>;
  public categories: Array<Category>;
  public gifForm: FormGroup;
  public inProgress: boolean;
  public gifArray: Array<string>;
  public touched: boolean;

  lists: any[];
  tasks: any[];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private gifService: GifService
  ) {
    this.categories = [{
      id: 1,
      name: 'dogs'
    },
    {
      id: 2,
      name: 'cats'
    }
    ];
    this.list = [
      {
        category: this.categories.find(c => c.id == 1),
        imageUrl: '/assets/dogs/dog.png'
      },
      {
        category: this.categories.find(c => c.id == 1),
        imageUrl: '/assets/dogs/dog2.png'
      },
      {
        category: this.categories.find(c => c.id == 2),
        imageUrl: '/assets/cats/cat.png'
      },
      {
        category: this.categories.find(c => c.id == 2),
        imageUrl: '/assets/cats/cat2.png'
      },
    ];
    // ['/assets/dogs/dog.png', '/assets/dogs/dog2.png', '/assets/cats/cat.png' , '/assets/cats/cat2.png']

    this.gifForm = this.formBuilder.group({
      categoryId: null,
      interval: 2,
      whenToStart: 0
    });

    this.refreshArray();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.taskService.getTasks(params.listId).subscribe((tasks: any[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      })

    this.taskService.getLists().subscribe(
      (lists: any[]) => {
        // console.log(lists)
        this.lists = lists;
      })

  }

  
  refreshArray() {
    this.gifArray = this.gifService.getGifArray();
  }

  async render() {
    this.touched = true;
    if (!this.gifForm.valid) return;
    this.inProgress = true;
    const finalGifSrc = await this.gifService.createGIF({
      images: this.list.filter(i => i.category.id == parseInt(this.gifForm.controls.categoryId.value)).map(i => i.imageUrl),
      interval: this.gifForm.controls.interval.value
    });


    setTimeout(() => {
      if (this.inProgress) {
        console.log('sleep 5 sec');
        this.inProgress = false;
        this.gifService.add(finalGifSrc);
        this.refreshArray();
        // localStorage.setItem('image', this.finalGifSrc);
        // And any other code that should run only after 5s
      }
    }, this.gifForm.controls.whenToStart.value * 1000);

    // this.inProgress = false;
    // this.finalGifSrc = finalGifSrc;
    // localStorage.setItem('image', this.finalGifSrc);

  }

  public removeGif(gifSrc: string) {
    // localStorage.removeItem('image');
    this.gifService.remove(gifSrc);
    this.refreshArray();
  }



}


// 

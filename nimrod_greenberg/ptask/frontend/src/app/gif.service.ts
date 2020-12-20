import { Injectable } from '@angular/core';
import { GifOptions } from './gif';

declare var gifshot: any;

@Injectable({
  providedIn: 'root'
})
export class GifService {
  static IMAGES_KEY = '_images';
  constructor() { }


  async createGIF(options: GifOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      gifshot.createGIF(options, (obj: any) => {
        if (!obj.error)
          resolve(obj.image);
        else
          reject(obj)
      });
    })

    // gifshot.createGIF({
    //   'images': ['http://i.imgur.com/2OO33vX.jpg', 'http://i.imgur.com/qOwVaSN.png', 'http://i.imgur.com/Vo5mFZJ.gif']
    // }, function (obj) {
    //   if (!obj.error) {
    //     var image = obj.image,
    //       animatedImage = document.createElement('img');
    //     animatedImage.src = image;
    //     document.body.appendChild(animatedImage);
    //   }
    // });
  }

  getGifArray(): Array<string> {
    let res = [];
    try {
      res = JSON.parse(localStorage.getItem(GifService.IMAGES_KEY)) || [];
    } catch (e) { }
    return res;
  }

  add(gifSrc: string) {
    let arr = this.getGifArray();
    arr.push(gifSrc);
    localStorage.setItem(GifService.IMAGES_KEY, JSON.stringify(arr));
  }

  remove(gifSrc: string) {
    let arr = this.getGifArray();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === gifSrc)
        arr.splice(i, 1);
    }
    localStorage.setItem(GifService.IMAGES_KEY, JSON.stringify(arr));
  }
}

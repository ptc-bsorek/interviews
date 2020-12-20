import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authservice: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.authservice.logout();
    this.router.navigate(['login']);
  }

  stopJobs(): void {

  }
}

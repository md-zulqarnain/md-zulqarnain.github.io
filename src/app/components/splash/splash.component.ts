import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // check for url

    setTimeout(() => {
      this.router.navigate(['home']);
    }, 3000);
  }

}

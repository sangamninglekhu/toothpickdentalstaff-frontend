import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,

  ) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.src = "../../assets/js/gr-theme-mode-switcher.js";
    this.elementRef.nativeElement.appendChild(s);
    var s1 = document.createElement("script");
    s1.src = "../../assets/plugins/counter-up/jquery.counterup.min.js";
    this.elementRef.nativeElement.appendChild(s1);

  }

}

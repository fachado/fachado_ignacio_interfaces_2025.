import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-volver',
  templateUrl: './volver.component.html',
  styleUrls: ['./volver.component.scss'],
  imports: [IonIcon, IonButton]
})
export class VolverComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() { }

  volver() {
    this.location.back();
  }

}

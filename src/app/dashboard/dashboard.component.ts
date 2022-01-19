import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  menuOptions: any[] = []

  constructor() {
    this.menuOptions = [
      {
        icon: 'fas fa-house-user',
        name: 'Casas',
        link: 'casas',
      },
      {
        icon: 'far fa-calendar-alt',
        name: 'Agendamento',
        link: 'agenda',
      },
    ];
  }

  ngOnInit(): void {
  }

}

import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    Menubar
  ],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
    items: MenuItem[] | undefined;

    constructor(private router: Router) {
    }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command:() =>  {this.router.navigate(['/']);
        }
      },
      {
        label: 'Patients',
        icon: 'pi pi-users',
        command:() =>  {this.router.navigate(['/patients']);
        }
      },
      {
        label: 'Doctors',
        icon: 'pi pi-graduation-cap',
        command:() =>  {this.router.navigate(['/doctors']);
        }
      },
    ]
  }
}

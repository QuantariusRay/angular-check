import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  template: `
      <nav>
          <a routerLink="task1" routerLinkActive="styled">Task 1</a>
          <a routerLink="task2" routerLinkActive="styled">Task 2</a>
          <a routerLink="task3" routerLinkActive="styled">Task 3</a>
          <a routerLink="task4" routerLinkActive="styled">Task 4</a>
          <a routerLink="task5" routerLinkActive="styled">Task 5</a>
      </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: flex-end;
        background-color: #0d0d0d;
        align-items: flex-start;
        margin-left: auto;
        margin-right: auto;
        padding: 24px 0 0;
        font-family: Airbnbcereal, sans-serif;
        overflow: visible;
      }
      
      a {
        text-decoration: none;
        color: white;
        background-color: transparent;
        margin-left: 0;
        margin-right: 0;
        padding: 12px 18px;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        
        &.styled {
          color: #1a1a1a;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(90deg,#f926e1,#28b5fb);
          -webkit-background-clip: text;
          background-clip: text;
        }
      }
    `,
  ],
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-navigation',
})
export class NavigationComponent {

}
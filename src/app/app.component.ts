import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation.component';

@Component({
  selector: 'hd-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  template: `
      <app-navigation/>
      <main>
          <router-outlet/>
      </main>
  `,
  styles: [`
    main {
      padding: 1rem;
    }
  `],
})
export class AppComponent {}

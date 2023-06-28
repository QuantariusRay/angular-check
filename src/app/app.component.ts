import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationService } from './services/navigation.service';

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
export class AppComponent {
  // dummy constructor to initialize the navigation service and begin tracking history
  constructor(private readonly navigation: NavigationService) {

  }
}

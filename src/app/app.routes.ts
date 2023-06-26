import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'task1'},
  { path: 'task1', loadComponent: () => import('./task1/task1.component').then((component) => component.Task1Component)},
  { path: 'task2', loadComponent: () => import('./task2/task2.component').then((component) => component.Task2Component)},
  { path: 'task3', loadComponent: () => import('./task3/task3.component').then((component) => component.Task3Component)},
  { path: 'task4', loadComponent: () => import('./task4/task4.component').then((component) => component.Task4Component)},
  { path: 'task5', loadComponent: () => import('./task5/task5.component').then((component) => component.Task5Component)},
  { path: '**', pathMatch: 'full', redirectTo: 'task1'}
];

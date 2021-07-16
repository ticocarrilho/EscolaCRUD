import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/salas',
    pathMatch: 'full' 
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'salas',
        loadChildren: () => import('./salas/salas.module').then(m => m.SalasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

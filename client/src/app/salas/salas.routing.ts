import { Routes, RouterModule } from '@angular/router';
import { SalasComponent } from './salas.component';

const routes: Routes = [
  {
    path: '',
    component: SalasComponent
  }
];

export const routing = RouterModule.forChild(routes);

import { Routes, RouterModule } from '@angular/router';
import { ProfessoresComponent } from './professores.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessoresComponent
  }
];

export const routing = RouterModule.forChild(routes);

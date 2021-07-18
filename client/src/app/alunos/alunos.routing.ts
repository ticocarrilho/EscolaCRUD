import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';

const routes: Routes = [
  {
    path: '',
    component: AlunosComponent
  }
];

export const routing = RouterModule.forChild(routes);

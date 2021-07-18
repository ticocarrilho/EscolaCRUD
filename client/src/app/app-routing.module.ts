import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'salas',
        pathMatch: 'full',
      }, {
        path: 'salas',
        loadChildren: () => import('./salas/salas.module').then(m => m.SalasModule),
        data: {
          title: 'Salas'
        }
      }, {
        path: 'professores',
        loadChildren: () => import('./professores/professores.module').then(m => m.ProfessoresModule),
        data: {
          title: 'Professores'
        }
      }, {
        path: 'alunos',
        loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
        data: {
          title: 'Alunos'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

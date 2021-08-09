import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';

import { TableUserComponent } from './components/table-user/table-user.component';
import { UpdateComponent } from './components/update/update.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'listUser',component: TableUserComponent },
  {path: 'newUser',component: CreateComponent},
  {path: 'update/:id',component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

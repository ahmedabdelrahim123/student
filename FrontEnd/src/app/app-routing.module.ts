import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component'; 
import { DeleteStudentComponent } from './delete-student/delete-student.component';

const routes: Routes = [
  { path: '', component: DataTableComponent } ,
  { path: 'delete-student/:id', component: DeleteStudentComponent } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

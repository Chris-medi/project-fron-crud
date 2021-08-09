import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
  

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,  
  ],
  exports:[
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatInputModule
  ]
})
export class MaterialModule { }

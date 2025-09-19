import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const ANGULAR_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule   
 
];

const PRIMENG_MODULES = [
 TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    BadgeModule,
    AutoCompleteModule,
    CardModule,
    DatePickerModule,
     SelectModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...PRIMENG_MODULES,
    ...ANGULAR_MODULES,
  ],
  exports: [
    ...PRIMENG_MODULES 
  ]
})
export class SharedModule { }

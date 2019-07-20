import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatSelectModule,
         MatInputModule, MatFormFieldModule} from "@angular/material";

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatSelectModule,
  MatInputModule, 
  MatFormFieldModule
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }

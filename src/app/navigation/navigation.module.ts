import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [NavigationComponent],
    imports: [IonicModule, RouterModule,CommonModule ],
    exports: [NavigationComponent]
})

export class NavigationModule {}
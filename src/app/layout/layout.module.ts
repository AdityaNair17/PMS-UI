import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LayoutComponent } from './layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthService } from '../auth/auth.service';


@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    UserProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class LayoutModule { }

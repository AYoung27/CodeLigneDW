import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PlanespagoComponent } from './planespago/planespago.component';
import { EditorcodigoComponent } from './editorcodigo/editorcodigo.component';
import { NoSanitizePipe } from './no-sanitize.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CardCarpetasComponent } from './card-carpetas/card-carpetas.component';
import { CardProyectosComponent } from './card-proyectos/card-proyectos.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SidebarComponent } from './sidebar/sidebar.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    PrincipalComponent,
    ProyectosComponent,
    PlanespagoComponent,
    EditorcodigoComponent,
    NoSanitizePipe,
    CardCarpetasComponent,
    CardProyectosComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodemirrorModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

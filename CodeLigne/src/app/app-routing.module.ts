import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';
import { LandingPageComponent} from './landing-page/landing-page.component'
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PlanespagoComponent } from './planespago/planespago.component';
import { EditorcodigoComponent } from './editorcodigo/editorcodigo.component';
import { AuthGuard } from './auth.guard'


const routes: Routes = [
   {path:'', pathMatch:'full', redirectTo:'landingPage'},
   {path:'principal', component:PrincipalComponent,canActivate:[AuthGuard]},
   {path:'landingPage',component:LandingPageComponent},
   {path:'proyectos',component:ProyectosComponent,canActivate:[AuthGuard]},
   {path:'planes',component:PlanespagoComponent},
   {path:'editor',component:EditorcodigoComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

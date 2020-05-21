import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BracketComponent } from './bracket/bracket.component';
import { DeveloperToolsComponent } from './developer-tools/developer-tools.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', redirectTo: '/kpop', pathMatch: 'full' },
  { path: 'bracket', component: BracketComponent },
  { path: 'about', component: AboutComponent },
  { path: 'developer-tools', component: DeveloperToolsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

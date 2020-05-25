import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BracketComponent } from './bracket/bracket.component';
import { DeveloperToolsComponent } from './developer-tools/developer-tools.component';
import { AboutComponent } from './about/about.component';
import { FinalResultComponent } from './bracket/final-result/final-result.component';
import { FullTournamentComponent } from './bracket/full-tournament/full-tournament.component';


const routes: Routes = [
  { path: '', redirectTo: '/bracket', pathMatch: 'full' },
  { path: 'bracket', component: BracketComponent },
  { path: 'final-result/:id', component: FinalResultComponent },
  { path: 'full-tournament', component: FullTournamentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'developer-tools', component: DeveloperToolsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

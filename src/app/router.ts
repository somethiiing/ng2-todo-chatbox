import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NoteCardContainer, About, Auth, ChatClient } from './containers';
import { App } from './app.component';
import { AuthService } from './services';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  { path: 'chat', canActivate: [AuthService], component: ChatClient },
  { path: 'notes', canActivate: [AuthService], component: NoteCardContainer },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: 'chat' }
]);

import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NoteCardContainer, About, Auth } from './containers';
import { App } from './app.component';
import { AuthService } from './services';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  { path: '', canActivate: [AuthService], component: NoteCardContainer },
  { path: 'about', canActivate: [AuthService], component: About },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: '' }
]);

// export const routes: ModuleWithProviders = RouterModule.forRoot([
//   {
//     path: '',
//     component: App,
//     children: [
//       { path: '', component: NoteCardContainer },
//       { path: 'about', component: About }
//     ]
//   },
//   { path: '**', redirectTo: '' }
// ]);



import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRouter, withComponentInputBinding, ResolveFn } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';
import { isLoggedIn } from './guard/is-logged-in.guard';
import { PostResolver } from './resolvers/post.resolver';
import { PmsResolver } from './resolvers/pms.resolver';

const _starterHomeModule = import('./starter-home/starter-home.module').then(m => m.StarterHomeModule)
const _wellcomeComponent = import('./components/wellcome/wellcome.component').then(c => c.WellcomeComponent)
const _pageNotFoundComponent = import('./components/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
const _boardComponent = import('./components/board/board.component').then(c => c.BoardComponent)
const _pmComponent = import('./components/pm/pm.component').then(c => c.PmComponent)
const resolveBoardTitle: ResolveFn<string> = () => { return Promise.resolve('Ng / evolution (board)')}
const revolveBoardPostTitle: ResolveFn<string> = () => { return Promise.resolve('Ng / evolution / post #546')}
const resolvePmTitle: ResolveFn<string> = () => { return Promise.resolve('Ng / pms ')}

const routes: Routes = [
	{ path: '', loadComponent: () => _wellcomeComponent},
	{ path: 'home', title: 'Nz / Home', loadChildren: () => _starterHomeModule, canActivate: [isLoggedIn] },
	{ path: 'board/:id/:pid', title: revolveBoardPostTitle, resolve: { user: UserResolver, post: PostResolver }, loadComponent: () => _boardComponent, canActivate: [isLoggedIn] },
	{ path: 'board/:id', title: resolveBoardTitle, resolve: { user: UserResolver }, loadComponent: () => _boardComponent, canActivate: [isLoggedIn] },
	{ path: 'pm', title: resolvePmTitle, resolve: { pms: PmsResolver }, loadComponent: () => _pmComponent, canActivate: [isLoggedIn] },
	{ path: '**', loadComponent: () => _pageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
	exports: [RouterModule],
	providers: [
		provideRouter(routes, withComponentInputBinding())
	]
})
export class AppRoutingModule { }
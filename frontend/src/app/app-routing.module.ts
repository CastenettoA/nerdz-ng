import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRouter, withComponentInputBinding, ResolveFn } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';
import { isLoggedIn } from './guard/is-logged-in.guard';
import { PostResolver } from './resolvers/post.resolver';
import { PmsResolver } from './resolvers/pms.resolver';
import { PostsResolver } from './resolvers/posts.resolver';
import { HomeResolver } from './resolvers/home.resolver';

const _userHomeComponent = import('./components/user-home/user-home.component').then(c => c.UserHomeComponent)
const _wellcomeComponent = import('./components/wellcome/wellcome.component').then(c => c.WellcomeComponent)
const _pageNotFoundComponent = import('./components/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
const _boardComponent = import('./components/board/board.component').then(c => c.BoardComponent)
const _pmComponent = import('./components/pm/pm.component').then(c => c.PmComponent)
const _aboutComponent = import('./components/about/about.component').then(c => c.AboutComponent)
const _configComponent = import('./components/config/config.component').then(c => c.ConfigComponent)

const resolveBoardTitle: ResolveFn<string> = () => { return Promise.resolve('Ng / Board')}
const revolveBoardPostTitle: ResolveFn<string> = () => { return Promise.resolve('Ng / Post #546')}
const resolvePmTitle: ResolveFn<string> = () => { return Promise.resolve('Ng / pms ')}

const routes: Routes = [
	{ path: '', loadComponent: () => _wellcomeComponent},
	{ path: 'home', title: 'Nz / Home', loadComponent: () => _userHomeComponent, resolve: { posts: HomeResolver },  canActivate: [isLoggedIn] },
	{ path: 'settings', title: 'Nz / Settings', loadComponent: () => _configComponent, canActivate: [isLoggedIn] },
	{ path: 'board/:id/:pid', title: revolveBoardPostTitle, resolve: { user: UserResolver, post: PostResolver }, loadComponent: () => _boardComponent, canActivate: [isLoggedIn] },
	{ path: 'board/:id', title: resolveBoardTitle, resolve: { user: UserResolver, posts: PostsResolver }, loadComponent: () => _boardComponent, canActivate: [isLoggedIn] },
	{ path: 'pm', title: resolvePmTitle, resolve: { pms: PmsResolver }, loadComponent: () => _pmComponent, canActivate: [isLoggedIn] },
	{ path: 'about', title: 'Nz / about', loadComponent: () => _aboutComponent, canActivate: [isLoggedIn] },
	{ path: '**', title: 'Nz / Pagina non trovata', loadComponent: () => _pageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
	exports: [RouterModule],
	providers: [
		provideRouter(routes, withComponentInputBinding())
	]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	BreadcrumbModule,
	ButtonModule,
	GridModule,
	HeaderModule,
	IconModule,
	IconService,
	InputModule,
	ListModule,
	RadioModule,
	TabsModule,
	TagModule,
	TilesModule,
	TooltipModule
} from 'carbon-components-angular';
import CarbonBuilder16 from '@carbon/icons/es/carbon--ui-builder/16';
import { StarterHomeComponent } from './starter-home/starter-home.component';
import { StarterHomeRoutingModule } from './starter-home-routing.module';
import { PostsListComponent } from '../components/posts-list/posts-list.component';
import { PostComponent } from '../components/post/post.component';
import { NewPostComponent } from '../components/new-post/new-post.component';
import { BreadcrumbMainComponent } from '../components/breadcrumb-main/breadcrumb-main.component';
import { HeaderTopComponent } from '../components/header-top/header-top.component';

@NgModule({
    declarations: [StarterHomeComponent],
    imports: [
        // CDS modules
        GridModule,
        ListModule,
        TabsModule,
        TilesModule,
        RadioModule,
        ButtonModule,
        IconModule,
        BreadcrumbModule,
        HeaderModule,
        TooltipModule,
        TagModule,
        InputModule, 
        
        // other modules and component
        CommonModule,
        StarterHomeRoutingModule,
        HeaderTopComponent,
        PostsListComponent, 
        PostComponent,
        NewPostComponent,
        BreadcrumbMainComponent
    ]
})
export class StarterHomeModule {
	constructor(protected iconService: IconService) {
		iconService.register(CarbonBuilder16);
	}
}

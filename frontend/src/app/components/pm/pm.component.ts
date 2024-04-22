import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, GridModule, IconModule, IconService } from 'carbon-components-angular';
import Add20 from '@carbon/icons/es/add/20'
import { ActivatedRoute } from '@angular/router';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Pm } from 'src/app/models/pms.model';
import { PostComponent } from "../post/post.component";
import { AuthorComponent } from "../author/author.component";
import { PmInfoComponent } from "../pm-info/pm-info.component";

@Component({
    selector: 'pm',
    standalone: true,
    templateUrl: './pm.component.html',
    styleUrls: ['./pm.component.scss'],
    imports: [CommonModule, GridModule, IconModule, ButtonModule, PostComponent, AuthorComponent, PmInfoComponent]
})
export class PmComponent {

  constructor(protected iconService: IconService,
    private activatedRoute: ActivatedRoute) {}
    pms!:BasicResponse<Pm[]>

  ngOnInit() {
    this.iconService.registerAll([Add20])

    this.activatedRoute.data.subscribe((res)=> {
      if(res['pms']) this.pms = res['pms']
    })
  }
}

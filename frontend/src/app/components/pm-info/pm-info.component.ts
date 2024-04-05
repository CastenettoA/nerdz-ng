import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pm } from 'src/app/models/pms.model';
import { PrettyDatePipe } from "../../pipes/pretty-date.pipe";

@Component({
    selector: 'pm-info',
    standalone: true,
    templateUrl: './pm-info.component.html',
    styleUrls: ['./pm-info.component.scss'],
    imports: [CommonModule, PrettyDatePipe]
})
export class PmInfoComponent {
  @Input() pm!:Pm

}

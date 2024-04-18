import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private userService: UserServices) {}

}

import { Component, inject } from '@angular/core';
import {Location} from '@angular/common'
@Component({
  selector: 'app-nonfound',
  imports: [],
  templateUrl: './nonfound.component.html'
})
export class NonfoundComponent {

  location = inject(Location)
  goback(){
    this.location.back()
  }
}

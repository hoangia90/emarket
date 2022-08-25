import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // @Input() sidenavToggledfromTopnavReceived = new EventEmitter<void>();
  // @Input() sidenavToggledfromTopnavReceived = new EventEmitter<void>();
  // @Input() isOpened = true;
  opened = true;
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  // sidenavToggledfromTopnav() {
  //   this.opened = !this.opened;
  // }

  sidenavToggledfromTopnav() {
    // this.sidenavToggledfromTopnavReceived.emit();
    // this.opened = !opened;
    // return this.opened;
    // this.opened = headerService.isOpened;
  }

}

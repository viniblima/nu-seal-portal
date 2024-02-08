import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from './services/sidenav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'nu-seal-portal';
  opened: boolean = false;;
  showSideNav: boolean = false;
  subscriptionOpen: Subscription = new Subscription();

  constructor(
    private sideNavService: SideNavService,
  ) { }

  ngOnInit(): void {
    this.subscriptionOpen = this.sideNavService.openedObs.subscribe(data => this.opened);
  }

  ngOnDestroy(): void {
    this.subscriptionOpen.unsubscribe();
  }
}

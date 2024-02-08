import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideNavService {
    private _showSidenavObs: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _openedObs: BehaviorSubject<boolean> = new BehaviorSubject(false);


    set changeShowSidenav(data: boolean) {
        this._showSidenavObs.next(data);
    }

    get showSidenavObs(): Observable<boolean> {
        return this._showSidenavObs;
    }

    set opened(data: boolean) {
        this._openedObs.next(data);
    }

    get openedObs(): Observable<boolean> {
        return this._openedObs;
    }
}
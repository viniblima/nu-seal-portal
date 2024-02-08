import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _token: string = "";

    set token(data: string) {
        this._token = data;
    }

    get token(): string {
        return this._token!;
    }
}
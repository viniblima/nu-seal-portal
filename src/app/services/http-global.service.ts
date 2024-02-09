import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpGlobalService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   *
   * GET global com as devidas permissoes
   *
   * @param address Endereco complementar da API
   * @returns Resposta de um HTTP Get
   */
  httpGet(address: string): Promise<any> {
    return firstValueFrom(
      this.http
        .get(`${environment.url}/${address}`, {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        })
        .pipe()
    );
  }

  /**
   *
   * POST global com as devidas permissoes
   *
   * @param address Endereco complementar da API
   * @param body
   * @returns Resposta de um HTTP Post
   */
  httpPost(address: string, body: object): Promise<any> {
    return firstValueFrom(
      this.http
        .post(`${environment.url}/${address}`, body, {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        })
        .pipe()
    );
  }

  /**
   *
   * PUT global com as devidas permissoes
   *
   * @param address Endereco complementar da API
   * @param body
   * @returns Resposta de um HTTP PUT
   */
  httpPut(address: string, body: object): Promise<any> {
    return firstValueFrom(
      this.http
        .put(`${environment.url}/${address}`, body, {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        })
        .pipe()
    );
  }

  /**
   *
   * DELETE global com as devidas permissoes
   *
   * @param address Endereco complementar da API
   * @returns Resposta de um HTTP DELETE
   */
  httpDelete(address: string): Promise<any> {
    return firstValueFrom(
      this.http
        .delete(`${environment.url}/${address}`, {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        })
        .pipe()
    );
  }

  /**
   *
   * HTTP GET global de arquivo
   *
   * @param address Endereco complementar do arquivo
   * @returns Resposta de um HTTP GET com o tipo Blob
   */
  httpGetFile(address: string): Promise<any> {
    return firstValueFrom(
      this.http.get(`${environment.url}/${address}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        responseType: 'blob',
      })
    );
  }
}

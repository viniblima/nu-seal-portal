import { HttpGlobalService } from './http-global.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(private httpGlobalService: HttpGlobalService) {}

  /**
   * Upload de arquivos
   *
   * @param file Arquivo à ser enviado
   * @returns Requisicao HTTP com lista de uploads
   */
  upload(file: any, idSeal: string): Promise<Object> {
    const formData: any = new FormData();
    formData.append('file', file);
    return this.httpGlobalService.httpPost(`portal/upload/${idSeal}`, formData);
  }

  /**
   *
   * Pega PDF do servidor
   *
   * @param name Nome do arquivo
   */
  getFile(name: string): Promise<void> {
    return this.httpGlobalService.httpGetFile(`portal/upload/${name}`);
  }

  /**
   * Remocao de imagem do servidor
   *
   * @param name Nome do arquivo
   * @returns Requisicao HTTP Delete que remove imagem do servidor
   */
  removeFile(name: string): Promise<void> {
    return this.httpGlobalService.httpDelete(`portal/upload/${name}`);
  }

  /**
   * Get para ver se há uma imgem de selo previamente upada
   *
   * @returns Requisicao HTTP com a imagem do selo criado anteriormente
   */
  getSealCreated(): Promise<void> {
    return this.httpGlobalService.httpGet(`portal/upload/seal`);
  }

  /**
   * Upload de arquivos de imagem do selo
   *
   * @param file Arquivo à ser enviado
   * @returns Requisicao HTTP com lista de uploads
   */
  uploadSealImage(file: any): Promise<Object> {
    const formData: any = new FormData();
    formData.append('file', file);
    return this.httpGlobalService.httpPost(`portal/upload/seal`, formData);
  }
}

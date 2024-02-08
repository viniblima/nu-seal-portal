import { HttpGlobalService } from './http-global.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {
    constructor(private httpGlobalService: HttpGlobalService) { }

    /**
     * Upload de arquivos
     *
     * @param file Arquivo à ser enviado
     * @returns Requisicao HTTP com lista de uploads
     */
    upload(
        file: File,
    ): Promise<Object> {
        const formData: any = new FormData();
        formData.append('file', file)
        return this.httpGlobalService.httpPost('upload', formData);
    }

}
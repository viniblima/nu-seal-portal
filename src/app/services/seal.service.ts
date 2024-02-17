import { Seal } from '../models';
import { HttpGlobalService } from './http-global.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SealService {
    constructor(private httpGlobalService: HttpGlobalService) { }

    /**
     * 
     * @returns Promise com o número do selo à ser criado
     */
    async getNumber(): Promise<Object> {
        const request: Promise<Object> = await this.httpGlobalService.httpGet('portal/seal/count');

        return request;
    }

    /**
     * 
     * Pega os detalhes de um selo
     * 
     * @param id ID do selo
     * @returns Promise contendo o selo 
     */
    async getDetail(id: string): Promise<Object> {
        const request: any = await this.httpGlobalService.httpGet(`portal/seal/${id}`);

        return request;
    }
}
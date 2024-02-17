import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Seal } from '../../../models';
import { SealService } from '../../../services/seal.service';

@Component({
  selector: 'app-certified-detail',
  templateUrl: './certified-detail.component.html',
  styleUrl: './certified-detail.component.scss'
})
export class CertifiedDetailComponent implements OnInit {
  loading: boolean = true;
  error: boolean = false;
  seal!: Seal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sealService: SealService,
  ) { }

  async ngOnInit(): Promise<void> {
    const params: any = await firstValueFrom(this.activatedRoute.params)
    this.sealService.getDetail(params.id).then((data: any) => {
      this.seal = new Seal(data.seal);
      this.loading = false;
    }, (err) => {
      this.loading = false;
      this.error = true;
    });

  }
}

import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { PDFDocumentProxy, PdfViewerComponent } from 'ng2-pdf-viewer';
import html2canvas from 'html2canvas';
import { UploadService } from '../../services/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagePdfInterface, Seal } from '../../models';
import { SealService } from '../../services/seal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-pdf',
  templateUrl: './sign-pdf.component.html',
  styleUrl: './sign-pdf.component.scss',
})
export class SignPdfComponent {
  havePdf: boolean = false;
  currentPage: number = 1;
  pdfSrc: string = '';
  pages: PagePdfInterface[] = [];
  totalPages: number = 0;
  loading: boolean = false;
  initializingPage: boolean = true;
  success: boolean = false;
  positionPdfViewerRelative: boolean = false;
  positionPdfHiddenRelative: boolean = false;
  indexPage: number = 0;

  sealSrc: string = '';
  sealImageName: string = '';

  pdf: jsPDF = new jsPDF({
    orientation: 'portrait',
  });

  seal!: Seal;
  sealText: string = '';

  subscriptionTipoSelo!: Subscription;

  qrLink: string = "";

  form: FormGroup = new FormGroup({
    posicaoHorizontal: new FormControl('left', [Validators.required]),
    posicaoVertical: new FormControl('down', [Validators.required]),
    pagina: new FormControl(1, [Validators.required]),
    tipoSelo: new FormControl("image", [Validators.required]),
  })

  @ViewChild(PdfViewerComponent, { static: false }) pdfComponent:
    | PdfViewerComponent
    | undefined;

  constructor(private uploadService: UploadService, private sealService: SealService) { }


  ngOnDestroy(): void {
    this.subscriptionTipoSelo.unsubscribe();
  }

  ngOnInit(): void {
    console.log(window.location.href);
    this.subscriptionTipoSelo = this.form.get("tipoSelo")!.valueChanges.subscribe((data) => {
      console.log(data)
      if (data == "text") {
        this.form.get("posicaoHorizontal")!.disable();
        this.form.controls["posicaoVertical"].setValue("down");
      } else {
        this.form.get("posicaoHorizontal")!.enable();
      }
    });
    this.sealService.getNumber().then((data: any) => {
      this.seal = new Seal(data.seal);
      this.sealText = `Este documento utiliza o selo digital nº ${this.seal.numSealText} emitido em ${Date.now().toLocaleString()}. Para verificar autenticidade acesso site https://nu-seal-portal-92c11adb828d.herokuapp.com/sign-pdf informe o número do selo`;
      this.qrLink = `${window.location.href.replace("sign-pdf", `certified/${this.seal.numSeal}`)}`
      this.initializingPage = false;
    })

  }
  onFileDropped(event: FileList) {
    this.renderDoc(event);
  }

  fileBrowseHandler(event: any) {
    this.renderDoc(event.target.files as FileList);
  }

  sealBrowsehandler(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.sealSrc = e.target.result;
      this.sealImageName = event.target.files[0].name;
    };
    this.havePdf = true;
    reader.readAsDataURL(event.target.files[0])
    // reader.readAsArrayBuffer(event.target.files[0]);
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {

    this.pages = [];
    this.totalPages = pdf.numPages;
    this.positionPdfViewerRelative = true;

  }

  afterHiddenLoadComplete(pdf: PDFDocumentProxy) {
    this.positionPdfHiddenRelative = true;

  }

  pageRendered() {
    this.pdfComponent!.pdfViewer.currentScaleValue = 'page-fit';
  }

  renderDoc(files: FileList) {
    if (files[0].type == 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      this.havePdf = true;
      reader.readAsArrayBuffer(files[0]);
    }
  }

  public async download() {

    const list = document.querySelectorAll('.sign-pdf__hidden__viewer');
    this.loading = true;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      this.indexPage = index + 1;
      await html2canvas(element as HTMLElement).then(
        (canvas: HTMLCanvasElement) => {
          this.getCanvasToDownload(index == 0, canvas);
        }
      );
    }

    const blobPDF = new Blob([this.pdf.output('blob')], {
      type: 'application/pdf',
    });

    await this.uploadService.upload(blobPDF, this.seal.id).then(
      async (data: any) => {
        const file = data.list[0].signed;

        const resultFile: any = await this.uploadService.getFile(file.fileName);

        this.havePdf = false;
        this.success = true;
        this.loading = false;

        var a = document.createElement('a');
        a.href = URL.createObjectURL(resultFile);
        a.setAttribute('download', file.fileName);
        a.click();
      },
      (err) => {
        this.loading = false;
      }
    );


  }

  reset(): void {
    this.success = false;
    this.positionPdfHiddenRelative = false;
    this.positionPdfViewerRelative = false;
    this.pages = [];
    this.currentPage = 1;
    this.pdfSrc = '';
    this.totalPages = 0;
    this.sealSrc = '';
    this.sealImageName = '';
    this.sealText = '';
    this.sealService.getNumber().then((data: any) => {
      this.seal = new Seal(data.seal);
      this.sealText = `Este documento utiliza o selo digital nº ${this.seal.numSealText} emitido em ${Date.now().toLocaleString()}. Para verificar autenticidade acesso site https://nu-seal-portal-92c11adb828d.herokuapp.com/sign-pdf informe o número do selo`;
      this.initializingPage = false;
    })
  }

  private getCanvasToDownload(isFirst: boolean, canvas: any,) {


    let ctx = canvas.getContext('2d');
    ctx.scale(6, 6);
    let image = canvas.toDataURL('image/png').replace('image/png', 'image/png');

    const imgProps = this.pdf.getImageProperties(image);
    if (isFirst) {
      this.pdf = new jsPDF({
        orientation: imgProps.height < imgProps.width ? 'landscape' : 'portrait'
      });
    } else {
      this.pdf.addPage('a4', imgProps.height < imgProps.width ? 'landscape' : 'portrait');
    }
    const pdfWidth = this.pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    this.pdf.addImage(image, 'PNG', 0, 0, pdfWidth, pdfHeight);

  }

  public previous() {
    if (this.currentPage > 0) {
      if (this.currentPage == 1) {
        this.currentPage = this.totalPages;
      } else {
        this.currentPage--;
      }
    }
  }

  public next() {
    if (this.totalPages > this.currentPage) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
  }
}

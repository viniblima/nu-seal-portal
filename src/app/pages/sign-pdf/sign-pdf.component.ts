import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { PDFDocumentProxy, PdfViewerComponent } from 'ng2-pdf-viewer';
import html2canvas from 'html2canvas';
import { UploadService } from '../../services/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-pdf',
  templateUrl: './sign-pdf.component.html',
  styleUrl: './sign-pdf.component.scss',
})
export class SignPdfComponent {
  havePdf: boolean = false;
  currentPage: number = 1;
  pdfSrc: string = '';
  pages: number[] = [];
  totalPages: number = 0;
  loading: boolean = false;
  success: boolean = false;

  pdf: jsPDF = new jsPDF({
    orientation: 'portrait',
  });

  form: FormGroup = new FormGroup({
    posicaoHorizontal: new FormControl('left', [Validators.required]),
    posicaoVertical: new FormControl('down', [Validators.required]),
  })

  @ViewChild(PdfViewerComponent, { static: false }) pdfComponent:
    | PdfViewerComponent
    | undefined;

  constructor(private uploadService: UploadService) { }

  onFileDropped(event: FileList) {
    this.renderDoc(event);
  }

  fileBrowseHandler(event: any) {
    this.renderDoc(event.target.files as FileList);
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pages = [];
    for (let index = 0; index < pdf.numPages; index++) {
      this.pages.push(index);
    }
    this.totalPages = pdf.numPages;
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
    this.loading = true;
    const list = document.querySelectorAll('.sign-pdf__hidden__viewer');
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      await html2canvas(element as HTMLElement).then(
        (canvas: HTMLCanvasElement) => {
          this.getCanvasToDownload(canvas, index < list.length - 1);
        }
      );
    }

    const blobPDF = new Blob([this.pdf.output('blob')], {
      type: 'application/pdf',
    });
    const file = new File([blobPDF], 'pdf-to-sign.pdf');
    await this.uploadService.upload(blobPDF as File).then(
      async (data: any) => {
        console.log(data);
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

    this.pdf = new jsPDF();
  }

  reset(): void {
    this.success = false;
  }

  private getCanvasToDownload(canvas: any, isNotLast: boolean) {
    let ctx = canvas.getContext('2d');
    ctx.scale(6, 6);
    let image = canvas.toDataURL('image/png').replace('image/png', 'image/png');
    const imgProps = this.pdf.getImageProperties(image);

    const pdfWidth = this.pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    this.pdf.addImage(image, 'PNG', 0, 0, pdfWidth, pdfHeight);
    if (isNotLast) {
      this.pdf.addPage();
    }
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

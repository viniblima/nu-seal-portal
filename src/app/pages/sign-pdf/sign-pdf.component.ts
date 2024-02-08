import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { PDFDocumentProxy, PdfViewerComponent } from 'ng2-pdf-viewer';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sign-pdf',
  templateUrl: './sign-pdf.component.html',
  styleUrl: './sign-pdf.component.scss'
})
export class SignPdfComponent {

  havePdf: boolean = false;
  currentPage: number = 1;
  pdfSrc: string = "";
  pages: number[] = [];
  public totalPages: number = 0;

  pdf: jsPDF = new jsPDF({
    orientation: "portrait"
  });

  @ViewChild(PdfViewerComponent, { static: false }) pdfComponent: PdfViewerComponent | undefined;

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

    const list = document.querySelectorAll(".sign-pdf__hidden__viewer");
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      await html2canvas(element as HTMLElement).then((canvas: HTMLCanvasElement) => {
        this.getCanvasToDownload(canvas, index < list.length - 1)
      })
    }
    this.pdf.save("download.pdf");
    this.pdf = new jsPDF();
  }

  private getCanvasToDownload(canvas: any, isNotLast: boolean) {
    let ctx = canvas.getContext('2d');
    ctx.scale(6, 6);
    let image = canvas.toDataURL("image/png").replace("image/png", "image/png");
    const imgProps = this.pdf.getImageProperties(image);

    const pdfWidth = this.pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    this.pdf.addImage(image, 'PNG', 0, 0, pdfWidth, pdfHeight);
    if (isNotLast) {
      this.pdf.addPage()
    }

    // this.pdf.addImage(image, 'PNG', 0, 0, pdfWidth, pdfHeight);
    // pdf.addImage(image, 'PNG', 0, 0, width, height);
    // this.pdf.save("download.pdf");

    // var link = document.createElement('a');
    // link.download = "my-image.png";
    // link.href = image;
    // link.click();
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

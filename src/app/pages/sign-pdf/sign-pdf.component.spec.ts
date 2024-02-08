import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPdfComponent } from './sign-pdf.component';

describe('SignPdfComponent', () => {
  let component: SignPdfComponent;
  let fixture: ComponentFixture<SignPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

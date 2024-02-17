import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedDetailComponent } from './certified-detail.component';

describe('CertifiedDetailComponent', () => {
  let component: CertifiedDetailComponent;
  let fixture: ComponentFixture<CertifiedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertifiedDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertifiedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

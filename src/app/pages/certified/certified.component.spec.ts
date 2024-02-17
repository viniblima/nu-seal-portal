import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedComponent } from './certified.component';

describe('CertifiedComponent', () => {
  let component: CertifiedComponent;
  let fixture: ComponentFixture<CertifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertifiedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

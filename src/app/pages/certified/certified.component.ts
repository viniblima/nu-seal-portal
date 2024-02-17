import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certified',
  templateUrl: './certified.component.html',
  styleUrl: './certified.component.scss'
})
export class CertifiedComponent {

  form: FormGroup = new FormGroup({
    numSelo: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router
  ) { }

  search() {
    this.router.navigate([`certified/${this.form.controls['numSelo'].value}`])
  }
}

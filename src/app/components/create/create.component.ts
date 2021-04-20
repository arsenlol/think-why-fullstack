import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      'first-name': new FormControl('', [Validators.required]),
      'last-name': new FormControl('', [Validators.required]),
    });
  }

  create(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.getRawValue();
    this.api
      .createContact(data)
      .then((result) => {
        this.snackBar.open('Created!', 'Ok', {
          duration: 5000,
        });
        this.router.navigate(['list']);
      })
      .catch((err) => console.error(err));
  }
}

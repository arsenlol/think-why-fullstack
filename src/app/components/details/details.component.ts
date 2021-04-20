import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ContactModel } from '../../models/contacts.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  contact: ContactModel;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['record-ID'];
    this.api.getContactById(id).then(result => this.contact = result);
  }
}

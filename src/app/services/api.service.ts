import { Injectable } from '@angular/core';
import { API } from '@aws-amplify/api';
import { ContactModel } from '../models/contacts.model';

@Injectable()
export class ApiService {
  apiName = 'contactsApi';
  apiPath = '/contacts';

  createContact(data: ContactModel): Promise<void> {
    return API.post(this.apiName, this.apiPath, {
      body: {
        email: data.email,
        'first-name': data['first-name'],
        'last-name': data['last-name'],
      },
    })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.error(err));
  }

  getContacts(): Promise<ContactModel[]> {
    return API.get(this.apiName, this.apiPath, {});
  }

  getContactById(id): Promise<ContactModel> {
    return API.get(this.apiName, this.apiPath + '/object', {
      queryStringParameters: {
        'record-ID': id,
      },
    })
      .then((result) => result)
      .catch((err) => console.error(err));
  }

  removeContactById(id): Promise<void> {
    return API.del(this.apiName, this.apiPath + '/object', {
      queryStringParameters: {
        'record-ID': id,
      },
    })
      .then((result) => result)
      .catch((err) => console.error(err));
  }
}

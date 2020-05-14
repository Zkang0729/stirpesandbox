import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css'],
})
export class CustomerInformationComponent implements OnInit {
  @Output() setCustomerId: EventEmitter<string> = new EventEmitter();

  public firstName: string = null;
  public lastName: string = null;
  public email: string = null;
  public password: string = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  public setfirstName(firstName: any): void {
    this.firstName = firstName.target.value;
  }

  public setLastName(lastName: any): void {
    this.lastName = lastName.target.value;
  }

  public setEmail(email: any): void {
    this.email = email.target.value;
  }

  public setPassword(password: any): void {
    this.password = password.target.value;
  }

  public onSubmit(): void {
    const customerCreateOptions = {
      name: this.firstName + ' ' + this.lastName,
      email: this.email,
    };
    this.customerService
      .addCustomer(customerCreateOptions)
      .subscribe((customer) => this.setCustomerId.emit(customer));
  }
}

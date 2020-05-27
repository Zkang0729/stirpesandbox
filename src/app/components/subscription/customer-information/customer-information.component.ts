import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css'],
})
export class CustomerInformationComponent implements OnInit {
  @Input() firstName: string = null;
  @Input() lastName: string = null;
  @Input() email: string = null;
  @Input() password: string = null;

  @Output() firstNameChange: EventEmitter<string> = new EventEmitter();
  @Output() lastNameChange: EventEmitter<string> = new EventEmitter();
  @Output() emailChange: EventEmitter<string> = new EventEmitter();
  @Output() passwordChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public setFirstName(firstName: any): void {
    this.firstNameChange.emit(firstName.target.value);
  }

  public setLastName(lastName: any): void {
    this.lastNameChange.emit(lastName.target.value);
  }

  public setEmail(email: any): void {
    this.emailChange.emit(email.target.value);
  }

  public setPassword(password: any): void {
    this.passwordChange.emit(password.target.value);
  }
}

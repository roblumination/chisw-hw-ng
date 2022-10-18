import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;
  isLastStep = false;

  forms = {
    accountData: new FormGroup({
      email: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    }),
    basicData: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
    }),
    contactData: new FormGroup({
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      relatives: new FormArray([]),
    }),
  };

  get email() {
    return this.forms.accountData.get('email') as FormControl;
  }
  get password1() {
    return this.forms.accountData.get('password1') as FormControl;
  }
  get password2() {
    return this.forms.accountData.get('password2') as FormControl;
  }
  get firstName() {
    return this.forms.basicData.get('firstName') as FormControl;
  }
  get lastName() {
    return this.forms.basicData.get('lastName') as FormControl;
  }
  get birthDate() {
    return this.forms.basicData.get('birthDate') as FormControl;
  }
  get address() {
    return this.forms.contactData.get('address') as FormControl;
  }
  get phone() {
    return this.forms.contactData.get('phone') as FormControl;
  }
  get relatives() {
    return this.forms.contactData.get('relatives') as FormArray;
  }
  get isCurrentFormValid() {
    switch (this.stepper.selectedIndex) {
      case 0:
        return this.forms.accountData.valid;
      case 1:
        return this.forms.basicData.valid;
      case 2:
        return this.forms.contactData.valid;
      default:
        return false;
    }
  }

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.stepper.animationDuration = '400ms';
  }

  nextStep() {
    if (this.isCurrentFormValid) {
      if (this.password1.value === this.password2.value) {
        this.processToNextStep();
      } else alert('Passwords must be same!');
    } else {
      alert('Fill all fields!');
    }
  }

  addNewFieldForRelatives() {
    this.relatives.controls.push(new FormControl(''));
  }

  deleteFieldFromRelatives(id: number) {
    this.relatives.removeAt(id);
  }

  private processToNextStep() {
    const isCurrentStepLast =
      this.stepper.steps.length === this.stepper.selectedIndex + 1;
    if (isCurrentStepLast) {
      this.finish();
      this.isLastStep = true;
    } else {
      this.stepper.next();
    }
  }

  private finish() {
    this.updateState();
    this.logResult();
  }

  private updateState() {
    //idk how to do it another way
    this.addNewFieldForRelatives();
    this.deleteFieldFromRelatives(this.relatives.controls.length - 1);
  }

  private logResult() {
    const [acc, base, contact] = [
      this.forms.accountData.value,
      this.forms.basicData.value,
      this.forms.contactData.value,
    ];
    console.log('--- [COLLECTED DATA] ---');
    console.log('Email:', acc.email);
    console.log('Pass1:', acc.password1);
    console.log('Pass2:', acc.password2);
    console.log('First name:', base.firstName);
    console.log('Last name:', base.lastName);
    console.log('Date:', base.birthDate);
    console.log('Address:', contact.address);
    console.log('Phone:', contact.phone);
    console.log('Relatives:', contact.relatives);
  }
}

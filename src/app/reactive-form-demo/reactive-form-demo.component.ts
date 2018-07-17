import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutoValidateDirective} from '../auto-validate/auto-validate.directive';

@Component({
  selector: 'app-reactive-form-demo',
  templateUrl: './reactive-form-demo.component.html',
  styleUrls: ['./reactive-form-demo.component.css']
})
export class ReactiveFormDemoComponent implements OnInit {
  @ViewChildren(AutoValidateDirective) autoValidates: QueryList<AutoValidateDirective>;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      age: [0, Validators.compose([Validators.required, Validators.max(110), Validators.min(1)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      note: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.minLength(2)])]
    });
  }

  submit(){
    if(this.formGroup.valid){

    }else {
      this.autoValidates.forEach((autoValidate) => autoValidate.checkError());
    }
  }


}

import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AutoValidateDirective} from '../auto-validate/auto-validate.directive';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template-driven-form-demo',
  templateUrl: './template-driven-form-demo.component.html',
  styleUrls: ['./template-driven-form-demo.component.css']
})
export class TemplateDrivenFormDemoComponent implements OnInit {
  @ViewChildren(AutoValidateDirective) autoValidates: QueryList<AutoValidateDirective>;
  @ViewChild(NgForm) ngForm: NgForm;


  data: any = {
    name: '',
    age: 0,
    email: '',
    note: ''
  };

  constructor() { }

  ngOnInit() {
  }


  submit(){
    if(this.ngForm.valid){

    }else {
      this.autoValidates.forEach((autoValidate) => autoValidate.checkError());
    }
  }
}

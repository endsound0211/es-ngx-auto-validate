# ES Angular Auto Validate

## Feature
* auto validate form control
* customize error message
* customize strategy include rendering and inserting
* i18n

## Table of contents
* [Setup](#setup)
* [Usage](#usage)
  * [Reactive Form](#reactive-form)
  * [Template Driven form](#template-driven-form)
* [Customize Error Message](#customize-error-message)
* [Customize Strategy](#customize-strategy)

## Setup
Need to install the npm module
````
npm install es-ngx-auto-validate
````

## Usage
Import 'AutoValidateModule' to module and provide 'ERROR_MESSAGE_TOKEN' with 'DefaultErrorMessageMapXXXX' (XXXX is locale name) or customize map
````typescript
@NgModule{
    imports: [
      AutoValidateModule
    ],
    providers: [
        {provide: ERROR_MESSAGE_TOKEN, useValue: DefaultErrorMessageMapEnUs}
    ]
}
export class AppModule{}
````

### Reactive Form
You can use [esAutoValidate] with formControlName, formGroupName or formArrayName
````angular2html
<form [formGroup]="formGroup" novalidate>
  <div>
    <div>
      <label>Name</label>
    </div>
    <div>
      <input type="text" formControlName="name" name="name" esAutoValidate>
    </div>
  </div>
</form>
````
or give it 'control' and for directly
````angular2html
<form [formGroup]="formGroup" novalidate>
  <div>
    <div>
      <label>Name</label>
    </div>
    <div>
          <input type="text" formControlName="name" name="name" #name>
    </div>
    <div esAutoValidate [control]="formGroup.get('name')" [for]="name"></div>
  </div>
</form>
````
check valid before submit
````typescript
class ReactiveFormDemoComponent{
  formGroup: FromGroup;
  @ViewChildren(AutoValidateDirective) autoValidates: QueryList<AutoValidateDirective>;
  
  submit(){
    if(this.formGroup.valid){
      //submit
    }else {
      this.autoValidates.forEach((autoValidate) => autoValidate.checkError());
    }
  }
}
````

### Template Driven Form
You can use [esAutoValidate] with ngModel
````angular2html
<form>
  <div>
    <div>
      <label>Name</label>
    </div>
    <div>
      <input type="text" [(ngModel)]="data.name" name="name" required esAutoValidate>
    </div>
  </div>
</form>
````
or give it 'control' and 'for' directly
````angular2html
<form>
  <div>
    <div>
      <label>Name</label>
    </div>
    <div>
      <input type="text" name="name" [(ngModel)]="data.name"
             required #name="ngModel" #nameRef>
    </div>
    <div esAutoValidate [control]="name.control" [for]="nameRef"></div>
  </div>
</form>
````
check valid before submit
````typescript
class TemplateDrivenFormDemoComponent{
  @ViewChildren(AutoValidateDirective) autoValidates: QueryList<AutoValidateDirective>;
  @ViewChild(NgForm) ngForm: NgForm;
  
  submit(){
      if(this.ngForm.valid){
        //submit
      }else {
        this.autoValidates.forEach((autoValidate) => autoValidate.checkError());
      }
    }
}
````

## Customize Error Message

Define ErrorMessageMap variable:
````typescript
export const CustomizeErrorMessageMapEnUs: ErrorMessageMap = {
  required: 'Customize Required',
  max: (err) => {return `Customize Max: ${err.max}`;},
  min: (err) => {return `Customize Min: ${err.min}`;},
  maxlength: (err) => {return `Customize Max Length: ${err.actualLength}/${err.requiredLength}`},
  minlength: (err) => {return `Customize Min Length: ${err.actualLength}/${err.requiredLength}`},
  email: 'Customize Invalid Email Format'
};
````
And provide it:
````typescript
@NgModule{
    imports: [
      AutoValidateModule
    ],
    providers: [
        {provide: ERROR_MESSAGE_TOKEN, useValue: CustomizeErrorMessageMapEnUs}
    ]
}
export class AppModule{}
````

There are some default locale error message as follow:
    DefaultErrorMessageMapEnUs
    DefaultErrorMessageMapZhTw
    
## Customize Strategy

Define class and implement RenderDivNodeStrategy
````typescript
export class CustomizeRenderDivNodeStrategy implements RenderDivNodeStrategy{
  renderDiv(renderer: Renderer2, divNode: any, target: ElementRef){
    renderer.setStyle(divNode, 'color', '#4244a9');
  };

  insertDiv(renderer: Renderer2, divNode: any, target: ElementRef) {
    renderer.appendChild(target.nativeElement.parentNode, divNode);
  };
}
````

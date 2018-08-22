import {Directive, ElementRef, Host, HostListener, Inject, Input, OnDestroy, OnInit, Optional, Renderer2} from '@angular/core';
import {AbstractControl, FormArrayName, FormControlName, FormGroupName, NgModel} from '@angular/forms';
import {ERROR_MESSAGE_TOKEN, ErrorMessageMap} from './error-message-map-token';
import {isNull, isNullOrUndefined} from 'util';
import {DefaultRenderDivNodeStrategy, RENDER_DIV_NODE_STRATEGY, RenderDivNodeStrategy} from './render-div-node-strategy';
import {Subscription} from 'rxjs';
import {isEmpty} from 'rxjs/operators';



@Directive({
  selector: '[NgModel][esAutoValidate],[formArrayName][esAutoValidate],[formControlName][esAutoValidate],[esAutoValidate]'
})
export class AutoValidateDirective implements OnInit, OnDestroy{
  static defaultRenderDivNodeStrategy: RenderDivNodeStrategy = new DefaultRenderDivNodeStrategy();

  @Input('auto-control')
  control: AbstractControl;
  divNode: any;
  isRender: boolean = false;
  @Input()
  separator: string = ',';
  @Input('auto-for')
  for: any;

  valueChangeSubscription: Subscription;
  statusChangeSubscription: Subscription;

  constructor(
    @Inject(ERROR_MESSAGE_TOKEN) private errorMessageMap: ErrorMessageMap,
    @Optional() @Inject(RENDER_DIV_NODE_STRATEGY) private renderDivNodeStrategy: RenderDivNodeStrategy,
    @Optional() @Host() private formControlName: FormControlName,
    @Optional() @Host() private formGroupName: FormGroupName,
    @Optional() @Host() private formArrayName: FormArrayName,
    @Optional() @Host() private ngModel: NgModel,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    if(isNullOrUndefined(this.control)){
      this.control =
        this.formControlName? this.formControlName.control:
        this.formGroupName? this.formArrayName.control:
        this.formArrayName? this.formArrayName.control:
        this.ngModel? this.ngModel.control: null;
    }

    if(isNull(this.control))
      throw new Error('Neel Form Control');

    if(isNullOrUndefined(this.renderDivNodeStrategy))
      this.renderDivNodeStrategy = AutoValidateDirective.defaultRenderDivNodeStrategy;


    // bind event
    if(this.for) this.for = new ElementRef(this.for);
    else this.for = this.elementRef;

    this.renderer.listen(this.for.nativeElement, 'focus', this.onFocus);
    this.renderer.listen(this.for.nativeElement, 'blur', this.onBlur);
    this.statusChangeSubscription = this.control.statusChanges.subscribe(() => this.checkError());

    this.divNode = this.renderer.createElement('div');
    this.renderer.setAttribute(this.divNode, 'id', 'validate-error');
    this.renderer.addClass(this.divNode, 'validate-error');
    this.renderDivNodeStrategy.renderDiv(this.renderer, this.divNode, this.elementRef);
  }

  ngOnDestroy(): void {
    if(this.statusChangeSubscription) this.statusChangeSubscription.unsubscribe();
    if(this.valueChangeSubscription) this.valueChangeSubscription.unsubscribe();
  }

  checkError(): void{
    this.control.markAsTouched();

    if(this.control.invalid && this.control.touched){
      let errorMessage = Object.keys(this.control.errors).map((key: string, index: number, array: string[]) => {
        if(isNullOrUndefined(this.errorMessageMap[key])){
          throw Error(`${key} isn't defined in error message map`);
        }else {
          if(typeof this.errorMessageMap[key] === 'function'){
            const func: any = this.errorMessageMap[key];
            return func.call(this, this.control.errors[key]);
          }
          else
            return this.errorMessageMap[key];
        }
      }).join(this.separator);


      this.renderer.setProperty(this.divNode, 'innerHTML', errorMessage);
      if(!this.isRender){
        this.renderDivNodeStrategy.insertDiv(this.renderer, this.divNode, this.elementRef);
        this.isRender = true;
      }
    }else{
      if(this.isRender){
        this.renderer.removeChild(this.elementRef.nativeElement.parentNode, this.divNode);
        this.isRender = false;
      }
    }
  }



  onFocus = ($event) => {
    this.checkError();
    this.valueChangeSubscription = this.control.valueChanges.subscribe(() => this.checkError());
    // this.statusChangeSubscription = this.control.statusChanges.subscribe(() => this.checkError());
  }

  onBlur = ($event) => {
    if(this.valueChangeSubscription) this.valueChangeSubscription.unsubscribe();
    // if(this.statusChangeSubscription) this.statusChangeSubscription.unsubscribe();
    this.checkError();
  }

}

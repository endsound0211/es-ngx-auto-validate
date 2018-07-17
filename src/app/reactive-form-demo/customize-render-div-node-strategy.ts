import {RenderDivNodeStrategy} from '../auto-validate/render-div-node-strategy';
import {ElementRef, Renderer2} from '@angular/core';

export class CustomizeRenderDivNodeStrategy implements RenderDivNodeStrategy{
  renderDiv(renderer: Renderer2, divNode: any, target: ElementRef){
    renderer.setStyle(divNode, 'color', '#4244a9');
  };

  insertDiv(renderer: Renderer2, divNode: any, target: ElementRef) {
    renderer.appendChild(target.nativeElement.parentNode, divNode);
  };
}

import {ElementRef, InjectionToken, Renderer2} from '@angular/core';

export const RENDER_DIV_NODE_STRATEGY = new InjectionToken<RenderDivNodeStrategy>('RenderDivNode');

export interface RenderDivNodeStrategy {
  renderDiv(renderer: Renderer2, divNode: any, target: ElementRef);
  insertDiv(renderer: Renderer2, divNode: any, target: ElementRef);
}

export class DefaultRenderDivNodeStrategy implements RenderDivNodeStrategy{
  renderDiv(renderer: Renderer2, divNode: any, target: ElementRef){
    renderer.setStyle(divNode, 'color', '#a94442');
  };

  insertDiv(renderer: Renderer2, divNode: any, target: ElementRef) {
    renderer.appendChild(target.nativeElement.parentNode, divNode);
  };
}

import { ElementRef, Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { DynamicOverlay } from './overlay/dynamic-overlay.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { SpinnerOverlayComponent } from '../base-core-ui/controls/spinner-overlay/spinner-overlay.component';

@Injectable()
export class SpinnerOverlayService {
  constructor(private dynamicOverlay: DynamicOverlay) {}

  public showProgressFormData(elRef: ElementRef) {
    if (elRef) {
      const result: ProgressRef = { overlayRef: undefined };
      this.dynamicOverlay.setContainerElement(
        elRef.nativeElement.querySelector('.divFlexParent')
      );
      const positionStrategy = this.dynamicOverlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
      result.overlayRef = this.dynamicOverlay.create({
        positionStrategy: positionStrategy,
        hasBackdrop: true,
      });
      result.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
      return result;
    } else {
      return null;
    }
  }

  public showProgressControl(nativeElement: any) {
    if (nativeElement) {
      const result: ProgressRef = { overlayRef: undefined };
      this.dynamicOverlay.setContainerElement(nativeElement);
      const positionStrategy = this.dynamicOverlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
      result.overlayRef = this.dynamicOverlay.create({
        positionStrategy: positionStrategy,
        hasBackdrop: true,
      });
      result.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
      return result;
    } else {
      return null;
    }
  }

  public hideProgress(result: ProgressRef) {
    if (result && result.overlayRef) {
      try {
        result.overlayRef.detach();
        result.overlayRef.dispose();
      } catch {}
    }
  }
}

export declare type ProgressRef = { overlayRef?: OverlayRef };

import { DecimalPipe } from '@angular/common';
import {
  AfterContentChecked,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Injector,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';
import { CurrencyChars } from '../../consts/common.const';
import { TextBoxControlBase } from '../../models/controls-model';

@Directive({
  selector: '[appTextNumber]',
})
export class NumberFormatDirective implements AfterContentChecked {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  @Input() ngModel: boolean;
  @Input() number: boolean;
  @Input() numberDecimal: number;

  @HostListener('(blur)') onInputBlur() {
    this.inputFocus = false;
    this.format(this.el.nativeElement.value);
  }

  @HostListener('(focus)') onInputFocus($event) {
    this.inputFocus = true;
    if (this.number && $event.target.value !== '') {
      let formatValue = this.stringToNumber($event.target.value);
      if (this.el.nativeElement.value !== formatValue) {
        this.renderer.setProperty(this.el.nativeElement, 'value', formatValue);
        this.ngModelChange.emit(formatValue);
      }
    }
  }

  inputFocus = false;

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    private decimalPipe: DecimalPipe
  ) {}

  ngAfterContentChecked() {
    if (
      !this.inputFocus &&
      this.el.nativeElement.value &&
      this.el.nativeElement.value !== ''
    ) {
      this.format(this.el.nativeElement.value);
    }
  }

  format(val: string) {
    if (this.number && val !== '') {
      // 1. test for non-number characters and replace/remove them
      const numberFormat =
        Math.round(
          parseFloat(String(val).replace(CurrencyChars, '')) *
            Math.pow(10, this.numberDecimal)
        ) / Math.pow(10, this.numberDecimal);

      // 2. format the number (add commas)
      const formatValue = this.decimalPipe.transform(
        numberFormat,
        '1.0-' + this.numberDecimal,
        ''
      );

      // 3. replace the input value with formatted numbers
      this.renderer.setProperty(this.el.nativeElement, 'value', formatValue);

      if (this.el.nativeElement.value !== formatValue) {
        this.ngModelChange.emit(formatValue);
      }
    }
  }

  stringToNumber(numberString: string) {
    if (!numberString) {
      return 0;
    }
    numberString = String(numberString).split(',').join('');
    return Number(numberString.replace(/[^0-9.]/g, ''));
  }
}

export const textBoxValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextBoxComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-text-box',
  styleUrls: ['./text-box.component.scss'],
  templateUrl: './text-box.component.html',
  providers: [textBoxValueAccessor],
})
export class TextBoxComponent
  extends AppBaseControlBaseComponent
  implements AfterContentChecked
{
  isFocused = false;
  isInvalid = false;
  override control: TextBoxControlBase;
  constructor(protected injector: Injector) {
    super(injector);
  }

  override ngAfterContentChecked() {
    this.isInvalid = this.formControl?.invalid && this.formControl?.touched;

    //your code to update the model
    this.cdr.detectChanges();
  }

  focus() {
    this.isFocused = true;
  }

  blurEvent() {
    this.formatPhoneNumber();
    this.formControl?.setValue(this.value);
    this.formControl?.markAsTouched();
    this.formControl?.updateValueAndValidity({ emitEvent: true });
    this.isFocused = false;
  }

  formatPhoneNumber() {
    if (this.control['type'] === 'phone') {
      this.value = this.value
        .split(' ')
        .filter((item: any) => item !== '')
        .join(' ');
    }
  }

  handleKeyPress(event: any) {
    if (this.control['type'] === 'phone') {
      if (event.key === '+' && this.InnerValue !== '') {
        return false;
      }

      const maskSeparator = new RegExp('^[+0-9\\s]');
      return maskSeparator.test(event.key);
    } else if (this.control['type'] === 'number') {
      let maskSeparator = new RegExp('^[.0-9]');

      if (this.control['numberDecimal'] === 0) {
        maskSeparator = new RegExp('^[0-9]');
      }
      return maskSeparator.test(event.key);
    } else return true;
  }
}

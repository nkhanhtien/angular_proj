import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.indexOf('/') > -1) {
      const str = value.split('/');
      // Format DD/MM/YYYY
      var date, month, year;
      if (str.length === 2) {
        date = 1;
        month = Number(str[0]) - 1;
        year = Number(str[1]);
      } else {
        date = Number(str[0]);
        month = Number(str[1]) - 1;
        year = Number(str[2]);
      }
      if (year < 0) {
        year = year * -1;
      }
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      //return date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getDate().toString().padStart(2, '0');
      return (
        date.getDate().toString().padStart(2, '0') +
        '/' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        date.getFullYear().toString()
      );
    } else if (displayFormat === 'inputMonth') {
      return (
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        date.getFullYear()
      );
    } else {
      return date.toDateString();
    }
  }
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    //monthYearLabel: { year: 'numeric', month: 'short' },
    // monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
    monthYearLabel: 'inputMonth',
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

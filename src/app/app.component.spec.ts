import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AppComponent', () => {


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should have menu labels', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const app = fixture.nativeElement;
  //   const menuItems = app.querySelectorAll('ion-label');
  //   expect(menuItems.length).toEqual(12);
  //
  // });

  it('should have urls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(5);

  });

});

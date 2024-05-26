import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    private darkTheme = false;
    paletteToggle = false;

    constructor() {}

    toggleTheme(){
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.initializeDarkPalette(prefersDark.matches);
        prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
    }

    initializeDarkPalette(isDark: any) {
        this.paletteToggle = isDark;
        this.toggleDarkPalette(isDark);
    }

    // toggleChange(ev: any) {
    //     this.toggleDarkPalette(ev.detail.checked);
    // }

    toggleDarkPalette(shouldAdd: any) {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    }

    isDarkTheme(): boolean {
        return this.darkTheme;
    }
}

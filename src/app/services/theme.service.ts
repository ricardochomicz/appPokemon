import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    private darkTheme = false;

    constructor() {}

    toggleTheme() {
        this.darkTheme = !this.darkTheme;
        document.body.classList.toggle('dark-theme', this.darkTheme);
    }

    // private currentThemeSubject: BehaviorSubject<string>;
    //
    // constructor() {
    //     // Inicializa o tema atual com o tema padrão (dark)
    //     this.currentThemeSubject = new BehaviorSubject<string>('dark');
    // }
    //
    // // Obtém o tema atual como um Observable
    // getCurrentTheme() {
    //     return this.currentThemeSubject.asObservable();
    // }
    //
    // // Alterna entre os temas
    // toggleTheme() {
    //     const currentTheme = this.currentThemeSubject.getValue();
    //     const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    //     this.currentThemeSubject.next(newTheme);
    // }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.startFirebaseUi('#firebase-ui');
    }

}

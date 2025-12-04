import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomToastComponent } from '../../components/custom-toast/custom-toast.component';
import { AppComponent } from 'src/app/app.component';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { ThemeName, ThemeService } from '../../services/theme.service';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule, FormsModule, CustomToastComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  mensaje = '';
  isLoading = false;
  @ViewChild('toast') toast: CustomToastComponent = new CustomToastComponent();
currentTheme: ThemeName | null = null;
ngOnInit() {
  this.themeService.theme$.subscribe(theme => {
    console.log('Tema cambiado a:', theme);
    this.currentTheme = theme; // esto ya se actualizará en vivo
  });
}
  constructor(private fb: FormBuilder,  private router: Router,  private themeService:ThemeService) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
        addIcons({
      'logo-google': logoGoogle,
    });
 this.currentTheme = this.themeService.getSavedTheme();

  // Suscribirse a cambios de tema
  this.themeService.theme$.subscribe(theme => {
    console.log('Tema cambiado a:', theme);
    this.currentTheme = theme;
  });
  }





  cargarUsuarioRapido(correo: string, clave: string) {
    this.loginForm.patchValue({ correo, clave });
  }
}

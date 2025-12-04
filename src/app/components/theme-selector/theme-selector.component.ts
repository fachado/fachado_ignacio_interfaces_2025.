import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeName } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule,FormsModule,CustomToastComponent],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent {
  menuOpen = false;
  @ViewChild('toast') toast: CustomToastComponent = new CustomToastComponent();

  // Ajustá las keys al tipo ThemeName que usa tu ThemeService
  themes: { key: ThemeName; label: string; img?: string }[] = [
    { key: 'profesional' as ThemeName, label: 'Pro', img: 'https://cdn-icons-png.flaticon.com/512/5502/5502070.png' },
    { key: 'argentina' as ThemeName,  label: 'Arg', img: 'https://static.vecteezy.com/system/resources/previews/016/328/852/non_2x/argentina-flat-rounded-flag-with-transparent-background-free-png.png' },
    { key: 'naif' as ThemeName,       label: 'Naif', img: 'https://images.vexels.com/media/users/3/185264/isolated/preview/c3b97cd9e9daf30b5b7c7a2ef1bcb7a2-flor-rosa-petalos-finos-planos.png' },
    { key: 'dark' as ThemeName,       label: 'Oscuro', img: 'https://cdn-icons-png.flaticon.com/512/7204/7204190.png' },
    { key: 'light' as ThemeName,      label: 'Claro', img: 'https://cdn-icons-png.flaticon.com/512/4371/4371282.png' },
    { key: 'custom' as ThemeName,     label: 'Custom', img: 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/Settings%20icon.jpg' },
  ];

  constructor(private themeService: ThemeService, private router:Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

selectTheme(theme: ThemeName) {
  console.log("Seleccionado tema:", theme);

  this.themeService.setTheme(theme);

  // Si elige CUSTOM → navegar a la page de personalización
  if (theme === 'custom') {
    console.log("Redirigiendo a /custom-theme");
    this.router.navigate(['/custom-theme']);
  }
}

}

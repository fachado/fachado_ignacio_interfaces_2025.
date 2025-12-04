import { Component, ViewChild } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { VolverComponent } from './components/volver/volver.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { ThemeName, ThemeService } from './services/theme.service';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, VolverComponent, CommonModule, CustomToastComponent,ThemeSelectorComponent],
})
export class AppComponent {
  @ViewChild('toast') toast!: CustomToastComponent;

  showNavbar!: boolean;
  showLogOut!: boolean;
  public static instance: AppComponent;
  currentTheme: ThemeName | null = null;
isSoundPlaying = false;
  isSplash = false;

  constructor(private router: Router,private themeService: ThemeService) {

    
     this.router.events.subscribe(() => {
      this.isSplash = this.router.url === '/splash';
    });
    AppComponent.instance = this;
        this.initTheme();

  }
  ngAfterViewInit() {
    AppComponent.instance = this;
  }
  ngOnInit(): void {
         this.themeService.theme$.subscribe(theme => {
    console.log('Tema cambiado a:', theme);
    this.currentTheme = theme; // esto ya se actualizará en vivo
  });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const rutaActual = event.urlAfterRedirects;
        this.showNavbar = !(rutaActual === '/login' || rutaActual === '/splash' || rutaActual === '/home-supervisor' || rutaActual === '/alta-cliente'
          || rutaActual === '/home-maitre' || rutaActual === '/home-cliente' || rutaActual === '/home-mozo' || rutaActual === '/empleados-home'
        );
      });

    const observer = new MutationObserver(() => {
      this.showNavbar = !document.body.classList.contains('overlay-activo');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

 document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
 this.currentTheme = this.themeService.getSavedTheme();

  // Suscribirse a cambios de tema
  this.themeService.theme$.subscribe(theme => {
    console.log('Tema cambiado a:', theme);
    this.currentTheme = theme;
  });
    // Si clickeaste un ion-button o su contenido interno
    if (target.tagName === 'ION-BUTTON' || target.closest('ion-button')) {
      console.log("hola");
      this.playThemeSound();
    }
  });

  }

playThemeSound() {
  if (this.isSoundPlaying) return;

  this.isSoundPlaying = true;
  setTimeout(() => (this.isSoundPlaying = false), 120); // cooldown

  let soundClick = getComputedStyle(document.documentElement)
    .getPropertyValue('--custom-sound-click')
    .trim();

  let soundPath = '';

  switch (this.currentTheme) {
    case 'light':
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/button-305770.mp3';
      break;
    case 'dark':
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/button-305770.mp3';
      break;
          case 'naif':
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/toy-button-105724.mp3';
      break;
    case 'argentina':
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/car-horn-1-189855.mp3';
      break;
          case 'profesional':
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/mouse-click-198485.mp3';
      break;



    case 'custom':
      console.log("hello",soundClick);
      
      soundPath = soundClick ;
      console.log("dsa",soundPath);
      
      break;
  }

  const audio = new Audio(soundPath);

  // 👉 cortar a los primeros 200 ms (0.2 segundos)
  audio.play().then(() => {
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // resetea para futuros clicks
    }, 2000); // <<<< ajustá este número
  }).catch(() => {});
}






initTheme() {
  const saved = this.themeService.getSavedTheme();
  if (saved === 'custom') {
    // Si es custom, carga todas las variables guardadas
    this.themeService.loadCustomThemeOnStart();
  } else if (saved) {
    // Temas predeterminados
    document.body.setAttribute('theme', saved);
  } else {
    // valor por defecto
    document.body.setAttribute('theme', 'profesional');
  }
}

}

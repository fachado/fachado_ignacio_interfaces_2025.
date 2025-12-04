import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
type ButtonShape = 'rect' | 'soft' | 'capsule' | 'round';

@Component({
  selector: 'app-custom-theme',
  templateUrl: './custom-theme.page.html',
  styleUrls: ['./custom-theme.page.scss'],
  imports:[CommonModule,FormsModule,IonicModule],
})
export class CustomThemePage {
// Modelo del editor (bindings con ngModel)
  model = {
    // colores
    naranja: this.getSaved('naranja', '#FFA552'),
    durazno: this.getSaved('durazno', '#ffcc99'),
    blanco: this.getSaved('blanco', '#fafafa'),
    negro: this.getSaved('negro', '#2b2b2b'),
    rojo: this.getSaved('rojo', '#f25c66'),
    menta: this.getSaved('menta', '#a3d9a5'),

    // tipografía
    font: this.getSaved('font', 'Poppins, sans-serif'),
    fontSize: +(this.getSaved('font-size', '16')),

    // botones (shape and radius/padding)
    buttonShape: (localStorage.getItem('custom-button-shape') as ButtonShape) || 'rect',
    buttonRadius: +this.getSaved('boton-radius', '12'), // ahora es número
    buttonPadding: this.getSaved('boton-padding', '14px 20px'),
    buttonBg: this.getSaved('boton-bg', '#FFA552'),
    buttonText: this.getSaved('boton-text-color', '#ffffff'),

    // imágenes (base64 or url)
    bgImage: this.getSaved('bg-image', ''),
    headerImage: this.getSaved('header-image', ''),
    buttonImage: this.getSaved('button-image', ''),

    // sonido
    soundClick: this.getSaved('sound-click', '')
  };

  // preview area helpers
  preview = {
    sampleText: 'Este es un texto de ejemplo',
    primaryBtnLabel: 'Botón Primario',
    secondaryBtnLabel: 'Secundario'
  };

  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    // si venía tema custom, cargar variables (el service ya lo hace si llamás loadCustomThemeOnStart)
    this.theme.loadCustomThemeOnStart();

    // aplicar atributo theme-shape si existe
    const savedShape = localStorage.getItem('custom-button-shape');
    if (savedShape) {
      document.body.setAttribute('theme-shape', savedShape);
    }
  }

  // helper para obtener valor guardado (prefijo compatible con ThemeService.setCustomVar)
  private getSaved(key: string, fallback: string): string {
    const val = localStorage.getItem(`custom-var-${key}`);
    return val !== null ? val : fallback;
  }

  // cambio directo en vivo (aplica variable y guarda por clave)
  applyVar(key: string, value: string) {
    // guarda como --custom-<key>
    this.theme.setCustomVar(key, value);
    // keep UI in sync
  }

  // botón para aplicar todo el modelo (guardar todas las vars)
  applyAll() {
    // Colores y tipografía
    this.theme.setCustomVar('naranja', this.model.naranja);
    this.theme.setCustomVar('durazno', this.model.durazno);
    this.theme.setCustomVar('blanco', this.model.blanco);
    this.theme.setCustomVar('negro', this.model.negro);
    this.theme.setCustomVar('rojo', this.model.rojo);
    this.theme.setCustomVar('menta', this.model.menta);

    this.theme.setCustomVar('font', this.model.font);
    this.theme.setCustomVar('font-size', this.model.fontSize + 'px');

    // Botón: bg/text/padding/radius
    this.theme.setCustomVar('boton-bg', this.model.buttonBg);
    this.theme.setCustomVar('boton-text-color', this.model.buttonText);
    this.theme.setCustomVar('boton-padding', this.model.buttonPadding);
this.theme.setCustomVar('boton-radius', this.model.buttonRadius + 'px');
    console.log("HOLA?",this.model.buttonRadius);
    // Imágenes (ya vienen como url('data:...') si subiste)
    if (this.model.bgImage) this.theme.setCustomVar('bg-image', this.model.bgImage);
    else this.theme.setCustomVar('bg-image', 'none');

    if (this.model.headerImage) this.theme.setCustomVar('header-image', this.model.headerImage);
    else this.theme.setCustomVar('header-image', 'none');

    if (this.model.buttonImage) this.theme.setCustomVar('button-image', this.model.buttonImage);
    else this.theme.setCustomVar('button-image', 'none');

    // sonido

    // activar tema custom
    this.theme.activateCustomTheme();

    // button shape via body attribute + localStorage (service no tiene método para esto)
    document.body.setAttribute('theme-shape', this.model.buttonShape);
    localStorage.setItem('custom-button-shape', this.model.buttonShape);

    AppComponent.instance.toast.show('Tema personalizado aplicado', 3000);
  }

  // upload image file -> base64 url('data:...') and set in model + apply immediate
  onImageChange(ev: Event, targetKey: string) {
    const input = ev.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = `url('${reader.result}')`;
      // guardo en model como un valor CSS con url(...)
      if (targetKey === 'bg-image') this.model.bgImage = base64;
      if (targetKey === 'header-image') this.model.headerImage = base64;
      if (targetKey === 'button-image') this.model.buttonImage = base64;

      // aplicar YA
      this.theme.setCustomVar(targetKey, base64);
    };
    reader.readAsDataURL(file);
  }

  // upload audio -> base64 string (no url())
  onSoundChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.model.soundClick = base64;
      this.theme.setCustomVar('sound-click', base64);
    };
    reader.readAsDataURL(file);
  }
applyCustomSound(soundChoice: string) {
  if (soundChoice === 'custom-upload') {
    // no hacemos nada todavía, el usuario subirá su propio archivo
    return;
  }

  let soundPath = '';
  console.log("que se yo", soundChoice);
  switch (soundChoice) {
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
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/menu-button-88360.mp3';
      break;
                      case 'burbuja':
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/bloop-2-186531.mp3';
      break;
                            case 'campana':
      soundPath = 'https://xsmqlacsrseatgucpfmd.supabase.co/storage/v1/object/public/imagenes/copper-bell-ding-25-204990.mp3';
      break;
  }
  console.log("que se yo", soundPath);

  // Guardamos la selección en la variable CSS para el AppComponent
    if (this.model.soundClick )
      { 
        this.theme.setCustomVar('sound-click', soundPath);

      }
}
onSoundUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result as string;
    // Guardamos el sonido custom en CSS
      this.theme.setCustomVar('sound-click', dataUrl);
    console.log("CHOTA",dataUrl);
    
  };
  reader.readAsDataURL(file);
}

 changeButtonShape(shape: ButtonShape) {
  console.log('changeButtonShape llamado con shape:', shape);

  this.model.buttonShape = shape;

  let radius = 12;
  switch(shape) {
    case 'rect': radius = 4; break;
    case 'soft': radius = 14; break;
    case 'capsule': radius = 999; break;
    case 'round': radius = 50; break;
  }

  this.model.buttonRadius = radius;
  console.log('Radius calculado:', radius);
  console.log('Modelo actualizado:', this.model);

  // actualizar variable CSS en tiempo real
  this.theme.setCustomVar('boton-radius', radius + 'px');
  console.log('Variable CSS --boton-radius actualizada a:', radius + 'px');

  // guardo la forma para exportar o restaurar
  localStorage.setItem('custom-button-shape', shape);
  console.log('Forma guardada en localStorage:', shape);

  // opcional: si querés que los botones round tengan width/height fijos
  const btns = document.querySelectorAll('ion-button');
  btns.forEach((b, i) => {
    b.classList.remove('rect','soft','capsule','round');
    b.classList.add(shape);
    console.log(`Botón ${i} clases actualizadas:`, b.className);

    if(shape === 'round'){
      (b as HTMLElement).style.width = '70px';
      (b as HTMLElement).style.height = '70px';
      (b as HTMLElement).style.padding = '0';
      console.log(`Botón ${i} estilo round aplicado`);
    } else {
      (b as HTMLElement).style.width = '';
      (b as HTMLElement).style.height = '';
      (b as HTMLElement).style.padding = '';
      console.log(`Botón ${i} estilos reset para shape ${shape}`);
    }
  });

  console.log('--- changeButtonShape terminado ---');
}



  // reset completo (service limpia custom vars)
  resetAll() {
    this.theme.resetCustomTheme();
    localStorage.removeItem('custom-button-shape');
    document.body.removeAttribute('theme-shape');

    // recargar valores por defecto en modelo
    this.model = {
      naranja: '#FFA552',
      durazno: '#ffcc99',
      blanco: '#fafafa',
      negro: '#2b2b2b',
      rojo: '#f25c66',
      menta: '#a3d9a5',
      font: 'Poppins, sans-serif',
      fontSize: 16,
      buttonShape: 'rect',
buttonRadius: parseInt(this.getSaved('boton-radius', '12')) || 12,
      buttonPadding: '14px 20px',
      buttonBg: '#FFA552',
      buttonText: '#ffffff',
      bgImage: '',
      headerImage: '',
      buttonImage: '',
      soundClick: ''
    };

    AppComponent.instance.toast.show('Tema custom reseteado', 2500);
  }

  // exportar tema a JSON (descargar)
  exportTheme() {
    // recolectar todas las custom-vars actuales (basadas en keys que usamos)
    const exportObj: any = { meta: { exportedAt: new Date().toISOString() } };

    // claves que manejamos
    const keys = [
      'naranja','durazno','blanco','negro','rojo','menta',
      'font','font-size','boton-bg','boton-text-color','boton-padding','boton-radius',
      'bg-image','header-image','button-image','sound-click'
    ];

    keys.forEach(k => {
      const v = localStorage.getItem(`custom-var-${k}`);
      if (v !== null) exportObj[k] = v;
    });

    // add button shape
    const shape = localStorage.getItem('custom-button-shape');
    if (shape) exportObj['button-shape'] = shape;

    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    AppComponent.instance.toast.show('Tema exportado (descarga iniciada)', 2000);
  }

  // importar tema desde archivo JSON
  importThemeFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result as string);
        // aplicar cada clave
        Object.keys(obj).forEach(k => {
          if (k === 'button-shape') {
            this.changeButtonShape(obj[k] as ButtonShape);
            return;
          }
          if (k === 'meta') return;
          this.theme.setCustomVar(k, obj[k]);
        });
        this.theme.activateCustomTheme();
        AppComponent.instance.toast.show('Tema importado y aplicado', 2500);
      } catch (e) {
        AppComponent.instance.toast.show('Archivo inválido', 3000);
      }
    };
    reader.readAsText(file);
  }
 



shapeToRadius(shape: ButtonShape, radius: number): string {
  switch(shape) {
    case 'rect': return `${radius || 4}px`;
    case 'soft': return `${radius || 14}px`;
    case 'capsule': return '999px';
    case 'round': return '50%';
    default: return `${radius || 4}px`;
  }
}


}

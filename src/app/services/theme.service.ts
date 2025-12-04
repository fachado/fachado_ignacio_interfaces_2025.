import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeName = 'profesional'|'argentina'|'naif'|'dark'|'light'|'custom';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private localKey = 'app-theme';
  private customKeyPrefix = 'custom-var-';
  
  // Observable para emitir cambios de tema
  private themeSubject = new BehaviorSubject<ThemeName>(this.getSavedTheme() || 'light');
  theme$ = this.themeSubject.asObservable();

  constructor() {}

  /* ==========================================================
     TEMA NORMAL
  ========================================================== */
  getSavedTheme(): ThemeName | null {
    return (localStorage.getItem(this.localKey) as ThemeName) || null;
  }

  setTheme(theme: ThemeName) {
        document.body.setAttribute('theme', theme);

    localStorage.setItem(this.localKey, theme);
    this.themeSubject.next(theme); 
  }

  /* ==========================================================
     TEMA CUSTOM — Guardado, lectura y limpieza
  ========================================================== */

 
  setCustomVar(name: string, value: string) {
    const cssName = `--custom-${name}`;

  
    document.documentElement.style.setProperty(cssName, value);

  
    localStorage.setItem(this.customKeyPrefix + name, value);
  }

  
  activateCustomTheme() {
    this.setTheme('custom');
  }

  
  loadCustomThemeOnStart() {
    const theme = this.getSavedTheme();

    if (theme !== 'custom') return;

    const prefix = this.customKeyPrefix;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;

      if (key.startsWith(prefix)) {
        const varName = key.replace(prefix, '');
        const value = localStorage.getItem(key)!;

        document.documentElement.style.setProperty(`--custom-${varName}`, value);
      }
    }

  
    this.setTheme('custom');
  }

  
  resetCustomTheme() {
    const prefix = this.customKeyPrefix;

    const keysToRemove: string[] = [];


    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

  
    keysToRemove.forEach(k => localStorage.removeItem(k));

 
    keysToRemove.forEach(k => {
      const varName = k.replace(prefix, '');
      document.documentElement.style.removeProperty(`--custom-${varName}`);
    });
  }

  getCssVar(name: string) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

}

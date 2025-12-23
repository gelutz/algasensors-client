import { PrimeNG } from "primeng/config";

export class ThemeProvider {
  catppuccinMocha = {
    primary: '#89b4fa',
    surface: '#1e1e2e'
  };

  catppuccinLatte = {
    primary: '#1e66f5',
    surface: '#eff1f5'
  };

  switchTheme(primeng: PrimeNG, theme: 'mocha' | 'latte') {
    primeng.theme.set(
      theme === 'mocha' ? this.catppuccinMocha : this.catppuccinLatte
    )
  }
}

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
appId: 'com.fachado.temasdemo',
appName: 'InterProto',
  webDir: 'www',
    plugins: {
    BarcodeScannerPlugin: {
      cameraPermission: 'required'
    }
  }
};

export default config;

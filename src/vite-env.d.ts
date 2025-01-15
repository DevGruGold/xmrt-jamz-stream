/// <reference types="vite/client" />

interface Bluetooth {
  requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
}

interface Navigator {
  bluetooth: Bluetooth;
}

interface Window {
  ethereum?: import('ethers').Eip1193Provider;
}
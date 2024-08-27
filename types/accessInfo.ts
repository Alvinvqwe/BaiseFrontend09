export interface DeviceInfo {
  name?: string;
  version?: string;
  layout?: string;
  os?: {
    family?: string;
    version?: string;
    architecture?: number;
  };
  product?: string;
  manufacturer?: string;
}

export interface AccessInfo {
  Browser: string;
  OS: string;
  Device: string;
  IP: string;
  [key: string]: string;
  // expire: string;
}

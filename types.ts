
export interface Asset {
  id: string;
  name: string;
  type: 'flyer' | 'font' | 'logo' | 'rider';
  url: string;
  previewUrl?: string;
  description: string;
}

export interface PaymentLink {
  id: string;
  platform: 'Venmo' | 'Zelle' | 'PayPal';
  handle: string;
  qrCode?: string;
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Vendor {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  category: 'Sound' | 'Lighting' | 'Local' | 'Other';
}


import { Asset, PaymentLink, Vendor } from './types';

export const GOOGLE_DRIVE_URL = 'https://drive.google.com/drive/folders/1bCN1EHn0k21pWg4a7pmvXiduZ5J44hlE?usp=sharing';
export const GOOGLE_DRIVE_EMBED_URL = 'https://drive.google.com/embeddedfolderview?id=1bCN1EHn0k21pWg4a7pmvXiduZ5J44hlE#list';

export const ASSET_FOLDERS = [
  { name: 'Templates', url: 'https://drive.google.com/drive/folders/1Q8tEsMYrdNHaXBfkyBh16_k_EQAMLbrR?usp=sharing' },
  { name: 'Fonts', url: 'https://drive.google.com/drive/folders/1zRnhg29RVjrj5qUebQJGSDKXueRgkzj8?usp=sharing' },
  { name: 'Backgrounds', url: 'https://drive.google.com/drive/folders/1MOY03iWzKpXbf8C_ZJqmu9bDM0BWrwgA?usp=sharing' },
  { name: 'Logos', url: 'https://drive.google.com/drive/folders/117OpWZMW4S7l4PnsdfQ3FFOkeCTzW3iw?usp=sharing' }
];

export const ASSETS: Asset[] = [
  {
    id: '1',
    name: 'Summer Tour Flyer 2024',
    type: 'flyer',
    url: '#',
    previewUrl: 'https://picsum.photos/seed/neon1/400/600',
    description: 'High-res poster for the upcoming summer tour. Editable PSD available.'
  },
  {
    id: '2',
    name: 'Neon Blonde Branding Kit',
    type: 'logo',
    url: '#',
    previewUrl: 'https://picsum.photos/seed/neon2/400/400',
    description: 'Vector logos in various neon colorways.'
  },
  {
    id: '3',
    name: 'Main Stage Font (Orbitron)',
    type: 'font',
    url: 'https://fonts.google.com/specimen/Orbitron',
    description: 'The primary display font used for all band marketing.'
  },
  {
    id: '4',
    name: 'Technical Rider 2024',
    type: 'rider',
    url: '#',
    description: 'Detailed stage plot, input list, and catering requirements.'
  }
];

export const PAYMENTS: PaymentLink[] = [
  {
    id: 'p1',
    platform: 'Venmo',
    handle: '@NeonBlondeBand',
    link: 'https://venmo.com/code?user_id=NeonBlondeBand',
    // Updated to use Venmo Blue color (0074DE) and white background
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://venmo.com/u/NeonBlondeBand&ecc=M&color=0074DE&bgcolor=ffffff&margin=10'
  },
  {
    id: 'p2',
    platform: 'PayPal',
    handle: 'paypal.me/NeonBlonde',
    link: 'https://paypal.me/NeonBlonde',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://paypal.me/NeonBlonde&margin=10&color=003087'
  }
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Audio Elite',
    role: 'Primary Sound Provider',
    email: 'contact@audioelite.com',
    phone: '555-123-4567',
    category: 'Sound'
  },
  {
    id: 'v2',
    name: 'Prism Lights',
    role: 'Visuals & Lighting',
    email: 'info@prismlights.io',
    category: 'Lighting'
  },
  {
    id: 'v3',
    name: 'Global Touring',
    role: 'Logistics Partner',
    email: 'ops@globaltouring.com',
    category: 'Other'
  }
];

export const BAND_INFO_MD = `
# Neon Blonde - Electronic/Synth-Wave Project

## Band Members
- **LUNA** (Vocals, Synths)
- **SOL** (Drums, Percussion)
- **NOVA** (Bass, Sequences)

## Standard Set Times
- Opening Set: 45 minutes
- Headline Set: 75-90 minutes

## Technical Requirements (Rider)
- High-quality PA system with subwoofer support.
- Minimum 3 DI lines for synths/bass.
- Drum monitor sub.
- IEM system (provided by band, needs local split).

## Booking Information
- Manager: Rickey
- Email: rickey@neonblonde.com
- Standard Rate: $2,500 - $5,000 (varies by venue size/location)

## Latest Release
- Album: "Digital Sunset" (2024)
- Lead Single: "Midnight Frequency"
`;

export interface GymConfig {
  brand: {
    name: string;
    slogan: string;
    hotline: string;
    zalo: string;
    email: string;
    address: string;
    openHours: string;
    mapEmbedUrl: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  pricing: Array<{
    id: string;
    name: string;
    originalPrice: number;
    promoPrice: number;
    features: string[];
    tag: string;
  }>;
  classes: string[];
  promotions: {
    bannerText: string;
    isActive: boolean;
  };
}

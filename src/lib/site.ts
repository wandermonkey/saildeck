/**
 * Single source of truth for business facts. Nav, footer, schema.org markup
 * and every WhatsApp link read from here, so a phone number or address is a
 * one-line change.
 */
export const site = {
  name: "Saildeck",
  legalName: "Saildeck Marine",
  tagline: "Yacht charters, speedboats and marine services across India",
  description:
    "Saildeck offers luxury yacht charters, speedboat transfers, yacht sales and complete marine services in Mumbai, Goa and Navi Mumbai. Private charters from the Gateway of India, Elephanta and Alibaug speedboat runs, yacht management, refit and a certified sailing school.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.saildeck.com",

  phone: "+918424848489",
  phoneDisplay: "+91 84248 48489",
  whatsapp: "918424848489", // digits only, country code first — for wa.me links
  email: "info@saildeck.com",

  address: {
    street: "Gateway of India, Apollo Bandar, Colaba",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "IN",
  },
  geo: { lat: 18.9219, lng: 72.8347 },

  hours: "Mo-Su 07:00-22:00",
  priceRange: "₹₹₹",

  /** Shown in the Google reviews block. Update when the real count moves. */
  rating: { value: 4.9, count: 287 },

  social: {
    instagram: "https://www.instagram.com/saildeck",
    facebook: "https://www.facebook.com/saildeck",
    youtube: "https://www.youtube.com/@saildeck",
    linkedin: "https://www.linkedin.com/company/saildeck",
  },
} as const;

/** Builds a wa.me deep link with a pre-filled, context-aware message. */
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ?? "Hi Saildeck! I would like to check availability and pricing."
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export const telLink = `tel:${site.phone}`;
export const mailLink = `mailto:${site.email}`;

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

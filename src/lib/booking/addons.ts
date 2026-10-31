/** Fixed add-on catalog offered in the cart. Prices are indicative — shown
 *  with a disclaimer wherever add-ons are listed, since what's actually
 *  available depends on the boat and the day. */

export type AddonId =
  | "water"
  | "ice"
  | "foilBalloon"
  | "proposalDecor"
  | "flowerDecor"
  | "fruitChampagne"
  | "cake"
  | "dj"
  | "guitarist"
  | "photographer";

export type AddonDef = {
  id: AddonId;
  label: string;
  price: number;
};

export const ADDONS: AddonDef[] = [
  { id: "water", label: "Mineral Water", price: 0 },
  { id: "ice", label: "Ice", price: 0 },
  { id: "foilBalloon", label: "Basic Foil Balloon Decor", price: 0 },
  { id: "proposalDecor", label: "Proposal Decor", price: 5000 },
  { id: "flowerDecor", label: "Flower Decor", price: 4000 },
  { id: "fruitChampagne", label: "Fruit Champagne", price: 600 },
  { id: "cake", label: "Cake (500 gms)", price: 600 },
  { id: "dj", label: "DJ", price: 18000 },
  { id: "guitarist", label: "Guitarist", price: 12000 },
  { id: "photographer", label: "Photographer", price: 10000 },
];

export function getAddon(id: string): AddonDef | undefined {
  return ADDONS.find((a) => a.id === id);
}

/** Shown wherever add-ons are priced — in the cart, checkout and the
 *  WhatsApp/admin notification — so nobody mistakes these for locked prices. */
export const ADDONS_DISCLAIMER =
  "*Add-on prices shown are indicative. We'll confirm exact availability and final pricing with you on WhatsApp before your charter.";

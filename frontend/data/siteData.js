import {
  Wallet,
  RefreshCw,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const SERVICES = [
  {
    icon: Wallet,
    title: "Financing",
    copy: "Rates built around your actual budget, not a teaser number. We work with a panel of lenders and walk you through every term before you sign anything.",
  },
  {
    icon: RefreshCw,
    title: "Trade-In",
    copy: "Bring your current car in and we'll appraise it on the spot - a real number, on the day, that comes straight off the price of your next one.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty",
    copy: "Every vehicle leaves here with coverage on the drivetrain, and extended plans are available if you want the peace of mind to go further.",
  },
  {
    icon: Truck,
    title: "Delivery",
    copy: "Can't make it to the showroom? We'll bring the car to you - anywhere in the region - and walk you through it in your own driveway.",
  },
];

export const NAV_LINKS = [
  { label: "Inventory", href: "#inventory" },
  { label: "Services", href: "#services" },
  { label: "Story", href: "#story" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const CATEGORY_COLOR = {
  Coupe: "#c9a768",
  Sedan: "#8fa3b0",
  SUV: "#8a9468",
};

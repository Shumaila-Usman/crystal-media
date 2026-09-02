import { LocationServicePage, generateLocationMetadata } from "@/components/services/LocationServicePage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocationMetadata("islamabad");
}

export default function IslamabadServicesPage() {
  return <LocationServicePage slug="islamabad" />;
}

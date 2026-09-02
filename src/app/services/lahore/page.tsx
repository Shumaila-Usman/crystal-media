import { LocationServicePage, generateLocationMetadata } from "@/components/services/LocationServicePage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocationMetadata("lahore");
}

export default function LahoreServicesPage() {
  return <LocationServicePage slug="lahore" />;
}

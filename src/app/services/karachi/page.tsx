import { LocationServicePage, generateLocationMetadata } from "@/components/services/LocationServicePage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocationMetadata("karachi");
}

export default function KarachiServicesPage() {
  return <LocationServicePage slug="karachi" />;
}

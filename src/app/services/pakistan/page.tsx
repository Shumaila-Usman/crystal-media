import { LocationServicePage, generateLocationMetadata } from "@/components/services/LocationServicePage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocationMetadata("pakistan");
}

export default function PakistanServicesPage() {
  return <LocationServicePage slug="pakistan" />;
}

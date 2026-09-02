"use client";

import { use } from "react";
import { TalentForm } from "@/components/admin/TalentForm";

export default function EditTalentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <TalentForm talentId={id} />;
}

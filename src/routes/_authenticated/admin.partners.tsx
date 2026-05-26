import { createFileRoute } from "@tanstack/react-router";
import { InquiriesList } from "@/components/admin/InquiriesList";

export const Route = createFileRoute("/_authenticated/admin/partners")({
  component: () => <InquiriesList kind="partner" title="Partner inquiries" />,
});

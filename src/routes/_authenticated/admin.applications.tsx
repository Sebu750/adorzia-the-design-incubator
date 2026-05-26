import { createFileRoute } from "@tanstack/react-router";
import { InquiriesList } from "@/components/admin/InquiriesList";

export const Route = createFileRoute("/_authenticated/admin/applications")({
  component: () => <InquiriesList kind="spotlight" title="Spotlight applications" />,
});

import { createFileRoute } from "@tanstack/react-router";
import { InquiriesList } from "@/components/admin/InquiriesList";

export const Route = createFileRoute("/_authenticated/admin/contact")({
  component: () => <InquiriesList kind="contact" title="Contact inquiries" />,
});

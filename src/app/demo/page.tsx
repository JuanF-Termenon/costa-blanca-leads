import { DemoPageContent } from "@/components/demo-page-content";

export default async function DemoPage(props: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await props.searchParams;
  return <DemoPageContent initialRef={ref} />;
}

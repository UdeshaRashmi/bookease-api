import { ServiceDetails } from '@/features/services/components/service-details';

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  return <ServiceDetails serviceId={id} />;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  doctorName: string;
  duration: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  doctorName?: string;
  duration: number;
  price: number;
  isActive?: boolean;
}

export type UpdateServiceRequest = Partial<CreateServiceRequest>;

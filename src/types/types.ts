export type RecordId = string | number;

export type SecurityConfig = {
  jwt_secret: string;
};

export type KafkaConfig = {
  brokers: string[];
  groupId: string;
};

export type GenderOptions = 'male' | 'female' | 'others';

export interface RequestPasswordResponse {
  message: string;
}

export interface ValidationError {
  error: string;
  message: string;
}

export interface CalcPaginationType {
  limit: number;
  offset: number;
}

export interface ResultSetMeta {
  limit: number;
  offset: number;
  page: number;
}

export interface PaginationData<T> {
  total_items: number;
  data_response?: T | T[];
  total_pages: number;
  current_page: number;
}

export interface IAuthUser {
  first_name: number;
  email: string;
  last_name: number;
  id: number;
}

export interface IOrderUser {
  order_id: string;
  actual_final_amount: string;
  payment_status: number;
  status: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PICKUP = 'PICKUP',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const OrderStatusDB = [
  'PENDING',
  'PICKUP',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
];

export const DeliveryStatusDB = ['NOW', 'LATER'];

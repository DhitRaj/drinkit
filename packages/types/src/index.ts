/**
 * Shared domain types — only enums/roles documented in PRD/architecture.
 * Detailed DTOs land when API Specification columns/payloads are authored.
 */

export type UserRole =
  | 'CUSTOMER'
  | 'STORE_OWNER'
  | 'STORE_STAFF'
  | 'DELIVERY_PARTNER'
  | 'ADMIN'
  | 'OPS'
  | 'SUPPORT'
  | 'COMPLIANCE'
  | 'FINANCE';

export type ApiErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'COMPLIANCE_BLOCKED'
  | 'SERVICE_UNAVAILABLE'
  | 'CONFLICT'
  | 'INTERNAL_ERROR';

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  pageSize?: number;
}

/** Order status machine — high-level states from product flows; expand with API spec. */
export type OrderStatus =
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'CONFIRMED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'PACKED'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'UNDELIVERED_RETURNED';

export type VerificationStatus = 'PENDING' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';

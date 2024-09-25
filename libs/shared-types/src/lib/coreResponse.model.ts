export interface CoreResponse<T> {
  status: 'success' | 'fail';
  message?: string;
  data: T | null | undefined;
  errors?: string[];
}

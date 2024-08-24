export interface ResponseData<T> {
  status: boolean | number;
  message: string;
  data?: any;
  // data?: T | T[];
}

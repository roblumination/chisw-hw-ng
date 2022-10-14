import { LoadingStatus } from '../models/common.types';

export default interface ItemsState<T> {
  items: Array<T>;
  selectedItemId: number;
  status: LoadingStatus;
  error: string;
}

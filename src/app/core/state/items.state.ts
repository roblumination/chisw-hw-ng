import { LoadingStatus } from '../models/LoadingStatus.type';

export default interface ItemsState<T> {
  items: Array<T>;
  selectedItemId: number;
  status: LoadingStatus;
  error: string;
}

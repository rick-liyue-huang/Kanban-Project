import { Models } from 'appwrite';

export interface BoardI {
  columns: Map<ColumnType, ColumnValue>;
}

export type ColumnType = 'plan' | 'inprocess' | 'completed';

export interface ColumnValue {
  id: ColumnType;
  tasks: TaskI[];
}

export interface TaskI {
  $id: string;
  $createdAt: string;
  title: string;
  status: ColumnType;
  image?: ImageI;
}

export interface ImageI {
  bucketId: string;
  fileId: string;
}

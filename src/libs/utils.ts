import { BoardI, ColumnType, ColumnValue } from '@/types/typings';
import { databases } from '../../appwrite-config';

export const getTasksGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_COLLECTION_TASKS_ID as string
  );
  console.log(data);

  const tasks = data.documents;

  const columns = tasks.reduce((acc: any, task: any) => {
    if (!acc.get(task.status)) {
      acc.set(task.status, {
        id: task.status,
        tasks: [],
      });
    }

    acc.get(task.status)!.tasks.push({
      $id: task.$id,
      $createdAt: task.$createdAt,
      title: task.title,
      status: task.status,
      // get image if exists
      ...(task.image && { image: JSON.parse(task.image) }),
    });

    return acc;
  }, new Map<ColumnType, ColumnValue>());

  console.log(columns);

  // if columns does not match the status, add them with empty tasks
  const columnTypes: ColumnType[] = ['plan', 'inprocess', 'completed'];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        tasks: [],
      });
    }
  }

  // sort tasks by createdAt
  const sortedColumns = new Map<ColumnType, ColumnValue>(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: BoardI = {
    columns: sortedColumns,
  };

  return board;
};

/**
 *
 *
 */

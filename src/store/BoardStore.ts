import { create } from 'zustand';
import { BoardI, ColumnType, ColumnValue } from '@/types/typings';
import { getTasksGroupedByColumn } from '@/libs/utils';

interface BoardState {
  board: BoardI;
  getBoard: () => void;
  setBoard: (board: BoardI) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<ColumnType, ColumnValue>(),
  },
  getBoard: async () => {
    const board = await getTasksGroupedByColumn();
    set({ board });
  },
  setBoard: (board) => set({ board }),
}));

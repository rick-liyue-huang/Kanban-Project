'use client';

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { ColumnValue } from '@/types/typings';

export default function Board() {
  const [board, getBoard, setBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);

  useEffect(() => {
    // get board
    getBoard();
  }, [getBoard]);

  console.log('board: ', board);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // console.log('result: ', result);
    // console.log('destination: ', destination);
    // console.log('source: ', source);
    // console.log('type: ', type);

    // drag to outside of board
    if (!destination) return;

    if (type === 'column') {
      // drag column
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoard({ ...board, columns: rearrangedColumns });
    }

    // this step is needed as the indexes are stored as numbers 0,1,2 instead of 'id's with DND library
    const columns = Array.from(board.columns);
    const startColumnIndex = columns[Number(source.droppableId)];
    const finishColumnIndex = columns[Number(destination.droppableId)];

    const startColumn: ColumnValue = {
      id: startColumnIndex[0],
      tasks: startColumnIndex[1].tasks,
    };

    const finishColumn: ColumnValue = {
      id: finishColumnIndex[0],
      tasks: finishColumnIndex[1].tasks,
    };

    // keep on the same column
    if (!startColumn || !finishColumn) return;
    if (source.index === destination.index && startColumn === finishColumn) {
      console.log('same column');
      return;
    }

    console.log(startColumn, finishColumn);

    const newTasks = startColumn.tasks;
    const [removedTask] = newTasks.splice(source.index, 1);

    if (startColumn.id === finishColumn.id) {
      // if on the same column
      newTasks.splice(destination.index, 0, removedTask);
      const newColumn = { id: startColumn.id, tasks: newTasks };
      const newColumns = new Map(board.columns);
      newColumns.set(startColumn.id, newColumn);

      setBoard({ ...board, columns: newColumns });
    } else {
      // if on different column
      finishColumn.tasks.splice(destination.index, 0, removedTask);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} tasks={column.tasks} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

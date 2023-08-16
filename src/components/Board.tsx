'use client';

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

export default function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    // get board
    getBoard();
  }, [getBoard]);

  console.log('board: ', board);

  const handleOnDragEnd = (e: DropResult) => {};

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

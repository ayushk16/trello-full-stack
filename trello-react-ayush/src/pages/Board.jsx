import React from 'react';

import { useParams } from 'react-router-dom';
import BoardView from '../components/Boards/BoardView';

const Board = () => {
  const { id } = useParams();
  return (
    <div>
      <BoardView id={id} />
    </div>
  );
};

export default Board;

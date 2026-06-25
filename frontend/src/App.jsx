import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import api from './api';
import Board from './components/Board';

function Home() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState('');

  const fetchBoards = () => {
    api.get('/boards').then(res => setBoards(res.data));
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const createBoard = (e) => {
    e.preventDefault();
    api.post('/boards', { title }).then(() => {
      setTitle('');
      fetchBoards();
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Boards</h1>
      <form onSubmit={createBoard} className="mb-4 flex gap-2">
        <input
          className="border p-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New Board Name"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Create Board
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {boards.map(board => (
          <Link
            key={board.id}
            to={`/board/${board.id}`}
            className="p-4 bg-blue-100 rounded shadow hover:bg-blue-200 font-semibold"
          >
            {board.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board/:id" element={<Board />} />
    </Routes>
  );
}

export default App;
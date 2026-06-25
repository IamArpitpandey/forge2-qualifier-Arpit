import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import CardModal from './CardModal';
import AddCard from './AddCard';

function Board() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [newListTitle, setNewListTitle] = useState('');

  const fetchData = () => {
    api.get(`/boards/${id}`).then(res => setBoard(res.data));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addList = (e) => {
    e.preventDefault();
    api.post('/lists', { title: newListTitle, board_id: id, position: 0 }).then(() => {
      setNewListTitle('');
      fetchData();
    });
  };

  const moveCard = (cardId, listId) => {
    api.patch(`/cards/${cardId}/move`, { list_id: listId }).then(fetchData);
  };

  if (!board) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-400 mb-4 block">← Back to Boards</Link>
      <h1 className="text-2xl font-bold mb-4 text-white">{board.title}</h1>

      <form onSubmit={addList} className="mb-4 flex gap-2">
        <input
          className="border p-2 rounded"
          value={newListTitle}
          onChange={e => setNewListTitle(e.target.value)}
          placeholder="New List Name"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add List</button>
      </form>

      <div className="flex gap-4 overflow-x-auto">
        {board.lists && board.lists.map(list => (
          <div key={list.id} className="w-72 bg-gray-700 p-3 rounded shrink-0">
            <h2 className="font-bold mb-2 text-white">{list.title}</h2>
            {list.cards && list.cards.map(card => {
              const overdue = card.due_date && new Date(card.due_date) < new Date();
              return (
                <div
                  key={card.id}
                  className={`p-3 bg-white rounded shadow mb-2 cursor-pointer ${overdue ? 'border-2 border-red-500' : ''}`}
                  onClick={() => setEditingCard(card)}
                >
                  <p className="font-semibold">{card.title}</p>
                  {card.due_date && (
                    <small className={`block ${overdue ? 'text-red-500' : 'text-gray-500'}`}>
                      Due: {new Date(card.due_date).toLocaleDateString()}
                    </small>
                  )}
                  {card.member && <small className="block text-blue-600">👤 {card.member.name}</small>}
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {card.tags && card.tags.map(t => (
                      <span key={t.id} className="px-1 text-xs rounded text-white" style={{backgroundColor: t.color}}>{t.name}</span>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-2">
                    {board.lists.filter(l => l.id !== list.id).map(l => (
                      <button
                        key={l.id}
                        onClick={e => { e.stopPropagation(); moveCard(card.id, l.id); }}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        → {l.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            <AddCard listId={list.id} onAdded={fetchData} />
          </div>
        ))}
      </div>

      {editingCard && (
        <CardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onUpdate={fetchData}
        />
      )}
    </div>
  );
}

export default Board;
import { useState } from 'react';
import api from '../api';

function AddCard({ listId, onAdded }) {
  const [title, setTitle] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/cards', { list_id: listId, title });
    setTitle('');
    onAdded();
  };

  return (
    <form onSubmit={submit} className="mt-2">
      <input 
        className="w-full border p-1"
        placeholder="New card title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </form>
  );
}

export default AddCard;

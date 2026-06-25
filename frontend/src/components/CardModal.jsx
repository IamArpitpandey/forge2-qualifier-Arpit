import { useState, useEffect } from 'react';
import api from '../api';

function CardModal({ card, onClose, onUpdate }) {
  const [data, setData] = useState(card);
  const [members, setMembers] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.get('/members').then(res => setMembers(res.data));
    api.get('/tags').then(res => setTags(res.data));
  }, []);

  const save = async () => {
    await api.put(`/cards/${card.id}`, data);
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Edit Card</h2>
        <input className="w-full border p-2 mb-2" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
        <textarea className="w-full border p-2 mb-2" value={data.description || ''} onChange={e => setData({...data, description: e.target.value})} />
        <input type="date" className="w-full border p-2 mb-2" value={data.due_date?.split('T')[0] || ''} onChange={e => setData({...data, due_date: e.target.value})} />
        
        <select className="w-full border p-2 mb-2" value={data.member_id || ''} onChange={e => setData({...data, member_id: e.target.value})}>
            <option value="">Select Member</option>
            {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        
        <div className="flex gap-2 mb-4">
            {tags.map(t => (
                <button key={t.id} className="p-1 rounded text-white text-xs" style={{backgroundColor: t.color}}>{t.name}</button>
            ))}
        </div>

        <div className="flex gap-2">
            <button onClick={save} className="bg-blue-500 text-white p-2 rounded">Save</button>
            <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;

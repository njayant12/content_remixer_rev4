import React, { useEffect, useState } from 'react';
import { getSavedTweets, deleteTweet, updateTweet } from '../api/tweets';

export default function SavedTweetsSidebar({ isOpen, onClose, refreshKey }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const data = await getSavedTweets();
      setTweets(data);
    } catch (e) {
      alert('Failed to fetch saved tweets');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) fetchTweets();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) fetchTweets();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    await deleteTweet(id);
    setTweets(tweets.filter(t => t.id !== id));
  };

  const handleTweet = (tweet) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(url, '_blank');
  };

  const handleEdit = (tweet) => {
    setEditingId(tweet.id);
    setEditValue(tweet.text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleEditSave = async (id) => {
    try {
      await updateTweet(id, editValue);
      setTweets(tweets.map(t => t.id === id ? { ...t, text: editValue } : t));
      setEditingId(null);
      setEditValue('');
    } catch (e) {
      alert('Failed to update tweet');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ overflowY: 'auto' }}
    >
      <button className="absolute top-2 right-2" onClick={onClose}>✕</button>
      <h2 className="text-xl font-bold p-4 border-b">Saved Tweets</h2>
      {loading ? (
        <div className="p-4">Loading...</div>
      ) : (
        <ul>
          {tweets.map(tweet => (
            <li key={tweet.id} className="p-4 border-b">
              {editingId === tweet.id ? (
                <>
                  <textarea
                    className="w-full p-2 border rounded mb-2"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-2xl font-medium shadow hover:bg-blue-600 transition"
                      onClick={() => handleEditSave(tweet.id)}
                    >Save</button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl font-medium shadow hover:bg-gray-400 transition"
                      onClick={handleEditCancel}
                    >Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{tweet.text}</span>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-red-500 px-3 py-1 rounded-2xl hover:bg-red-100 transition"
                      onClick={() => handleDelete(tweet.id)}
                      title="Delete"
                    >🗑️</button>
                    <button
                      className="px-4 py-2 bg-sky-500 text-white rounded-2xl font-medium shadow hover:bg-sky-600 transition"
                      onClick={() => handleTweet(tweet.text)}
                      title="Tweet"
                    >Tweet</button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl font-medium shadow hover:bg-gray-400 transition"
                      onClick={() => handleEdit(tweet)}
                      title="Edit"
                    >Edit</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 
import React, { useState } from 'react';
import { saveTweet } from '../api/tweets';

export default function GeneratedTweets({ tweets, onTweetSaved }) {
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleSave = async (tweet) => {
    try {
      await saveTweet(tweet);
      if (onTweetSaved) onTweetSaved();
    } catch (e) {
      alert('Failed to save tweet');
    }
  };

  const handleTweet = (tweet) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(url, '_blank');
  };

  const startEdit = (idx, tweet) => {
    setEditingIdx(idx);
    setEditValue(tweet);
  };

  const cancelEdit = () => {
    setEditingIdx(null);
    setEditValue('');
  };

  return (
    <div>
      {tweets.map((tweet, idx) => (
        <div key={idx} className="p-4 border-b">
          {editingIdx === idx ? (
            <>
              <textarea
                className="w-full p-2 border rounded mb-2"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-2xl font-medium shadow hover:bg-blue-600 transition"
                  onClick={() => { handleSave(editValue); cancelEdit(); }}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-sky-500 text-white rounded-2xl font-medium shadow hover:bg-sky-600 transition"
                  onClick={() => { handleTweet(editValue); cancelEdit(); }}
                >
                  Tweet
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl font-medium shadow hover:bg-gray-400 transition"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span>{tweet}</span>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-2xl font-medium shadow hover:bg-blue-600 transition"
                  onClick={() => handleSave(tweet)}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-sky-500 text-white rounded-2xl font-medium shadow hover:bg-sky-600 transition"
                  onClick={() => handleTweet(tweet)}
                >
                  Tweet
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl font-medium shadow hover:bg-gray-400 transition"
                  onClick={() => startEdit(idx, tweet)}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
} 
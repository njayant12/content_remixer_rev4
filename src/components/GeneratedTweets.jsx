import React from 'react';
import { saveTweet } from '../api/tweets';

export default function GeneratedTweets({ tweets, onTweetSaved }) {
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

  return (
    <div>
      {tweets.map((tweet, idx) => (
        <div key={idx} className="p-4 border-b flex justify-between items-center">
          <span>{tweet}</span>
          <div className="flex gap-2">
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
          </div>
        </div>
      ))}
    </div>
  );
} 
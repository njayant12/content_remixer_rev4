import React, { useState } from "react";
import { tweetsFromPosts } from "./api/claude";
import GeneratedTweets from "./components/GeneratedTweets";
import SavedTweetsSidebar from "./components/SavedTweetsSidebar";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarRefreshKey, setSidebarRefreshKey] = useState(0);

  async function handleRemix() {
    setLoading(true);
    try {
      const tweets = await tweetsFromPosts(input);
      setOutput(tweets);
    } catch (error) {
      alert("Failed to remix content");
    } finally {
      setLoading(false);
    }
  }

  const handleTweetSaved = () => setSidebarRefreshKey(k => k + 1);

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center">
      <button
        className="fixed top-4 right-4 z-50 px-6 py-3 bg-green-600 text-white rounded-3xl shadow-lg font-semibold text-lg hover:bg-green-700 transition-all duration-200"
        onClick={() => setSidebarOpen(true)}
      >
        Show Saved Tweets
      </button>
      <SavedTweetsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} refreshKey={sidebarRefreshKey} />
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full mx-auto mt-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Content Remixer</h1>
        <p className="text-lg text-gray-500 mb-8 text-center">Transform your content with AI-powered remixing</p>
        <textarea
          className="w-full min-h-[180px] border-2 border-blue-400 rounded-3xl p-6 mb-8 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
          placeholder="Paste your content here..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        {output.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 px-4">
            <p className="mb-6 text-lg font-semibold text-gray-700 text-center">
              Here are 5 tweets based on the blog post, following the style, tone, and voice:
            </p>
            <GeneratedTweets tweets={output.filter(tweet => !tweet.toLowerCase().startsWith("here are 5 tweets"))} onTweetSaved={handleTweetSaved} />
          </div>
        )}

      </div>
    </div>
  );
}
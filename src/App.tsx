import React, { useState } from "react";
import { tweetsFromPosts } from "./api/claude";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {output
                .filter(tweet => !tweet.toLowerCase().startsWith("here are 5 tweets"))
                .map((tweet, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-xl p-6 text-gray-800 border border-blue-100 space-y-4"
                  >
                    <p>{tweet}</p>
                    <div className="flex justify-end">
                      <button
                        className="bg-sky-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-sky-600 transition"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank')}
                      >
                        Tweet
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button
            className="w-1/2 max-w-xs bg-blue-500 text-white py-4 rounded-3xl font-bold text-xl shadow-md hover:bg-blue-600 transition disabled:bg-blue-200 disabled:text-blue-400"
            onClick={handleRemix}
            disabled={loading || !input.trim()}
          >
            {loading ? "Remixing..." : "Remix Content"}
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRemix() {
    setLoading(true);
    // Mocked remixing function (replace with real API call later)
    setTimeout(() => {
      setOutput(input ? `Remixed: ${input}` : "");
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-2">Content Remixer</h1>
        <textarea
          className="w-full border rounded p-2 min-h-[100px] focus:outline-none focus:ring"
          placeholder="Paste your text here..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleRemix}
          disabled={loading || !input.trim()}
        >
          {loading ? "Remixing..." : "Remix"}
        </button>
        <div className="w-full min-h-[60px] border rounded p-2 bg-gray-100 text-gray-800">
          {output}
        </div>
      </div>
    </div>
  );
}
// Claude API key from environment variables (currently unused)
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

const tweetFromPostPrompt = `You are a social media expert and ghostwriter.

You work for a popular blogger, and your job is to take their blog post and come up with 5 of tweets to share ideas from the post.

Since you are a ghostwriter, you need to make sure to follow the style, tone, and voice of the blog post as closely as possible.

Remember: Tweets cannot be longer than 280 characters.

Please return the tweets as a single string, with each tweet separated by three vertical bars (|||). For example: Tweet 1|||Tweet 2|||Tweet 3...

Do not use any hashtags or emojis.

Here is the blog post:`;

/**
 * Sends content to the remix API and returns the remixed text as an array of tweets.
 * @param content - The content string to remix
 * @returns The remixed content as an array of tweets
 * @throws If the API response format is unexpected or the request fails
 */
export async function tweetsFromPosts(content: string): Promise<string[]> {
  try {
    const response = await fetch('http://localhost:3001/api/remix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `${tweetFromPostPrompt} ${content}` })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (
      !data.content ||
      !Array.isArray(data.content) ||
      !data.content[0]?.text
    ) {
      throw new Error('Unexpected API response format');
    }
    // Split the returned string by the delimiter and trim whitespace
    return data.content[0].text.split('|||').map((tweet: string) => tweet.trim()).filter((tweet: string) => tweet.length > 0);
  } catch (error) {
    // Optionally, log the error or handle it differently
    throw error;
  }
}

import React from 'react';

export interface GeneratedTweetsProps {
  tweets: string[];
  onTweetSaved?: () => void;
}

declare const GeneratedTweets: React.FC<GeneratedTweetsProps>;
export default GeneratedTweets; 
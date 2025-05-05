import React from 'react';

export interface SavedTweetsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

declare const SavedTweetsSidebar: React.FC<SavedTweetsSidebarProps>;
export default SavedTweetsSidebar; 
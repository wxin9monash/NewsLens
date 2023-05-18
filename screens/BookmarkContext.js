// Import necessary dependencies from 'react' package
import { createContext, useState } from "react";

// Create a new Context for bookmarks
export const BookmarkContext = createContext();

// Define a component to provide the BookmarkContext to its children
export const BookmarkProvider = ({ children }) => {
  // Define a state variable for the bookmarks
  const [bookmarks, setBookmarks] = useState([]);
  // Define a state variable to keep track of whether the bookmarks have been updated
  const [bookmarkUpdated, setBookmarkUpdated] = useState(false);

  // Define a function to add a bookmark
  const addBookmark = (item) => {
    setBookmarks((prevBookmarks) => {
      // Check if the item already exists in the bookmarks
      const itemExists = prevBookmarks.some((bookmark) => bookmark.description === item.description);
      if (!itemExists) {
        // If the item doesn't exist, add it to the bookmarks
        setBookmarkUpdated(true);
        return [...prevBookmarks, item];
      } else {
        // If the item already exists, don't modify the bookmarks
        return prevBookmarks;
      }
    });
  };

  // Define a function to remove a bookmark
  const removeBookmark = (key) => {
    console.log(key)
    // Filter out the bookmark with the specified key
    setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.key !== key));
    setBookmarkUpdated(true);
  };

  // Render the Provider component, with the value being an object containing
  // the bookmarks array and the addBookmark and removeBookmark functions
  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, bookmarkUpdated }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Export the BookmarkContext for use in other components
export default BookmarkContext;
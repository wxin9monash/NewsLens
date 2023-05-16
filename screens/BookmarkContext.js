import { createContext, useState } from "react";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkUpdated, setBookmarkUpdated] = useState(false);

  const addBookmark = (item) => {
    setBookmarks((prevBookmarks) => {
      const itemExists = prevBookmarks.some((bookmark) => bookmark.description === item.description);
      if (!itemExists) {
        setBookmarkUpdated(true);
        return [...prevBookmarks, item];
      } else {
        return prevBookmarks;
      }
    });
  };

  const removeBookmark = (key) => {
    console.log(key)
    setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.key !== key));
    setBookmarkUpdated(true);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, bookmarkUpdated }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
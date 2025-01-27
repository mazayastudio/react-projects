import { useEffect, useMemo, useState } from 'react';

// Reusable hook for managing local storage state
const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const initialStories = [
    {
      title       : 'React',
      url         : 'https://reactjs.org/',
      author      : 'Jordan Walke',
      num_comments: 3,
      points      : 4,
      objectID    : 0,
    },
    {
      title       : 'Redux',
      url         : 'https://redux.js.org/',
      author      : 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points      : 5,
      objectID    : 1,
    },
  ];

  const getAsyncStories = () => new Promise((resolve => setTimeout(
    () => resolve({ data: { stories: initialStories } }), 2000,
  )));

  useEffect(() => {
    getAsyncStories().then(result => {
      setStories(result.data.stories);
    });
  }, []);

  // State management
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [stories, setStories] = useState(initialStories);

  // Event handler for input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Derived state (memoized for performance)
  const filteredStories = useMemo(
    () =>
      stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, stories],
  );

  // Remove story by objectID
  const removeStory = (objectID) => {
    setStories((prevStories) =>
      prevStories.filter((story) => story.objectID !== objectID),
    );
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* InputWithLabel component for search */}
      <InputWithLabel
        id="search"
        type="text"
        value={searchTerm}
        onInputChange={handleSearchChange}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr />

      {/* List component for rendering stories */}
      <List
        list={filteredStories}
        onRemoveStory={removeStory}
      />
    </div>
  );
};

// Extracted reusable labeled input component
const InputWithLabel = ({ id, type, value, onInputChange, children }) => (
  <div>
    <label htmlFor={id}>{children}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </div>
);

// List component for rendering list of items
const List = ({ list, onRemoveStory }) => (
  <ul>
    {list.map(({ objectID, ...item }) => (
      <Item
        key={objectID}
        objectID={objectID} {...item}
        onRemoveStory={onRemoveStory}
      />
    ))}
  </ul>
);

// List item component for rendering each story
const Item = ({ objectID, title, url, author, num_comments, points, onRemoveStory }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
    <span>
      <button
        type="button"
        onClick={() => onRemoveStory(objectID)}
      >
        Dismiss
      </button>
    </span>
  </li>
);

export default App;
import { useEffect, useState } from 'react';

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

  // const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search') || 'React');
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [stories, setStories] = useState(initialStories);

  // useEffect(() => {
  // 	localStorage.setItem('search', searchTerm);
  // }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChange = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleRemoveStory = item => {
    const newStories = stories.filter(story => story.objectID !== item.objectID);
    setStories(newStories);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        type="text"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      {/* <Search searchTerm={searchTerm} onSearch={handleSearch} /> */}

      <hr />

      <List
        list={handleChange}
        onRemoveStory={handleRemoveStory}
      />
    </div>
  );
};

const InputWithLabel = ({ id, type, value, onInputChange, children }) => (
  <>
    <label htmlFor={id}>{children}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);

// const Search = ({ searchTerm, onSearch }) => {
// 	return (
// 		<>
// 			<label htmlFor='search'>Search:</label>
// 			<input type='text' id='search' onChange={onSearch} value={searchTerm} />
// 			<p>Searching for: {searchTerm}</p>
// 		</>
// 	);
// };

const List = ({ list, onRemoveStory }) => (
  <ul>
    {list.map(({ objectID, ...item }) => (
      <Item
        key={objectID} {...item}
        onRemoveStory={onRemoveStory}
      />
    ))}
  </ul>
);

const Item = ({ title, url, author, num_comments, points, onRemoveStory }) => {
  const handleRemoveStory = () => onRemoveStory({
    title,
    url,
    author,
    num_comments,
    points,
  });

  return (
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
          onClick={handleRemoveStory}
        >Dismiss</button>
      </span>
    </li>
  );
};

export default App;

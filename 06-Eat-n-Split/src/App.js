import { useState } from 'react';

const initialFriends = [
  {
    id     : 118836,
    name   : 'Clark',
    image  : 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id     : 933372,
    name   : 'Sarah',
    image  : 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id     : 499476,
    name   : 'Anthony',
    image  : 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const Button = ({ children, onClick }) => (
  <button
    className="button"
    onClick={onClick}
  >{children}</button>
);

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleShowAddFriend = () => setShowAddFriend(show => !show);
  const handleAddFriend = (friend) => {
    setFriends(friends => [...friends, friend]);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
        />
        {showAddFriend && <FormAddFriend
          onAddFriend={handleAddFriend}
        />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
};

const FriendsList = ({ friends }) => {
  return (
    <ul>
      {friends.map(friend =>
        <Friend
          key={friend.id}
          friend={friend}
        />)}
    </ul>
  );
};

const Friend = ({ friend }) =>
  (
    <li>
      <img
        src={friend.image}
        alt={friend.name}
      />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

      <Button>SELECT</Button>
    </li>
  );

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');


  const handleSubmit = e => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image  : `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <form
      className="form-add-friend"
      onSubmit={handleSubmit}
    >
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="url"
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = () => (
  <form
    className="form-split-bill"
  >
    <h2>Split a bill with X</h2>

    <label>💰 Bill Value</label>
    <input type="text" />

    <label>🕴️Your Expense</label>
    <input type="text" />

    <label>🧑‍🤝‍🧑 X's expense</label>
    <input
      type="text"
      disabled
    />

    <label>🤑 Who is paying the bill?</label>
    <select>
      <option value="user">You</option>
      <option value="friend">X</option>
    </select>

    <Button>Split Bill</Button>
  </form>
);
export default App;
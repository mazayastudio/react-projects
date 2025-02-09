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
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => setShowAddFriend(show => !show);
  const handleAddFriend = (friend) => {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  };
  const handleSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend(selected => selected?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id
      ? { ...friend, balance: friend.balance + value }
      : friend));
    setSelectedFriend(null);
    setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend
          onAddFriend={handleAddFriend}
        />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill
        selectedFriend={selectedFriend}
        onSplitBill={handleSplitBill}
        key={selectedFriend.id}
      />}
    </div>
  );
};

const FriendsList = ({ friends, onSelection, selectedFriend }) => {
  return (
    <ul>
      {friends.map(friend =>
                     <Friend
                       key={friend.id}
                       friend={friend}
                       onSelection={onSelection}
                       selected={selectedFriend}
                     />)}
    </ul>
  );
};

const Friend = ({ friend, onSelection, selected }) => {
  const isSelected = selected?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
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

      <Button onClick={() => onSelection(friend)}>{isSelected
        ? 'CLOSE'
        : 'SELECT'}</Button>
    </li>
  );
};

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

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const handleSubmit = e => {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === 'user' ? paidByUser : -paidByUser);
  };

  return (
    <form
      className="form-split-bill"
      onSubmit={handleSubmit}
    >
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />

      <label>🕴️Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={e => setPaidByUser(Number(e.target.value))}
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input
        type="text"
        value={bill ? (bill - paidByUser) : ''}
        disabled
      />

      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
export default App;
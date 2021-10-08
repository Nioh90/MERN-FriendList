import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);
  const addFriend = () => {
    Axios.post("https://mern-friendlist.herokuapp.com/addfriend", {
      name: name,
      age: age,
    })
      .then((response) => {
        setListOfFriends([
          ...listOfFriends,
          { _id: response.data._id, name: name, age: age },
        ]);
      })
      .catch(() => {
        alert("didnt work");
      });
  };
  const updateFriend = (id) => {
    const newAge = prompt("Enter new Age: ");

    Axios.put("https://mern-friendlist.herokuapp.com/update", {
      newAge: newAge,
      id: id,
    }).then(() => {
      setListOfFriends(
        listOfFriends.map((friend) => {
          return friend._id === id
            ? { _id: id, name: friend.name, age: newAge }
            : friend;
        })
      );
    });
  };
  const deleteFriend = (id) => {
    Axios.delete(`https://mern-friendlist.herokuapp.com/delete/${id}`).then(
      () => {
        setListOfFriends(
          listOfFriends.filter((friend) => {
            return friend._id !== id;
          })
        );
      }
    );
  };
  useEffect(() => {
    Axios.get("https://mern-friendlist.herokuapp.com/read")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);
  return (
    <div className="App">
      <div className="inputs">
        {" "}
        <input
          type="text"
          placeholder="Friend Name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Friend Age..."
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className="list-of-friends">
        {" "}
        {listOfFriends.map((friend) => {
          return (
            <div className="friend-container">
              <div className="friend">
                <h3>Name: {friend.name} </h3>
                <h3> Age: {friend.age}</h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(friend._id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  deleteFriend(friend._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useRef } from "react";

export default function Main() {
  const [listItems, setListItems] = useState([
    {name: "song1", id: uniqueId()},
    {name: "song2", id: uniqueId()},
    {name: "song3", id: uniqueId()},
    {name: "song4", id: uniqueId()},
  ]);
  const [inputValue, setInputValue] = useState("");

  const DraggingSong = useRef(null);
  const DraggedOverSong = useRef(null);

  const Song = ({index, onDelete, songName}) => {
    return (
      <li
        className="list-items"
      >
        {songName}
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </li>
    );
  }

  function uniqueId(){
    return '_' + Math.random().toString(36).slice(2, 9);
  }

  const handleSort = () => {
    const listItemsClone = [...listItems];
    const draggedSongContent = listItemsClone.splice(DraggingSong.current, 1)[0];
    listItemsClone.splice(DraggedOverSong.current, 0, draggedSongContent)
    DraggingSong.current = null;
    DraggedOverSong.current = null;
    setListItems(listItemsClone);
  }

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      const newSong = {name: inputValue, id: uniqueId()}
      setListItems((prevList) => [...prevList, newSong]);
      console.log(`Added song with name ${newSong.name} and id of ${newSong.id}`)
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleDelete = (id) => {
    setListItems((prevList) => prevList.filter((song) => song.id !== id));
  };

  return (
    <div className="main--container">
      <h1>My Favorite Songs!</h1>
      <div className="input--container">
        <input
          className="input-field"
          name="list"
          type="text"
          onChange={handleChange}
          value={inputValue}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="songs-container">
        <ul>
          {listItems.map((song, index) => (
            <div className="draggable-element" 
                  draggable="true"
                  onDragStart={() => (DraggingSong.current = index)}
                  onDragEnter={() => (DraggedOverSong.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(event) => event.preventDefault()}
                  key={`Song-${index}`}
            >
            <Song
              id={`_${song.name}`}
              songName={song.name}
              onDelete={() => handleDelete(song.id)}
              index={index}
            />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
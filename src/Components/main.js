import React from "react"
import Song from "./Song";

export default function Main()
{
    const [listItems, setListItems] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [isDragging, setIsDragging] = React.useState(false);
    const [initialYPos, setInitialYPos] = React.useState({y: 0 });

    function DragStart(event)
    {
        setInitialYPos(event.clientY);
        isDragging(true);
    }

    function DragEnd(event)
    {   
        setIsDragging(false)
    }

    function handleAdd()
    {
        if(inputValue.trim() !== ""){
            console.log("Adding song:", inputValue);
            setListItems((prevList) => [...prevList, { id: uniqueId(), name: inputValue }])
            setInputValue("");
        }
    }
    
    //generate unique id for each song
    function uniqueId()
    {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function handleChange(event)
    {
        setInputValue(event.target.value);
    }

    function handleKeyDown(event)
    {
        if(event.key === 'Enter')
        {
            handleAdd();
        }
    }

    function handleDelete(id)
    {
        setListItems((prevList) => prevList.filter((song) => song.id !== id));
    }

    return(
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
                <button className="add-btn" onClick={handleAdd}>Add</button>
            </div>
            <div>
                <ul>
                    {listItems.map((song) => (
                    <Song 
                        key={song.id} 
                        songName={song.name} 
                        onDelete={() => handleDelete(song.id)}
                        onmousedown={DragStart}
                        onmouseleave={DragEnd}
                    />
                    ))}
                </ul>
            </div>
        </div>
    )
}
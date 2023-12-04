import React from "react"
import Song from "./Song";

export default function Main()
{
    const [listItems, setListItems] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [position, setPosition] = React.useState(null);
    const [initialDragPosition, setInitialDragPosition] = React.useState(
        {
            draggingSongId: null,
            initialY: 0,
        }
    );

    function handleDragStart(songId, initialPosition)
    {
        setInitialDragPosition({
            draggingSongId: songId,
            initialY: initialPosition
        })
        setPosition(initialPosition);
        console.log(songId);
        console.log(initialPosition);
        console.log(initialDragPosition);
    }
    
    /*
    function handleDragMove(event)
    {
        console.log("Y Position: " + event.clientY);

        if(initialDragPosition.id !== null)
        {
            const deltaY = event.clientY - initialDragPosition.initialY;
            console.log(deltaY);
            setPosition(deltaY);
        }
    }
    */

    const updatePostion  = {
        transform: `translate(0px, ${position}px)`
    }

    /*
    function handleDragEnd()
    {
        if(initialDragPosition.id !== null)
        {   
            setInitialDragPosition({
                draggingSongId: null,
                initialY: {y: 0},
            })
        }
    }
    */

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
                        id={song.id}
                        onDelete={() => handleDelete(song.id)}
                        onDragStart={handleDragStart}
                        css={updatePostion}
                    />
                    ))}
                </ul>
            </div>
        </div>
    )
}
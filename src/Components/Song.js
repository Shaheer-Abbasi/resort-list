import React from "react";

export default function Song(props) 
{
    function handleDragStart(event)
    {
        const initialPosition = event.clientY || event.touches[0].clientY;
        props.onDragStart(props.id, initialPosition);
    }

    return <li className="list-items" onMouseDown={handleDragStart} onTouchStart={handleDragStart} style={props.css}>
        {props.songName}
        <button className="delete-btn" onClick={props.onDelete}>Delete</button>
        </li>;
}
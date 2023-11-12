import React from "react";

export default function Song(props) 
{
    return <li className="list-items">
        {props.songName}
        <button className="delete-btn" onClick={props.onDelete}>Delete</button>
        </li>;
}
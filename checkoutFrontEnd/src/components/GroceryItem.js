import React from "react"
import './GroceryItem.css'


export default function GroceryItem(props){


    return (
        
        <div className="items--container">
            <h4 className="itemName">{props.item}</h4>

            <div className="items--container--pricing">
                <h3 className="itemPrice">{props.price}</h3>
                <img src="./images/xButton.png" className="xButton" onClick={() => props.removeOldItem(props.item)}/>
            </div>
            

        </div>
    )


}
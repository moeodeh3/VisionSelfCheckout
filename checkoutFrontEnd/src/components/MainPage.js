import React, { useState, useEffect } from "react";
import './MainPage.css';
import GroceryItem from './GroceryItem';
import WebcamCaptureAndSend from './WebcamCaptureAndSend'


export default function MainPage() {
    const [total, setTotal] = useState(0);
    const [itemsList, setItemsList] = useState([]);


    useEffect(() => {
        const newTotal = itemsList.reduce((acc, grocery) => acc + grocery.price, 0);
        setTotal(newTotal);
    }, [itemsList]);

    function addNewItem(itemName, price) {
        const newItem = {
            id: itemsList.length + 1,
            item: itemName,
            price: price
        };

        setItemsList(prevItemsList => [...prevItemsList, newItem]);
    }


    function removeOldItem(itemName) {
        setItemsList(prevItemList => {
          const indexToRemove = prevItemList.findIndex(prevItem => prevItem.item === itemName);
          if (indexToRemove !== -1) {
            const updatedList = [...prevItemList];
            updatedList.splice(indexToRemove, 1);
            return updatedList;
          }
          return prevItemList;
        });
      }
      
      

    return (
        <div className="mainPage">

            <div className="mainPage--items">

                {itemsList.map((grocery) => (
                    <GroceryItem key={grocery.id} {...grocery} removeOldItem={removeOldItem}/>
                ))}

                <div className="mainPage--items--total">
                    <h1> Total: ${total.toFixed(2)}</h1>
                </div>

            </div>


            <div className="main--checkout">
                <WebcamCaptureAndSend addNewItem={addNewItem}/>
            </div>


        </div>
    );
}

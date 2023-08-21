import React, { useEffect, useRef } from "react";
import './WebcamCaptureAndSend.css'

export default function WebcamCaptureAndSend(props) {
  const imgRef = useRef(null);
  const socketRef = useRef(null);
  const websocketUrl = "ws://localhost:8000/ws"; // Update with your backend WebSocket URL

  useEffect(() => {
    socketRef.current = new WebSocket(websocketUrl);

    // Handle incoming image frames from the backend
    socketRef.current.onmessage = (event) => {
      var receivedData = JSON.parse(event.data);

      switch(receivedData.image){
        case "":
          console.log("New item added")
          props.addNewItem(receivedData.name, receivedData.price)
          break;

        default:
          const imgData = receivedData.image;
          imgRef.current.src = `data:image/jpeg;base64,${imgData}`;
      }

      
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="videoFeed">
      <img ref={imgRef} alt="Loading" />
    </div>
  );
}

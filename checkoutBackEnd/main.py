from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import math
from ultralytics import YOLO
import base64
import numpy as np
import sqlalchemy as db
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import select
import json



app = FastAPI()

origins = [
    "http://localhost:3000",  # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create an instance of the YOLO model
model = YOLO("best.onnx")

# Object classes
classNames = ["cereal", "oil", "tomato-ketchup", "waterbottle"]

# Confidence threshold
min_confidence = 0.8  # Set your desired threshold here


Base = declarative_base()

class items(Base):
    __tablename__ = 'items'
 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    price = db.Column(db.Float)

engine = db.create_engine('postgresql+psycopg2://postgres:admin@localhost/groceryItems')

Session = sessionmaker(bind=engine)
session = Session()


def searchByItemName(itemName):

    query = select(items).where(items.name.contains(itemName))
    results = session.execute(query)
    data = results.scalars().all()

    for item in data:
        data= {
            "image": "",
            "name": item.name,
            "price": item.price
        }
        json_data = json.dumps(data)
        
        return json_data

    



# This endpoint serves the HTML file containing the front end
@app.get("/", response_class=HTMLResponse)
async def read_root():
    return "Wow"

# WebSocket route to handle incoming video frames
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    try:
        # Start webcam
        cap = cv2.VideoCapture(0)
        cap.set(3, 640)
        cap.set(4, 480)
        detect = True
        counter = 0

        while True:
            success, img = cap.read()
            results = model(img, stream=True)

            if (counter==20):
                counter = 0
                detect=True

            # Process and draw bounding boxes
            for r in results:
                boxes = r.boxes

                for box in boxes:
                    confidence = math.ceil((box.conf[0] * 100)) / 100

                    if detect and confidence >= min_confidence:
                        x1, y1, x2, y2 = box.xyxy[0]
                        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                        cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
                        cls = int(box.cls[0])
                        cv2.putText(img, classNames[cls], (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
                        await websocket.send_text(searchByItemName(classNames[cls]) )
                        detect= False
                        counter=0
            
            counter +=1


            # Encode the processed image as base64
            _, img_encoded = cv2.imencode('.jpg', img)
            img_base64 = base64.b64encode(img_encoded).decode("utf-8")

            data= {
                "image": img_base64
            }
            json_data = json.dumps(data)
            
            # Send the encoded frame to the frontend
            await websocket.send_text(json_data)

            if cv2.waitKey(1) == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

    except WebSocketDisconnect:
        pass


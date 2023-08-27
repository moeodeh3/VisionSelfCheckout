# Installing Vision Self Checkout
This document gives the instructions to install all dependencies required by VisionSelfCheckout

## Front-End Installation
Navigate to the directory path: ```VisionSelfCheckout/checkoutFrontEnd/```
 1. Download npm packages
        ```
        npm install package.json
        ```

2. Start front-end 
       ```
       npm start
       ```
   
**NOTE**: To use React, you must have Node.js and npm installed locally on your system. To download Node.js, click [here](https://nodejs.org/en/download).

## Back-End Installation
Navigate to the directory path: ```VisionSelfCheckout/checkoutBackEnd/```
1. Download pip dependencies
         ```
        pip install -r requirments.txt
        ``` 

2. Start back-end 
        ```
        uvicorn main:app
        ``` 

**NOTE**: If you would like to use your GPU when running the model, you must have PyTorch configured locally. For documentation, click [here](https://pytorch.org/get-started/locally/).

## Database
This repository makes use of a local PostgreSQL database, serving as a basis for potential project scalability. For a more comprehensive understanding of the database schema, you can explore it [here](https://github.com/moeodeh3/VisionSelfCheckout/blob/main/checkoutBackEnd/main.py#L43-L48). In addition, adjustments to the database connection can be made [here](https://github.com/moeodeh3/VisionSelfCheckout/blob/main/checkoutBackEnd/main.py#L50). 




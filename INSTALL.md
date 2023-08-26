# Installing Vision Self Checkout
This document gives the instructions to install all dependencies required by VisionSelfCheckout

# Front-End Installation
    1. Download npm packages
        ```python
            npm install package.json
        ```

    2. Start front-end 
        ```python
            npm start
        ``` 

# Back-End Installation
    1. Download pip dependencies
         ```python
            pip install -r requirments.txt
        ``` 

    2. Start back-end 
        ```python
            uvicorn main:app
        ``` 

    **NOTE**: If you would like to use your GPU when running the model, you must have PyTorch configured locally. For documentation, click [here](https://pytorch.org/get-started/locally/).




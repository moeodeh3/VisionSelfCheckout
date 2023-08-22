# VisionCheckout - Self-Checkout System with Custom YOLOv8 Object Detection

## Overview
This project focuses on developing a self-checkout system using a custom-trained YOLOv8 model for accurate object detection and recognition. The system aims to provide a seamless and efficient shopping experience for customers, reducing the need for manual scanning of items at the self checkout counter. Even though the model shows promising results on this small test set, its scalability currently does not seem feasible.

## Dataset
This custom dataset contains several subsets downloaded from Roboflow, and converted to YOLOv8 format. The dataset contains 1398 images across 4 classes that are common items found in a grocery store. Each class contains around two hundred to four hundred images. Roboflow was additionally employed to partition the dataset into a 72/18/9 split for training, validation, and testing. The link to the subsets along with the custom dataset used for training will be linked below. The model was fine-tuned with 300 epochs, but training was stopped early as precision scores didn't change after epoch 111.

```python
# Object classes available
classNames = ["cereal", "oil", "tomato-ketchup", "waterbottle"]
```

## Model 
Originally the first approach was to use the Tensorflow library, but the training results on this dataset yielded suboptimal performance. The approach then shifted to use the YOLOv8 model that is easier to use, demonstrated superior performance, and exhibited higher precision scores. Since the dataset was small scaled, I decided to use a pretrained model and fine-tune it. This strategy lead to a mAP score of 92.4%, a precision score of 88.5%, and a recall rate of 87.3%. 

## Takeaway
While the implementation of object detection for self-checkout was feasible, it appears to lack scalability. In a world where grocery stores are constantly changing items and datasets on common grocery items remain limited, the ability to deploy such a program is economically questionable. The issue is highlighted when looking at the drop in precision off the class "oil." The class dataset contains 156 images, and showed a substantial drop in performance. The concept of mandating grocery stores to gather and label numerous products seems impractical and unlikely for them to undertake in.

# Image to ASCII - React + HTML Canvas API
A react app which creates an ASCII representation of an uploaded image.

### Getting Started:
```
npm i 
npm run dev
```

**Screenshots:**
<img src="https://github.com/ivaaak/React-Image-To-ASCII/blob/main/screenshots/1.png"></img>
<img src="https://github.com/ivaaak/React-Image-To-ASCII/blob/main/screenshots/2.png"></img>
<img src="https://github.com/ivaaak/React-Image-To-ASCII/blob/main/screenshots/3.png"></img>
<img src="https://github.com/ivaaak/React-Image-To-ASCII/blob/main/screenshots/4.png"></img>
<img src="https://github.com/ivaaak/React-Image-To-ASCII/blob/main/screenshots/w1.png"></img>
<img src="https://github.com/ivaaak/React-Image-To-ASCII/blob/main/screenshots/w2.png"></img>
<img src="https://github.com/ivaaak/React-Image-To-ASCII/blob/main/screenshots/w3.png"></img>


**How it works:**

1. Draw the uploaded image to a canvas and get pixel data
2. Convert each pixel's brightness (average of RGB) to an ASCII character (`@%#*+=-:. `)
 - 
3. Arrange characters in a grid matching image dimensions and display in monospace font

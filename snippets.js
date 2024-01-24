// MY VERSION OF HOW YOU COULD HAVE USED LOCAL STORAGE IN MEME-GEN

// Saving Memes to Local Storage:

// After creating a new meme (div), convert the relevant information (image URL, top text, bottom text, font size) into a JavaScript object.
// Use JSON.stringify to convert the object into a JSON string.
// Store this JSON string in local storage using localStorage.setItem('key', jsonString), where 'key' is a unique identifier for your memes.

// code snippet :)

const memeData = {
  imageURL: "example.jpg",
  topText: "Top Text",
  bottomText: "Bottom Text",
  fontSize: 20,
};

const jsonString = JSON.stringify(memeData);
localStorage.setItem("meme1", jsonString);

// Loading Memes from Local Storage:

// When the page loads, check if there are memes in local storage using localStorage.getItem('key').
// If there are memes, retrieve them using JSON.parse to convert the JSON string back to a JavaScript object.
// Use the retrieved data to dynamically create meme elements on the page.

// code snippet :)

const savedMeme = localStorage.getItem("meme1");

if (savedMeme) {
  const memeData = JSON.parse(savedMeme);
  // Use memeData to create the meme element on the page
}

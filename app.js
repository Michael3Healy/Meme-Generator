// Retrieve DOM elements
const imageInput = document.querySelector("#image");
const topTextInput = document.querySelector("#top-text");
const bottomTextInput = document.querySelector("#bottom-text");
const fontSizeInput = document.querySelector("#font-size");
const form = document.querySelector("#meme-form");
const list = document.querySelector("#meme-list");

// Check if input has value
function hasInputValue(input) {
  return input.value.trim() !== "";
}

// Reset input fields
function resetInput(inputs) {
  inputs.forEach((input) => (input.value = ""));
}

// Retrieve stored memes from local storage or initialize empty array
const storedMemes = JSON.parse(localStorage.getItem("creations")) || [];

// Create memes from stored data
storedMemes.forEach((meme) => {
  const newMeme = document.createElement("div");
  newMeme.setAttribute("class", "meme");

  const memeImage = document.createElement("img");
  memeImage.setAttribute("src", meme.meme);

  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "button-overlay");
  removeButton.innerHTML =
    '<img width="32" height="32" src="http://tinyurl.com/yvfpll9n" alt="trash"/>';

  const topText = document.createElement("h1");
  topText.innerText = meme.tText;
  topText.setAttribute("class", "top-text");
  topText.style.fontSize = meme.fontSize;

  const bottomText = document.createElement("h1");
  bottomText.innerText = meme.bText;
  bottomText.setAttribute("class", "bottom-text");
  bottomText.style.fontSize = meme.fontSize;

  newMeme.append(memeImage, removeButton, topText, bottomText);
  list.append(newMeme);
});

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Check if all input fields are filled
  if (
    hasInputValue(imageInput) &&
    hasInputValue(topTextInput) &&
    hasInputValue(bottomTextInput) &&
    hasInputValue(fontSizeInput)
  ) {
    // Create meme div
    const meme = document.createElement("div");
    meme.setAttribute("class", "meme");

    // Create meme image
    const memeImage = document.createElement("img");
    memeImage.setAttribute("src", imageInput.value);

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "button-overlay");
    removeButton.innerHTML =
      '<img width="32" height="32" src="http://tinyurl.com/yvfpll9n" alt="trash"/>';

    // Create top text
    const topText = document.createElement("h1");
    topText.innerText = topTextInput.value;
    topText.setAttribute("class", "top-text");
    topText.style.fontSize = fontSizeInput.value + "px";

    // Create bottom text
    const bottomText = document.createElement("h1");
    bottomText.innerText = bottomTextInput.value;
    bottomText.setAttribute("class", "bottom-text");
    bottomText.style.fontSize = fontSizeInput.value + "px";

    // Append elements to meme div
    meme.append(memeImage, removeButton, topText, bottomText);
    list.append(meme);

    // Store meme data in local storage
    storedMemes.push({
      meme: imageInput.value,
      tText: topTextInput.value,
      bText: bottomTextInput.value,
      fontSize: fontSizeInput.value,
    });
    localStorage.setItem("creations", JSON.stringify(storedMemes));

    // Reset input fields
    resetInput([imageInput, topTextInput, bottomTextInput]);
  } else {
    alert("You must fill out every field");
  }
});

// Event listener for removing memes
list.addEventListener("click", function (e) {
  const trashIcon = e.target.closest('img[src="http://tinyurl.com/yvfpll9n"]');
  if (trashIcon) {
    trashIcon.parentElement.parentElement.remove();
    // Remove meme from storedMemes array
    const index = storedMemes.findIndex(
      (meme) =>
        meme.meme ===
        trashIcon.parentElement.parentElement.querySelector("img").src
    );
    if (index !== -1) {
      storedMemes.splice(index, 1);
      localStorage.setItem("creations", JSON.stringify(storedMemes));
    }
  }
});

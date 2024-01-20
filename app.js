const imageInput = document.querySelector('#image');
const topTextInput = document.querySelector('#top-text');
const bottomTextInput = document.querySelector('#bottom-text');
const fontSizeInput = document.querySelector('#font-size');
const form = document.querySelector('#meme-form');
const list = document.querySelector('#meme-list');

function hasInputValue (input) {
    if (input.value !== '') {
        return true;
    }
    return false;
}

function resetInput (inputs) {
    for (let input of inputs) {
        input.value = '';
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (hasInputValue(imageInput) && hasInputValue(topTextInput) && hasInputValue(bottomTextInput) && hasInputValue(fontSizeInput)) {
        const meme = document.createElement('div');
        meme.setAttribute('class', 'meme');
        list.append(meme)

        const memeImage = document.createElement('img')
        memeImage.setAttribute('src', imageInput.value);

        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'button-overlay');
        removeButton.innerHTML = '<img width="32" height="32" src="http://tinyurl.com/yvfpll9n" alt="trash"/>';
        

        const topText = document.createElement('h1');
        topText.innerText = topTextInput.value;
        topText.setAttribute('class', 'top-text');
        topText.style.fontSize = fontSizeInput.value + 'px';

        const bottomText = document.createElement('h1');
        bottomText.innerText = bottomTextInput.value;
        bottomText.setAttribute('class', 'bottom-text');
        bottomText.style.fontSize = fontSizeInput.value + 'px';

        meme.append(memeImage, removeButton, topText, bottomText);

        resetInput([imageInput, topTextInput, bottomTextInput]);

    } else {
        alert('You must fill out every field')
    }
})

list.addEventListener('click', function (e) {
    const trashIcon = document.querySelector('img[src="http://tinyurl.com/yvfpll9n"]')
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    } else if (e.target === trashIcon) {
        e.target.parentElement.parentElement.remove();
    }
})
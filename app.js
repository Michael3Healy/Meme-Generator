
const imageInput = document.querySelector('#image');
const topTextInput = document.querySelector('#top-text');
const bottomTextInput = document.querySelector('#bottom-text');
const fontSizeInput = document.querySelector('#font-size');
const form = document.querySelector('#meme-form');

//Contains all of the meme divs
const list = document.querySelector('#meme-list');

//Checks that every field has been filled out
function hasInputValue (input) {
    if (input.value !== '') {
        return true;
    }
    return false;
}

//Resets input values after form submission
function resetInput (inputs) {
    for (let input of inputs) {
        input.value = '';
    }
}

const storedMemes = JSON.parse(localStorage.getItem('creations')) || [];

for (let meme of storedMemes) {
	let newMeme = document.createElement('div');
	newMeme.setAttribute('class', 'meme');
	

	const memeImage = document.createElement('img');
	memeImage.setAttribute('src', meme.meme);

	const removeButton = document.createElement('button');
	removeButton.setAttribute('class', 'button-overlay');
	removeButton.innerHTML =
		'<img width="32" height="32" src="http://tinyurl.com/yvfpll9n" alt="trash"/>';

	const topText = document.createElement('h1');
	topText.innerText = meme.tText;
	topText.setAttribute('class', 'top-text');
	topText.style.fontSize = meme.fontSize;

	const bottomText = document.createElement('h1');
	bottomText.innerText = meme.bText;
	bottomText.setAttribute('class', 'bottom-text');
	bottomText.style.fontSize = meme.fontSize;

	newMeme.append(memeImage, removeButton, topText, bottomText);
    list.append(newMeme);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();


    //Ensure all fields in the form have been filled out
    if (hasInputValue(imageInput) && hasInputValue(topTextInput) && hasInputValue(bottomTextInput) && hasInputValue(fontSizeInput)) {
        
        //Create div with child elements of image, remove button, and text with their associated CSS classes
        const meme = document.createElement('div');
        meme.setAttribute('class', 'meme');
        list.append(meme)

        const memeImage = document.createElement('img')
        memeImage.setAttribute('src', imageInput.value);

		const removeButton = document.createElement('button');
		removeButton.setAttribute('class', 'button-overlay');
		removeButton.innerHTML =
			'<img width="32" height="32" src="http://tinyurl.com/yvfpll9n" alt="trash"/>';

		const topText = document.createElement('h1');
		topText.innerText = topTextInput.value;
		topText.setAttribute('class', 'top-text');
		topText.style.fontSize = fontSizeInput.value + 'px';

		const bottomText = document.createElement('h1');
		bottomText.innerText = bottomTextInput.value;
		bottomText.setAttribute('class', 'bottom-text');
		bottomText.style.fontSize = fontSizeInput.value + 'px';

		meme.append(memeImage, removeButton, topText, bottomText);
        list.append(meme);

		storedMemes.push({
			meme: memeImage.getAttribute('src'),
			tText: topText.innerText,
			bText: bottomText.innerText,
			fontSize: topText.style.fontSize,
		});
		localStorage.setItem('creations', JSON.stringify(storedMemes));

		resetInput([imageInput, topTextInput, bottomTextInput]);
	} else {
		alert('You must fill out every field');
	}
});


//Remove meme if button/trash icon is selected
list.addEventListener('click', function (e) {
	const trashIcon = e.target.closest(
		'img[src="http://tinyurl.com/yvfpll9n"]'
	);
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();
		const index = storedMemes.findIndex(
			(meme) =>
				meme.meme ===
				trashIcon.parentElement.parentElement.querySelector('img').src
		);
		if (index !== -1) {
			storedMemes.splice(index, 1);
			localStorage.setItem('creations', JSON.stringify(storedMemes));
		}
	} else if (e.target === trashIcon) {
		e.target.parentElement.parentElement.remove();
		const index = storedMemes.findIndex(
			(meme) =>
				meme.meme ===
				trashIcon.parentElement.parentElement.querySelector('img').src
		);
		if (index !== -1) {
			storedMemes.splice(index, 1);
			localStorage.setItem('creations', JSON.stringify(storedMemes));
		}
	}
});

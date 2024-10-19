// DOM elements
const wrapper = document.getElementsByClassName('wrapper')[0];
const heightField = document.getElementById('heightField');
const widthField = document.getElementById('widthField');
const generateBtn = document.getElementById('generateBtn');
const urlField = document.getElementById('urlField');
const copyBtn = document.getElementById('copyBtn');
const downBtn = document.getElementById('downBtn');
const imageContainer = document.getElementById('imageContainer');
const dataField = document.getElementById('data-field')

// Declare variables to store image URL, height, and width globally
let imageUrl;
let imgHeight;
let imgWidth;

// Generate button event
generateBtn.addEventListener('click', function () {
    imgHeight = parseInt(heightField.value); // Get height input value
    imgWidth = parseInt(widthField.value);   // Get width input value

    // Check for valid inputs
    if (isNaN(imgHeight) || isNaN(imgWidth) || imgHeight <= 0 || imgWidth <= 0) {
        alert('Please enter valid height and width values.');
        return;
    }

    generateImg(imgHeight, imgWidth);
});

function generateImg(height, width) {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#aaaaaa';  // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // Fill the canvas with the background color

    // Text styling and placement
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";  // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${width}x${height}`, canvas.width / 2, canvas.height / 2);

    // Convert canvas to Data URL (Base64)
    imageUrl = canvas.toDataURL();

    // Display the Data URL in the input field
    urlField.value = imageUrl;

    // Clear only the previously generated image in the container
    imageContainer.innerHTML = '';

    // Create an image element to display the generated image
    const theImage = document.createElement('img');
    theImage.src = imageUrl;  // Set image source to the canvas Data URL

    // Append the image inside the imageContainer element
    imageContainer.appendChild(theImage);

    wrapper.style.height = 'auto';
    wrapper.style.width = 'auto';
    wrapper.style.padding = '75px 75px';

    dataField.style.display = 'flex';
}

// Copy button event
copyBtn.addEventListener('click', function () {
    const dataUrl = urlField.value;  // Get the value from the Data URL field

    if (dataUrl) {
        // Select the text inside the input field
        urlField.select();
        urlField.setSelectionRange(0, 99999);  // For mobile devices

        try {
            // Use execCommand to copy the selected text to the clipboard
            const successful = document.execCommand('copy');
            if (successful) {
                alert('Image Data URL copied to clipboard!');
            } else {
                alert('Failed to copy. Try again.');
            }
        } catch (err) {
            alert('Error in copying. Try again.');
            console.error('Error copying text: ', err);
        }
    } else {
        alert('No image URL to copy!');
    }
});


// Download button event
downBtn.addEventListener('click', function (e) {
    if (imageUrl) {
        downBtn.href = imageUrl;  // Set the href of the anchor to the image URL
        downBtn.download = `placeholder_${imgWidth}x${imgHeight}.png`;  // Set the download attribute for the anchor
    } else {
        alert('No image to download!');
        e.preventDefault();  // Prevent the download if no image is available
    }
});


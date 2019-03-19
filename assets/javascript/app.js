// Create an array of topics for the buttons.
var topics = [
    'Apples',
    'Salad',
    'Burgers',
    'Tacos',
    'Pasta',
    'Cake',
    'Mango',
    'Pizza',
    'Lo Mein',
    'Cookies',
];

// This array contains possible "random" selections to be added by randomButton
var randomTopics = [
    'Cheese',
    'Grapes',
    'Soda',
    'Potato Chips',
    'Pretzels',
    'Sandwiches',
    'Grilled Cheese',
    'Avocado',
    'Chocolate',
    'Pie',
    'Nachos',
    'Guacamole',
    'Popcorn',
    'Sushi',
    'Ramen',
    'Quesadillas',
    'Pancakes'
];
// When clicked, this button randomly selects a food from randomTopics array, turns it into a button, and appends to buttonsDiv
function addRandomButton() {
    var randomButton = $('<button>');
    randomButton.text('Add a random food button!').addClass('randomButton');
    $('#inputDiv').append(randomButton);
    randomButton.on('click', function () {
        let randomIndex = Math.floor(Math.random() * randomTopics.length);
        newFood = randomTopics[randomIndex];
        randomTopics.splice(randomIndex, 1);
        topics.push(newFood);
        console.log(randomTopics);
        createButtons();
    })
};

// Use jquery to create a new button for each item in the topics array. This should use a loop and be saved as a function for later.
function createButtons() {
    // Clear buttonsDiv and gifsDiv of any existing contents. (Prevents duplicate buttons.)
    $('#buttonsDiv').empty();

    // Loop through topics array
    for (var i = 0; i < topics.length; i++) {
        // For each item in the array, create a new button element.
        let newButton = $('<button>');
        // Add foodButtons class for button styling
        newButton.addClass('foodButtons');
        // Set the button text to match the item name.
        newButton.text(topics[i]);
        // Add a data-name attribute and store to variable.
        newButton.attr('data-name', topics[i]);
        
        
        // Give each button an onclick function to query GIPHY API with the topic name.
        newButton.on('click', function () {
            let queryURL = `http://api.giphy.com/v1/gifs/search?q=${this.dataset.name}&api_key=27Ubg2BK3p0z3DeHppWslH5gy8UTHtBR`;
            $.ajax({
                url: queryURL,
                method: "GET"
                // Once the API response is received...
            }).then(function (response) {
                console.log(response);
                console.log(response.data[0].images.original.url);
                // Clear out divs
                $('#gifsDiv').empty();
                // Create clear button, add button text and class for styling
                const clearButton = $('<button>').text('Clear GIFs').addClass('clearButton');
                // Switch clearButtonDiv to have a height of 50px, then append clear button to that div.
                // This was done to achieve a cleaner view when no GIFs are displayed. The div is only visible when it's necessary.
                $('#clearButtonDiv').css('height', '50px').append(clearButton);
                // When clear button is clicked...
                clearButton.on('click', function() {
                    // Empty out gifs Div
                    $('#gifsDiv').empty();
                    // Get rid of clear button, collapse clearButtonDiv
                    $('#clearButtonDiv').empty().css('height', '0px');
                });
                // Loop through the first 10 data items in response object.
                for (j = 0; j < 10; j++) {
                    // Create a new div for the first 10 gifs in the response. Give them a class of newGifItem for css styling.
                    let newGifItem = $('<div>').addClass('newGifItem');
                    // Create new srcURL variable to add image source and download link attributes
                    let srcURL = response.data[j].images.original.url
                    // Create a new image element and add the source for each gif
                    let newGifImage = $('<img>').attr('src', response.data[j].images.original_still.url).css('width', '100%');
                    // Give each new gif a data-state of animated to start. Add a newGifImage class for styling.
                    newGifImage.attr('data-state', 'still').addClass('newGifImage');
                    // Add a data-download-link attribute for download button
                    newGifImage.attr('data-download-link', srcURL)

                    // Give each gif a data-number.
                    newGifImage.attr('data-number', j)
                    // Add an onclick to each gif to toggle between running gif and still image.
                    newGifImage.on('click', function () {
                        // Create a state variable for the state of the gif
                        var state = $(this).attr('data-state')
                        if (state === 'still') {
                            // Switch the data-state to animated
                            $(this).attr('data-state', 'animated')
                            // Set the source to an animated gif
                            $(this).attr('src', response.data[$(this).attr('data-number')].images.original.url)
                        } else if (state === 'animated') {
                            // Set the data-state to still
                            $(this).attr('data-state', 'still');
                            // Set the source to the still image
                            $(this).attr('src', response.data[$(this).attr('data-number')].images.original_still.url)
                        };
                    });


                    // Extract rating data from response.
                    let newGifRating = response.data[j].rating;
                    // Append newGifImage and rating to newGifItem, then newGifItem to gifsDiv
                    newGifItem.append(newGifImage);
                    newGifItem.append(`<h4 class="ratingLabel">Rating: <span class="ratingText">${newGifRating}</span></h4>`);
                    // Create and add download link
                    let downloadLink = $('<a>View Source</a>').addClass('downloadLink').attr('href', srcURL).attr('target', '_blank');
                    newGifItem.append(downloadLink);

                    $('#gifsDiv').append(newGifItem);
                }
            });
        });

        // Append each completed button to DOM.
        $('#buttonsDiv').append(newButton);
    }
}

$('#addFood').on('click', function () {
    event.preventDefault();

    // Onclick, get value of user input
    var newFood = '';
    newFood = $('#foodInput').val().trim();
    // If the text box is empty, do nothing.
    if (newFood === '') {
        return;
        // If the user has entered an input, add that value to topics array and recreate updated buttons.
    } else {
        console.log(newFood);
        topics.push(newFood);
        console.log(topics);
        createButtons();
    }
});

createButtons();
addRandomButton();
// When GIPHY responds, extract the source url and the rating from response.

// Add an onclick to each gif to toggle between running gif and still image. (Do this after writing append code)

// Using a for loop, create a div, then append the image and its rating to that div. Do this for each item in array.
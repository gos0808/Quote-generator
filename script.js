const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

//
function showLoadindSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    showLoadindSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();

    if (quote.author) {
        quoteAuthor.textContent = quote.author;
    } else {
        quoteAuthor.textContent = 'Unknown';
    };
}

async function getQuotes() {
    showLoadindSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch (error) {
        console.log(error);
    }

}

// Tweet a quote
function tweetQuote() {
    const twittUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twittUrl, '_blank');
}

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuotes();






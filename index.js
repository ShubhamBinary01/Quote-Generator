const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//  Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteConatiner.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  loading();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //  If Author is Blank, add Unknown
    if (data.quoteAuthor == "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = "~ " + data.quoteAuthor;
    }
    //  Reduce Font Size For long Quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader And Show the Quote
    complete();
  } catch (error) {
    // getQuote();
    // To check which error comes out
    // console.log('Whoops, no getQuote',error);
  }
}

//  Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ~ ${author}`;
  window.open(twitterUrl, "_blank");
}

//  Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on Load
getQuote();

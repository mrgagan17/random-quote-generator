const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');

// Function to decode HTML entities
function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

// Function to fetch and display a random quote
async function generateQuote() {
    try {
        const response = await fetch(`https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&${new Date().getTime()}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const quote = data[0]; // Quotes are in an array, so we get the first one

        // Decode HTML entities and update DOM
        quoteText.textContent = decodeHTMLEntities(quote.content.rendered.replace(/<\/?[^>]+(>|$)/g, ""));
        authorText.textContent = `- ${quote.title.rendered}`;
    } catch (error) {
        console.error("Error fetching quote:", error);
        quoteText.textContent = "Oops, something went wrong!";
        authorText.textContent = "";
    }
}

// Event listener for the button
newQuoteButton.addEventListener('click', generateQuote);

// Generate an initial quote on page load
generateQuote();

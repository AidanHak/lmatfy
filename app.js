const qs = new URLSearchParams(window.location.search);
const searchFor = qs.get('q');

const searchButton = document.getElementById('search-button');
const searchQuery = document.getElementById('search-query');
const searchQueryTyped = document.getElementById('search-query-typed');
const searchLink = document.getElementById('search-link');
const submitForm = document.getElementById('submitForm');

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

submitForm.onsubmit = (evt) => {
	evt.preventDefault();
	const query = encodeURIComponent(searchQuery.value);
	const link = `https://lmatfy.app/?q=${query}`;
	searchLink.innerHTML = `<a href="${link}" target="_blank">${link}</a><span style="color: green;"> - copied to clipboard</span>`;

	// Copy to clipboard
	// https://stackoverflow.com/a/30810322/2457222
	navigator.clipboard.writeText(link).then(function () {
		console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
	});
};

if (window.location.href.indexOf('?q=') > 0) {
	const link = `https://www.amazon.com/s?k=${searchFor}`;
	
	// Loop through each character of the search query
	for (let i = 0; i < searchFor.length; i++) {
		// Use a timeout to append each character with a delay
		setTimeout(() => {
			// searchQueryTyped.innerHTML += searchFor.charAt(i);
			searchQuery.value += searchFor.charAt(i);
		}, i * 500);
	}

	// Set the search link after the search query typed animation completes
	setTimeout(() => {
		window.location.href = link;
	}, searchFor.length * 500);
} else {
	searchButton.innerHTML = "Get Link";
}
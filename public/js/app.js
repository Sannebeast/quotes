<<<<<<< HEAD
import { getData } from './ajax';

(function () {
    document.addEventListener('DOMContentLoaded', function () {
    });
})();

(async function () {
            const data = await getData('http://localhost:3012/tags');

            if (data.error) {
                console.error('Fout bij het laden van tags:', data.error);
            } else {
                console.log('Tags:', data);
                // renderTags(data); // hier kun je ze tonen
            }
        })();
=======
/**
 * In this code I deliberately are not using
 * any form of error handling.
 * This is to keep the code simple and focused on the main functionality.
 * In a production environment, you should always handle errors properly.
 */
// Self-invoking function to ensure the code runs after the DOM is fully loaded
(function () {
    document.addEventListener('DOMContentLoaded', init);
})();

// setting up the javascript code to run after the page is loaded
async function init() {
    console.log('Page loaded and self-invoking function executed.');
    
    const tags = await getTags();
    
    tags.forEach(tag => {
        addTagToDocument(tag);
    });
};

/**
 * Function to add a tag to the document
 * @param {*} tag 
 */
const addTagToDocument = (tag) => {
    const tagElement = document.createElement('div');
    tagElement.className = 'tag';
    tagElement.innerText = tag.data.name;
    console.log('Adding tag:', tagElement);
    document.getElementById('tags-list').appendChild(tagElement);
};

/**
 * Function to get the tag data (names) from the server
 * @returns the tagData
 */
const getTags = async () => {
    // first step - get the tag information / urls
    const tags = await getData('http://localhost:3012/tags');
    console.log('Tags fetched:', tags.data);
    const tagUrls = tags.data;
    // second step - get the data from the urls. In this case the name of the tag
    const tagsData = await getAllDataFromDifferentUrls(tagUrls);
    return tagsData;
};
>>>>>>> 9f8bc633e271f995ef6c76f3f7682b8668c3c0d6

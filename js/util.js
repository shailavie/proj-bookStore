'use strict'

var adjs = ['attractive', 'bald', 'beautiful', 'chubby', 'clean', 'dazzling', 'drab', 'elegant', 'fancy', 'fit', 'flabby', 'glamorous', 'gorgeous', 'handsome', 'long', 'magnificent', 'muscular', 'plain', 'plump', 'quaint', 'scruffy', 'shapely', 'short', 'skinny', 'stocky', 'ugly', 'unkempt', 'unsightly']
var nouns = ['people', 'history', 'way', 'art', 'world', 'information', 'map', 'two', 'family', 'government', 'health', 'system', 'computer', 'meat', 'year', 'thanks', 'music', 'person', 'reading', 'method', 'data', 'food', 'understanding', 'theory', 'law', 'bird', 'literature', 'problem', 'software', 'control', 'knowledge', 'power', 'ability', 'economics', 'love', 'internet', 'television', 'science']
var authors = ['William Shakespeare', 'Emily Dickinson', 'H. P. Lovecraft', 'Arthur Conan Doyle', 'Leo Tolstoy', 'Edgar Allan Poe', 'Robert Ervin Howard', 'Rabindranath Tagore', 'Rudyard Kipling', 'Seneca', 'John Donne', 'Sarah Williams', 'Oscar Wilde', 'Catullus', 'Alfred Tennyson', 'William Blake', 'Charles Dickens', 'John Keats', 'Theodor Herzl', 'Percy Bysshe Shelley', 'Ernest Hemingway', 'Barack Obama', 'Anton Chekhov', 'Henry Wadsworth Longfellow', 'Arthur Schopenhauer', 'Jacob De Haas', 'George Gordon Byron', 'Jack London', 'Robert Frost', 'Abraham Lincoln', 'O. Henry', 'Ovid', 'Robert Louis Stevenson', 'John Masefield', 'James Joyce', 'Clark Ashton Smith', 'Aristotle', 'William Wordsworth', 'Jane Austen', 'Niccolò Machiavelli', 'Lewis Carroll', 'Robert Burns', 'Edgar Rice Burroughs', 'Plato', 'John Milton', 'Ralph Waldo Emerson', 'Margaret Thatcher', 'Sylvie d\'Avigdor', 'Marcus Tullius Cicero', 'Banjo Paterson', 'Woodrow Wilson', 'Walt Whitman', 'Theodore Roosevelt', 'Agatha Christie', 'Ambrose Bierce', 'Nikola Tesla', 'Franz Kafka']
var randomCovers = createRandomCovers();


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function getRandId(len) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var id = []
    for (let i = 0; i < len; i++) {
        id.push(chars[getRandomInt(0, chars.length)]);
    }
    return id.join('');
}

function getRandBookTitle(randAuthor) {
    var titleType = getRandomInt(1, 6)
    var randAdj = adjs[getRandomInt(0, adjs.length)];
    var randNoun = nouns[getRandomInt(0, nouns.length)];
    switch (titleType) {
        case 1:
            var title = `The ${randAdj} ${randNoun}`;
            break;0
        case 2:
            var title = `The Age of ${randNoun}`;
            break;
        case 3:
            var title = `Becoming ${randAuthor}`;
            break;
        case 4:
            var title = `The ${randAdj} ${randAuthor}`;
            break;
        case 5:
            var title = getProperTxt(randNoun);
            break;
    }
    return title;
}


function getProperTxt(txt) {
    return txt
        .split(' ')
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}


function getRandAuthor() {
    return authors[getRandomInt(0, authors.length)];
}


function getRandPrice() {
    var randNum = getRandomInt(10, 100);
    return randNum;
}


function getRandomCover() {
    return randomCovers[getRandomInt(0, randomCovers.length)];
}

function getRandomCoverByKeywords(author) {
    var keywords = author.split(' ')
    var randW = getRandomInt(170, 180);
    var randH = getRandomInt(210, 230);
    var randCover = `https://loremflickr.com/${randW}/${randH}/${keywords}/all`
    // var randCover =  `http://lorempixel.com/${randW}/${randH}/${keywords}/all`
    return randCover
}




function createRandomCovers() {
    var randomCovers = [];
    for (let i = 0; i < 100; i++) {
        var randW = getRandomInt(170, 180);
        var randH = getRandomInt(210, 230);
        var randCover = `http://lorempixel.com/${randW}/${randH}/`
        // var randCover =  `https://loremflickr.com/${randW}/${randH}?lock=1`
        randomCovers.push(randCover);
    }
    return randomCovers
}


function compare(a, b) {
    if (a[gModelSortby] < b[gModelSortby])
        return 1 * gSortDirection;
    if (a[gModelSortby] > b[gModelSortby])
        return -1 * gSortDirection;
    return 0;
}

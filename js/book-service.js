'use strict';

//Model
var gBooks;
var gNumBooksForDisplay = 5;
var gCurrPageIdx = 0;
var gBooksNum = 30;
var gPages = Math.ceil(gBooksNum / gNumBooksForDisplay);
var gSortDirection = 1;
var gModelSortby = 'txt'
var gBooksSortBy = 'A-Z';




function createBooks() {
    var books = [];
    for (let i = 0; i < gBooksNum; i++) {
        var newBook = createBook();
        books.push(newBook);
    }
    return books;
}

function createBook() {
    var randAuthor = getRandAuthor()
    var randTitle = getRandBookTitle(randAuthor);
    var book = {
        id: getRandId(6),
        title: randTitle,
        author: randAuthor,
        price: getRandPrice(),
        cover: getRandomCoverByKeywords(randAuthor),
        rate: 0
    }
    return book;
}


function getBooks() {
    return gBooks;
}


function getBooksForDisplay() {
    var books = gBooks.sort(compare)
    var fromIdx = gCurrPageIdx * gNumBooksForDisplay
    return books.slice(fromIdx, fromIdx + gNumBooksForDisplay);
}



function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
    console.log(`book ${bookIdx} deleted`)
}


function updateBook(bookId,titleInput, authorInput, priceInput) {
    var newBook = getBookById(bookId);
    newBook.title = getProperTxt(titleInput);
    newBook.author = getProperTxt(authorInput);
    newBook.price = priceInput;
    newBook.cover = getRandomCover();
}

function addEmptyBook() {
    var newBook = {
        id: getRandId(6),
        title: '',
        author: '',
        price: '',
        cover: '',
        rate : 0
    }
    gBooks.unshift(newBook);
}



function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId;
    })
}



function setCurrentPage(num) {
    gCurrPageIdx = num;
}

function setNextPage() {
    gCurrPageIdx++
}

function setPrevPage() {
    gCurrPageIdx--
}


function setBookRate(gCurrentBookId, num) {
    var book = getBookById(gCurrentBookId);
    book.rate += num;
}



// TO DO - Merge all setBook functions to one function that also gets a property
function setBookPrice(gCurrentBookId,newPrice){
    var book = getBookById(gCurrentBookId);
    book.price = newPrice
}

function setBookTitle(gCurrentBookId,newTitle){
    var book = getBookById(gCurrentBookId);
    book.title = newTitle
}


function setBookAuthor(gCurrentBookId,newAuthor){
    var book = getBookById(gCurrentBookId);
    book.title = newAuthor
}


function getBookProperty(property,gCurrentBookId){
    var book = getBookById(gCurrentBookId);
    return book[property];
}

function setBooksSort(sortBy) {
    gBooksSortBy = sortBy;
    gModelSortby = getSortBy()
}

function getSortBy() {
    var sortRule = null;
    switch (gBooksSortBy) {
        case 'A-Z':
            sortRule = 'title'
            gSortDirection = -1;
            break;
        case 'Z-A':
            sortRule = 'title'
            gSortDirection = 1;
            break;
        case 'Price ↑':
            sortRule = 'price';
            gSortDirection = -1;
            break;
        case 'Price ↓':
            sortRule = 'price';
            gSortDirection = 1;
            break;
        case 'Rating ↑':
            sortRule = 'rate';
            gSortDirection = -1;
            break;
        case 'Rating ↓':
            sortRule = 'rate';
            gSortDirection = 1;
            break;
    }
    return sortRule
}

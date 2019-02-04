'use strict';

const DELETE = 'x'
var gCurrentBookId;

function init() {
    gBooks = createBooks();
    gCurrentBookId = null;
    $('.page-number').text(`Page 1/${gPages}`)
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHtmls = books.map(function (book) {
        return `
            <div class="card book-item">
                <div class="cover-title">
                    <h5 class="title-on-cover">${book.title}</h5>
                </div>
                <div onclick="onToggleOptionsModal('${book.id}')" class="book-options">•••</div>
                    <div id="${book.id}" class="options-modal" style="display: none">
                    <ul>
                        <li><button class="btn" style="font-size:14px;" href="#" onclick="onDeleteBook('${book.id}')">Delete Book</button></li>
                        <hr>
                        <li><button class="btn" style="font-size:14px;" href="#" onclick="onReadAndUpdateBook('${book.id}')">Update Price</button></li>
                    </ul>
                </div>
                <img class="card-img-top book-cover" src="${book.cover}" alt="New Book">
                <div class="card-body info-${book.id} align-left">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-author">${book.author}</h6>
                    <p class="card-price-${book.id}">$${book.price}</p>
                    <input type="number" placeholder="$${book.price}" onkeyup="onNewPrice(event,this.value)" class="new-price-${book.id} hide">
                </div>
                <div class="new-book-input-${book.id} hide">
                    <input type="text" placeholder="Enter Book\'s Title" onkeyup="onNewTitle(event,this.value)" class="new-title-${book.id}">
                    <input type="text" placeholder="Enter Book\'s Author" onkeyup="onNewAuthor(event,this.value)" class="new-author-${book.id} ">
                    <input type="number" placeholder="$${book.price}" onkeyup="onNewPrice(event,this.value)" class="new-book-price-${book.id} ">
                    <button class="btn" onclick="onSaveBook('${book.id}')">Save Book</button>
                </div>
                    <button class="btn" onclick="onToggleBookReadModal('${book.id}')">More info</button>
            </div>`
    })
    $('.books-container').html(strHtmls.join(''));
}


function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onSaveBook(bookId) {
    var title = ($(`.new-title-${bookId}`).val())
    var author = ($(`.new-author-${bookId}`).val())
    var price = ($(`.new-book-price-${bookId}`).val())
    updateBook(bookId, title, author, price)
    setBooksSort('Z-A');
    renderBooks();

}

function onReadAndAddNewBook() {
    addEmptyBook();
    gCurrentBookId = gBooks[0].id
    renderBooks();
    $(`.info-${gCurrentBookId}`).hide()
    $(`.new-book-input-${gCurrentBookId}`).show()
}


function onReadAndUpdateBook(bookId) {
    $(`.card-price-${bookId}`).hide()
    var $elNewPriceInput = $(`.new-price-${bookId}`)
    $elNewPriceInput.show()
}


// function onNewBookValue(ev, property) {
//     var newValue = ev.value;
//     setBookValue(gCurrentBookId, property, newValue)
//     renderBooks();
// } 


// TO DO - Merge all onNewPrice/Author/ functions to one function that also gets a property
function onNewPrice(ev, newPrice) {
    if (ev.key === 'Enter') {
        setBookPrice(gCurrentBookId, newPrice)
        renderBooks();
    }
}

function onNewTitle(ev, newTitle) {
    if (ev.key === 'Enter') {
        setBookTitle(gCurrentBookId, newTitle)
        renderBooks();
    }
}

function onNewAuthor(ev, newAuthor) {
    if (ev.key === 'Enter') {
        setBookAuthor(gCurrentBookId, newAuthor)
        renderBooks();
    }
}


function onToggleOptionsModal(bookId) {
    gCurrentBookId = bookId;
    $(`#${bookId}`).toggle()
    setTimeout(() => {
        $(`#${bookId}`).hide('fade');
    }, 3000);
}

function onSetCurrentPage(num) {
    setCurrentPage(num);
    renderBooks();
    $('.page-number').text(`Page ${gCurrPageIdx}/${gPages}`)
}

function onSetNextPage() {
    setNextPage();
    renderBooks();
    $('.page-number').text(`Page ${gCurrPageIdx}/${gPages}`)
}

function onSetPrevPage() {
    setPrevPage();
    renderBooks();
    $('.page-number').text(`Page ${gCurrPageIdx}/${gPages}`)
}


function onToggleBookReadModal(bookId) {
    var book = getBookById(bookId);
    var $modal = $('.modal-read-book');
    var imgCoverHtml = `<img class="img" src="${book.cover}">`
    $modal.find('.title').text(book.title);
    $modal.find('.author').text(book.author);
    $modal.find('.price').text(`$${book.price}`);
    $modal.find('.curr-rate').text(`${book.rate}`);
    $modal.find('.book-info-img').html(imgCoverHtml);
    $('.modal-read-book').toggle('0.3s');
    gCurrentBookId = bookId;
}

// Desperate attampts to assign a value to element and then later use it
// $currRate.attr('bookid',bookId);
// $modal.find('.rate-up').attr('bookid',bookId);
// $modal.find('.rate-down').attr('bookid',bookId);


function onCloseReadModal() {
    $('.modal-read-book').hide('fade');
}

function onChangeRate(num) {
    var $modal = $('.modal-read-book');
    var book = getBookById(gCurrentBookId);
    if (book.rate === 0 && num === -1) return;
    if (book.rate === 5 && num === 1) return;
    if (book.rate === 1 && num === -1) {
        $modal.find('.rate-down').addClass('disable');
    } else if (book.rate === 4 && num === 1) {
        $modal.find('.rate-up').addClass('disable');
    } else {
        $modal.find('.rate-up').removeClass('disable');
        $modal.find('.rate-down').removeClass('disable');
    }
    setBookRate(gCurrentBookId, num)
    $modal.find('.curr-rate').text(`${book.rate}`);
}


function onSortChange(sortByTxt) {
    setBooksSort(sortByTxt);
    renderBooks();
}



var addBooks = function (data) {
    books = [];

    for (var i = 0; i < data.items.length; i++) {
        var bookData = data.items[i];

        var author = function () {
            if (bookData.volumeInfo.authors) {
                return bookData.volumeInfo.authors[0];
            } else {
                return null;
            }
        };

        var imageURL = function () {
            if (bookData.volumeInfo.imageLinks) {
                return bookData.volumeInfo.imageLinks.thumbnail;
            } else {
                return null;
            }
        };

        var isbn = function () {
            if (bookData.volumeInfo.industryIdentifiers) {
                return bookData.volumeInfo.industryIdentifiers[0].identifier;
            } else {
                return null;
            }
        };

        var pageCount = function () {
            if (bookData.volumeInfo.pageCount) {
                return bookData.volumeInfo.pageCount;
            } else {
                return null;
            }
        };

        var title = function () {
            if (bookData.volumeInfo.title) {
                return bookData.volumeInfo.title;
            } else {
                return null;
            }
        };

        var book = {
            title: title(),
            author: author(),
            imageURL: imageURL(),
            pageCount: pageCount(),
            isbn: isbn()
        };

        books.push(book);
    }

    renderBooks();
};
var renderBooks = function () {
    $('.books').empty();

    for (var i = 0; i < books.length; i++) {
        // create HTML and append to .books
        var source = $('#book-template').html();
        var template = Handlebars.compile(source);
        var context = books[i];
        var html = template(context);
        $('.books').append(html);
    }
};

$('.search').on('click', function () {
    var search = $('#search-query').val();

    fetch(search);
});


var fetch = function (query) {
    $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=" + query,
        dataType: "json",
        success: function (data) {
            addBooks(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};
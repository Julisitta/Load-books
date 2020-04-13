'use strict'

window.onload = function() {
    document.querySelector('.cause').addEventListener('click', openPopup);
    document.querySelector('.cancel').addEventListener('click', closePopup);
    document.querySelector('.send').addEventListener('click', sendForm);
}

function openPopup() {
    document.getElementById('title').value = null;
    document.getElementById('name').value = null;
    document.getElementById('lent').value = null;
    document.getElementById('until').value = null;
    document.querySelector(".save").style.display = "none";
    document.querySelector(".send").style.display = " inline-block";
    document.getElementById("pop-up").style.display = "block";
}

function editingBook(book, newLi, inputTitle, inputName, inputLent, inputUntil, counter) {
    document.getElementById('title').value = book.title;
    document.getElementById('name').value = book.name;
    document.getElementById('lent').value = book.lent;
    document.getElementById('until').value = book.until;
    let numberOfBook = Number(counter.innerHTML);
    document.getElementById("delete-books").style.display = "flex";
    document.querySelector(".send").style.display = "none";
    document.querySelector(".save").style.display = "inline-block";
    document.querySelector('.save').onclick = function() {saveChanges(newLi, inputTitle, inputName, inputLent, inputUntil,numberOfBook-1)};
    document.getElementById("pop-up").style.display = "block";
}

function closePopup() {
    document.getElementById("pop-up").style.display = "none";
    if (document.getElementById("tcal") != null) {document.getElementById("tcal").style.visibility = "hidden"};
    if (document.querySelector(".tcalActive") != null) {document.querySelector(".tcalActive").style.background = "url('img/cal.gif') 100% 50% no-repeat"};
    document.getElementById("delete-input").checked = false;
}

const mainUl = document.getElementById("book-list");

function sendForm() {
    let title = document.getElementById('title').value;
    let name = document.getElementById('name').value;
    let lent = document.getElementById('lent').value;
    let until = document.getElementById('until').value;
    let newBook = new Book(title, name, lent, until);
    pushBook(newBook);
    closePopup();
}

function saveChanges(newLi, inputTitle, inputName, inputLent, inputUntil, numberOfBook) {
    let bookArray = JSON.parse(localStorage.getItem('books'));
    if (document.getElementById("delete-input").checked) {
        newLi.remove();
        bookArray.splice(numberOfBook, 1);
        document.getElementById("delete-input").checked = false;
    } else {
        let title = document.getElementById('title').value;
        let name = document.getElementById('name').value;
        let lent = document.getElementById('lent').value;
        let until = document.getElementById('until').value;

        inputTitle.innerHTML = title;
        inputName.innerHTML = name;
        inputLent.innerHTML = lent;
        inputUntil.innerHTML = until;

        bookArray[numberOfBook].title = title;
        bookArray[numberOfBook].name = name;
        bookArray[numberOfBook].lent = lent;
        bookArray[numberOfBook].until = until;
    }
    localStorage.setItem('books', JSON.stringify(bookArray));
    closePopup();
    window.location.reload();
}


class Book {
    constructor(title, name, lent, until) {
        this.title = title;
        this.name = name;
        this.lent = lent;
        this.until = until;
      }
}

let bookList = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
localStorage.setItem('books', JSON.stringify(bookList));

let pushBook = function(newBook) {
    bookList.push(newBook);
    localStorage.setItem('books', JSON.stringify(bookList));
    bookList = JSON.parse(localStorage.getItem('books'));
    liMaker(newBook);
}

let i=1;
const liMaker = (book) => {
    let newLi = document.createElement('li');
    let inputTitle = document.createElement('p');
    let inputName = document.createElement('p');
    let inputLent = document.createElement('p');
    
    let inputUntil = document.createElement('p');
    let counter = document.createElement('p');
    let button = document.createElement('button');

    let inputTitleinputName = document.createElement('div');
    let inputLentinputUntil = document.createElement('div');
    inputTitleinputName.append(inputTitle, inputName);
    inputLentinputUntil.append(inputLent, inputUntil);
    inputTitleinputName.className = "div-for-name";
    inputLentinputUntil.className = "div-for-lent";
    
    newLi.append(counter, inputTitleinputName, inputLentinputUntil, button);

    newLi.className = "list";
    inputTitle.className = "new-title";
    inputName.className = "new-name";
    inputLent.className = "new-lent";
    inputUntil.className = "new-until";
    counter.className = "new-counter";
    button.className = "new-button";
    button.onclick = function(){
        editingBook(book, newLi, inputTitle, inputName, inputLent, inputUntil, counter);
    }

    inputTitle.innerHTML = book.title;
    inputName.innerHTML = book.name;
    inputLent.innerHTML = book.lent;
    inputUntil.innerHTML = book.until;
    button.innerHTML = "  ";
    counter.innerHTML = i;
    mainUl.append(newLi);
    i++;
    document.getElementById("lent-length").innerHTML = "You have lent " +  bookList.length + " books to friend";
}

bookList.forEach(book => {
    liMaker(book);
});




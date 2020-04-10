window.onload = function() {
    document.querySelector('.cause').addEventListener('click', fTabs);
    document.querySelector('.cancel').addEventListener('click', close);
    document.querySelector('.send').addEventListener('click', send);
    //localStorage.clear();
    
}

function fTabs() {
    document.getElementById('title').value = null;
    document.getElementById('name').value = null;
    document.getElementById('lent').value = null;
    document.getElementById('until').value = null;
    document.querySelector(".save").style.display = "none";
    document.querySelector(".send").style.display = " inline-block";
    document.getElementById("pop-up").style.display = "block";
    document.getElementById("gray").style.display = "block";
}

function close() {
    document.getElementById("pop-up").style.display = "none";
    document.getElementById("gray").style.display = "none";
}

const mainUl = document.getElementById("book-list");

function send() {
    let title = document.getElementById('title').value;
    let name = document.getElementById('name').value;
    let lent = document.getElementById('lent').value;
    let until = document.getElementById('until').value;
    let newBook = new Book(title, name, lent, until);
    console.log("пушим книгу")
    pushBook(newBook);
    close();
}

function save(newLi, inputTitle, inputName, inputLent, inputUntil, numberOfBook) {
    let bookArray = JSON.parse(localStorage.getItem('books'));
    if (document.getElementById("delete-input").checked) {
       
        console.log("delete", newLi);
        newLi.remove();
        bookArray.splice(bookArray, numberOfBook);
        document.getElementById("delete-input").checked = false;

    } else {
        let title = document.getElementById('title').value;
        let name = document.getElementById('name').value;
        let lent = document.getElementById('lent').value;
        let until = document.getElementById('until').value;

        console.log(bookArray)
        inputTitle.innerHTML = title;
        inputName.innerHTML = name;
        inputLent.innerHTML = lent;
        inputUntil.innerHTML = until;

        bookArray[numberOfBook-1].title = title;
        bookArray[numberOfBook-1].name = name;
        bookArray[numberOfBook-1].lent = lent;
        bookArray[numberOfBook-1].until = until;
        console.log(title);
        window.location.reload();
    }
    localStorage.setItem('books', JSON.stringify(bookArray));
    close();
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
    
    newLi.append(counter, inputTitle, inputName, inputLent, inputUntil, button);

    newLi.className = "list";
    inputTitle.className = "new-title";
    inputName.className = "new-name";
    inputLent.className = "new-lent";
    inputUntil.className = "new-until";
    counter.className = "new-counter";
    button.className = "new-button";
    
    button.onclick = function(){
        document.getElementById('title').value = book.title;
        document.getElementById('name').value = book.name;
        document.getElementById('lent').value = book.lent;
        document.getElementById('until').value = book.until;
        numberOfBook = Number(counter.innerHTML);
        document.getElementById("delete-books").style.display = "flex";
        document.querySelector(".send").style.display = "none";
        document.querySelector(".save").style.display = "inline-block";
        document.querySelector('.save').onclick = function() {save(newLi, inputTitle, inputName, inputLent, inputUntil,numberOfBook)};
        document.getElementById("pop-up").style.display = "block";
        document.getElementById("gray").style.display = "block";
        console.log(typeof numberOfBook);
    }

    console.log("новый li создан");

    inputTitle.innerHTML = book.title;
    inputName.innerHTML = book.name;
    inputLent.innerHTML = book.lent;
    inputUntil.innerHTML = book.until;
    button.innerHTML = "  ";
    counter.innerHTML = i;

    mainUl.append(newLi);
    i++;
    console.log(bookList.length);
    document.getElementById("lent-length").innerHTML = "You have lent " +  bookList.length + " books to friend";

}

bookList.forEach(book => {
    liMaker(book);
});




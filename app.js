//Book Constructor
function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
};

//UI Constructor
function UI(){};

//Add book to list
UI.prototype.addBookToList=function(book){
    const list=document.querySelector('#book-list');
    //Create tr element
    const row=document.createElement('tr');
    //Insert cols
    row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
};

//Show Alert
UI.prototype.showAlert=function(message,className){
    //Create div
    const div=document.createElement('div');
    //Add classess
    div.className=`alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));
    //Get Parent
    const container=document.querySelector('.container');
    //Get form
    const form=document.querySelector('#book-form');
    //Inset alert
    container.insertBefore(div, form);

    //Timeout after 3sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
};

//Delete Book
UI.prototype.deleteBook=function(target){
    if(target.className==='delete'){
        target.parentElement.parentElement.remove();
    };
};

//Clear Fields
UI.prototype.clearFields=function(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
};


//Event Listeners for add book
document.querySelector('#book-form').addEventListener('submit',function(e){
    //Get form values
    const title=document.querySelector('#title').value,
          author=document.querySelector('#author').value,
          isbn=document.querySelector('#isbn').value;

    //Instantiate book object
    const book=new Book(title,author,isbn);   
    
    //Instantiate UI object
    const ui=new UI();

    //Validate
    if(title==='' || author==='' || isbn===''){
        //Error Alert
        ui.showAlert('Please fill in all fields','error');
    }else{
        //Add book to list
        ui.addBookToList(book);

        //Success Alert
        ui.showAlert('Book Added','success');

        //Clear fields
        ui.clearFields();
    };

    

    e.preventDefault();
});

//Event Listener for Delete
document.querySelector('#book-list').addEventListener('click',function(e){

//Instantiate ui Object
const ui=new UI();

//Delete Book
ui.deleteBook(e.target);

//Show Message
ui.showAlert('Book Removed','success');
});
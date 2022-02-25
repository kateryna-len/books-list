import React, {useState, useEffect} from 'react'
import './App.css';
import View from './components/View';

const getDatafromLS =()=>{
  const data = localStorage.getItem('books')
  if(data){
    return JSON.parse(data)
  }
  else {
    return []
  }
}

function App() {

  const[books, setBooks] = useState(getDatafromLS())

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const[category, setCategory] = useState('')

  const handleAddBooksSubmit=(e)=>{
    e.preventDefault();
    let book = {
      title,
      author,
      isbn,
      category,
    }
    setBooks([...books, book])
    setTitle('')
    setAuthor('')
    setIsbn('')
    setCategory('')
  }

  const deleteBook = (isbn) =>{
    const filteredBooks = books.filter(elements=>{
      return elements.isbn !== isbn
    })
    return setBooks(filteredBooks)
  }

  useEffect(()=>{
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const handleEditTodos = (editValue, id) =>{
    const newTodos=[...books]
    newTodos.forEach((book, index)=>{
      if(index === id){
        book.title =editValue
      }
    })
    setTitle(newTodos)
  }
  return (
    <div className='wrapper'>
      <h1>Book List</h1>

      <div className='main'>

      <div className='form-container'>
          <form autoComplete="off" className='form-group' onSubmit={handleAddBooksSubmit}>
            <label>Title :</label>
            <input type="text" className='form-control' required
            onChange={e=>setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label>Author :</label>
            <input type="text" className='form-control' required
            onChange={e=> setAuthor(e.target.value)} value={author}></input>
            <br></br>
            <label>Category :</label>
            <select onChange={e=>setCategory(e.target.value)} className='form-control' aria-label="Default select example" required>
  <option>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
            <br></br>
            <label>ISBN# :</label>
            <input type="text" className='form-control' required
            onChange={e=>setIsbn(e.target.value)} value={isbn}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>
        <div className='view-container'>

          {books.length>0&& <>
          <div className='table-responsive'>
            <table className='table'>
            <thead>
              <tr>
                <th>ISBN#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index)=>(<View handleEditTodos={handleEditTodos} book={book} id={index} deleteBook={deleteBook}/>))}
            </tbody>

          </table>
          </div>
          <button className='btn btn-danger btn-md' onClick={()=>setBooks([])}>Remove All</button>
          
          </>}


          {books.length < 1 && <div> No books are added yet</div>}
        </div>
      </div>

    </div>
  );
}

export default App;

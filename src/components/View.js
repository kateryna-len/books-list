import React, {useState} from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {pencil} from 'react-icons-kit/icomoon/pencil'

const View = ({book, id, deleteBook, handleEditTodos})=>{
 const [onEdit, setOnEdit] = useState(false)
 const [ editValue, setEditValue] = useState(book.title)

 const handleOnEdit = ()=>{
   setOnEdit(true)
 }

 const handleSave = id =>{
   setOnEdit(false)
   if(editValue){
    handleEditTodos(editValue, id)
   }
   else{
     setEditValue(book.title)
   }
 }

 if(onEdit){
   
   return(
    <tr key={book.isbn}>
    <td>{book.isbn}</td>
    <td><input type='text' id={editValue} name='editValue' onChange={e=>setEditValue(e.target.value)}/></td>
    <td>{book.author}</td>
    <td>{book.category}</td>
    <td>
      <button className='btn-edit' onClick={()=>handleSave(id)}>Save</button>
    </td>
  </tr>
   )
 }

  return (
    <tr key={book.isbn}>
      <td>{book.isbn}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.category}</td>
      <td>
        <Icon onClick={()=>deleteBook(book.isbn)} className = 'delete-btn' icon={trash} /> 
        <Icon className = 'edit-btn' icon={pencil} onClick={handleOnEdit}  />
      </td>
    </tr>
  )
}

export default View;
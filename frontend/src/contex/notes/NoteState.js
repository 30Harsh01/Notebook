// import react from 'react'
import React, { useState } from 'react'
import NoteContext from './noteContext'     //coming from import { createContext } from "react";

const NoteState = (props) => {
  const notesinitial = [
    {
      "_id": "",
      "user": "",
      "title": "",
      "description": "",
      "tag": "",
      "date": "",
      "__v": 0
    }
  ]
  const [Notes, setNotes] = useState(notesinitial)

  const getAllNotes = async () => {
    //add note
    //Api
    const url = "http://localhost:5000/api/notes/fetchallnotes"
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    // console.log(data[1].description)
    setNotes(data)
  }

  //add note
  const add = async (title, description, tag) => {
    //Api
    const url = "http://localhost:5000/api/notes/addnewnotes"
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note= await response.json()
    setNotes(Notes.concat(note))
  }
  //delete note
  const del = async (id) => {
    // api
    const url=`http://localhost:5000/api/notes/deletenote/${id}`
    const response=await fetch(url,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    })
    const json= response.json()
    // alert("Hello" + id)
    const deletedNote = Notes.filter((note) => { return note._id !== id })
    setNotes(deletedNote)
  }
  //const update
  const update = async (id, title, description, tag) => {
    //api call 
    const url = `http://localhost:5000/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
      // body: JSON.stringify({id,title, description, tag })
    })
    const json= await response.json()
    console.log(json)
    //logic to edit a note in client side
    let newNotes=await JSON.parse(JSON.stringify(Notes))
    for (let i = 0; i < newNotes.length; i++) {
      let element = newNotes[i]
      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].description = description;
        newNotes[i].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ Notes, add, del, update, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState
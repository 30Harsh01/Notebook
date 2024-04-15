import React from 'react'
import NotesComponent from './Notes'


const Home = (props) => {
  
  return (
    <div>
      <NotesComponent showAlert={props.showAlert}/>
    </div>
  )
}

export default Home

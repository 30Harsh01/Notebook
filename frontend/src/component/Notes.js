import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../contex/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const NotesComponent = (props) => {
  let navigate=useNavigate();
  const context = useContext(noteContext)
  const { Notes, getAllNotes,update} = context;

  useEffect(() => {
    // localStorage.clear('token')
    if(localStorage.getItem('token')){
      getAllNotes()
    }else{
      navigate('/login')
    }
    //eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (localStorage.getItem('token')) {
  //       try {
  //         await getAllNotes();
  //       } catch (error) {
  //         props.showAlert('Failed to fetch notes', 'error');
  //       }
  //     } else {
  //       navigate('/login');
  //     }
  //   };
  //   fetchData();
  //   //eslint-disable-next-line
  // }, []);

  const ref = useRef(null)
  const refclose=useRef(null)
  const[note,setnote]= useState({
    id:"",
    etitle:"",
    edescription:"",
    etag:""
  })
    const updateNote = (currentnote) => {
      ref.current.click();
      setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }
    const afterclick=(event)=>{
      update(note.id,note.etitle,note.edescription,note.etag)
      refclose.current.click()
      props.showAlert("Note updated","success")

      // add(addednote.etitle,addednote.edescription,addednote.etag)
    }
    const onchange=(event)=>{
      setnote({...note,[event.target.name]:event.target.value})
  }
  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-etitle fs-5" id="exampleModalLabel">Update</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={afterclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
      <h2>Your Notes</h2>
      <div className='container mx-3'>
      {Notes.length===0 && "There is no exsisting notes Please create notes first"}
      </div>
        {Notes.map((note) => {
          // return noteContext.etitle
          return <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote}/>
        })}
      </div>
    </>
  )
}
export default NotesComponent
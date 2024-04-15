import React,{ useContext, useState } from 'react'
import noteContext from '../contex/notes/noteContext'

const Addnote = (props) => {
    const context = useContext(noteContext)
    const {add} = context
    const[addednote,setaddednote]= useState({
        title:"",
        description:"",
        tag:""
    })
    const afterclick=(event)=>{
        event.preventDefault();
        add(addednote.title,addednote.description,addednote.tag)
        props.showAlert("Note added","success")
        setaddednote({
            title:"",
            description:"",
            tag:""
        })
    }
    const onchange=(event)=>{
        setaddednote({...addednote,[event.target.name]:event.target.value})
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={addednote.title} name='title' onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" id="description" value={addednote.description} name="description" onChange={onchange} rows={3} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={addednote.tag} onChange={onchange}/>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={afterclick}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
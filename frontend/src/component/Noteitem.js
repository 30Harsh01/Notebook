import React from 'react'
import { useContext } from 'react'
import noteContext from '../contex/notes/noteContext'
const Noteitem = (props) => {
    // console.log(props.note.description)
    const context = useContext(noteContext)
    const { del } = context
    let changerArray=['primary','secondary','success','danger','warning','info','dark']
    const change=changerArray[Math.floor(Math.random()*changerArray.length)]
    return (
        <>
            <div className='col-md-3'>
                <div className={`card border-${change} mb-3`}>
                    <div className="card-header">{props.note.tag}</div>
                    <div className={`card-body text-${change}`}>
                        <h5 className="card-title">{props.note.title}</h5>
                        <p className="card-text">{props.note.description}</p>
                        <div className="btn btn-sm btn-danger mx-1" onClick={() => { del(props.note._id);props.showAlert("Deleted successfully","success") }}>Delete</div>
                        <div className="btn btn-sm btn-secondary mx-1" onClick={() => { props.updateNote(props.note) }}>Edit</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
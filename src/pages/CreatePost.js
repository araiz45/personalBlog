import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

function CreatePost() {
const {info} = useContext(UserContext);
const [title, setTitle] = useState('')
const [summary, setSummary] = useState('')
const [file, setFile] = useState('')
const [content, setContent] = useState('')
const [redirect, setRedirect] = useState(false)
if(!info){
    window.location.replace("http://localhost:3000/")
}
const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(title, summary, file, content)
    const formData = new FormData();
    formData.set('title', title)
    formData.set('summary', summary)
    formData.set('file', file[0])
    formData.set('content', content)

    const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        credentials: 'include',
        body: formData,
        // headers: {'Content-Type': 'application/json'},
    })
    if(response.status === 200){
      setRedirect(true)
      
    }
}

if(redirect){
  return <Navigate to={'/'} />
}
  return (
    <><form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label" >Title</label>
      <input type="text" className="form-control" value={title} onChange={ev => setTitle(ev.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" required/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Summary</label>
      <input type="text" className="form-control" value={summary} onChange={ev => setSummary(ev.target.value)} id="exampleInputPassword1" required/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Upload file</label>
      <input type="file" className="form-control" onChange={ev => setFile(ev.target.files)} id="exampleInputPassword1" required/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Upload file</label>
      <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} required/>
    </div>

    <button type="submit" className="btn btn-primary">Post</button>
  </form></>
  )
}

export default CreatePost
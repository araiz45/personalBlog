import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import DateTimeFormat from 'format-date-time'
import { UserContext } from '../context/UserContext';

const formatter = new DateTimeFormat('HH:mm (YYYY-MM-DD)');
function Page() {
    const {id} = useParams()
    const { info } = useContext(UserContext);
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [postId, setPostId] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [cover, setCover] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    useEffect(() => {
      const FetchId = async () =>{
        const response = await fetch (`http://localhost:4000/post/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        // console.log(data)
        setPostId(data._id);
        setTitle(data.title)
        setSummary(data.summary)
        setContent(data.content)
        setAuthor(data.author.username)
        setCover(data.cover)
        setCreatedAt(data.createdAt)
        setAuthorId(info.id === data.author._id)
      }
      FetchId();
    }, [])

    const handleDelete = async () =>{
      const response = await fetch(`http://localhost:4000/post/${id}`,{
        method: 'DELETE',
      })
      if(response.ok){
        setRedirect(true)
      }
    }

    if(redirect){
      return <Navigate to={'/'} />
    }

  return (
    <div className='container d-flex flex-column' style={{overflow: 'hidden'}}>
        <h1 className='text-center'>{title}</h1>
        <div className='text-center font-weight-400'>@{author}</div>
        <div className='text-center mb-4'>{(formatter.parse(new Date(createdAt)))}</div>
        {authorId? <div className='d-flex justify-content-center gap-2'><Link className='btn btn-outline-primary mb-3' to={`/edit/${postId}`}>Edit</Link>
        <button className='btn btn-outline-primary mb-3' onClick={handleDelete}>Delete</button></div>: ''}
        <img src={`http://localhost:4000/${cover}`} width={'100%'} className='mb-4'/>
        <p dangerouslySetInnerHTML={{__html:content}} style={{maxWidth: "100%"}}></p>
    </div>
  )
}

export default Page
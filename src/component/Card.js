import React from 'react'
import { Link } from 'react-router-dom'
import DateTimeFormat from 'format-date-time'
const formatter = new DateTimeFormat('HH:mm (YYYY-MM-DD)');
function Card({title, summary, date, id, cover}) {
  return (
    <> <div className="card mb-3" >
    <img src={cover} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{summary}</p>
      <p className="card-text"><small className="text-body-secondary">{formatter.parse(new Date(date))}</small></p>
      <Link to={`/post/${id}`} className='btn btn-outline-primary'>Read More</Link>
    </div>
  </div></>
  )
}

export default Card
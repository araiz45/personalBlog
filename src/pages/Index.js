import React, { useContext, useEffect, useState } from 'react'
import Card from '../component/Card'
import { UserContext } from '../context/UserContext'

function Index() {
  const {info, setInfo} = useContext(UserContext)
  const [dataArray, setDataArray] = useState(null)
  useEffect(() => {
    const indexFetch = async () =>{
      const response = await fetch ('http://localhost:4000/post',{
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json();
      console.log(data)
      setDataArray(data)
    }
    indexFetch();
  }, [])
  
  return (
    <>{dataArray && dataArray.map((e)=>{
      return <Card title={e.title} summary={e.summary} date={e.createdAt} id={e._id} cover={'http://localhost:4000/'+ e.cover}/>
    })}
        
    </>
  )
}

export default Index
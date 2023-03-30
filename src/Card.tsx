import { CircularProgress } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate }from 'react-router-dom'

type ResponseData = {
    title : string,
    author : string
}


function Card() {
    
    const nav = useNavigate()

    const [data , setData] = useState<ResponseData[]>([])
    const [count , setCount] = useState<number>(0)
    const [filterData , setFilterData] = useState<ResponseData[]>([])
    const [showData , setShowData] = useState<Boolean>(false)

    useEffect(()=>{
        apiCall()
    },[count])
    
    const apiCall = () => {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
        .then(resData => resData.json()
        .then(res => setData([...data , ...res.hits])))
        setShowData(true)
    }

    const handleNavigate = (res : ResponseData) => {
        nav('/particular-data' , {state : res})
    }
    

    useEffect(()=>{  
        window.addEventListener('scroll' , fn)
        return ()=> window.removeEventListener('scroll' , fn)

    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const search : string = e.target.value 
        
        if(search.length === 0) setFilterData([])
        else{
            const newArr : ResponseData[] = data.filter((res : ResponseData)=> res.title.toLowerCase().includes(search))
            setFilterData(newArr)
        }

    }

    const fn = useCallback(()=>{
        if(document.scrollingElement !== null){
        if(window.innerHeight + Math.floor(document.documentElement.scrollTop) === document.scrollingElement.scrollHeight){
            setCount((prev : number ) => prev + 1)
        }
    }
    } , [])

  return (
    <>
    <input type  = "text" className='search-bar' placeholder= "search text" onChange={handleChange}/>

    <div className='cards flex' >        
        { 
        filterData.length === 0 ? 
            
            data.map((res)=>{
                return (    
                <>
                <div className='card' onClick={()=>{handleNavigate(res)}}>
                    <div>{<h3 className='card-text'>{res.title}</h3>}</div>
                    <div>{<h4 className='card-text'>{res.author}</h4>}</div>
                </div>
                </>
            )})

            : 

            filterData.map((filteredData) => {
                return (
                <>
                    <div >
                        <div>{<h3>{filteredData.title}</h3>}</div>
                        <div>{<h4>{filteredData.author}</h4>}</div>
                    </div>
                </>
                )
            })

        }
    </div> 
             {showData && <CircularProgress />}

    </>
  )
}

export default Card
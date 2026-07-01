import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [userdata, setUserdata] = useState([])
  const [index, setIndex] = useState(1)

  const data=async ()=>{
    const response=await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`)
    setUserdata(response.data)
    // console.log(userdata)
  }

  useEffect(function(){
   data()
  },[index]) 
 
  let printUserdata=<h3 className='absolute top-1/2 left-1/2 text-gray-200 font-semibold -translate-x-1/2 -translate-y-1/2 text-2xl'>Loading...</h3>

  if(userdata.length>0){
    printUserdata=userdata.map(function(elem,idx){
      return <a href={elem.url}>
        <div key={idx} className='h-52 w-64 transition-transform hover:scale-110 bg-white rounded-2xl'>
        <div className='h-full w-full object-cover flex flex-wrap overflow-hidden rounded-2xl'>
        <img loading='lazy' className='transition-transform duration-300 ease-in-out hover:scale-125' src={elem.download_url} alt="" />
        </div>
        <h2 className='font-bold text-xl text-gray-100'>{elem.author}</h2>
      </div></a>
    })
  }
  return (
    <div className='text-white font-bold p-6 overflow-auto  h-screen'>
      {/* <button onClick={data} className='bg-green-600 active:scale-95 hover:bg-green-700 px-3 py-2 rounded'>Get Data</button> */}
      <div className='mt-10 flex flex-wrap gap-10 h-[82%] justify-center'>{printUserdata}</div>
      <div className='flex justify-center items-center p-4 gap-6 mt-10'>
        <button style={{opacity:index==1 ? 0.6 :1}} 
        onClick={()=>{
          if(index>1){ 
            setUserdata([])
            setIndex(index-1);}
        }}
         className={`bg-amber-400 h-10 w-30  text-black text-sm font-semibold cursor-pointer ${index>1 ?'active:scale-85' : ''} hover:bg-amber-500`}>Prev</button>
         <h3>Page {index}</h3>
        <button
         onClick={()=>{
            setUserdata([])          
          setIndex(index+1);
        }}
         className='bg-amber-400 h-10 w-30 text-black text-sm font-semibold cursor-pointer  hover:bg-amber-500'>Next</button>
      </div>

    </div>
  )
}

export default App

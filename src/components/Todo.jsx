import React from 'react'
import { useState, useEffect,useRef  } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
const Todo = () => {
  const {t}=useTranslation()
  const [form, setform] = useState({ tname: "", descp: "", priority: "" })
  const [task, settask] = useState([])
  const [done, setdone] = useState([])

  const gettasks=async()=>{
      let req= await fetch('http://localhost:3000/')
      let tasks= await req.json()
      console.log(tasks)
      settask(tasks)
  }
  
  const job=(ide)=>{
    setdone((pstate)=>{
      const exis=pstate.some(item=>item.id==ide)
      if(exis){
        return pstate.filter((it)=>it.id!=ide)
      }
      else{
        return [...pstate,{id:ide}]
      }
    })
    // done.map((it)=>{
    //   if(it.id!=ide){
    //     setdone([...done,{id:ide}])
    //   }
    //   else{
    //     setdone(done.filter(it=>it.id!=ide))
    //   }
    // })
  }
  const submit=async()=>{
    settask([...task,{...form,id:uuidv4()}])
    console.log(form)
    await fetch('http://localhost:3000/',{method:'POST',headers:{"content-type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const del=async(id)=>{
    settask(task.filter((item)=>item.id!=id))
    let res=await fetch('http://localhost:3000/',{method:'DELETE',headers:{"content-type":"application/json"},body:JSON.stringify({id})})
  }
  useEffect(() => {
    gettasks()
    }, [])
    console.log(done)
  return (
    <div className="absolute z-[-2] top-0 bg-blue-50 min-w-[99vw] min-h-[90vh] box-border">
      <Navbar />
      <div className="form flex flex-col mx-auto p-20 my-5">
        <div className="i1 flex flex-col">
          <label className='m-5 p-1 text-2xl text-black font-danceScript'>{t("Task")} {t("Name")}</label>
          <input className=' tname p-1 m-7 mt-1 w-[35vw] border rounded-md text-black' value={form.tname} onChange={handleChange} name='tname' />
        </div>
        <div className="i1 flex flex-col">
          <label className='m-5 p-1 text-black text-2xl font-danceScript'>{t("Description")}</label>
          <input className=' descp p-1 m-7 mt-1 w-[35vw] border rounded-md text-black' value={form.descp} onChange={handleChange} name='descp' />
        </div>
        <div className="i1 flex flex-col">
          <label className='m-5 p-1 text-2xl text-black font-danceScript'>{t("Priority")}</label>
          <select className='p-2 m-7 mt-1 w-[35vw] bg-blue-200 border rounded-lg priority' name='priority' value={form.priority} onChange={handleChange}>
            <option value='High' className='text-sm text-white font-sans'>{t("High")}</option>
            <option value='Low' className='text-sm text-white font-sans'>{t("Low")}</option>
            <option value='Intermediate' className='text-sm text-white font-sans'>{t("Intermediate")}</option>
          </select>
        </div>
        <div className="btn">
          <button className='btn p-3 w-48 text-xl text-white font-danceScript m-3 bg-blue-600 border rounded-lg' onClick={()=>{submit()}}>Add</button>
        </div>
        {task.length==0 && <div className='mt-7 text-lg font-danceScript'>{t("No")} {t("tasks")} {t("recorded")} {t("for")} {t("today")}</div>}
        {task.length!=0 && <div>
          <table className="table-auto mt-7">
          <thead>
            <tr>
              <th className='mx-auto p-3 bg-blue-400 border border-white text-white font-danceScript text-lg'>{t("Task")}</th>
              <th className='mx-auto p-3 bg-blue-400 border border-white text-white font-danceScript text-lg'>{t("Description")}</th>
              <th className='mx-auto p-3 bg-blue-400 border border-white text-white font-danceScript text-lg'>{t("Priority")}</th>
              <th className='mx-auto p-3 bg-blue-400 border border-white text-white font-danceScript text-lg'>{t("Status")}</th>
            </tr>
          </thead>
          <tbody>
          {task.map((item,index)=>{
            const isc=done.some(it=>it.id==item.id)
             return( <tr key={index}>
             <td className='mx-auto p-3 border border-white bg-blue-400 text-sm text-white'>{item.tname}</td>
             <td className='mx-auto p-3 border border-white bg-blue-400 text-md text-white'>{item.descp}</td>
             <td className='mx-auto p-3 border border-white bg-blue-400 text-md text-white'>{item.priority}</td>
             <td className='mx-auto p-3 border border-white bg-blue-400 text-md flex gap-3'>
              <button className='btn p-2 m-1 text-lg font-danceScript bg-white text-blue-500 w-20 rounded-md' onClick={()=>{del(item.id)}}>{t("Delete")}</button>
              <input className='btn p-3 m-1 text-lg font-danceScript bg-white text-blue-500 rounded-md w-6 cursor-pointer' type='checkbox' onClick={()=>{job(item.id)}}/>
              {isc?(<div className='text-lg text-green-500 font-danceScript p-3 m-1 border-blue-500 bg-white rounded-lg'>{t("Completed")}</div>):(<div className='text-lg text-red-600 font-danceScript p-3 m-1 border-blue-500 bg-white rounded-lg'>{t("Pending")}</div>)}
              {/* {ref.current==true && <div className='text-lg text-green-500 font-danceScript p-3 m-1 border-blue-500 bg-white rounded-lg'>Completed</div>}
              {ref.current==false && <div className='text-lg text-red-600 font-danceScript p-3 m-1 border-blue-500 bg-white rounded-lg' >Pending</div>} */}
             </td>
           </tr>
          )})
          }
          </tbody>
        </table>
          </div>}
      </div>
      <Footer />
    </div>
  )
}

export default Todo

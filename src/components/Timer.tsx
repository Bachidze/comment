import { useEffect, useState } from "react"

export default function Timer() {

    const [time,setTime] = useState(0)
    const [start,setStart] = useState(false)
        useEffect(()=>{
            let interavl = 0
            if(start){
                interavl = setInterval(()=>{
                    if(time > 0){
                    setTime(prev => prev - 1)
                        clearInterval(interavl)
                    }
                },1000)
            }else{
                clearInterval(interavl)
            }

            return () => {
                clearInterval(interavl)
            }
        },[start,time])
  return (
    <>
    <input type="number" onChange={(e) => setTime(Number(e.target.value))} />
    <h1>{time}</h1>
    <button onClick={() => setStart(true)}>start</button>
    <button onClick={() => setStart(false)}>stop</button>
    <button onClick={()=>{
        setStart(false)
        setTime(0)
    }}>reset</button>
    </>
  )
}

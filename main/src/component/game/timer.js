import {useState, useEffect} from "react"

const useTimer = (props)=>{
    const [sec, setSec] = useState(5000);

    const idx = props.idx
    const rooms = props.rooms

    useEffect(()=>{
        setSec(rooms[idx].Song[rooms[idx].songN[0]].duration)
    }, [props.onTimer])

    useEffect(()=>{
        if(props.onTimer){
            const countdown = setInterval(()=>{
                if(sec > 0) setSec(sec-1)
                else clearInterval(countdown)
            }, 1000)
    
            return ()=>{
                clearInterval(countdown)
            }
        }
    })

    return sec;
}

export default useTimer;
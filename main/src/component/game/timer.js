import {useState, useEffect} from "react"

const useTimer = (props)=>{
    const [sec, setSec] = useState(5000);

    const room = props.room

    useEffect(()=>{
        setSec(room.Song[room.songN[0]].duration)
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
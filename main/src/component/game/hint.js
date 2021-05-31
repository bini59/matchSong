import {useState, useEffect} from "react"

//show hint
const Hint = (props)=>{
    const [hintN, setHintN] = useState(0);
    const [hint, setHint] = useState([])

    useEffect(()=>{
        setHintN(0)
    }, [props.hints])

    useEffect(()=>{
        if(props.sec === props.hints[hintN].time){
            setHint(()=>{
                hint.push(
                    <div key={props.hints[hintN].time}>
                        <span className="hintMsg">{props.hints[hintN].category} : </span>
                        <span>{props.hints[hintN].context}</span>
                    </div>
                )
                return hint
            })
            if(hintN < props.hints.length-1){
                setHintN(hintN+1);
            }
        }
    }, [props.sec, hint, hintN, props.hints])

    return hint;
}

export default Hint
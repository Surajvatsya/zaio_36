import React,{useState} from 'react'
import Styles from './Options.module.css'
const Options = (props) => {
    const [trigger, setTrigger] = useState(false);
    return (
        <div className={props.className} style={props.style}>
            <div className={`${Styles.trigger_button} w-100 btn btn-success`} onClick={e=>setTrigger(true)}>{props.triggerName}</div>
			<div className={`${Styles.sidebar} ${props.lgSidebar && Styles.large_sidebar} ${props.bgColor?`bg-${props.bgColor} text-white`:"text-dark"}`} style={{...props.style,'display':trigger?"block":"none"}}>
                <div className={Styles.trigger_close} onClick={(e)=>setTrigger(false)}>X &nbsp;</div>
                {props.children}
            </div>
        </div>
    )
}

export default Options

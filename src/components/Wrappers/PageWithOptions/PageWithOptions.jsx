
import React from 'react'
import Styles from './PageWithOptions.module.css'
function PageWithOptions(props) {
    return (
        <div className={Styles.main}>
            {props.children}
            
        </div>
    )
}

export default PageWithOptions

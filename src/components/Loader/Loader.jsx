import React, { useContext } from 'react'
import Styles from './Loader.module.css'
import {TailSpin} from 'react-loader-spinner';
import { LoadingContext } from '../../context/LoadingProvider';
function Loader() {
    const {isloading} = useContext(LoadingContext)
    return (
        <div>
            {isloading?<div className={Styles.loader}>
                    <TailSpin
                    type="Grid"
                    color="#16335b"
                    height={80}
                    width={80}
                    visible={isloading}
                    />
                </div>:null}
        </div>
    )
}

export default Loader

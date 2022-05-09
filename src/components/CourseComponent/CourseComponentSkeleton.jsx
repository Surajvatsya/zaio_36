import { LoaderSmall } from '../../components/Loader/LoaderSmall'
import React from 'react'
import Styles from './CourseComponent.module.css'

export const CourseComponentSkeleton = () => {
	return (			
		<div className={`m-auto col-12 col-sm-6 col-lg-4 ${Styles.container_wrapper}`}>		
				<div className={` card ${Styles.container}`}>
				<LoaderSmall/>
				</div>
                    
			</div>
			
	)
}


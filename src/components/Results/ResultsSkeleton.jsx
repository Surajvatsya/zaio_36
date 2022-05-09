import { CourseComponentSkeleton } from '../../components/CourseComponent/CourseComponentSkeleton'
import React from 'react'

export const ResultsSkeleton = () => {
    return (
        <div className="row bg-transparent w-100">
            <CourseComponentSkeleton/>
            <CourseComponentSkeleton/>
            <CourseComponentSkeleton/>
            <CourseComponentSkeleton/>
            <CourseComponentSkeleton/>
            <CourseComponentSkeleton/>
            <CourseComponentSkeleton/>
            <CourseComponentSkeleton/>

        </div>
    )
}

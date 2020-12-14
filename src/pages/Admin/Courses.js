import React, { useEffect, useState } from 'react'
import {getCoursesApi} from '../../api/courses'
import CoursesList from '../../components/Admin/Courses/CoursesList'

export default function Courses() {
    const [courses, seTcourses] = useState([])
    const [reloadCourses, setReloadCourses] = useState(false)

    useEffect(() => {
        getCoursesApi().then(response => {
            seTcourses(response.courses)
        })    
        setReloadCourses(false)
    }, [reloadCourses])

    return (
        <div className='courses'>
            <CoursesList courses={courses} setReloadCourses={setReloadCourses}/>
        </div>
    )
}

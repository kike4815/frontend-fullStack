import {baseURL,version} from './config'
// import {ACCESS_TOKEN,REFRESH_TOKEN} from '../utils/constants'

// export function getCoursesApi(){
//     const url = `${baseURL}/${version}/get-courses`

//     return fetch(url).then(response => {
//         return response.json()
//     })
//     .then(result => {
//         return result
//     })
//     .catch(err => {
//         return err
//     })
// }

export async function getCoursesApi(){
    const url = `${baseURL}/${version}/get-courses`

    const courses = await fetch(url)
    const courseResult = await courses.json()

    return courseResult
}

export async function getCourseUdemyApi(id){
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}/`
    const params = `?fields[course]=title,headline,url,price,image_480x270`

    const url = baseUrl + params

    const result = await fetch(url)
    const resultJson = await result.json()
    return {code:result.status, data: resultJson}
}

export async function deleteCourseApi(token,id){
    const url = `${baseURL}/${version}/delete-course/${id}`
    const params = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    }
    try {
        const response = await fetch(url,params)
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }

}

export async function addCourseApi(token,course){
    const url = `${baseURL}/${version}/add-course`
    const params = {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(course)
    }
    try {
        const response = await fetch(url,params)
        const result = await response.json()
        return result       
    } catch (error) {
        return error
    }
}

export async function editCourseApi(token,id, data){
    const url = `${baseURL}/${version}/update-course/${id}`
    const params = {
        method:'PUT',
        headers:{
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    
    try {
        const response = await fetch(url,params)
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}
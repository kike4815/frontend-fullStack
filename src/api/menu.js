import {baseURL,version} from './config'

export function getMenusApi(){
    const url = `${baseURL}/${version}/get-menus`

    return fetch(url).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err.message
    })
}

export function updateMenuApi(token, menuId,data){
    const url = `${baseURL}/${version}/update-menu/${menuId}`
    const params ={
        method: 'PUT',
        headers: {
            'Content-type':'application/json',
            Authorization:token
        },
        body: JSON.stringify(data)
    }

    return fetch(url,params).then(response => {
        return response.json()
        .then(result => {
            return result.message
        })
        .catch(err => {
            return err.message
        })
    })
}

export function activateMenuApi(token, menuId, data){
    const url = `${baseURL}/${version}/active-menu/${menuId}`
    const params ={
        method: 'PUT',
        headers: {
            'Content-type':'application/json',
            Authorization:token
        },
        body: JSON.stringify({active: data})
    }
    return fetch(url,params).then(response =>{
        return response.json()
        .then(result => {
            return result.message
        })
        .catch(err => {
            return err
        })
    })
}

export function addMenuApi (token,data){
    const url = `${baseURL}/${version}/add-menu`
    const params ={
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            Authorization:token
        },
        body: JSON.stringify(data)
    }
    return fetch(url,params).then(response =>{
        return response.json()
        .then(result => {
            return result.message
        })
        .catch(err => {
            return err.message
        })
    })
}

export function deleteMenuApi(token,menuId){
    const url = `${baseURL}/${version}/delete-menu/${menuId}`

    const params = {
        method: 'DELETE',
        headers:{
            'Content-type':'application/json',
            Authorization: token
        }
    }

    return fetch(url,params).then(response =>{
        return response.json()
        .then(result => {
            return result.message
        })
        .catch(err => {
            return err.message
        })
    })

}
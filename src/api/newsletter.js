import {baseURL,version} from './config'

export async function subscribeNewsletterApi(email){
    const url = `${baseURL}/${version}/subscribe-news/${email}`
    const params ={
        method: 'POST',
    }
    try {
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (err) {
        return err
    }
}
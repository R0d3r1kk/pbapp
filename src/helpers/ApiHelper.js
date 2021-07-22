import {allusers} from '../AppSettings'

export function getUsers(page, max){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(allusers+"?page="+page+"&per_page="+max, requestOptions)
    .then(data => data.json())
}

export function createUser(name, job){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'name': name, 'job': job })
    };
    
    return fetch(allusers, requestOptions)
    .then(data => data.json())
}

export function updateUser(id, name, job){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'name': name, 'job': job })
    };
    
    return fetch(allusers + "/" + id, requestOptions)
    .then(data => data.json())
}
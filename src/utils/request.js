const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

export const post = async (path, data) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

export const patch = async (path, data) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

export const Delete = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'DELETE',
    })
    return response.json();
}




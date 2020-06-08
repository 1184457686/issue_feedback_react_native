const baseUrl = 'http://192.168.239.1:9999';

const BaseRequest = async (url, method = 'GET',token) => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token
    }
    return fetch(baseUrl + url, {
        method,
        headers: headers
    })
        .then(res => (res.json()))
        .catch(err => console.log(err))
}

export default BaseRequest;
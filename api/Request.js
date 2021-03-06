
const baseUrl = 'http://192.168.239.1:9999';
const Request = (url , data, method,token) => {
    return fetch(baseUrl + url, {
        method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Authorization":token
        }
    })
    .then(res => (res.json()))
    .catch(err => console.log(err))
}

export default Request;

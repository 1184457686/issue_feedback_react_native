const baseUrl = 'http://192.168.239.1:9999';
const Request = (url, data, method = 'post') => {
    return fetch(baseUrl + url, {
        method,
        body: JSON.stringify(data),
        headers: {
            "Content-type": 'application/json'
        }

    }).then(
        res => (res.json())
    )
        .catch(
            err => console.log(err)
        )
}
export default Request;
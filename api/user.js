const API_URL = 'https://localhost:8080';

export const deleteAccount = (uid) => {
    const route = API_URL + '/user/delete/' + uid;
    console.log(route);
    fetch(route, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        return '';
    })
    .catch(err => {
        console.error(err)
        return err;
    })

}
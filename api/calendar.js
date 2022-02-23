const API_URL = 'https://deadlinr.blakekjohnson.dev';


export const createCalendar = async (name, isPrivate, createrID) => {
    const route = API_URL + '/calendar/';

    try {
        await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                isPrivate: isPrivate,
                createrID: createrID
            })
        })
        .then(res => {
            if (res.status === 200) {
                return 'success';
            }
            return 'An error occured';
        })
        .catch(err => {
            return err;
        })
    } catch (err) {
        console.error(err);
        return err;
    }
}
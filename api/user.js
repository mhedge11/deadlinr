const API_URL = 'https://deadlinr.blakekjohnson.dev';

export const deleteAccount = async (uid) => {
    const route = API_URL + '/user/delete/' + uid;
    // console.log(route);
    try {
        await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return 'success';
    } catch (err) {
        console.error(err);
        return err;
    }

}
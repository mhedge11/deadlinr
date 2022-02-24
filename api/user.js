const API_URL = 'https://deadlinr.blakekjohnson.dev';

export const deleteAccount = async ({uid, token}) => {
    const route = API_URL + '/user/me';

    try {
        await fetch(route, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });
        return 'success';
    } catch (err) {
        console.error(err);
        return err;
    }

}
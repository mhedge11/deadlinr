const API_URL = 'https://deadlinr.blakekjohnson.dev';


export const createCalendar = async ({name, isPrivate, token}) => {
    const route = API_URL + '/calendar/';

    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                title: name,
                isPrivate: isPrivate
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
        });

        return result;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const updatePrivacy = async (cid, token) => {
    const route = API_URL + '/updatePrivacy/' + cid;
    try {
        let result = await fetch(route, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status === 200) {
                return 'success';
            }
            console.log('err');
            return 'An error occured';
        })
        .catch(err => {
            console.error(err);
            return 'An error occured';
        });

        return result;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const joinCalendar = async (cid, token) => {
    const route = API_URL + '/calendar/' + cid + '/join';

    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                cid: cid
            })
        })
        .then(res => {
            if (res.status === 200) {
                return true; 
            }
            return false;
        })
        .catch(err => {
            console.error(err);
            return false;
        });

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
}
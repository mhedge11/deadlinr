const API_URL = 'https://deadlinr.blakekjohnson.dev';

export const createCalendar = async ({ calendarName, isPrivate, token }) => {
    const route = API_URL + '/calendar/';

    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                title: calendarName,
                isPrivate: isPrivate,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    return data;
                }
                return false;
            })
            .catch((err) => {
                return false;
            });

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const updatePrivacy = async ({ cid, token }) => {
    const route = API_URL + '/calendar/' + cid + '/privacy';

    try {
        let result = await fetch(route, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    return 'success';
                }
                return 'An error occured';
            })
            .catch((err) => {
                console.error(err);
                return 'An error occured';
            });

        return result;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const joinCalendar = async ({ cid, token }) => {
    const route = API_URL + '/calendar/' + cid + '/join';
    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return true;
                }
                return false;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const leaveCalendar = async ({ cid, token }) => {
    const route = API_URL + '/calendar/' + cid + '/leave';

    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return true;
                }
                return false;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};

/* Currently you do need a token to get the public calendars */
export const searchForAllCalendars = async ({ token }) => {
    const route = API_URL + '/calendar/';
    try {
        const result = await fetch(route, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    return null;
                }
                let resultData = await res.json();
                return resultData;
            })

            .catch((err) => {
                console.error(err);
            });

        return result;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const inviteToCalendar = async ({ token, cid, users }) => {
    const route = API_URL + `/calendar/${cid}/invite`;
    try {
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                users,
            })
        })
            .then(async (res) => {
                if (!res.ok) {
                    return null;
                }
                return res;
            })
            .catch(err => console.error(err));

            console.log(result)
            return result;
    } catch (err) {
        console.error(err);
        return err;
    }
}

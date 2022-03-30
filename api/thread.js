const API_URL = 'https://deadlinr.blakekjohnson.dev';

// Create a Thread
export const createThread = async ({ threadName, threadBody, cid, token }) => {
    const route = API_URL + '/thread/';

    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                thread: {
                    title: threadName,
                    body: threadBody,
                },
                cid: cid,
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

export const getThread = async ({ tid }) => {
    const route = API_URL + '/thread/' + tid;
    try {
        const result = await fetch(route, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    return data.thread;
                }
                return null;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });

        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
};

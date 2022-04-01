const API_URL = 'https://deadlinr.blakekjohnson.dev';

export const createDeadline = async ({ title, description, owner, groups, calendar, dueDate, votesRemaining, token }) => { 
    const route = API_URL + '/deadline/';
    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                title,
                description,
                owner,
                groups,
                calendar,
                dueDate,
                votesRemaining,
                averageCompletionTime: 0,
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
}

export const getDeadline = async ({ id, token }) => { 
    const route = API_URL + '/deadline/' + id;
    try {
        let result = await fetch(route, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    return data;
                }
                console.log(res.status);
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
}
const API_URL = 'https://deadlinr.blakekjohnson.dev';

export const createDeadline = async ({
    title,
    description,
    owner,
    groups,
    calendar,
    dueDate,
    votesRemaining,
    token,
}) => {
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
                deadlineData: {
                    title,
                    description,
                    owner,
                    groups,
                    averageCompletionTime: 0,
                    dueDate,
                    votesRemaining,
                },
                cid: calendar,
            }),
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
};

export const getDeadline = async ({ id, token }) => {
    const route = API_URL + '/deadline/' + id;
    try {
        let result = await fetch(route, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
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

export const rateDeadline = async ({
    did,
    difficulty,
    completionTime,
    token,
}) => {
    const route = API_URL + '/deadline/' + did + '/rate';
    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                difficulty,
                completionTime,
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

export const editDeadline = async ({
    did,
    title,
    description,
    dueDate,
    token,
}) => {
    const route = API_URL + '/deadline/' + did;

    try {
        let result = await fetch(route, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                title,
                description,
                dueDate,
            }),
        })
            .then(async (res) => {
                console.log(res.status);
                if (res.ok) {
                    return true;
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

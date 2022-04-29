const API_URL = 'https://deadlinr.blakekjohnson.dev';

export const getUser = async (token) => {
    const route = API_URL + '/user/me';
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

export const loginUser = async (login, password) => {
    const route = API_URL + '/user/login/';
    try {
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password,
            }),
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

export const createUser = async (
    firstName,
    lastName,
    email,
    username,
    password
) => {
    const route = API_URL + '/user/';
    try {
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
            }),
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

export const searchForUser = async (query) => {
    const route = API_URL + '/user/search/';
    try {
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: {
                    username: query,
                    // firstName: query,
                    // lastName: query,
                    // email: query,
                },
            }),
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

// Returns success if account deleted successfully, empty string otherwise

export const deleteAccount = async ({ token }) => {
    const route = API_URL + '/user/me';

    try {
        let result = await fetch(route, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return 'success';
                } else {
                    return '';
                }
            })
            .catch((err) => {
                console.error(err);
                return '';
            });

        return result;
    } catch (err) {
        console.error(err);
        return err;
    }
};

// return the verification code if call made successfully, otherwise null

export const requestResetCode = async ({ email }) => {
    const route = API_URL + '/user/requestResetCode';

    try {
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        }).then((res) => {
            if (res.ok) {
                return true;
            } else {
                return false;
            }
        });

        return result;
    } catch (err) {
        return false;
    }
};

// returns true if correct reset code, false otherwise

export const verifyResetCode = async ({ email, code }) => {
    const route = API_URL + '/user/validateCode';
    try {
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                newResetCode: code,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return true;
                } else {
                    return false;
                }
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

export const resetPassword = async ({ email, newPassword }) => {
    const route = API_URL + '/user/resetPassword';

    try {
        const result = fetch(route, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                newPassword,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return true;
                }
                return false;
            })
            .catch((err) => {
                console.error(err);
                return err;
            });
        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const changePassword = async ({
    token,
    currentPassword,
    newPassword,
}) => {
    const route = API_URL + '/user/me/password';
    try {
        const res = await fetch(route, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
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
        return res;
    } catch (err) {
        console.error(err);
        return false;
    }
};

// returns a user based on their UID

export const fetchUser = async ({ uid }) => {
    const route = API_URL + '/user/fetch/' + uid;
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
                    return data.user;
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

export const editProfile = async ({
    token,
    firstName,
    lastName,
    username,
    email,
    bio,
}) => {
    const route = API_URL + '/user/me';
    try {
        const res = await fetch(route, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            },
          body: JSON.stringify({
          firstName,
                lastName,
                username,
                email,
                bio,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    return true;
                }
                return false;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
        return res;
    } catch (err) {
        console.error(err);
        return false;
    }
};
    

export const updatePushToken = async ({ token, pushToken }) => { 
    const route = API_URL + '/user/pushToken';

    try {
        fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                pushToken
            }),
        })
            .then(async (res) => { 
                if (res.ok) { 
                    console.log('succesfully registered for push notif')
                } else {
                    console.log('registered for push notif failed');
                }
            }) 
            .catch(err => { 
                console.error(err);
                console.log('registered for push notif failed');
            })
    } catch (err) { 
        console.error(err);
        console.log('registered for push notif failed');
    }

}

export const uploadPicture = async ({ token, image }) => { 
    const route = API_URL + '/user/picture';

    try { 
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                data: image
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    return true;
                }
                return false;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
        return res;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const checkContacts = async ({
    token,
    phoneNumbers
}) => { 
    const route = API_URL + '/user/contacts';

    try {
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                phoneNumbers
            })
        })
            .then(async (res) => { 
                console.log(res.status);
                if (res.ok) {
                    const data = await res.json();
                    return data.items;
                }
                return [];
            })
            .catch(err => { 
                console.error(err);
                return [];
            })
        return res;
    } catch (err) {
        console.error(err);
        return [];
    }
}

 export const getWeekDeadlines = async ({ token }) => { 
    const route = API_URL + '/user/week';
    try { 
        let result = fetch(route, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
          
        })
            .then(async (res) => {
                // console.log(res.status);
                if (res.ok) {
                    const data = await res.json();
                    return data.items;
                }
                return [];
            })
            .catch((err) => {
                console.error(err);
                return [];
            });

        return result;
    } catch (err) {
        console.error(err);
        return [];
    }
}

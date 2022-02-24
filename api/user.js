const API_URL = 'https://deadlinr.blakekjohnson.dev';


// Returns success if account deleted successfully, empty string otherwise

export const deleteAccount = async ({
    token
}) => {
    const route = API_URL + '/user/me';

    try {
        let result = await fetch(route, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.ok) {
                return 'success';
            } else {
                return '';
            }
        })
        .catch(err => {
            console.error(err);
            return '';
        })

        return result;
    } catch (err) {
        console.error(err);
        return err;
    }

}



// return the verification code if call made successfully, otherwise null

export const requestResetCode = async ({
    email
}) => {
    const route = API_URL + '/user/requestResetCode';

    try {   
        let result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(res => {
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
}

// returns true if correct reset code, false otherwise

export const verifyResetCode = async ({email, code}) => {
    const route = API_URL + '/user/validateCode';
    console.log(email, code);
    try {
        const result = await fetch(route, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                newResetCode: code
            })
    
        })
        .then(res => {
            console.log(res.status);
            if (res.ok) {
                return true;
            } else {
                return false;
            }
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
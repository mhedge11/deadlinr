export function usernameValidation(name) {
    if (!name) return 'Please input name';
    else if (name.length < 2)
        return 'Please input name longer than 2 characters';
    else if (name.length > 25)
        return 'Please input name less than 25 characters';

    const regex = /^[a-zA-Z\s\-\d]*$/;
    if (!regex.test(name))
        return 'This is not a valid name - please only use letters, numbers, spaces and dashes';
    return '';
}

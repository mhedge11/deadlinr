export function nameValidation(name) {
    if (!name) return 'Please input all name fields';
    else if (name.length < 2)
        return 'Please input name longer than 2 characters';
    else if (name.length > 25)
        return 'Please input name less than 25 characters';
    else if (name.search(/\d/) != -1) {
        return 'Numbers are not allowed in name';
    }
    const regex = /^[a-zA-Z\s\-]*$/;
    if (!regex.test(name))
        return 'This is not a valid name - please only use letters, spaces and dashes';
    return '';
}

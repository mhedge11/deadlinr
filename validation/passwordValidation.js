export function passwordValidation(password) {
    if (!password) return 'Password field was empty';
    if (password.length < 7) {
        return 'Password must be 7 characters or more in length';
    }
    if (password.length > 25) {
        return 'Password must be no longer than 25 characters';
    }
    if (password.search(/\d/) == -1) {
        return 'No number in password';
    }
    if (password.search(/[a-z]/) == -1) {
        return 'No lowercase letter in password';
    }
    if (password.search(/[A-Z]/) == -1) {
        return 'No uppercase letter in password';
    }

    return '';
}

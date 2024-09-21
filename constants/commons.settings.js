class SETTINGS {
    static USERS = {
        ADMIN: "ADMIN", 
    };
    
    static EMAIL = {
        USER_NEW_PASSWORD_SEND: "user-new-password-send.ejs",
        PASSWORD_RESET: "password-reset.ejs",
        PASSWORD_CHANGED: "password-changed.ejs",
    };
    
    static EMAIL_CONFIG = {
        username: "noreply@purple.lk",
        password: "pnHSwZaB8r8xfL9",
        host: "smtp-mail.outlook.com",
        port: 587,
    };

}

module.exports = { SETTINGS };

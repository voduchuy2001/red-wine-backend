export const authenticate = (req, res, next) => {
    if (req.session && req.session.authenticated) return res.redirect("/");
    next();
};

export const authenticated = (req, res, next) => {
    if (req.session && req.session.authenticated) {
        return next();
    }

    return res.redirect("/swagger-sign-in");
};

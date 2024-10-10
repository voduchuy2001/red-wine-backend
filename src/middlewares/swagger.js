const authenticate = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return res.redirect('/')
  }
  next()
}

const authenticated = (req, res, next) => {
  if (!req.session || !req.session.authenticated) {
    return res.redirect('/v1/swagger-sign-in/')
  }
  next()
}

export { authenticate, authenticated }

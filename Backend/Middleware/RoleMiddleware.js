const AutherisedRoles = (...allowedRoles) => {
    return (req, res, next) => {      
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: `Access Denied,${req.user.role} Cannot access this Route` });
      }
      next();
    };
  };
  export default AutherisedRoles;
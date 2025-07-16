// const AutherisedRoles = (...allowedRoles) => {
//     return (req, res, next) => {      
//       if (!allowedRoles.includes(req.user.role)) {
//         return res.status(403).json({ message: `Access Denied,${req.user.role} Cannot access this Route` });
//       }
//       next();
//     };
//   };
//   export default AutherisedRoles;

// middlewares/CheckPermission.js
const CheckPermission = (requiredPermission) => {
  return (req, res, next) => {
    const permissions = req.body.permissions;

    if (!Array.isArray(permissions)) {
      return res.status(400).json({ resText: "Permissions must be an array." });
    }

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({ resText: `Access Denied: '${requiredPermission}' permission required.` });
    }

    next();
  };
};

export default CheckPermission;

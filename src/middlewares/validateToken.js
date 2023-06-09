function validateToken(req, res, next) {
    const { authorization: token } = req.headers; 
    if (token === undefined) {
        return res.status(401).json({ message: 'Token não encontrado' });
       }
       if (token.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
          }
    return next();
}

module.exports = validateToken;
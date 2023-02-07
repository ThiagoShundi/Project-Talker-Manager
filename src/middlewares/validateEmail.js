function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

function validateEmails(req, res, next) {
    const { email } = req.body; 
    if (email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
       }
       if (!validateEmail(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
          }
    return next();
}

module.exports = validateEmails;
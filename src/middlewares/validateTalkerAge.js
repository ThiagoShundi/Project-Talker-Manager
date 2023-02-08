function validateIntNumber(number) {
  const re = /^[-+]?[0-9]+$/;
  return re.test(number);
}

function validateTalkerAge(req, res, next) {
    const { age } = req.body;
      if (age === undefined) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
       }
      if (typeof age !== 'number') {
        return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
       }
      if (!validateIntNumber(age)) {
        return res.status(400)
        .json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
       } 
      if (Number(age) <= 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
       }
    return next();
}

module.exports = validateTalkerAge;
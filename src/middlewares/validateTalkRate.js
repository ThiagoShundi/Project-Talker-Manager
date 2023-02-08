function validateRate(number) {
    const re = /^[1-5]+$/;
    return re.test(number);
  }
function isValidDate(dateString) {
  const pattern = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return pattern.test(dateString);
}

function validateTalkRate(req, res, next) {
    const { talk: { watchedAt, rate } } = req.body;
       if (watchedAt === undefined) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
       }
       if (!isValidDate(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
       }
       if (rate === undefined) {
        return res.status(400)
        .json({ message: 'O campo "rate" é obrigatório' });
       }
       if (!validateRate(rate)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
       }
    return next();
}

module.exports = validateTalkRate;
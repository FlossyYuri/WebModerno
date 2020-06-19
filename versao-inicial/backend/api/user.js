const bcrypt = require("bcrypt-nodejs");
const category = require("./category");
module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;
    if (!req.originalUrl.startsWith("/users")) user.admin = false;
    if (!req.user || !req.user.admin) user.admin = false;
    try {
      existsOrError(user.name, "Nome nao informado");
      existsOrError(user.email, "Email nao informado");
      existsOrError(user.password, "senha nao informado");
      existsOrError(user.confirmPassword, "Confirmação de senha invalida");
      equalsOrError(user.password, user.confirmPassword, "Senhas nao conferem");

      const userFromDB = await app
        .db("users")
        .where({ email: user.email })
        .first();

      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário ja cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }
    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then((_) => res.status(204))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };
  const get = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };
  const getById = (req, res) => {
    app
      .db("users")
      .where("id", req.params.id)
      .select("id", "name", "email", "admin")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  return { save, get, getById };
};

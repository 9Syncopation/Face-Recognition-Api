const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.log("🚀 ~ file: register.js ~ line 31 ~ handleRegister ~ err", err);

    res.status(400).json(err);
  });

  // WITHOUT DATA BASE
  // database.users.push({
  //         id: '125',
  //         name: name,
  //         email: email,
  //         entries: 0,
  //         joined: new Date()
  // })
  // res.json(database.users[database.users.length-1]);
};

module.exports = {
  handleRegister: handleRegister,
};

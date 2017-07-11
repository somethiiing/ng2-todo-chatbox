module.exports = {
  findUser: (db, user) => {
    return Object.keys(db).find(elem => elem === user);
  }
};

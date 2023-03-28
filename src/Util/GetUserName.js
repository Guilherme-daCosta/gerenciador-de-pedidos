function GetUserName(name, dateBirth) {
  return (
    name.toString().substring(0, 2).toLowerCase() +
    dateBirth.toString().replace('.', '').substring(7, 10)
  );
}

module.exports = GetUserName;

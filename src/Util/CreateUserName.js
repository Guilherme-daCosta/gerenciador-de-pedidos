function GetUserName(name, cnpj) {
  return (
    name.toString().substring(0, 2).toLowerCase() +
    cnpj.toString().replace('.', '').substring(0, 4)
  );
}

module.exports = GetUserName;

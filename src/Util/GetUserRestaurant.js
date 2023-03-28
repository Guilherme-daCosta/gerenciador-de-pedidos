function GetUserRestaurant(name, dateBirth) {
  return (
    name.toString().substring(0, 2).toLowerCase() +
    dateBirth.toString().replace('.', '').substring(0, 4)
  );
}

module.exports = GetUserRestaurant;

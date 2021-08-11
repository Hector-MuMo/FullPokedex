const capitalizeName = (name) => {
  let letter = "",
    remain = "";

  letter = name.charAt(0);
  letter = letter.toUpperCase();
  remain = name.slice(1);

  name = letter + remain;

  return name;
};

export default capitalizeName;

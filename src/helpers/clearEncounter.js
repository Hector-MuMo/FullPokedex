const clearEncounter = (encounter) => {
  let region = "",
    route = "",
    indexReg = 0;

  indexReg = encounter.indexOf("-");
  region = encounter.slice(0, indexReg);
  route = encounter.slice(7).split("-").join(" ");

  const capitalizeName = (name) => {
    let letter = "",
      remain = "";

    letter = name.charAt(0);
    letter = letter.toUpperCase();
    remain = name.slice(1);

    name = letter + remain;

    return name;
  };

  region = capitalizeName(region);
  route = capitalizeName(route);

  return { region, route };
};

export default clearEncounter;

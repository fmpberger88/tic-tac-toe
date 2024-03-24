function player(name) {
  let score = 0;
  const active = false;
  const getScore = () => score;
  const updateScore = () => score += 1;

  return { name, getScore, updateScore };
}

export { player };

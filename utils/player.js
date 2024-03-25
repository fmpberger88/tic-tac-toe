function player(name) {
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const updateScore = () => score += 1;

  return { getName, getScore, updateScore };
}

export { player };

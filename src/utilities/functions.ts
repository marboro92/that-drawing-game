// Returns all the content for a given player's round
type getGameContentForRoundType = {
  playersInRoom: object;
  playerName: string;
};

export const getGameContentForRound = ({
  playersInRoom,
  playerName,
}: getGameContentForRoundType) => {
  const sortedPlayers = sortObject(playersInRoom);
  const playerIndex = Object.keys(sortedPlayers).indexOf(playerName);

  const contentToDisplay = fetchAllValuesForIndex({
    initialObject: sortedPlayers,
    index: playerIndex,
  });

  console.log("contentToDisplay", contentToDisplay);
  return contentToDisplay;
};

// Sorts an object alphabetically
// The order of keys in a JS object is in the order by which they were added
// Taking advantage of that here
const sortObject = (initialObject: any) =>
  Object.keys(initialObject)
    .sort()
    .reduce<object>(
      (result, key) => ((result[key] = initialObject[key]), result),
      {}
    );

// Function to fetch all entries for round number 'index'
const getContentForRound = ({ testData, index }) => {
  const values = Object.values(testData);

  //TODO: Change the null implementation below to get entries before 'index'
  const getResult = (accum, value, elemIndex) => [
    ...accum,
    index + elemIndex < values.length ? value[index + elemIndex] : null,
  ];

  const valuesBeforeIndex = values.reduce(getResult, []);

  return valuesBeforeIndex;
};

type getGameContentForRoundType = {
  playersInRoom: object;
  playerName: string;
};

/**
 * Function that takes in all player content in a room and a player name
 * Returns that player's round's guesses and images
 * @param playerInRoom @param playerName
 */
export const getGameContentForRound = ({
  playersInRoom,
  playerName,
}: getGameContentForRoundType) => {
  const sortedPlayers = sortObject(playersInRoom);
  const playerIndex = Object.keys(sortedPlayers).indexOf(playerName);

  const contentToDisplay = getContentForRound({
    contentData: sortedPlayers,
    index: playerIndex,
  });

  return contentToDisplay;
};

/**
 * Sorts an object alphabetically
 * The order of keys in a JS object is in the order by which they were added. Taking advantage of that here
 * @param initialObject
 */
export const sortObject = (initialObject: any) =>
  Object.keys(initialObject)
    .sort()
    .reduce<object>(
      (result, key) => ((result[key] = initialObject[key]), result),
      {}
    );

// Function to fetch all entries for round number 'index'
// This is a WIP and will replace its namesake once I find some time!!

// const getContentForRound = ({ testData, index }) => {
//   const values = Object.values(testData);
//   //Change the null implementation below to get entries before 'index'
//   const getResult = (accum, value, elemIndex) => [
//     ...accum,
//     index + elemIndex < values.length ? value[index + elemIndex] : null,
//   ];

//   const valuesBeforeIndex = values.reduce(getResult, []);
//   return valuesBeforeIndex;
// };

type getContentForRoundType = {
  contentData: object;
  index: number;
};
/**
 * Takes in content and data for a square matrix and returns that round's content
 * @param contentData @param index
 */
export const getContentForRound = ({
  contentData,
  index,
}: getContentForRoundType) => {
  let content = [];
  for (const [_, value] of Object.entries(contentData)) {
    content.push(value[index]);

    if (index === value.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }
  return content;
};

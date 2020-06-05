import {
  sortObject,
  getContentForRound,
  getGameContentForRound,
} from "./functions";

describe("Utility function tests", () => {
  describe("getGameContentForRound", () => {
    const fakePlayersInRoom = {
      rahul: ["dog", "right", "cat", "horse", "moose"],
      mar: ["the", "cat", "bunny", "horse", "moose"],
      jade: ["dog", "horse", "cat", "moose", "is"],
      tom: ["dog", "moose", "order", "horse", "cow"],
      harry: ["dog", "cat", "dog", "this", "moose"],
    };

    const expectedContentToDisplay = ["this", "is", "the", "right", "order"];

    const resultingContentToDisplay = getGameContentForRound({
      playersInRoom: fakePlayersInRoom,
      playerName: "rahul",
    });
    it("should return the correct order of content for the round", () => {
      expect(resultingContentToDisplay).toEqual(expectedContentToDisplay);
    });
  });

  describe("sortObject", () => {
    const unsortedObject = {
      Rahul: [1, 2, 4, 5],
      Jade: ["dog", "cat"],
      Mar: ["rose", "knife"],
      Alice: ["bunny", "wonderland"],
    };

    const sortedObject = {
      Alice: ["bunny", "wonderland"],
      Jade: ["dog", "cat"],
      Mar: ["rose", "knife"],
      Rahul: [1, 2, 4, 5],
    };

    it("should sort an object on keys alphabetically", () => {
      const result = sortObject(unsortedObject);
      expect(result).toEqual(sortedObject);
    });
  });

  describe("getContentForRound", () => {
    const testData = {
      rahul: ["dog", "this", "cat", "horse", "moose"],
      mar: ["dog", "cat", "is", "horse", "moose"],
      jade: ["dog", "horse", "cat", "the", "moose"],
      tom: ["dog", "moose", "cat", "horse", "right"],
      harry: ["order", "cat", "dog", "horse", "moose"],
    };

    const expectedContent = ["this", "is", "the", "right", "order"];

    const resultingContent = getContentForRound({
      contentData: testData,
      index: 1,
    });

    it("should return the array value of the incremented index", () => {
      expect(resultingContent).toEqual(expectedContent);
    });
  });
});

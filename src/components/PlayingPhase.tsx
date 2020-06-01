import React, { useContext } from "react";
import { CONTENT_TYPES } from "utilities/content-types";
import { postContent } from "database/content";
import AppContext from "../AppContext";
import { EnterPhrase } from "components/EnterPhrase";
import { EnterDrawing } from "components/EnterDrawing";

type ContentSubmitParams = {
  contentType: string;
  content: string;
};

type Props = {
  onSubmitContent: () => void;
};

const PlayingPhase: React.FC<Props> = ({ onSubmitContent }) => {
  const {
    playerName,
    roomId,
    roundType,
    setRoundType,
    roundNumber,
    room,
  } = useContext(AppContext);
  const handleContentSubmit = async ({
    contentType,
    content,
  }: ContentSubmitParams) => {
    onSubmitContent();
    /// needs loading screen nad error handing
    if (contentType === CONTENT_TYPES.drawing) {
      setRoundType(CONTENT_TYPES.phrase);
    } else {
      setRoundType(CONTENT_TYPES.drawing);
    }
    await postContent({
      roomId,
      content: content,
      playerName,
    });
  };

  const getNeighboursContent = () => {
    const playersInRoom: string[] = Object.keys(room.players).sort();
    const indexOfCurrentPlayer = playersInRoom.indexOf(playerName);
    const isLastPlayer = indexOfCurrentPlayer === playersInRoom.length - 1;
    const neighboursName = isLastPlayer
      ? playersInRoom[0]
      : playersInRoom[indexOfCurrentPlayer + 1];

    const neighboursContent = room.players[neighboursName];
    return neighboursContent;
  };

  const getContent = () => {
    const phrase = getNeighboursContent()[roundNumber - 2];
    return phrase;
  };

  const phrase =
    roundType === CONTENT_TYPES.drawing && roundNumber > 1
      ? getContent()
      : null;
  const image =
    roundType === CONTENT_TYPES.phrase && roundNumber > 1 ? getContent() : null;

  return roundType === CONTENT_TYPES.phrase ? (
    <EnterPhrase
      onSubmit={(content: string) =>
        handleContentSubmit({ contentType: CONTENT_TYPES.phrase, content })
      }
      image={image}
    />
  ) : (
    <EnterDrawing
      onSubmit={(content: string) =>
        handleContentSubmit({ contentType: CONTENT_TYPES.drawing, content })
      }
      phrase={phrase}
    />
  );
};

export default PlayingPhase;

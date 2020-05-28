import React, { useContext } from "react";
import { CONTENT_TYPES } from "utilities/content-types";
import { postContent } from "database/content";
import HostContext from "../HostContext";
import { EnterPhrase } from "components/EnterPhrase";
import { EnterDrawing } from "components/EnterDrawing";

type ContentSubmitParams = {
  contentType: string;
  content: string;
};

type Props = {
  onSubmitContent: Function
}

const PlayingPhase: React.FC<Props> = ({ onSubmitContent }) => {
  const { playerName, roomId, roundType, setRoundType } = useContext(HostContext);

  const handleContentSubmit = async ({
    contentType,
    content,
  }: ContentSubmitParams) => {
    onSubmitContent();
    /// needs loading screen nad error handing
    if (contentType === CONTENT_TYPES.drawing) {
      setRoundType(CONTENT_TYPES.phrase)
    } else {
      setRoundType(CONTENT_TYPES.drawing);
    }
    await postContent({
      roomId,
      content: content,
      playerName,
    });
  };
  return roundType === CONTENT_TYPES.phrase ? (
    <EnterPhrase
      onSubmit={(content: string) =>
        handleContentSubmit({ contentType: CONTENT_TYPES.phrase, content })
      }
    />
  ) : (
      <EnterDrawing
        onSubmit={(content: string) =>
          handleContentSubmit({ contentType: CONTENT_TYPES.drawing, content })
        }
      />
    )
}

export default PlayingPhase;
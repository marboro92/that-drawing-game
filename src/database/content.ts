import { db } from "database";
import firebase from "firebase";

type PostContentArgs = {
  roomId: string;
  content: string;
  playerName: string;
};

export const postContent = async ({
  roomId,
  content,
  playerName,
}: PostContentArgs) => {
  await db
    .collection("rooms")
    .doc(roomId)
    .update({
      [`players.${playerName}`]: firebase.firestore.FieldValue.arrayUnion(
        content
      ),
    });
};

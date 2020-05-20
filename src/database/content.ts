import { db } from "database";
import firebase from "firebase";

type PostContentArgs = {
  roomId: string;
  content: string;
};

// TODO: Add roomId to context
// TODO: Get roomId before posting to db
export const postContent = async ({ roomId, content }: PostContentArgs) => {
  await db
    .collection("rooms")
    .doc(roomId)
    .update({
      content: firebase.firestore.FieldValue.arrayUnion(content),
    });
  console.log("DONE!");
};

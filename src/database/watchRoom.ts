import { db } from "database";

const watchRoom = (roomId: string, onRoomUpdate: any) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .onSnapshot(function (querySnapshot) {
      const room = querySnapshot.data();
      onRoomUpdate(room);
    });
}

export default watchRoom;
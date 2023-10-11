import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");

// export const socket = io(
//   "https://threejs-lecture-socket-backend-f2b9563a2109.herokuapp.com/"
// );

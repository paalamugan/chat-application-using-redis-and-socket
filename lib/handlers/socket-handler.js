const { SOCKET_JOIN, SOCKET_LEAVE } = require('../../common/constants');
const { getSocketInstance, sendError } = require('../../socket');

module.exports = (socket) => {

    const socketInstance = getSocketInstance();

    socket.on(SOCKET_JOIN, (roomName) => {
        socketInstance.join(socket, roomName, (err) => {
            if (err) {
                return sendError(roomName, err);
            }
            console.log(`Successfully join socket: ${socket.id} with roomName: ${roomName}`);
        });
    });

    socket.on(SOCKET_LEAVE, (roomName) => {
        socketInstance.leave(socket, roomName, (err) => {
            if (err) {
                return sendError(roomName, err);
            }
            console.log(`Successfully leave socket: ${socket.id} with roomName: ${roomName}`);
        });
    });

}
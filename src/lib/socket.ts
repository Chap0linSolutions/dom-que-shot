import { io, Socket } from 'socket.io-client';

class SocketConnection {
  private static instance;
  socket: Socket;
  baseServerAddress = process.env.VITE_REACT_APP_SERVER_ADRESS;
  applicationAdress = process.env.VITE_REACT_APP_ADRESS;

  connect(roomCode?: string) {
    if (!this.socket) {
      const server = `${this.baseServerAddress}/?room=${roomCode}`;
      this.socket = io(server);
      this.socket.io.on('reconnect', () => {
        alert('Conexão perdida! Reconectando...');
        window.location.replace(this.applicationAdress);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.close();
      this.socket = undefined;
    }
  }

  joinRoom(userData, onError = null) {
    this.socket.emit('join-room', userData.roomCode, (reply) => {
      if (reply === `ingressou na sala ${userData.roomCode}.`) {
        this.addPlayer(userData);
      } else {
        if (onError) {
          onError();
        }
      }
    });
  }

  joinRoomWithCode(roomCode: string) {
    this.socket.emit('join-room', roomCode, (reply) => {
      console.log(`resposta do servidor: ${reply}`);
    });
  }

  createRoom(userData) {
    this.socket.emit('create-room', userData.roomCode, (reply) => {
      console.log(`resposta do servidor: ${reply}`);
      if (reply === `Sala ${userData.roomCode} criada com sucesso!`) {
        this.addPlayer(userData);
      }
    });
  }

  addPlayer(userData) {
    this.socket.emit('add-player', JSON.stringify({ ...userData, beers: 0 }));
  }

  setGamesUpdateListener(useState) {
    this.socket.on('games-update', (reply: string[]) => {
      useState(reply);
    });
  }

  setLobbyUpdateListener(useState) {
    this.socket.on('lobby-update', (reply) => {
      useState(JSON.parse(reply));
    });
  }

  send(tag: string, message) {
    this.socket.emit(tag, message);
  }

  static getInstance() {
    if (!SocketConnection.instance) {
      SocketConnection.instance = new SocketConnection();
    }
    return SocketConnection.instance;
  }

  push(tag: string, message) {
    if (this.socket) return this.socket.emit(tag, message);
  }

  addEventListener(eventName, callback) {
    if (!this.socket) {
      return window.location.replace(this.applicationAdress);
    }
    this.socket.on(eventName, callback);
    return () => {
      console.log('esse é o return do addEventListener.');
      this.socket.off(eventName, callback);
    };
  }

  removeAllListeners() {
    this.socket.removeAllListeners();
  }

  getSocketId() {
    return this.socket.id;
  }

  onMessageReceived(callback) {
    return this.addEventListener(`message`, callback);
  }

  pushMessage(room, message, payload) {
    return this.push(`message`, { message, room, payload });
  }

  getMessages(room) {
    return this.push('get-messages', room);
  }
}

export default SocketConnection;

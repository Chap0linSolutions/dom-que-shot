import { io, Socket } from 'socket.io-client';

class SocketConnection {
  private static instance;
  socket: Socket;
  serverAddress = 'http://localhost:3000';

  connect() {
    if (!this.socket) {
      this.socket = io(this.serverAddress);
      this.socket.on('connection', () => {
        console.log(
          `conectado ao backend do DomQueShot (${this.serverAddress})!`
        );
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
    this.socket.emit(
      'add-player',
      JSON.stringify({ ...userData, beers: Math.round(5 * Math.random()) })
    );
  }

  setLobbyUpdateListener(useState) {
    this.socket.on('lobby-update', (reply) => {
      console.log('A lista de jogadores foi atualizada.');
      useState(JSON.parse(reply));
    });
  }

  send(tag: string, message) {
    this.socket.emit(tag, message);
  }

  //abaixo, as funções originalmente desenvolvidas pelo Carlos para esta classe

  static getInstance(isLobby = false) {
    if (!SocketConnection.instance) {
      if (!isLobby) {
        alert('Conexão perdida! Reconectando...'); //TODO: remover alerta antes da release do Beta
        window.location.reload();
      }
      SocketConnection.instance = new SocketConnection();
    }
    return SocketConnection.instance;
  }

  push(tag: string, message) {
    return this.socket.emit(tag, message);
  }

  addEventListener(eventName, callback) {
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

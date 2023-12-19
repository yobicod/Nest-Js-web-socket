import { Body, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connection to server...');
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    // get payload
    console.log(
      '🚀 ~ file: gateway.ts:12 ~ MyGateway ~ onNewMessage ~ body:',
      body,
    );
    // emit to client who subscibe event
    this.server.emit('onMessage', {
      msg: 'New msg from server',
      content: body,
    });
  }
}

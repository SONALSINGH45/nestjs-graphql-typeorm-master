// userWebSocket.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { User } from "../entites/user.entity"

@WebSocketGateway()
export class UserWebSocketGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('subscribeToUserChanges')
    subscribeToUserChanges(client, data: any): void {
        console.log('Client subscribed to user changes:', client.id);
        // You may want to associate the client with the user or store clients in some way
        // and use this gateway to publish updates to clients.
    }

    publishUserChange(user: User): void {
        this.server.emit('userChanged', { userCreated: user });
    }
}
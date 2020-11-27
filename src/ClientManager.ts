import { Client } from './types/Client';
import { MessageModel } from './types/Models';
import { MessageType } from './types/MessageType';
import { getFullSystemInfo } from './systemInfo';

export class ClientManager {
  private clients: Client[] = [];

  addClient(client: Client) {
    this.clients.push(client);

    client.send(
      JSON.stringify({
        type: MessageType.WELCOME,
        clientId: client.clientId,
      })
    );

    client.send(
      JSON.stringify({
        type: MessageType.DATA,
        data: getFullSystemInfo(),
      })
    );
  }

  handleMessage(client: Client, message: MessageModel) {
    client.lastSeen = new Date();
  }

  pingClients() {
    const pingMessage = JSON.stringify({
      type: MessageType.PING,
      timestamp: new Date().getTime(),
    });

    this.clients.forEach(client => {
      if (client.readyState !== 1) return;

      try {
        client.send(pingMessage);
      } catch {
        this.removeClient(client);
        client.close();
      }
    });
  }

  removeClient(client: Client) {
    this.clients = this.clients.filter(c => c !== client);
  }

  removeBrokenClients() {
    this.clients = this.clients.filter(client => client.readyState <= 1);
  }

  removeInactiveClients() {
    const minuteAgo = new Date(Date.now() - 1000 * 20);

    this.clients.forEach(client => {
      if (client.readyState !== 1) return;

      if (client.lastSeen < minuteAgo) {
        this.removeClient(client);
        client.close();
      }
    });
  }
}

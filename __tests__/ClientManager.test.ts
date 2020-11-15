import { v4 as uuid } from 'uuid';

import { ClientManager } from '../src/ClientManager';
import { Client } from '../src/types/Client';
import { MessageType } from '../src/types/MessageType';

export class TestClient implements Client {
  readonly clientId = uuid();
  readonly firstSeen = new Date();
  lastSeen = new Date();
  remoteAddress: string;
  lastMessage: string;
  closed = false;
  readyState = 1;

  send(data: string) {
    this.lastMessage = data;
  }

  close() {
    this.closed = true;
  }
}

describe('ClientManager', () => {
  it('welcomes the client', async () => {
    const clientManager = new ClientManager();

    const client = new TestClient();
    clientManager.addClient(client);

    expect(JSON.parse(client.lastMessage)).toMatchObject({
      type: MessageType.WELCOME,
      clientId: client.clientId,
    });
  });

  it('pings clients', async () => {
    const clientManager = new ClientManager();

    const client1 = new TestClient();
    clientManager.addClient(client1);

    const client2 = new TestClient();
    clientManager.addClient(client2);

    const client3 = new TestClient();
    clientManager.addClient(client3);

    clientManager.pingClients();

    expect(JSON.parse(client1.lastMessage)).toMatchObject({
      type: MessageType.PING,
    });

    expect(JSON.parse(client2.lastMessage)).toMatchObject({
      type: MessageType.PING,
    });

    expect(JSON.parse(client3.lastMessage)).toMatchObject({
      type: MessageType.PING,
    });
  });
});

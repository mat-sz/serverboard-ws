import { v4 as uuid } from 'uuid';

import { ClientManager } from '../src/ClientManager';
import { Client } from '../src/types/Client';
import { MessageType } from '../src/types/MessageType';

export class TestClient implements Client {
  readonly clientId = uuid();
  readonly firstSeen = new Date();
  lastSeen = new Date();
  remoteAddress: string;
  receivedMessages: any[] = [];
  closed = false;
  readyState = 1;

  send(data: string) {
    this.receivedMessages.push(JSON.parse(data));
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

    expect(client.receivedMessages).toContainEqual({
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

    expect(client1.receivedMessages).toContainEqual(
      expect.objectContaining({
        type: MessageType.PING,
      })
    );

    expect(client2.receivedMessages).toContainEqual(
      expect.objectContaining({
        type: MessageType.PING,
      })
    );

    expect(client3.receivedMessages).toContainEqual(
      expect.objectContaining({
        type: MessageType.PING,
      })
    );
  });
});

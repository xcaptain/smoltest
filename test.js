import { start } from '@substrate/smoldot-light';
import * as fs from 'fs';
import { WebSocketServer } from 'ws';

async function test10() {
  const chainSpec = fs.readFileSync('./dev.json', 'utf8');

  const client = start();

  await client.addChain({
    chainSpec,
    jsonRpcCallback: (resp) => {
      connection.send(resp);
    }
  });
  let wsServer = new WebSocketServer({
    port: 9944
  });

  wsServer.on('connection', async function (connection, request) {
    const chain = await client.addChain({
      chainSpec,
      jsonRpcCallback: (resp) => {
        console.log('response:', resp);
        connection.send(resp);
      }
    });

    connection.on('message', function (data, isBinary) {
      if (!isBinary) {
        const message = data.toString('utf8');
        chain.sendJsonRpc(message);
      } else {
        connection.close(1002); // Protocol error
      }
    });

    // When the connection closes, remove the chains that have been added.
    connection.on('close', function (reasonCode, description) {
      console.log("(demo) JSON-RPC client " + request.socket.remoteAddress + ' disconnected.');
      chain.remove();
    });
  });
}

test10();

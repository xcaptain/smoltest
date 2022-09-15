import { start } from '@substrate/smoldot-light';
import * as fs from 'fs';

async function test10() {
  const chainSpec = fs.readFileSync('./dev.json', 'utf8');

  const client = start();
  const chain = await client.addChain({
    chainSpec,
    jsonRpcCallback: (jsonRpcResponse) => {
      console.log('response:', jsonRpcResponse);
    }
  });

  chain.sendJsonRpc('{"jsonrpc":"2.0","id":1,"method":"chain_getBlock","params":[]}');
}

async function test7() {
  const chainSpec = fs.readFileSync('./deeper-chain-7.json', 'utf8');

  const client = start();
  const chain = await client.addChain({
    chainSpec,
    jsonRpcCallback: (jsonRpcResponse) => {
      console.log('response:', jsonRpcResponse);
    }
  });

  chain.sendJsonRpc('{"jsonrpc":"2.0","id":1,"method":"chain_getBlock","params":[]}');
  chain.sendJsonRpc('{"jsonrpc":"2.0","id":1,"method":"system_health","params":[]}');
  chain.sendJsonRpc('{"jsonrpc":"2.0","id":1,"method":"chain_getBlock","params":[]}');
}

test10();

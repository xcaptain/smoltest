# smoltest

轻节点连测试网

## 运行轻节点并启动websocket server

```bash
node test.js
```

## 访问9944端口

```bash
wscat -c 'ws://127.0.0.1:9944' -n -x '{"id": 1, "jsonrpc": "2.0", "method": "chain_getBlock", "params": []}'
```
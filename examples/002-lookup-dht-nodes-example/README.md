# 002 Lookup DHT nodes example

This example demonstrates how to use the tonutils library to interact with the TON network, specifically querying the DHT nodes. It shows how to initialize an ADNL node, start it, load the TON global configuration file, get DHT nodes, peer with them, and then send and handle responses to a couple of different queries.

## Running the example

To run the example, execute the following command from the root of the project:

```bash
ts-node-dev ./examples/002-lookup-dht-nodes-example/lib/index.ts
```

## Code explanation

The code can be broken down into several parts:

1. **Initialize ADNL node**: Here, we initialize the ADNL node with some default options, a new keyring, and a random private key.

2. **Start the ADNL node**: We start the ADNL node so it can start sending and receiving packets.

3. **Load the TON global configuration file**: The TON global configuration file contains information about the network, including the DHT nodes.

4. **Get DHT nodes**: We get the DHT nodes from the global configuration file and map them into a more convenient format.

5. **Peer with DHT nodes**: We peer our ADNL node with the DHT nodes, allowing us to send and receive packets to and from them.

6. **Send `dht.getSignedAddressList` query to all DHT nodes**: This operation involves creating and transmitting a `dht.getSignedAddressList` query to each DHT node in our list. This type of query is used to retrieve a signed list of IP addresses associated with a particular node in the DHT network. We handle each response as it comes back, parsing and processing the data accordingly.

7. **Send `dht.findValue` query to all DHT nodes**: This is another type of query that we can send. It is used to find a value in the DHT.

8. **Shutdown the ADNL node**: After all the queries have been sent and the responses handled, we shutdown the ADNL node.

## Things to note

Please note that the ADNL node is bound to the `0.0.0.0` IP address and an arbitrary port `0`. If you want to receive packets from other nodes in the network, replace `'0.0.0.0'` with your external IP address.

Also, this example is designed to be a simple demonstration of the basic usage of the library. Error handling and edge case handling are largely ignored for the sake of clarity. In a real-world application, you should ensure to properly handle errors and edge cases.

# 001 ADNL Chat Example

This example demonstrates how to set up a basic chat using the ADNL layer.

## Overview

The ADNL (Abstract Datagram Network Layer) is a protocol layer that forms the basis for peer-to-peer communication in the TON blockchain. In this example, we create a simple chat application that sends and receives messages over the ADNL layer.

The chat application generates a random nickname for the user and allows them to connect to a peer node and send messages. It also listens for incoming messages and prints them to the console.

## How to Run

You can run this example by executing the following command from the root directory of the project:

```bash
ts-node-dev ./examples/001-adnl-chat-example/lib/index.ts
```

## Code Explanation

The script starts by importing the necessary modules and setting up some basic types and functions. A random nickname is generated for the user.

An ADNL node is created and started with a randomly generated local key, and the node is set to listen for incoming messages and queries.

After the node is started, the script provides instructions on how to connect to a peer node and how to send messages. The user can input commands to the console to connect to a peer or send a message.

The `parse` function is used to parse the user's input and return a command object.

The script sets up an event listener for the `line` event of the readline interface. When the user inputs a line, the script parses the command and either connects to a peer or sends a message, depending on the command.

## Key Aspects

This example showcases several key aspects of the ADNL layer and the `tonutils` library:

- Creating and starting an ADNL node with a random local key.
- Setting up the node to listen for incoming messages and queries.
- Adding a peer to the node and sending messages to the peer.
- Parsing user input to connect to peers and send messages.

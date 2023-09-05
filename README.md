# Encrypted-Time-Series

a small backend application which can generate and emit an encrypted data stream over a socket, listens to incoming data stream on a socket, decrypts and decodes it, save to a time series dB and then emit the saved data.
# Details

A node.js, express, React and socket.io application with following functionality

Routing
Socket connection
Connect to MongoDB with mongoose

# How it works

Run command 'node index.js' in listener folder.
Run command 'node index.js' in emitter folder.
The output contains decrypted users and will be displayed on console.

# Emitter Service
A service which emit an encrypted data stream over a socket. Data stream consists of encrypted messages. Each message is an object with with 3 keys: name, origin, destination from a constant list provided in emitter-service/src/data/data.json file & a secret_key sha-256 hash of the message. The message is encrypted with aes-256-ctr alogrithm.

# Process
A service which connects with emitter over sockets listens for data stream.
# Client
This is a react applciation which connects with listener service over sockets and gets the realtime data.

# Running the application
Use the package manager npm or yarn to install the packages for the project.

Go to the directory where you would like to clone the repo.

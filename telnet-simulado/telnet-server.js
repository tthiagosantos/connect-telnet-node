const net = require('net');

const server = net.createServer(connection => {
    connection.on('data', data => {
        const command = data.toString().trim();
        let output = '';

        if (command === 'hello') {
            output = 'Hello from Telnet server!\n';
        } else if (command === 'time') {
            output = `Current time: ${new Date().toLocaleTimeString()}\n`;
        } else {
            output = 'Command not recognized. Try "hello" or "time".\n';
        }

        connection.write(output);
    });
});

server.listen(23, () => {
    console.log('Telnet server listening on port 23');
});

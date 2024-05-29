const express = require('express');
const { Telnet } = require('telnet-client');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/telnet', async (req, res) => {
    const { host, port, command } = req.body;

    const params = {
        host,
        port,
        negotiationMandatory: false,
        timeout: 1500,
    };

    try {
        const connection = new Telnet();
        await connection.connect(params);
        const response = await connection.send(command);
        await connection.end();

        res.json({ output: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Telnet backend listening at http://localhost:${port}`);
});

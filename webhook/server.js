const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.post('/webhook', (req, res) => {
    const data = req.body;
    console.log('Webhook received:', data);

    // Serializa o objeto Pokemon para JSON
    const pokemonJson = JSON.stringify(data);

    // Salva o JSON em um arquivo chamado 'pokemon.json'
    fs.writeFile('pokemon.json', pokemonJson, 'utf8', (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            res.status(500).json({ error: 'Erro ao salvar o arquivo' });
        } else {
            console.log('Arquivo pokemon.json salvo com sucesso');
            // Envie o objeto Pokémon para os clientes WebSocket
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(pokemonJson);
                }
            });
            // Envie a resposta para a solicitação do cliente
            res.status(200).json({ message: 'Webhook received' });
        }
    });
});

server.listen(8080, () => {
    console.log('Server started on port 8080');
});

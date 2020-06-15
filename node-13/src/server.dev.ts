import e from 'express';
import io from 'socket.io';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { config } from 'dotenv';
import { createServer } from 'http';
import { LatLng } from 'leaflet';

import { config as webpackConfig } from './../webpack.config';
import { removeFile, writeFile } from './fileReader';

config();

const PORT = process.env.PORT || 4000;
const app = e();
const server = createServer(app);
const ioServer = io(server);

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

ioServer.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on('move', (payload: LatLng) => {
    const geoJSON = writeFile(payload);
    ioServer.emit('sendGEO', geoJSON);
  });
  socket.on('disconnect', () => {
    removeFile();
  });
});

server.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});

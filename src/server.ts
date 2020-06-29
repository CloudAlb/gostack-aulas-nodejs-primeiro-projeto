import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); // preciso disso para ler routes externas
app.use(routes);

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
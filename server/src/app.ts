import { Server } from './server';

const port: number | string = process.env.PORT || 8081;

const run = new Server().start(port)
  .then(() => console.log(`App is listening on ${port}`))
  .catch(error => {
    console.log(error);
  });

export default run;
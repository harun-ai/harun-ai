import app from './app';

const port = process.env.PORT || 5000;

app.listen(3333, () => {
  console.log(`Koa server started on port: ${port}`);
});

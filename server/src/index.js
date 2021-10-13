import { App } from './App';

async function main() {
  const app = new App(4000);
  await app.listen();
}

if (require.main === module) {
  main();
}

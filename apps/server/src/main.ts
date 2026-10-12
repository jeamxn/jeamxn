import { createApp } from "#app";
import { readConfig } from "#shared/config";

async function bootstrap() {
  const config = readConfig();
  const app = await createApp(config);
  app.enableShutdownHooks();
  await app.listen(config.port, "0.0.0.0");
}
bootstrap().catch(() => {
  // Deliberately omit credentials, configuration values, and request contents.
  console.error("Portfolio server failed to start. Check server configuration and dependencies.");
  process.exitCode = 1;
});

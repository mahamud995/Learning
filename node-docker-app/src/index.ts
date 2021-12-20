import "reflect-metadata";
import { bootstrap } from "./infrastructure/bootstrapping/bootstrap";
import { containerModule } from "./inversify.config";
import { container } from "./infrastructure/ioc/ioc_container";




export async function runApp() {
    const appPort = Number(process.env.APP_PORT);
    const app = await bootstrap(container, appPort, containerModule);
    return app;
}

(async () => {
    await runApp();
})().catch(async (e) => {
    console.error(e);
    process.exit(1);
})


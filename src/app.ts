import { AppRoute } from "./presentation/routes";
import { Server } from "./presentation/server";
import { envs } from "./shared/config";

(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        routes: AppRoute.routes
    });

    server.start();
}
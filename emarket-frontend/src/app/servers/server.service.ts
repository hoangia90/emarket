import { Server } from "./server.model";

export class ServerService {

    private Servers: Server[] = [
        new Server(
            // CEA API
            '0',
            'CEA-API',
            'bigpiadmin',
            'BigadminPi;123',
            'https://api.bigpi.eu:8443/login',
            //
            '',
            '1',
            '',
        ),

        new Server(
            // CEA GATEWAY
            '1',
            'CEA-GATEWAY',
            'bigpiadmin',
            'BigadminPi;123',
            'https://gateway.bigpi.eu:8443/login',
            //
            '',
            '1',
            '',
        ),

        new Server(
            // Heverett
            '2',
            'Heverett',
            'bigpiadmin',
            'Hev@123@rett',
            'https://heverett.bigpi.eu:8443/login',
            //
            'heverett',
            '1',
            '',
        ),

        new Server(
            // Jubic,
            '3',
            'Jubic',
            'bigpiadmin',
            'Ju@123@Bic',
            'https://jubic.bigpi.eu:8443/login',
            //
            'jubic',
            '1',
            '',
        ),

        new Server(
            // Server Name,
            '4',
            'Ecorridor',
            'bigpiadmin',
            'ECO@123@RRIDO',
            'https://ecorridor-fhe.iit.cnr.it:8443/login',
            //
            'ecorridorcnr',
            '3',
            '',
        ),

        new Server(
            // Server Name,
            '5',
            'Clem',
            'bigpiadmin',
            'ECO@123@RRIDO',
            'https://clem.bigpi.eu:8443/login',
            //
            'clem',
            '1',
            '',
        ),

        // new Server(
        //     // Server Name,
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        // ),

    ];

    getServers() {
        return this.Servers.slice();
    }

    getServer(index: number) {
        return this.Servers[index];
    }

}
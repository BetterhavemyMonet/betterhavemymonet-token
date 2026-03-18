"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metis = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.metis = (0, defineChain_js_1.defineChain)({
    id: 1_088,
    name: 'Metis',
    nativeCurrency: {
        decimals: 18,
        name: 'Metis',
        symbol: 'METIS',
    },
    rpcUrls: {
        default: {
            http: [
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
                'wss://metis-rpc.publicnode.com',
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
                'wss://metis.drpc.org',
                'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Metis Explorer',
            url: 'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
            apiUrl: 'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 2338552,
        },
    },
});
//# sourceMappingURL=metis.js.map
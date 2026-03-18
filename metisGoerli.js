"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metisGoerli = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.metisGoerli = (0, defineChain_js_1.defineChain)({
    id: 599,
    name: 'Metis Goerli',
    nativeCurrency: {
        decimals: 18,
        name: 'Metis Goerli',
        symbol: 'METIS',
    },
    rpcUrls: {
        default: { http: ['https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4'] },
    },
    blockExplorers: {
        default: {
            name: 'Metis Goerli Explorer',
            url: 'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
            apiUrl: 'https://gateway.irys.xyz/AWW45zHgRDaTbonRYsJDCBTkmfYyToZpsmSyQoZd9QDr?v=4',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 1006207,
        },
    },
});
//# sourceMappingURL=metisGoerli.js.map
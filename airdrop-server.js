const express = require("express");
const cors = require("cors");
const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, transfer } = require("@solana/spl-token");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const connection = new Connection("https://api.mainnet-beta.solana.com");

const SECRET = JSON.parse(fs.readFileSync("id.json"));
const payer = Keypair.fromSecretKey(new Uint8Array(SECRET));

const MINT = new PublicKey("BYqHJvvtJSgXQi9iuL6PcXmVNADqBDxNGkyAhY8zwTWR");

const AIRDROP_AMOUNT = 100000000000;      // 100 tokens
const MAX_DISTRIBUTION = 250000000000000; // 250,000 tokens

let data = JSON.parse(fs.readFileSync("claims.json"));
let totalDistributed = data.totalDistributed;
let sentWallets = new Set(data.wallets);

function saveState(){
fs.writeFileSync("claims.json",JSON.stringify({
wallets:[...sentWallets],
totalDistributed:totalDistributed
}));
}

app.get("/status",(req,res)=>{
res.send({
distributed:totalDistributed,
remaining:MAX_DISTRIBUTION-totalDistributed,
participants:sentWallets.size
});
});

app.post("/airdrop",async(req,res)=>{
try{
const wallet=new PublicKey(req.body.wallet);

if(sentWallets.has(wallet.toString())){
return res.send({status:"already received"});
}

if(totalDistributed + AIRDROP_AMOUNT > MAX_DISTRIBUTION){
return res.send({status:"airdrop ended"});
}

const source=await getOrCreateAssociatedTokenAccount(
connection,
payer,
MINT,
payer.publicKey
);

const dest=await getOrCreateAssociatedTokenAccount(
connection,
payer,
MINT,
wallet
);

await transfer(
connection,
payer,
source.address,
dest.address,
payer.publicKey,
AIRDROP_AMOUNT
);

sentWallets.add(wallet.toString());
totalDistributed+=AIRDROP_AMOUNT;

saveState();

res.send({status:"airdrop sent"});
}catch(err){
console.error(err);
res.status(500).send({error:"airdrop failed"});
}
});

app.listen(3000,()=>console.log("Libra persistent airdrop engine running"));

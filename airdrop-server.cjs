const express = require('express');
const cors = require('cors');
const fs = require('fs');
const {Connection, Keypair, PublicKey} = require('@solana/web3.js');
const {getOrCreateAssociatedTokenAccount, transfer} = require('@solana/spl-token');

const app = express();
app.use(cors());
app.use(express.json());

const connection = new Connection('https://api.mainnet-beta.solana.com');
const LIBRA_MINT = new PublicKey('BYqHJvvtJSgXQi9iuL6PcXmVNADqBDxNGkyAhY8zwTWR');
const AIRDROP_AMOUNT = 100;
const MAX_AIRDROP = 250000;

let claimed = {};
if(fs.existsSync('claims.json')){
  claimed = JSON.parse(fs.readFileSync('claims.json'));
}

// Replace with your treasury secret key JSON array
const TREASURY = Keypair.generate();

app.post('/claim', async (req,res)=>{
  try{
    const wallet = new PublicKey(req.body.wallet).toString();

    if(claimed[wallet]){
      return res.json({success:false,error:'Already claimed'});
    }

    const totalClaimed = Object.keys(claimed).length * AIRDROP_AMOUNT;
    if(totalClaimed + AIRDROP_AMOUNT > MAX_AIRDROP){
      return res.json({success:false,error:'Airdrop fully claimed'});
    }

    const walletKey = new PublicKey(wallet);
    const treasuryToken = await getOrCreateAssociatedTokenAccount(connection, TREASURY, LIBRA_MINT, TREASURY.publicKey);
    const userToken = await getOrCreateAssociatedTokenAccount(connection, TREASURY, LIBRA_MINT, walletKey);
    const tx = await transfer(connection, TREASURY, treasuryToken.address, userToken.address, TREASURY.publicKey, AIRDROP_AMOUNT);

    claimed[wallet] = true;
    fs.writeFileSync('claims.json', JSON.stringify(claimed));
    res.json({success:true, tx});
  }catch(e){
    res.json({success:false,error:e.toString()});
  }
});

app.get('/status', (req,res)=>{
  const totalClaimed = Object.keys(claimed).length * AIRDROP_AMOUNT;
  res.json({
    success:true,
    claimed: totalClaimed,
    remaining: Math.max(MAX_AIRDROP - totalClaimed, 0)
  });
});

app.listen(3000, ()=>console.log('LIBRA airdrop server running'));

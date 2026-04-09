require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const {
  Connection,
  Keypair,
  PublicKey
} = require('@solana/web3.js');
const {
  getOrCreateAssociatedTokenAccount,
  transfer
} = require('@solana/spl-token');

const app = express();
app.use(cors());
app.use(express.json());

/* ===== SIMPLE DB (NO BUILD ISSUES) ===== */
const adapter = new JSONFile('db.json');
const db = new Low(adapter);

async function initDB() {
  await db.read();
  db.data ||= { claims: [] };
  await db.write();
}

/* ===== SOLANA ===== */
const connection = new Connection(process.env.RPC, 'confirmed');
const secret = JSON.parse(fs.readFileSync(process.env.WALLET));
const payer = Keypair.fromSecretKey(Uint8Array.from(secret));
const MINT = new PublicKey(process.env.MINT);
const AMOUNT = Number(process.env.AMOUNT);

/* ===== CLAIM ===== */
app.post('/claim', async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "No wallet" });

    await db.read();

    const exists = db.data.claims.find(c => c.wallet === wallet);
    if (exists) {
      return res.status(403).json({ error: "Already claimed" });
    }

    const to = new PublicKey(wallet);

    const fromToken = await getOrCreateAssociatedTokenAccount(
      connection, payer, MINT, payer.publicKey
    );

    const toToken = await getOrCreateAssociatedTokenAccount(
      connection, payer, MINT, to
    );

    const signature = await transfer(
      connection,
      payer,
      fromToken.address,
      toToken.address,
      payer.publicKey,
      AMOUNT
    );

    await connection.confirmTransaction(signature, 'confirmed');

    db.data.claims.push({ wallet, signature });
    await db.write();

    res.json({ success: true, signature });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

/* ===== STATUS ===== */
app.get('/status', async (req, res) => {
  await db.read();
  res.json({ totalClaims: db.data.claims.length });
});

/* ===== START ===== */
initDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("🚀 MONET PRODUCTION AIRDROP LIVE");
  });
});

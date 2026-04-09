require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
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

/* DB */
const db = new sqlite3.Database('./airdrop.db');
db.run(`CREATE TABLE IF NOT EXISTS claims (
  wallet TEXT PRIMARY KEY,
  signature TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

/* SOLANA */
const connection = new Connection(process.env.RPC, 'confirmed');
const secret = JSON.parse(fs.readFileSync(process.env.WALLET));
const payer = Keypair.fromSecretKey(Uint8Array.from(secret));
const MINT = new PublicKey(process.env.MINT);
const AMOUNT = Number(process.env.AMOUNT);

/* CLAIM */
app.post('/claim', async (req, res) => {
  try {
    const { wallet } = req.body;

    if (!wallet) return res.status(400).json({ error: "No wallet" });

    db.get("SELECT wallet FROM claims WHERE wallet = ?", [wallet], async (err, row) => {
      if (row) return res.status(403).json({ error: "Already claimed" });

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

      db.run("INSERT INTO claims(wallet, signature) VALUES (?, ?)", [wallet, signature]);

      res.json({ success: true, signature });
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

/* ✅ STATUS (THIS WAS MISSING BEFORE) */
app.get('/status', (req, res) => {
  db.get("SELECT COUNT(*) as total FROM claims", [], (err, row) => {
    res.json({ totalClaims: row.total });
  });
});

/* START */
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Airdrop live on port 3000");
});

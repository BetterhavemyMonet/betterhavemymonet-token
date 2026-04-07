import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let keypair;
let connection;

try {
  if (!process.env.PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY");

  const secret = Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY));
  keypair = Keypair.fromSecretKey(secret);

  connection = new Connection(process.env.RPC_URL || "https://api.mainnet-beta.solana.com");

  console.log("✅ Wallet loaded:", keypair.publicKey.toBase58());
} catch (err) {
  console.error("❌ Startup error:", err.message);
}

app.get("/", (req, res) => {
  res.send("🚀 MONET Airdrop Live");
});

app.get("/balance", async (req, res) => {
  try {
    const balance = await connection.getBalance(keypair.publicKey);
    res.json({ balance: balance / LAMPORTS_PER_SOL });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/claim", async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Wallet required" });

    const userPublicKey = new PublicKey(wallet);
    console.log("🎁 Claim request from:", userPublicKey.toBase58());

    return res.json({
      success: true,
      message: "Airdrop initiated 🚀"
    });

  } catch (err) {
    console.error("Claim error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Running on ${PORT}`);
});

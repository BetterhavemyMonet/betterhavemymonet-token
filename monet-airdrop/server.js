const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bs58 = require("bs58").default;
const nacl = require("tweetnacl");
const rateLimit = require("express-rate-limit");

const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, transfer } = require("@solana/spl-token");

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5
});
app.use("/airdrop", limiter);

const connection = new Connection("https://api.mainnet-beta.solana.com");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const sender = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));

const MONET_MINT = new PublicKey("6eACLGXCGdw9D5zb5eBKyFnFNTX9pTihDEpZQ7gYAX1b");

const AMOUNT = 100000000;
const MAX_AIRDROP = 10000000 * (10 ** 9);

let totalAirdropped = 0;
let claimed = new Set();

try {
  if (fs.existsSync("airdrop.json")) {
    const data = JSON.parse(fs.readFileSync("airdrop.json"));
    totalAirdropped = data.total || 0;
    claimed = new Set(data.claimed || []);
  }
} catch (e) {
  console.error("Load error:", e);
}

function verifySignature(wallet, signature) {
  const message = "Claim MONET airdrop";
  const publicKey = new PublicKey(wallet);

  return nacl.sign.detached.verify(
    Buffer.from(message),
    bs58.decode(signature),
    publicKey.toBytes()
  );
}

app.post("/airdrop", async (req, res) => {
  try {
    const { wallet, signature } = req.body;

    if (!wallet || !signature) {
      return res.status(400).send("Missing wallet or signature");
    }

    if (!verifySignature(wallet, signature)) {
      return res.status(400).send("Invalid signature");
    }

    if (claimed.has(wallet)) {
      return res.status(400).send("Already claimed");
    }

    if (totalAirdropped >= MAX_AIRDROP) {
      return res.status(400).send("Airdrop limit reached");
    }

    const recipient = new PublicKey(wallet);

    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      MONET_MINT,
      sender.publicKey
    );

    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      MONET_MINT,
      recipient
    );

    await transfer(
      connection,
      sender,
      senderTokenAccount.address,
      recipientTokenAccount.address,
      sender,
      AMOUNT
    );

    totalAirdropped += AMOUNT;
    claimed.add(wallet);

    fs.writeFileSync("airdrop.json", JSON.stringify({
      total: totalAirdropped,
      claimed: Array.from(claimed)
    }));

    res.send(`Airdrop sent 🚀 Total: ${totalAirdropped}`);

  } catch (err) {
    console.error(err);
    res.status(500).send("Airdrop failed");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Airdrop server running 🚀");
});

let wallet = null;

async function connectWallet() {
  try {
    if (window.solana && window.solana.isPhantom) {
      const resp = await window.solana.connect();
      wallet = resp.publicKey.toString();

      document.getElementById("wallet").innerText =
        wallet.slice(0,4)+"..."+wallet.slice(-4);

      let users = JSON.parse(localStorage.getItem("monet_users") || "[]");

      if (!users.includes(wallet)) {
        users.push(wallet);
        localStorage.setItem("monet_users", JSON.stringify(users));
      }

      updateStats(wallet, users);
    } else {
      alert("Install Phantom Wallet");
    }
  } catch(e) {
    console.log(e);
  }
}

function updateStats(wallet, users) {
  let spots = 500 - users.length;
  document.getElementById("spots").innerText = spots > 0 ? spots : 0;
  document.getElementById("rank").innerText = users.indexOf(wallet) + 1;
}

function fakeActivity() {
  const feed = document.getElementById("feed");
  const fake = Math.random().toString(36).substring(2,10);

  const el = document.createElement("div");
  el.innerText = "Wallet " + fake + " just connected 💸";

  feed.prepend(el);

  if (feed.children.length > 6) {
    feed.removeChild(feed.lastChild);
  }
}

setInterval(fakeActivity, 3000);

window.onload = () => {
  let users = JSON.parse(localStorage.getItem("monet_users") || "[]");
  document.getElementById("spots").innerText = 500 - users.length;
};

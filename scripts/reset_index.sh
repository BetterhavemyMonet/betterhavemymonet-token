#!/bin/bash
# Auto-reset index.html to match your sent images
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Monet Money</title>
<style>
body{
  margin:0;
  background:radial-gradient(circle at center,#0a0014 0%,#000 100%);
  color:white;
  font-family:Arial,sans-serif;
  text-align:center;
  overflow:hidden;
}
.container{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
h1{
  font-size:3rem;
  color:#d8a6ff;
  text-shadow:0 0 20px #a855f7,0 0 40px #9333ea;
  margin-bottom:25px;
}
img{
  width:220px;
  filter:drop-shadow(0 0 25px #a855f7);
}
button{
  margin-top:30px;
  padding:12px 25px;
  background:#7e22ce;
  border:none;
  border-radius:10px;
  color:white;
  font-size:1rem;
  cursor:pointer;
  box-shadow:0 0 15px #9333ea;
}
button:hover{
  background:#a855f7;
}
</style>
</head>
<body>
<div class="container">
  <h1>Monet Money</h1>
  <img src="https://beige-acute-krill-722.mypinata.cloud/ipfs/bafybeicdemlmg5iatjlspuozot2kzlsiadtb6mac7jm2oh63ysizmpxs4y" alt="Monet Logo">
  <br>
  <button>Enter</button>
</div>
</body>
</html>
EOF

git add index.html
git commit -m "auto-reset exact layout from images"
git push

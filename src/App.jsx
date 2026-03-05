import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

function App() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      fontFamily: "sans-serif"
    }}>
      <h1>BetterHaveMyMonet</h1>
      <WalletMultiButton />
    </div>
  )
}

export default App

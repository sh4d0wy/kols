import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Staking } from "./pages/Staking"
import { SevenKols } from "./pages/SevenKols"
import { NFTMarketplace } from "./pages/NFTMarketplace"
import { Web3Provider } from "./config/Web3Provider"

function App() {

  return (
    <Web3Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Staking/>} />
        <Route path="/kols" element={<SevenKols/>} />
        <Route path="/nft" element={<NFTMarketplace/>} />
      </Routes>
    </BrowserRouter>
    </Web3Provider>
  )
}

export default App

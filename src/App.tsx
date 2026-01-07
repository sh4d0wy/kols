import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Staking } from "./pages/Staking"
import { SevenKols } from "./pages/SevenKols"
import { NFTMarketplace } from "./pages/NFTMarketplace"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Staking/>} />
        <Route path="/kols" element={<SevenKols/>} />
        <Route path="/nft" element={<NFTMarketplace/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

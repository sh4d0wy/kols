import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Staking } from "./pages/Staking";
import { SevenKols } from "./pages/SevenKols";
import { NFTMarketplace } from "./pages/NFTMarketplace";
import { Web3Provider } from "./config/Web3Provider";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Routes>
          <Route path="/" element={<Staking />} />
          <Route path="/kols" element={<SevenKols />} />
          <Route path="/nft" element={<NFTMarketplace />} />
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  );
}

export default App;

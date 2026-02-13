// components/ConnectWallet.tsx
import { useConnection, useConnect, useDisconnect, useConnectors} from 'wagmi';
import { useState } from 'react';
import { WalletIcon, XIcon   } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ConnectWallet() {
  const connection = useConnection();
  const address = connection.address;
  const isConnected = !!address;
  const { mutate:connect } = useConnect();
  const { mutate:disconnect } = useDisconnect();
  const [showModal, setShowModal] = useState(false);
  const connectorsList = useConnectors();
  const connectors = connectorsList.filter(c => c.name.toLowerCase()!='injected');
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const handleConnect = (connectorId: string) => {
    const connector = connectors.find(c => c.id === connectorId);
    if (connector) {
      connect({ connector });
      setShowModal(false);
    }
  };

  if (isConnected && address) {
    return (
      <div>
        <button 
        onClick={() => setShowDisconnectModal(!showDisconnectModal)}
        className='cursor-pointer hover:scale-105 transition-all duration-200 bg-primary-gradient text-black px-4 py-2 rounded-full flex items-center gap-2'>
            <img src={connection.connector?.icon} alt={connection.connector?.name} className="w-4 h-4" />
            <span className='text-black font-semibold text-base'>{address.slice(0, 6)}...{address.slice(-4)}</span>
        </button>
        
        {showDisconnectModal && (
          <AnimatePresence>
            <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            className=' rounded-xl relative'
            >
            <ul className='flex flex-col absolute top-0 right-0 border border-white/20 rounded-xl  bg-[#0D0D0D] '>
                <li onClick={() => {
                    navigator.clipboard.writeText(address)
                    setShowDisconnectModal(!showDisconnectModal)
                }} className="hover:bg-white/20 w-full cursor-pointer transition-all duration-200 px-6 py-4 flex items-center gap-2">
                <span className="text-white font-semibold text-base">Copy Address</span>
              </li>      
              <li onClick={() => {
                disconnect()
                setShowDisconnectModal(!showDisconnectModal)
              }} className="hover:bg-white/20 w-full cursor-pointer transition-all duration-200 px-6 py-4 flex items-center gap-2">
                <span className="text-white font-semibold text-base">Disconnect</span>
              </li>
              </ul>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className=" cursor-pointer hover:scale-105 transition-all duration-200 bg-primary-gradient text-black px-4 py-2 rounded-full flex items-center gap-2">
        <WalletIcon className="w-4 h-4 text-black" />
        Connect Wallet
      </button>

      {showModal && (
        <AnimatePresence>
        <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-2xl font-bold">Connect Wallet</h2>
            <button onClick={() => setShowModal(false)} className="cursor-pointer hover:scale-105 transition-all duration-200 text-white text-2xl font-bold">
              <XIcon className="w-6 h-6 text-white" />
            </button>
            </div>
            <div className="flex flex-col gap-2">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => handleConnect(connector.id)}
                  className="cursor-pointer hover:scale-105 transition-all duration-200 text-lg bg-primary-gradient text-black px-4 py-2 rounded-full flex items-center gap-2"
                >
                <img src={connector.icon} alt={connector.name} className="w-6 h-6" />
                  {connector.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        </AnimatePresence>
      )}

    </>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#0D0D0D',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '400px',
    width: '90%',
    position: 'relative' as const,
    border: '2px solid #2a2a2a',
  },
  closeBtn: {
    position: 'absolute' as const,
    top: '10px',
    right: '15px',
    border: 'none',
    background: 'none',
    fontSize: '30px',
    cursor: 'pointer',
  },
  walletList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginTop: '20px',
  },
  walletBtn: {
    padding: '15px',
    border: '2px solid #2a2a2a',
    borderRadius: '8px',
    backgroundColor: '#0D0D0D',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s',
  },
};
import { create } from 'zustand'

interface NftMarketPlaceStore {
    message: string,
    setMessage: (message: string) => void,
    buyBundleMessage: string,
    setBuyBundleMessage: (message: string) => void
}

const initialState: NftMarketPlaceStore = {
  message: 'List Bundle For Sale ',
  setMessage: () => {},
  buyBundleMessage: 'Buy',
  setBuyBundleMessage: () => {},
}
const useNftMarketPlaceStore = create<NftMarketPlaceStore>((set) => ({
    ...initialState,
    setMessage: (message: string) => set({ message }),
    setBuyBundleMessage: (message: string) => set({ buyBundleMessage: message }),
}))

export default useNftMarketPlaceStore;
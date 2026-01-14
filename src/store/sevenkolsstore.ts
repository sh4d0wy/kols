import { create } from 'zustand'

interface SevenKolsStore {
    message: string,
    setMessage: (message: string) => void
}

const initialState: SevenKolsStore = {
  message: 'Checking allowance... ',
  setMessage: () => {},
}
const useSevenKolsStore = create<SevenKolsStore>((set) => ({
    ...initialState,
    setMessage: (message: string) => set({ message }),
}))

export default useSevenKolsStore;
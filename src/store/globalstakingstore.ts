import { create } from 'zustand'

interface GlobalStats {
    stakerCount : number
    activeStaked: number
    today: number
    yesterday: number
    thisWeek: number    
    lastWeek: number
    thisMonth: number
    lastMonth: number
    totalRewards: number
    contractUsdt: string
    insurancePool: number
    totalClaimed: number
    feeStats: number[]
}

const initialState: GlobalStats = {
  stakerCount: 0,
  activeStaked: 0,
  today: 0,
  yesterday: 0,
  thisWeek: 0,
  lastWeek: 0,
  thisMonth: 0,
  lastMonth: 0,
  totalRewards: 0,
  contractUsdt: "-",
  insurancePool: 0,
  totalClaimed: 0,
  feeStats: [0, 0],
}
const useGlobalStakingStore = create<GlobalStats>((set) => ({
    ...initialState,
    setGlobalStats: (globalStats: GlobalStats) => set(globalStats),
    setStakerCount: (stakerCount: number) => set({ stakerCount }),
    setActiveStaked: (activeStaked: number) => set({ activeStaked }),
    setToday: (today: number) => set({ today }),
    setYesterday: (yesterday: number) => set({ yesterday }),
    setThisWeek: (thisWeek: number) => set({ thisWeek }),
    setLastWeek: (lastWeek: number) => set({ lastWeek }),
    setThisMonth: (thisMonth: number) => set({ thisMonth }),
    setLastMonth: (lastMonth: number) => set({ lastMonth }),
    setTotalRewards: (totalRewards: number) => set({ totalRewards }),
    setContractUsdt: (contractUsdt: string) => set({ contractUsdt }),
    setInsurancePool: (insurancePool: number) => set({ insurancePool }),
    setTotalClaimed: (totalClaimed: number) => set({ totalClaimed }),
    setFeeStats: (feeStats: number[]) => set({ feeStats }),
}))

export default useGlobalStakingStore;
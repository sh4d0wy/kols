export interface GlobalStats {
    stakerCount: string
    activeStaked: string
    today: string
    yesterday: string
    thisWeek: string
    lastWeek: string
    thisMonth: string
    lastMonth: string
    totalRewards: string
    contractUsdt: string
    insurancePool: string
    totalClaimed: string
    feeToPool: string
    feeToInsurance: string
    apy:string
}

export interface WalletStats {
    activeStake: string,
    activeStakeRaw: bigint,
    myShare: string,
    pendingUnstake: string,
    withdrawableRewards: string,
    totalEarnings: string,
    unlockTime: number,
    isUnstaking: boolean,
    isActive: boolean,
}
export interface SevenKolsGlobalDataType {
    totalUsers: number;
    totalDeposited: string;
    totalSentToTreasury: string;
    totalFeeAmount: string;
    lastJoinedUser: string;
}

export interface AddressInfoType{
    usdtToken: string;
    treasuryWallet: string;
    feeWallet: string;
}
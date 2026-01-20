import type React from "react"
import { Card } from "../ui"
import { useGlobalQuery } from "@/hooks/staking/queries/useGlobalQuery"
import { useMemo } from "react"


  
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  
  const formatWholeNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }
export const GlobalStatisticsCard: React.FC = () => {
    const {data:globalStats} = useGlobalQuery();

    const feeRate = useMemo(()=>{
        return Number(globalStats?.feeRate??0) / Number(globalStats?.feeDenominator??0) * 100;
    }, [globalStats]);

    const withdrawnFee = useMemo(() => {
      return Number(globalStats?.totalClaimed??0) * (feeRate/100);
    }, [globalStats]);
    const stats = [
      {
        label: 'Total joined wallets',
        value: formatWholeNumber(Number(globalStats?.stakerCount??0)),
        suffix: '',
      },
      {
        label: 'Total KOLs Staked',
        value: formatNumber(Number(globalStats?.activeStaked??0)),
        suffix: 'KOLS',
      },
      {
        label: 'Total Rewards Distributed',
        value: formatNumber(Number(globalStats?.totalRewards??0)),
        suffix: 'USDT',
      },
      {
        label: 'Withdrawn fee',
        value: formatNumber(Number(withdrawnFee)),
        suffix: 'USDT',
      },
    ]
  
    return (
      <Card className="p-6 h-full">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">
          Global Statistics
        </h3>
  
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex justify-between items-center py-3.5 px-4 bg-[#111111] rounded-xl"
            >
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold">{stat.value}</span>
                {stat.suffix && (
                  <span className="text-[#00FFD1] font-semibold">{stat.suffix}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }
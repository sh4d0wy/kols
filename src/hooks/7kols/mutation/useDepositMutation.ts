import { useMutation, useQueryClient } from "@tanstack/react-query"
import { use7KolsContract } from "@/hooks/use7KolsContract"
import { toast } from "react-toastify"
import { useUSDTContract } from "@/hooks/useUSDTContract"
import { useConnection } from "wagmi"
import { parseUnits } from "viem"
import { SEVEN_KOLS_CONTRACT_ADDRESS } from "@/utils/7kolsdata"
import useSevenKolsStore from "@/store/sevenkolsstore"

export const useDepositMutation = () => {
    const {writeContract:sevenKolsContract} = use7KolsContract()
    const {readContract:usdtReadContract, writeContract:usdtWriteContract} = useUSDTContract()
    const connection = useConnection()
    const {setMessage} = useSevenKolsStore();
    const queryClient = useQueryClient()
    const depositMutation = useMutation({
        mutationFn: async ({referrerAddress,isActive}: {referrerAddress: string, isActive: boolean}) => {
            if(!sevenKolsContract || !usdtReadContract || !usdtWriteContract) return null
            const usdtBalance = await usdtReadContract.balanceOf(connection.address)
            if(usdtBalance < parseUnits('7', 18)){
                toast.error('Insufficient USDT balance')
                return
            }
            const allowance = await usdtReadContract.allowance(connection.address, SEVEN_KOLS_CONTRACT_ADDRESS)
            if(allowance < parseUnits('7', 18)){
                setMessage('Approving allowance... ')
                const tx = await usdtWriteContract.approve(SEVEN_KOLS_CONTRACT_ADDRESS, parseUnits('7', 18))
                await tx.wait()
                setMessage('Allowance approved')
            }
            if(isActive){
                setMessage('Depositing...')
            }else{
                setMessage('Joining... ')
            }
            const tx = await sevenKolsContract.depositAndClaim(referrerAddress)
            await tx.wait()
            setMessage('')
            return tx
        },
        mutationKey: ['deposit'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['7kols-global-stats'] })
            queryClient.invalidateQueries({ queryKey: ['7kols-user'] })
            toast.success('Deposit successful')
        },
        onError: (error:Error) => {
            console.log("Error depositing", error)
            toast.error('Failed to deposit')
        }
    })
    return {
        depositMutation,
    }
}
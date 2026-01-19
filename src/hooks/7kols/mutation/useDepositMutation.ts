import { useMutation, useQueryClient } from "@tanstack/react-query"
import { use7KolsContract } from "@/hooks/use7KolsContract"
import { toast } from "react-toastify"
import { useUSDTContract } from "@/hooks/useUSDTContract"
import { useConnection } from "wagmi"
import { isAddress, parseUnits } from "viem"
import { SEVEN_KOLS_CONTRACT_ADDRESS } from "@/utils/7kolsdata"
import useSevenKolsStore from "@/store/sevenkolsstore"

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export const useDepositMutation = () => {
    const {writeContract:sevenKolsContract} = use7KolsContract()
    const {readContract:usdtReadContract, writeContract:usdtWriteContract} = useUSDTContract()
    const connection = useConnection()
    const {setMessage} = useSevenKolsStore();
    const queryClient = useQueryClient()
    const depositMutation = useMutation({
        mutationFn: async ({referrerAddress,isActive}: {referrerAddress: string, isActive: boolean}) => {
            if(!sevenKolsContract || !usdtReadContract || !usdtWriteContract) return null
            if(!isAddress(referrerAddress)) {
                throw new ValidationError('Invalid referrer address')
            }
            const usdtBalance = await usdtReadContract.balanceOf(connection.address)
            if(usdtBalance < parseUnits('7', 18)){
                throw new ValidationError('Insufficient USDT balance')
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
        onError: (error: Error) => {
            console.log("Error depositing", error)
            if (error instanceof ValidationError) {
                toast.error(error.message)
            } else {
                toast.error('Failed to deposit amount')
            }
        }
    })
    return {
        depositMutation,
    }
}
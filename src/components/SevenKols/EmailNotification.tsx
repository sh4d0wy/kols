import React, { useMemo, useState } from 'react'
import { Card, Button } from '../ui'
import { registerEmail, resetEmail } from '@/api/userRoutes'
import { useConnection,useSignMessage } from 'wagmi'
import { toast } from 'react-toastify'
import type { RegisterEmailParams, ResetEmailParams } from '@/types/api/userRouterTypes'
import { useIsRegisteredQuery } from '@/hooks/7kols/queries/useIsRegisteredQuery'
import { useQueryClient } from '@tanstack/react-query'

export const EmailNotification: React.FC = () => {
  const [email, setEmail] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)
  const connection = useConnection()
  const signMessage = useSignMessage()
  const queryClient = useQueryClient()
  const handleSend = async () => {
    try{
      if(!connection.address) return;
      const message = "Register your email for notifications"
      const signature = await signMessage.mutateAsync({ message })
      if(!signature) return;
      const data: RegisterEmailParams = {
        walletAddress: connection.address,
        email: email,
        message: message,
        signature: signature,
        timestamp: Date.now()
      }
      await registerEmail(data)
      toast.success('Verification email sent successfully, please check your email')
      queryClient.invalidateQueries({ queryKey: ['is-registered', connection.address] })
    }
    catch(error){
      console.error(error)
      toast.error('Failed to register email')
    }
  }

  const handleDelete = async () => {
    try{
      if(!connection.address) return
      const message = "You are about to delete your email notification"
      const signature = await signMessage.mutateAsync({ message })
      if(!signature) return;

      const data: ResetEmailParams = {
        walletAddress: connection.address,
        message: message,
        signature: signature,
        timestamp: Date.now()
      }
      await resetEmail(data)
      toast.success('Email reset successfully')
      queryClient.invalidateQueries({ queryKey: ['is-registered', connection.address] })
    }
    catch(error){
      console.error(error)
      toast.error('Failed to delete email')
    }
  }

  const {data: isRegisteredData} = useIsRegisteredQuery()

  const isRegistered = useMemo(() => {
    return isRegisteredData ? isRegisteredData : false
  }, [isRegisteredData])
  console.log("Is registered", isRegistered)
  
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Email Notification</h3>
          <p className="text-gray-500 text-sm">Get notified on your email and telegram bot for activities</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {!isRegistered && 
        <>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
          />
        </div>

        <label className="flex items-center justify-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="mt-1 w-4 h-4 rounded bg-[#1a1a1a] text-cyan-500 focus:ring-cyan-500/30 appearance-none checked:bg-cyan-500 checked:border-cyan-500 relative cursor-pointer transition-colors duration-200 border border-cyan-500/50"
          />
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Agree to receive email notifications.
          </span>
        </label>
        </>}
        {isRegistered && <>
        <p className="text-gray-500 text-lg">You are already registered for email notifications</p>
        </>}

        <div className="flex gap-3 pt-2">
          {!isRegistered && <>  
            <Button 
            onClick={handleSend}
            disabled={!email || !consentChecked}
            className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register Email
          </Button>
          </>}
          
          <Button 
            variant="outline"
            onClick={handleDelete}
            className="flex-1 border-[#00FFD1]/20! disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isRegistered}
          >
            Reset Email
          </Button>
        </div>
      </div>
    </Card>
  )
}


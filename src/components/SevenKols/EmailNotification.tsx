import React, { useState } from 'react'
import { Card, Button, Input } from '../ui'

interface EmailNotificationProps {
  onSendEmail: (email: string) => void
  onDelete: () => void
  defaultEmail?: string
}

export const EmailNotification: React.FC<EmailNotificationProps> = ({
  onSendEmail,
  onDelete,
  defaultEmail = '',
}) => {
  const [email, setEmail] = useState(defaultEmail)
  const [consentChecked, setConsentChecked] = useState(false)

  const handleSend = () => {
    if (email && consentChecked) {
      onSendEmail(email)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
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

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#1a1a1a] text-cyan-500 focus:ring-cyan-500/30"
          />
          <span className="text-gray-400 text-sm">
            <span className="text-emerald-400">✓</span> Consent sent without require to pool.
          </span>
        </label>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={handleSend}
            disabled={!email || !consentChecked}
            className="flex-1"
          >
            Send Email
          </Button>
          <Button 
            variant="outline"
            onClick={onDelete}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}


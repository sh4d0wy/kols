import React from 'react'

const footerLinks = [
  { label: 'KOLS Official', href: '#' },
  { label: '7KOLS', href: '#' },
  { label: 'NFT Marketplace', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'KOLS App Hub', href: '#' },
  { label: 'KOLS Staking', href: '#' },
  { label: 'KOLS Swap', href: '#' },
  { label: 'reddit', href: '#' },
]

export const NFTFooter: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-10 py-10">
      <div className="w-[95%] max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-primary-gradient text-2xl font-bold">Ks</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-500 text-sm hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-600 text-xs">
          © 2024 KLS. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}


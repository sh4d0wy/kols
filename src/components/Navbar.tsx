import { Link, useLocation } from "react-router-dom"

export const Navbar = () => {
    const location = useLocation()
    const navItems = [
        {
            label: 'Staking',
            href: '/',
            icon: '⚡'
        },
        {
            label: '7KOLS',
            href: '/kols',
            icon: '📈'
        },
        {
            label: 'NFT Marketplace',
            href: '/nft',
            icon: null,
            highlighted: true
        }
    ]

    const isActive = (href: string) => {
        if (href === '/') return location.pathname === '/'
        return location.pathname.startsWith(href)
    }

    return (
        <div className="w-full flex justify-between items-center bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl px-6 py-3 mt-4">
            {/* Left Section - Logo & Balance */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="yellow" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3 className="text-primary-gradient text-2xl font-bold tracking-wide">KOLS</h3>
                </div>
                
                <div className="border border-cyan-400 rounded-full px-3 py-1">
                    <span className="text-cyan-400 font-semibold text-sm">7 USDT</span>
                </div>
            </div>

            <div className="flex items-center gap-1">
                {navItems.map((item) => (
                    <Link 
                        to={item.href} 
                        key={item.label}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                            ${isActive(item.href)
                                ? 'border-primary-gradient text-white' 
                                : 'text-gray-400 hover:text-white'
                            }
                            ${item.highlighted && !isActive(item.href) ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30' : ''}
                        `}
                    >
                        {item.icon && <span className="text-xs">{item.icon}</span>}
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
                {/* Switch Network Button */}
                <button className="flex items-center gap-2 text-[#00F5D4] text-sm font-medium hover:opacity-80 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4V9H4.582M4.582 9C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 9H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.0149 16.0348 18.9072C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5## 18.8979 6.33196 17.644C5.08324 16.39 4.28529 14.7## 4.063 13M19.419 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Switch to BnB Testnet
                </button>

                {/* Connect Wallet Button */}
                <button className="bg-primary-gradient text-[#0D0D0D] font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                    Connect Wallet
                </button>
            </div>
        </div>
    )
}

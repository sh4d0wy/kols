import { Link, useLocation } from "react-router-dom"
import { ConnectKitButton } from "connectkit"
export const Navbar = () => {
    const location = useLocation()
    const navItems = [
        {
            label: 'Staking',
            href: '/',
        },
        {
            label: '7KOLS',
            href: '/kols',
        },
        {
            label: 'NFT Marketplace',
            href: '/nft',
        }
    ]

    const isActive = (href: string) => {
        if (href === '/') return location.pathname === '/'
        return location.pathname.startsWith(href)
    }

    return (
        <div className="w-full flex justify-between items-center bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl px-6 py-3 mt-4">
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
                        `}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
                <ConnectKitButton 
                    customTheme={
                        {
                            "--ck-connectbutton-background": "linear-gradient(90deg, #00F5D4 0%, #7B61FF 100%)",
                            "--ck-connectbutton-color": "#0D0D0D",
                            "--ck-connectbutton-border-radius": "99px",
                            "--ck-connectbutton-hover-background": "linear-gradient(90deg, #00F5D4 0%, #7B61FF 100%)",
                        }
                    }
                 />
        </div>
    )
}

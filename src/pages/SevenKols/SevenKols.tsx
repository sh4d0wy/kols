import { Navbar } from '../../components/Navbar'
import {
  EmailNotification,
  JoinStructure,
  MyStructureInfo,
  GlobalStatistics,
  AddressInfo,
  UplineSection,
  DownlineSummary,
  TransactionHash,
  PlatformIntroVideos,
  Footer,
} from '../../components/SevenKols'

const SevenKols = () => {
  const handleSendEmail = (email: string) => {
    console.log('Sending email to:', email)
  }

  const handleDeleteEmail = () => {
    console.log('Deleting email')
  }

  const handleJoin = (referrerAddress: string) => {
    console.log('Joining with referrer:', referrerAddress)
  }

  const handleCopyInviteLink = () => {
    console.log('Copying invite link')
  }

  const handleLoadLastJoinedUser = () => {
    console.log('Loading last joined user')
  }

  const handleResetReferrer = () => {
    console.log('Resetting referrer')
  }

  const handleRefreshDownline = () => {
    console.log('Refreshing downline data')
  }

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="w-[95%] max-w-[1400px] mx-auto pb-10">
        <Navbar />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <EmailNotification 
            onSendEmail={handleSendEmail}
            onDelete={handleDeleteEmail}
          />
          <JoinStructure
            claimableStructureLevel={0}
            onJoin={handleJoin}
            onCopyInviteLink={handleCopyInviteLink}
            onLoadLastJoinedUser={handleLoadLastJoinedUser}
            onResetReferrer={handleResetReferrer}
          />
        </div>

        <div className="mt-6">
          <MyStructureInfo
            data={{
              remainingAmount: 245.67,
              totalStructAmount: 3456.89,
              totalJoinedDay: 28,
              totalWithdrawnDay: 1234.56,
            }}
          />
        </div>

        <div className="mt-6">
          <GlobalStatistics
            data={{
              totalJoinedWallets: 2847,
              totalDeposited: 287456.34,
              sentToTreasury: 145678.90,
              accumulatedFee: 5749.12,
              withdrawnFee: 3287.45,
            }}
          />
        </div>

        <div className="mt-6">
          <AddressInfo
            addresses={{
              usdtToken: '0xVault...1F28',
              treasury: '0xUSP2...3502',
              feeWallet: '0xYS07...1890',
            }}
          />
        </div>

        <div className="mt-6">
          <UplineSection />
        </div>

        <div className="mt-6">
          <DownlineSummary
            data={{
              networkCount: 28,
              totalStructureRevenue: 534.87,
              averagePerMember: 66.86,
              activeMembers: 5,
            }}
            onRefresh={handleRefreshDownline}
          />
        </div>

        <div className="mt-6">
          <TransactionHash
            transactions={[
              {
                hash: '0x0d4a9f1b1e1cd8bf933e43bb1dcc1f00b25f',
                status: 'pending',
              },
            ]}
          />
        </div>

        <div className="mt-6">
          <PlatformIntroVideos />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SevenKols

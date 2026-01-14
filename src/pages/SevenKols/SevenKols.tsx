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
          <MyStructureInfo/>
        </div>

        <div className="mt-6">
          <GlobalStatistics/>
        </div>

        <div className="mt-6">
          <AddressInfo/>
        </div>

        <div className="mt-6">
          <UplineSection />
        </div>

        <div className="mt-6">
          <DownlineSummary />
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

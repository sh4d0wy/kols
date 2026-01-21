import { StakingHeader } from '@/components/Staking'
import { Navbar } from '../../components/Navbar'
import {
  EmailNotification,
  JoinStructure,
  MyStructureInfo,
  GlobalStatistics,
  AddressInfo,
  UplineSection,
  DownlineSummary,
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

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="w-[80%] max-w-[1400px] mx-auto pb-10">
        <Navbar />
        <StakingHeader title="7KOLS" subtitle="" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <EmailNotification 
            onSendEmail={handleSendEmail}
            onDelete={handleDeleteEmail}
          />
          <JoinStructure />
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
          <PlatformIntroVideos />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SevenKols

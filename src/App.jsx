import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import './styles/global.css'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import SplashScreen from './pages/SplashScreen'
import Home from './pages/Home'
import SendMoney from './pages/SendMoney'
import PaymentMode from './pages/PaymentMode'
import AdLoading from './pages/AdLoading'
import AdPlayback from './pages/AdPlayback'
import AdVerified from './pages/AdVerified'
import TransferProcessing from './pages/TransferProcessing'
import TransferSuccess from './pages/TransferSuccess'
import TransactionHistory from './pages/TransactionHistory'
import SponsoredFAQ from './pages/SponsoredFAQ'
import HighRiskSession from './pages/HighRiskSession'
import Inbox from './pages/Inbox'
import Notifications from './pages/Notifications'
import QR from './pages/QR'
import Profile from './pages/Profile'

function AppContent() {
  const location = useLocation()
  const hiddenNavRoutes = ['/']

  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/payment-mode" element={<PaymentMode />} />
        <Route path="/ad-loading" element={<AdLoading />} />
        <Route path="/ad-playback" element={<AdPlayback />} />
        <Route path="/ad-verified" element={<AdVerified />} />
        <Route path="/transfer-processing" element={<TransferProcessing />} />
        <Route path="/transfer-success" element={<TransferSuccess />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/sponsored-faq" element={<SponsoredFAQ />} />
        <Route path="/high-risk-session" element={<HighRiskSession />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/qr" element={<QR />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!hiddenNavRoutes.includes(location.pathname) && <BottomNav />}
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <PhoneFrame>
        <AppContent />
      </PhoneFrame>
    </HashRouter>
  )
}

export default App

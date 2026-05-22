import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { verifyAdCompletion } from '../services/mockApi'

export default function AdPlayback() {
  const navigate = useNavigate()
  const location = useLocation()
  const [timeLeft, setTimeLeft] = useState(15)
  const [verificationSignals, setVerificationSignals] = useState({
    foregroundActive: true,
    watchTime: 0,
    interactionEvents: 0,
    riskScore: 0,
    suspicious: false,
  })
  const transferData = location.state || {}

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          navigate('/ad-verified', { state: { ...transferData, verificationSignals } })
          return 0
        }
        // Update watch time in signals
        setVerificationSignals((prev) => ({
          ...prev,
          watchTime: 15 - prev + 1,
        }))
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [navigate, transferData])

  // Simulate real-time verification signal updates
  useEffect(() => {
    const signalInterval = setInterval(() => {
      setVerificationSignals((prev) => ({
        ...prev,
        interactionEvents: Math.min(prev.interactionEvents + (Math.random() > 0.7 ? 1 : 0), 5),
        riskScore: Math.max(0, prev.riskScore + (Math.random() > 0.8 ? -2 : 1)),
      }))
    }, 400)
    return () => clearInterval(signalInterval)
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <span style={styles.timer}>0:{timeLeft.toString().padStart(2, '0')}</span>
        <button 
          style={styles.closeBtn}
          onClick={() => navigate('/home')}
        >
          <X size={24} color="white" />
        </button>
      </div>

      <div style={styles.adSection}>
        <div style={styles.badge}>SPONSORED AD</div>
        <div style={styles.videoContainer}>
          <div style={styles.videoPlaceholder}>
            <div style={styles.adContent}>
              <div style={styles.bankIcon}>🏛️</div>
              <h2 style={styles.adTitle}>GoTyme</h2>
              <p style={styles.adSubtitle}>BANKING FOR EVERYONE</p>
              <div style={styles.adCTA}>16s left</div>
            </div>
          </div>
        </div>

        <div style={styles.rewardSection}>
          <div style={styles.rewardText}>
            <span style={styles.rewardLabel}>Amount Waived</span>
            <span style={styles.rewardAmount}>₱{transferData.transferFee || 0}.00</span>
          </div>
        </div>
      </div>

      <div style={styles.verificationSection}>
        <h3 style={styles.verificationTitle}>AI VERIFICATION SIGNALS</h3>
        
        <div style={styles.signalsGrid}>
          <div style={styles.signalItem}>
            <div style={styles.signalLabel}>Foreground Active</div>
            <div style={styles.signalBadge}>✓ Active</div>
          </div>
          <div style={styles.signalItem}>
            <div style={styles.signalLabel}>Watch Time</div>
            <div style={styles.signalValue}>{verificationSignals.watchTime}s</div>
          </div>
          <div style={styles.signalItem}>
            <div style={styles.signalLabel}>Interactions</div>
            <div style={styles.signalValue}>{verificationSignals.interactionEvents}</div>
          </div>
          <div style={styles.signalItem}>
            <div style={styles.signalLabel}>Risk Score</div>
            <div style={{...styles.signalBadge, color: verificationSignals.riskScore > 70 ? '#FF6B6B' : '#4CAF50'}}>
              {verificationSignals.riskScore > 70 ? 'Elevated' : 'Low'}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.verifyingText}>
        Verifying ad engagement...
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid var(--color-border)',
  },
  timer: {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-primary)',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    color: 'var(--color-text-primary)',
  },
  adSection: {
    flex: 1,
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  badge: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-text)',
    textTransform: 'uppercase',
  },
  videoContainer: {
    flex: 1,
    borderRadius: '12px',
    overflow: 'hidden',
    border: '2px solid var(--color-primary)',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(135deg, #7C2FEF 0%, #5C0DFF 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  adContent: {
    textAlign: 'center',
  },
  bankIcon: {
    fontSize: '48px',
    marginBottom: '8px',
  },
  adTitle: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    margin: '0 0 4px 0',
    color: 'white',
  },
  adSubtitle: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'var(--font-text)',
    margin: '0 0 8px 0',
  },
  adCTA: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'var(--font-text)',
  },
  rewardSection: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '10px',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
  },
  rewardText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  rewardLabel: {
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
  },
  rewardAmount: {
    fontSize: '18px',
    fontWeight: '700',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-primary)',
  },
  verificationSection: {
    padding: '16px 20px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderTop: '1px solid var(--color-border)',
  },
  verificationTitle: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
    textTransform: 'uppercase',
    margin: '0 0 12px 0',
  },
  signalsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  signalItem: {
    backgroundColor: 'var(--color-bg-primary)',
    borderRadius: '8px',
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    border: '1px solid var(--color-border)',
  },
  signalLabel: {
    fontSize: '11px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
  },
  signalBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-text)',
  },
  signalValue: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-numbers)',
  },
  verifyingText: {
    textAlign: 'center',
    padding: '12px 20px 20px',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
  },
}

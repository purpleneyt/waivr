import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Building2 } from 'lucide-react'
import BottomNav from '../components/BottomNav'

export default function PaymentMode() {
  const navigate = useNavigate()
  const [selectedMode, setSelectedMode] = useState('instapay')

  const paymentModes = [
    {
      id: 'instapay',
      name: 'InstaPay',
      description: 'Instant transfer (24/7)',
      Icon: Zap,
      fee: '₱0.00',
    },
    {
      id: 'pesonet',
      name: 'PESONet',
      description: 'Next banking day',
      Icon: Building2,
      fee: '₱0.00',
    },
  ]

  const handleContinue = () => {
    navigate('/transfer-processing')
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Select Payment Mode</h1>

        <div style={styles.modesContainer}>
          {paymentModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              style={{
                ...styles.modeCard,
                ...(selectedMode === mode.id ? styles.modeCardActive : {}),
              }}
            >
              <div style={styles.modeHeader}>
                <mode.Icon size={24} strokeWidth={2} style={styles.modeIcon} />
                <span style={styles.modeName}>{mode.name}</span>
              </div>
              <p style={styles.modeDescription}>{mode.description}</p>
              <div style={styles.modeFee}>Fee: {mode.fee}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          style={styles.submitBtn}
        >
          Continue Transfer
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    paddingBottom: '80px',
  },
  content: {
    padding: '20px',
    maxWidth: '390px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    marginTop: '20px',
    marginBottom: '24px',
  },
  modesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  modeCard: {
    padding: '16px',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    display: 'block',
  },
  modeCardActive: {
    backgroundColor: 'rgba(124, 47, 239, 0.15)',
    borderColor: 'var(--color-primary)',
  },
  modeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  modeIcon: {
    color: 'var(--color-primary)',
    flexShrink: 0,
  },
  modeName: {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
  },
  modeDescription: {
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
    margin: '0 0 8px 0',
  },
  modeFee: {
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-primary)',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '16px',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}

import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AdVerified() {
  const navigate = useNavigate()
  const location = useLocation()
  const transferData = location.state || {}

  useEffect(() => {
    // Redirect to transfer processing after 2 seconds
    const timer = setTimeout(() => {
      navigate('/transfer-processing', { state: transferData })
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate, transferData])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.successIcon}>✓</div>
        <h1 style={styles.title}>Ad Watched!</h1>
        <p style={styles.subtitle}>Your fee waiver has been applied</p>
        
        {/* Verification Results */}
        {transferData.verificationSignals && (
          <div style={styles.resultsSection}>
            <h3 style={styles.resultsTitle}>VERIFICATION RESULTS</h3>
            <div style={styles.resultsList}>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Watch Time:</span>
                <span style={styles.resultValue}>{transferData.verificationSignals.watchTime}s / 15s ✓</span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Interactions:</span>
                <span style={styles.resultValue}>{transferData.verificationSignals.interactionEvents} detected</span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Risk Assessment:</span>
                <span style={{...styles.resultValue, color: transferData.verificationSignals.riskScore > 70 ? '#FF6B6B' : '#4CAF50'}}>
                  {transferData.verificationSignals.riskScore > 70 ? 'Elevated' : 'Low'} ✓
                </span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Fee Waived:</span>
                <span style={styles.resultValue}>₱{transferData.transferFee || 0}.00</span>
              </div>
            </div>
          </div>
        )}
        
        <p style={styles.message}>Proceeding to transfer...</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(124, 47, 239, 0.2)',
    border: '2px solid var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: '700',
    color: 'var(--color-primary)',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
  },
  message: {
    fontSize: '12px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
    marginTop: '12px',
    fontStyle: 'italic',
  },
  resultsSection: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    textAlign: 'left',
  },
  resultsTitle: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
    textTransform: 'uppercase',
    margin: '0 0 12px 0',
  },
  resultsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  resultItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    fontFamily: 'var(--font-text)',
  },
  resultLabel: {
    color: 'var(--color-text-secondary)',
  },
  resultValue: {
    color: 'var(--color-text-primary)',
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
  },
}

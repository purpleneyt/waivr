import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TransferProcessing() {
  const navigate = useNavigate()
  const location = useLocation()
  const transferData = location.state || {}

  useEffect(() => {
    // Simulate processing and redirect to success after 3 seconds
    const timer = setTimeout(() => {
      navigate('/transfer-success', { state: transferData })
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate, transferData])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconSection}>
          <div style={styles.spinner}>
            <div style={styles.spinnerInner}></div>
          </div>
        </div>

        <h1 style={styles.title}>Processing Transfer</h1>
        <p style={styles.subtitle}>Your transfer is being processed</p>

        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span>Amount</span>
            <span style={styles.detailValue}>₱{transferData.amount || 0}.00</span>
          </div>
          <div style={styles.detailRow}>
            <span>Fee Status</span>
            <span style={{ ...styles.detailValue, color: 'var(--color-primary)' }}>{transferData.paymentMode === 'sponsored' ? 'FREE' : `₱${transferData.transferFee || 0}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    maxWidth: '320px',
  },
  iconSection: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '80px',
    height: '80px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerInner: {
    width: '70px',
    height: '70px',
    border: '3px solid var(--color-border)',
    borderTop: '3px solid var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 1.5s linear infinite',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
  },
  details: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '16px',
    width: '100%',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
  },
  detailValue: {
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
  },
}

// Add animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)
}

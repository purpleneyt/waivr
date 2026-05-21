import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function TransferSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const transferData = location.state || {}

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.successSection}>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.title}>Transfer Successful!</h1>
          
          <div style={styles.transferDetails}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Recipient</span>
              <span style={styles.detailValue}>{transferData.recipient?.mobile || 'N/A'}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Amount</span>
              <span style={styles.detailValue}>₱{transferData.amount || 0}.00</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Fee</span>
              <span style={{ ...styles.detailValue, color: 'var(--color-primary)' }}>
                ₱{transferData.transferFee || 0}.00 {transferData.paymentMode === 'sponsored' ? '(Waivr)' : ''}
              </span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Reference</span>
              <span style={styles.referenceCode}>TXN{Date.now().toString().slice(-9)}</span>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/home')}
          >
            Done
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate('/send-money')}
          >
            Send Another
          </button>
        </div>
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
  successSection: {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '40px',
  },
  successIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'rgba(124, 47, 239, 0.15)',
    border: '3px solid var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '50px',
    fontWeight: '700',
    color: 'var(--color-primary)',
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    marginBottom: '30px',
  },
  transferDetails: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-bg-light)',
    textAlign: 'right',
  },
  referenceCode: {
    fontSize: '12px',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-text-tertiary)',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  primaryBtn: {
    padding: '14px 16px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  secondaryBtn: {
    padding: '14px 16px',
    backgroundColor: 'transparent',
    color: 'var(--color-bg-light)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}

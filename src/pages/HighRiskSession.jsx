import { useNavigate } from 'react-router-dom'

export default function HighRiskSession() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.warningIcon}>⚠️</div>
        <h1 style={styles.title}>High-Risk Session Detected</h1>
        <p style={styles.subtitle}>
          We've detected unusual activity on your account for security reasons.
        </p>

        <div style={styles.details}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Location:</span>
            <span>Different from usual</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Device:</span>
            <span>New device detected</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Action:</span>
            <span>Verify your identity</span>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            onClick={() => navigate('/home')}
            style={styles.primaryBtn}
          >
            Verify Identity
          </button>
          <button
            onClick={() => navigate('/home')}
            style={styles.secondaryBtn}
          >
            Go to Home
          </button>
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
    maxWidth: '340px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  warningIcon: {
    fontSize: '64px',
    marginBottom: '12px',
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
    lineHeight: '1.5',
  },
  details: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontFamily: 'var(--font-text)',
  },
  detailLabel: {
    fontWeight: '600',
    color: 'var(--color-text-primary)',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
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
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}

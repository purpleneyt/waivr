import BottomNav from '../components/BottomNav'

export default function QR() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>QR Code</h1>
        </div>
        <div style={styles.qrSection}>
          <div style={styles.qrPlaceholder}>
          </div>
          <p style={styles.description}>Scan to send / receive money</p>
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
    maxWidth: '1200px',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    margin: 0,
  },
  qrSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center',
  },
  qrPlaceholder: {
    width: '240px',
    height: '240px',
    backgroundColor: 'white',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    fontFamily: 'monospace',
    marginBottom: '20px',
  },
  qrCode: {
    fontSize: '12px',
    letterSpacing: '2px',
  },
  description: {
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
}

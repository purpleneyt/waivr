import BottomNav from '../components/BottomNav'

export default function Profile() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Profile</h1>
        </div>
        
        <div style={styles.profileSection}>
          <div style={styles.avatar}>👤</div>
          <h2 style={styles.name}>Juan Dela Cruz</h2>
          <p style={styles.handle}>@juanDC</p>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Phone</span>
            <span style={styles.infoValue}>+63 917 123 4567</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Account</span>
            <span style={styles.infoValue}>USER_001</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Member Since</span>
            <span style={styles.infoValue}>January 2024</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    paddingBottom: '80px',
  },
  content: {
    padding: '20px',
    maxWidth: '390px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    margin: 0,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--color-border)',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    marginBottom: '16px',
  },
  name: {
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    margin: '0 0 4px 0',
  },
  handle: {
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
  },
  infoLabel: {
    fontSize: '12px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-secondary)',
  },
  infoValue: {
    fontSize: '14px',
    fontFamily: 'var(--font-numbers)',
    fontWeight: '600',
    color: 'var(--color-text-primary)',
  },
}

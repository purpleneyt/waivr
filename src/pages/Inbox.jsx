import BottomNav from '../components/BottomNav'

export default function Inbox() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Inbox</h1>
        </div>
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <p style={styles.emptyText}>No messages yet</p>
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
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyText: {
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-secondary)',
  },
}

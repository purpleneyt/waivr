import { useNavigate } from 'react-router-dom'
import { HelpCircle, ShieldAlert, ChevronRight } from 'lucide-react'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const navigate = useNavigate()

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

        <div style={styles.actionSection}>
          <button
            onClick={() => navigate('/sponsored-faq')}
            style={styles.actionItem}
          >
            <div style={styles.actionIcon}>
              <HelpCircle size={20} color="white" strokeWidth={2} />
            </div>
            <div style={styles.actionContent}>
              <div style={styles.actionLabel}>Help & FAQ</div>
              <div style={styles.actionDesc}>Learn about Waivr Sponsored Transfer</div>
            </div>
            <ChevronRight size={20} color="var(--color-primary)" strokeWidth={2} />
          </button>

          <button
            onClick={() => navigate('/high-risk-session')}
            style={styles.actionItem}
          >
            <div style={styles.actionIcon}>
              <ShieldAlert size={20} color="white" strokeWidth={2} />
            </div>
            <div style={styles.actionContent}>
              <div style={styles.actionLabel}>Security Check</div>
              <div style={styles.actionDesc}>View account security status</div>
            </div>
            <ChevronRight size={20} color="var(--color-primary)" strokeWidth={2} />
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
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '32px',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    width: '100%',
  },
  actionIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actionContent: {
    flex: 1,
    textAlign: 'left',
  },
  actionLabel: {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
    marginBottom: '2px',
  },
  actionDesc: {
    fontSize: '12px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-secondary)',
  },
}

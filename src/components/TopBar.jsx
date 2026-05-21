import { Bell } from 'lucide-react'

export default function TopBar() {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <div style={styles.avatar}>👤</div>
        <div style={styles.userInfo}>
          <div style={styles.name}>Juan Dela Cruz</div>
          <div style={styles.handle}>@juanDC</div>
        </div>
      </div>
      <button style={styles.notificationBtn}>
        <Bell size={20} color="white" strokeWidth={2} />
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'var(--color-bg-primary)',
    borderBottom: '1px solid var(--color-border)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#E8DFF5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
  },
  handle: {
    fontSize: '12px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
  },
  notificationBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

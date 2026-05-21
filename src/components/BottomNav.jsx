import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Inbox, QrCode, BarChart3, User } from 'lucide-react'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/home', Icon: Home },
    { label: 'Inbox', path: '/inbox', Icon: Inbox },
    { label: 'QR', path: '/qr', Icon: QrCode, isCenter: true },
    { label: 'Transactions', path: '/transaction-history', Icon: BarChart3 },
    { label: 'Profile', path: '/profile', Icon: User },
  ]

  return (
    <nav style={styles.container}>
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            ...styles.item,
            ...(item.isCenter ? styles.centerItem : {}),
          }}
        >
          {item.isCenter ? (
            <div style={styles.qrContainer}>
              <item.Icon 
                size={28} 
                color="white"
                strokeWidth={1.5}
              />
            </div>
          ) : (
            <item.Icon 
              size={24} 
              style={location.pathname === item.path ? styles.iconActive : styles.iconInactive} 
            />
          )}
          <span style={location.pathname === item.path ? styles.labelActive : styles.label}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  )
}

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'var(--color-bg-primary)',
    borderTop: '1px solid var(--color-border)',
    padding: '0',
    maxWidth: '390px',
    margin: '0 auto',
    height: '70px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: 'var(--font-text)',
    transition: 'all 0.3s ease',
    flex: 1,
  },
  centerItem: {
    position: 'relative',
    top: '-12px',
  },
  qrContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(124, 47, 239, 0.4)',
    transition: 'all 0.2s ease',
  },
  iconInactive: {
    strokeWidth: 2,
    color: 'var(--color-text-tertiary)',
  },
  iconActive: {
    strokeWidth: 2,
    color: 'var(--color-primary)',
  },
  label: {
    fontSize: '11px',
    color: 'var(--color-text-tertiary)',
  },
  labelActive: {
    fontSize: '11px',
    color: 'var(--color-primary)',
  },
}

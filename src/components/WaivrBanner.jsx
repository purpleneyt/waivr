import { useNavigate } from 'react-router-dom'
import { Gift, ChevronRight } from 'lucide-react'

export default function WaivrBanner() {
  const navigate = useNavigate()

  return (
    <div
      style={styles.banner}
      onClick={() => navigate('/send-money', { state: { paymentMode: 'sponsored' } })}
    >
      <div style={styles.iconSection}>
        <Gift size={24} color="white" strokeWidth={2} />
      </div>
      <div style={styles.content}>
        <div style={styles.title}>Waivr Sponsored Transfer</div>
        <div style={styles.subtitle}>Watch a 15s ads, pay ₱0 in fees</div>
      </div>
      <ChevronRight size={20} color="#7C2FEF" strokeWidth={2} />
    </div>
  )
}

const styles = {
  banner: {
    backgroundColor: '#E8DFF5',
    borderRadius: '14px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(124, 47, 239, 0.2)',
  },
  iconSection: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: '13px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
    marginBottom: '2px',
  },
  subtitle: {
    fontSize: '12px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-secondary)',
  },
}


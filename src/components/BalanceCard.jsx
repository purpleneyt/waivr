import { useNavigate } from 'react-router-dom'

export default function BalanceCard({ balance = 67320.07 }) {
  const navigate = useNavigate()

  return (
    <div style={styles.card}>
      <div style={styles.label}>AVAILABLE BALANCE</div>
      <div style={styles.amount}>₱{balance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div style={styles.actions}>
        <button
          style={styles.primaryBtn}
          onClick={() => navigate('/send-money')}
        >
          Send Money →
        </button>
        <button
          style={styles.secondaryBtn}
          onClick={() => navigate('/home')}
        >
          Top up
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
    border: '1px solid rgba(124, 47, 239, 0.2)',
  },
  label: {
    fontSize: '11px',
    fontWeight: '400',
    letterSpacing: '0.5px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'var(--font-text)',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  amount: {
    fontSize: '36px',
    fontWeight: '700',
    fontFamily: 'var(--font-numbers)',
    color: 'white',
    marginBottom: '16px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  primaryBtn: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '16px',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  secondaryBtn: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'white',
    color: '#1A1A2E',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '16px',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}

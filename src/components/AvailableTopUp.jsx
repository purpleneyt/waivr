import { ChevronRight } from 'lucide-react'

export default function AvailableTopUp({ amount = 70.00 }) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.label}>AVAILABLE TOP UP</div>
        <div style={styles.amount}>₱{amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>
      <ChevronRight size={20} color="var(--color-primary)" strokeWidth={2} />
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    border: '1px solid var(--color-border)',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  amount: {
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-primary)',
  },
}

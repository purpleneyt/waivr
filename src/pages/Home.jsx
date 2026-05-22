import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BalanceCard from '../components/BalanceCard'
import WaivrBanner from '../components/WaivrBanner'
import AvailableTopUp from '../components/AvailableTopUp'
import BottomNav from '../components/BottomNav'

export default function Home() {
  const navigate = useNavigate()

  const transactions = [
    { id: 1, name: 'John de Jesus', timestamp: '1 min ago', amount: 500, fee: '₱0', badge: 'FREE' },
    { id: 2, name: 'Maria Santos', timestamp: '3 min ago', amount: 1000, fee: '₱0', badge: 'FREE' },
    { id: 3, name: 'Carlo Reyes', timestamp: '1 hr ago', amount: 50, fee: '₱0', badge: 'FREE' },
  ]

  return (
    <div style={styles.container}>
      <TopBar />
      
      <div style={styles.content}>
        <BalanceCard balance={67320.07} />
        <WaivrBanner />
        <AvailableTopUp amount={70.00} />
        
        {/* Recent Transactions Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Transactions</h2>
            <button
              onClick={() => navigate('/transaction-history')}
              style={styles.seeAllBtn}
            >
              See all
            </button>
          </div>
          
          <div style={styles.transactionsList}>
            {transactions.map((tx) => (
              <div key={tx.id} style={styles.transactionItem}>
                <div style={styles.txLeft}>
                  <div style={styles.txAvatar}>👤</div>
                  <div style={styles.txInfo}>
                    <div style={styles.txName}>{tx.name}</div>
                    <div style={styles.txTimestampRow}>
                      <div style={styles.txTimestamp}>{tx.timestamp}</div>
                      <div style={styles.txBadge}>{tx.badge}</div>
                    </div>
                  </div>
                </div>
                <div style={styles.txRight}>
                  <div style={styles.txAmount}>- ₱{tx.amount.toLocaleString('en-PH')}</div>
                  <div style={styles.txFee}>Fee: {tx.fee}</div>
                </div>
              </div>
            ))}
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
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    paddingBottom: '80px',
  },
  content: {
    padding: '16px 16px',
    maxWidth: '390px',
    margin: '0 auto',
  },
  section: {
    marginTop: '12px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  seeAllBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
  },
  transactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  transactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '12px',
    border: '1px solid var(--color-border)',
  },
  txLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flex: 1,
  },
  txAvatar: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    borderRadius: '50%',
    backgroundColor: '#E8E8E8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  txInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  txName: {
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
  },
  txTimestampRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  txTimestamp: {
    fontSize: '11px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
  },
  txBadge: {
    backgroundColor: 'rgba(124, 47, 239, 0.1)',
    color: 'var(--color-primary)',
    fontSize: '9px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    padding: '2px 6px',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
  },
  txRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px',
    marginLeft: '12px',
  },
  txAmount: {
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-text-primary)',
  },
  txFee: {
    fontSize: '11px',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-primary)',
    fontWeight: '500',
  },
}
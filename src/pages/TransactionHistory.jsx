import BottomNav from '../components/BottomNav'

export default function TransactionHistory() {
  const transactions = [
    { id: 1, recipient: 'John de Jesus', amount: 500, fee: 'FREE', date: '1 min ago', feeType: 'waivr' },
    { id: 2, recipient: 'Maria Santos', amount: 1000, fee: 'FREE', date: '3 min ago', feeType: 'waivr' },
    { id: 3, recipient: 'Carlo Reyes', amount: 50, fee: 'FREE', date: '1 hr ago', feeType: 'waivr' },
    { id: 4, recipient: 'Juana Dela Rosa', amount: 12000, fee: 'FREE', date: '5 hr ago', feeType: 'waivr' },
    { id: 5, recipient: 'Fernando Tapsi', amount: 50000, fee: 'FREE', date: 'Yesterday', feeType: 'waivr' },
    { id: 6, recipient: 'Juan Dela Cruz', amount: 2500, fee: '₱15', date: '2 days ago', feeType: 'paid' },
    { id: 7, recipient: 'Ana Garcia', amount: 500, fee: 'FREE', date: '3 days ago', feeType: 'waivr' },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Transaction History</h1>

        <div style={styles.transactionsList}>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div key={tx.id} style={styles.transactionItem}>
                <div style={styles.txLeft}>
                  <div style={styles.txAvatar}>👤</div>
                  <div style={styles.txInfo}>
                    <div style={styles.txRecipient}>{tx.recipient}</div>
                    <div style={styles.txDate}>{tx.date}</div>
                  </div>
                </div>
                <div style={styles.txRight}>
                  <div style={styles.txAmount}>₱{tx.amount.toLocaleString('en-PH')}</div>
                  <div
                    style={{
                      ...styles.txFee,
                      color: tx.feeType === 'waivr' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                    }}
                  >
                    Fee: {tx.fee}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.empty}>No transactions yet</div>
          )}
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
    maxWidth: '390px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    margin: 0,
    marginBottom: '20px',
  },
  transactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  transactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid var(--color-border)',
  },
  txLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },
  txAvatar: {
    width: '40px',
    height: '40px',
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
    gap: '2px',
  },
  txRecipient: {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
  },
  txDate: {
    fontSize: '12px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
  },
  txRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px',
  },
  txAmount: {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
  },
  txFee: {
    fontSize: '11px',
    fontFamily: 'var(--font-numbers)',
  },
  empty: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--color-text-tertiary)',
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
  },
}

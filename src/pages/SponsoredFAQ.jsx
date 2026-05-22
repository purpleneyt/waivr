import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import BottomNav from '../components/BottomNav'

export default function SponsoredFAQ() {
  const [expandedId, setExpandedId] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'What is Waivr?',
      answer: 'Waivr is an AI-powered sponsored transfer system that allows you to watch a short ad in exchange for free or discounted transfer fees.',
    },
    {
      id: 2,
      question: 'How does the ad watching work?',
      answer: 'After selecting Waivr Sponsored Transfer, you\'ll watch a 15-second ad. Once completed, your transfer fee is waived.',
    },
    {
      id: 3,
      question: 'Is my data secure?',
      answer: 'Yes, all transfers are encrypted and secured following international banking standards. Your data is never shared with advertisers.',
    },
    {
      id: 4,
      question: 'Can I use Waivr for all transfers?',
      answer: 'Waivr is available for InstaPay and PESONet transfers to supported banks. Some restrictions may apply based on limits.',
    },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Sponsored FAQ</h1>

        <div style={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.id} style={styles.faqItem}>
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                style={styles.faqQuestion}
              >
                <span style={styles.faqQuestionText}>{faq.question}</span>
                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  style={{
                    transform: expandedId === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </button>
              {expandedId === faq.id && (
                <div style={styles.faqAnswer}>{faq.answer}</div>
              )}
            </div>
          ))}
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
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    marginTop: '20px',
    marginBottom: '24px',
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  faqItem: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid var(--color-border)',
  },
  faqQuestion: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--color-bg-secondary)',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  faqQuestionText: {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    textAlign: 'left',
    color: 'var(--color-text-primary)',
  },
  faqAnswer: {
    padding: '0 16px 16px 16px',
    fontSize: '13px',
    lineHeight: '1.6',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'rgba(124, 47, 239, 0.08)',
  },
}

'use client';

import { color, space, type as typeTokens, radius, fontFamily } from '@/lib/tokens';

const NAV = [
  'Overview',
  'Users',
  'Stores',
  'Orders',
  'Partners',
  'Compliance',
  'Coupons',
  'Analytics',
  'Support',
];

export default function AdminHomePage() {
  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>Drinkit Admin</div>
        <nav style={styles.nav}>
          {NAV.map((item, i) => (
            <div key={item} style={{ ...styles.navItem, ...(i === 0 ? styles.navActive : {}) }}>
              {item}
            </div>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>OPS · BENGALURU</div>
            <h1 style={styles.h1}>Command center</h1>
          </div>
          <div style={styles.live}>Live · 142 active orders</div>
        </header>

        <section style={styles.stats}>
          {[
            { label: 'Orders / hr', value: '86', tone: color.textPrimary },
            { label: 'SLA breach', value: '2.1%', tone: color.warning },
            { label: 'KYC queue', value: '14', tone: color.primary },
            { label: 'Compliance blocks', value: '3', tone: color.error },
          ].map((s) => (
            <div key={s.label} style={styles.stat}>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={{ ...styles.statValue, color: s.tone }}>{s.value}</div>
            </div>
          ))}
        </section>

        <div style={styles.grid}>
          <section style={styles.panel}>
            <h2 style={styles.h2}>Needs attention</h2>
            {[
              'Store license expiring in 5 days — Indiranagar Cellars',
              'Dry-day calendar sync pending for Karnataka',
              'Dispatch starvation zone: HSR Layout',
            ].map((item) => (
              <div key={item} style={styles.alert}>
                {item}
              </div>
            ))}
          </section>

          <section style={styles.panel}>
            <h2 style={styles.h2}>Compliance snapshot</h2>
            <div style={styles.compRow}>
              <span>Age-gate pass rate</span>
              <strong>99.2%</strong>
            </div>
            <div style={styles.compRow}>
              <span>Doorstep ID checks</span>
              <strong>100%</strong>
            </div>
            <div style={styles.compRow}>
              <span>Sale-hour blocks today</span>
              <strong>11</strong>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    background: '#F4F6FB',
    color: '#1C1C1C',
    fontFamily: fontFamily.sansFallback,
  },
  sidebar: {
    borderRight: '1px solid #EBEBEB',
    background: '#FFFFFF',
    padding: space[24],
  },
  brand: {
    color: '#0C831F',
    fontSize: 20,
    fontWeight: 900,
    marginBottom: space[32],
  },
  nav: { display: 'flex', flexDirection: 'column', gap: 4 },
  navItem: {
    padding: '10px 12px',
    borderRadius: radius.md,
    color: '#666666',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  navActive: {
    background: '#E8F7EC',
    color: '#0C831F',
    fontWeight: 800,
  },
  main: { padding: space[32] },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: space[24],
  },
  eyebrow: {
    color: '#0C831F',
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1,
  },
  h1: { margin: '4px 0 0', fontSize: 26, fontWeight: 900, color: '#1C1C1C' },
  live: {
    color: '#0C831F',
    fontWeight: 800,
    fontSize: 13,
    background: '#E8F7EC',
    padding: '6px 12px',
    borderRadius: 999,
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: space[12],
    marginBottom: space[24],
  },
  stat: {
    background: '#FFFFFF',
    border: '1px solid #EBEBEB',
    borderRadius: radius.md,
    padding: space[16],
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  },
  statLabel: { color: '#666666', fontSize: 12, fontWeight: 600 },
  statValue: { marginTop: 8, fontSize: 26, fontWeight: 900, fontVariantNumeric: 'tabular-nums' },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: space[16],
  },
  panel: {
    background: '#FFFFFF',
    border: '1px solid #EBEBEB',
    borderRadius: radius.md,
    padding: space[24],
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  },

  h2: {
    margin: `0 0 ${space[16]}px`,
    fontSize: 16,
    fontWeight: 800,
    color: '#1C1C1C',
  },
  alert: {
    padding: '12px 0',
    borderBottom: '1px solid #EBEBEB',
    color: '#1C1C1C',
    fontSize: 13,
    fontWeight: 600,
  },
  compRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #EBEBEB',
    color: '#666666',
    fontSize: 13,
    fontWeight: 600,
  },
};


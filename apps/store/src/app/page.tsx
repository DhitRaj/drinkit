'use client';

import { color, space, type as typeTokens, radius, fontFamily } from '@/lib/tokens';

const ORDERS = [
  { id: 'DK-1042', items: 3, total: '₹2,148', eta: '12 min', status: 'NEW' },
  { id: 'DK-1041', items: 1, total: '₹899', eta: 'Packing', status: 'ACCEPTED' },
  { id: 'DK-1038', items: 2, total: '₹1,430', eta: 'Ready', status: 'READY' },
];

export default function StoreHomePage() {
  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>Drinkit</div>
        <nav style={styles.nav}>
          {['Orders', 'Inventory', 'Pricing', 'Payouts', 'Settings'].map((item, i) => (
            <div key={item} style={{ ...styles.navItem, ...(i === 0 ? styles.navActive : {}) }}>
              {item}
            </div>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>STORE LIVE</div>
            <h1 style={styles.h1}>Koramangala Wine Cellar</h1>
          </div>
          <div style={styles.storeOpen}>Open · Sale hours OK</div>
        </header>

        <section style={styles.stats}>
          {[
            { label: 'Today orders', value: '28' },
            { label: 'Acceptance', value: '96%' },
            { label: 'GMV', value: '₹42,180' },
            { label: 'Pending pack', value: '3' },
          ].map((s) => (
            <div key={s.label} style={styles.stat}>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statValue}>{s.value}</div>
            </div>
          ))}
        </section>

        <h2 style={styles.h2}>Incoming orders</h2>
        <div style={styles.list}>
          {ORDERS.map((o) => (
            <div key={o.id} style={styles.order}>
              <div>
                <div style={styles.orderId}>{o.id}</div>
                <div style={styles.orderMeta}>
                  {o.items} items · {o.total}
                </div>
              </div>
              <div style={styles.orderRight}>
                <span style={styles.pill}>{o.status}</span>
                <span style={styles.eta}>{o.eta}</span>
                {o.status === 'NEW' ? (
                  <div style={styles.actions}>
                    <button style={styles.accept}>Accept</button>
                    <button style={styles.reject}>Reject</button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
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
    fontSize: 24,
    fontWeight: 900,
    marginBottom: space[32],
  },
  nav: { display: 'flex', flexDirection: 'column', gap: 4 },
  navItem: {
    padding: '12px 14px',
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
  h1: {
    margin: '4px 0 0',
    fontSize: 26,
    fontWeight: 900,
    color: '#1C1C1C',
  },
  storeOpen: {
    color: '#0C831F',
    fontSize: 13,
    fontWeight: 800,
    background: '#E8F7EC',
    padding: '6px 12px',
    borderRadius: 999,
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: space[12],
    marginBottom: space[32],
  },
  stat: {
    background: '#FFFFFF',
    border: '1px solid #EBEBEB',
    borderRadius: radius.md,
    padding: space[16],
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  },
  statLabel: { color: '#666666', fontSize: 12, fontWeight: 600 },
  statValue: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: 900,
    color: '#1C1C1C',
    fontVariantNumeric: 'tabular-nums',
  },
  h2: {
    margin: `0 0 ${space[16]}px`,
    fontSize: 18,
    fontWeight: 800,
    color: '#1C1C1C',
  },
  list: { display: 'flex', flexDirection: 'column', gap: space[12] },
  order: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #EBEBEB',
    borderRadius: radius.md,
    padding: space[16],
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  },
  orderId: { fontWeight: 800, fontSize: 16, color: '#1C1C1C' },
  orderMeta: { color: '#666666', fontSize: 13, marginTop: 4 },
  orderRight: { display: 'flex', alignItems: 'center', gap: 12 },
  pill: {
    background: '#E8F7EC',
    color: '#0C831F',
    fontSize: 11,
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: radius.pill,
  },
  eta: { color: '#666666', fontSize: 13, fontWeight: 600 },
  actions: { display: 'flex', gap: 8 },
  accept: {
    background: '#0C831F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: radius.pill,
    padding: '10px 18px',
    fontWeight: 800,
    cursor: 'pointer',
  },
  reject: {
    background: 'transparent',
    color: color.error,
    border: `1.5px solid ${color.error}`,
    borderRadius: radius.pill,
    padding: '10px 16px',
    fontWeight: 700,
    cursor: 'pointer',
  },
};


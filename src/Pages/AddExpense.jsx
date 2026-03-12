import { useState, useEffect, useCallback } from "react";
import Logo from "../Components/Logo";
import Header from "../Components/Header";
import { toast } from "react-toastify";

// ─── Constants ────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: "Food", label: "🍜 Food", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { value: "Travel", label: "✈️ Travel", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  { value: "Marketing", label: "📢 Marketing", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  { value: "Utilities", label: "⚡ Utilities", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { value: "Other", label: "📦 Other", color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
];

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD", "CHF", "SGD", "AED"];

const getCategoryMeta = (val) => CATEGORIES.find(c => c.value === val) || CATEGORIES[4];

// ─── ExpenseForm ──────────────────────────────────────────────────────────
function ExpenseForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) e.amount = "Enter a valid amount";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ id: Date.now(), name: name.trim(), amount: parseFloat(amount), category });
    setName(""); setAmount(""); setCategory("Food"); setErrors({});
    toast.success("Expense added successfully");
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Add Expense</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      </div>
      <div className="card-body">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Expense Name</label>
            <input
              className={`form-input${errors.name ? " error" : ""}`}
              placeholder="e.g. Dinner at Nobu"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({...p, name: ""})); }}
              onKeyDown={handleKey}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount (USD)</label>
              <input
                className={`form-input${errors.amount ? " error" : ""}`}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={e => { setAmount(e.target.value); setErrors(p => ({...p, amount: ""})); }}
                onKeyDown={handleKey}
              />
              {errors.amount && <span className="error-msg">{errors.amount}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            + Log Expense
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SummaryPanel ─────────────────────────────────────────────────────────
function SummaryPanel({ expenses }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const count = expenses.length;
  const avg = count ? total / count : 0;

  const byCategory = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses.filter(e => e.category === cat.value).reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.total > 0);

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Overview</span>
      </div>
      <div className="card-body">
        <div className="summary-total-label">Total Spent</div>
        <div className="summary-total-amount">
          ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="summary-stats">
          <div className="stat-box">
            <div className="stat-label">Entries</div>
            <div className="stat-value">{count}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Avg / Entry</div>
            <div className="stat-value">${avg.toFixed(2)}</div>
          </div>
        </div>
        {byCategory.length > 0 && (
          <>
            <div className="card-title" style={{marginBottom: 12}}>By Category</div>
            <div className="category-list">
              {byCategory.map(cat => (
                <div key={cat.value} className="category-row">
                  <div className="category-row-header">
                    <span className="category-dot-name">
                      <span className="category-dot" style={{background: cat.color}} />
                      {cat.value}
                    </span>
                    <span className="category-amount">
                      ${cat.total.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div>
                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{
                        width: `${(cat.total / total) * 100}%`,
                        background: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── CurrencyConverter ────────────────────────────────────────────────────
function CurrencyConverter({ totalUSD }) {
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRate = useCallback(async (currency) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${currency}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRate(data.rates[currency]);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch ( err ) {
      console.error(err);
      setError("Live rate unavailable. Using cached fallback.");
      // Fallback rates
      const fallback = { EUR: 0.92, GBP: 0.79, INR: 83.2, JPY: 149.5, CAD: 1.36, AUD: 1.53, CHF: 0.90, SGD: 1.34, AED: 3.67 };
      setRate(fallback[currency] ?? 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRate(targetCurrency); }, [targetCurrency, fetchRate]);

  const converted = rate ? (totalUSD * rate).toFixed(2) : null;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Currency Preview</span>
        <span className="api-status">
          <span className={`api-status-dot ${loading ? "loading" : error ? "error" : "live"}`} />
          <span style={{color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 10}}>
            {loading ? "FETCHING" : error ? "FALLBACK" : "LIVE"}
          </span>
        </span>
      </div>
      <div className="card-body">
        {error && (
          <div className="error-banner" style={{marginBottom: 14}}>
            <span>⚠</span> {error}
          </div>
        )}
        <div className="converter-row">
          <span className="converter-label">Convert to</span>
          <select
            className="currency-select"
            value={targetCurrency}
            onChange={e => setTargetCurrency(e.target.value)}
          >
            {CURRENCIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="converter-result">
          <div className="converter-result-label">Total in {targetCurrency}</div>
          {loading ? (
            <div className="loading-shimmer" style={{width: "60%", margin: "8px auto"}} />
          ) : (
            <div className="converter-result-value">
              {converted !== null
                ? `${targetCurrency === "JPY" || targetCurrency === "INR" ? "¥" : "$"}${parseFloat(converted).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                : "—"}
            </div>
          )}
          {lastUpdated && !loading && (
            <div className="converter-rate-info">
              1 USD = {rate?.toFixed(4)} {targetCurrency} · updated {lastUpdated}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ExpenseList ──────────────────────────────────────────────────────────
function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="card" style={{flex: 1}}>
      <div className="card-header">
        <span className="card-title">Expense Log</span>
        <span className="list-count">{expenses.length} entries</span>
      </div>
      <div className="card-body" style={{padding: expenses.length === 0 ? 0 : undefined}}>
        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-text">
              No expenses logged yet.<br />
              Add your first entry using the form.
            </div>
          </div>
        ) : (
          <div className="expense-list-scroll">
            <div className="expense-list">
              {expenses.map(expense => {
                const cat = getCategoryMeta(expense.category);
                return (
                  <div key={expense.id} className="expense-item">
                    <div className="expense-item-icon" style={{background: cat.bg}}>
                      {expense.category === "Food" && "🍜"}
                      {expense.category === "Travel" && "✈️"}
                      {expense.category === "Marketing" && "📢"}
                      {expense.category === "Utilities" && "⚡"}
                      {expense.category === "Other" && "📦"}
                    </div>
                    <div className="expense-item-body">
                      <div className="expense-item-name">{expense.name}</div>
                      <div className="expense-item-category">{expense.category}</div>
                    </div>
                    <div className="expense-item-amount" style={{color: cat.color}}>
                      ${expense.amount.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => toast("Expense removed.", {icon: "🗑️"}) && onDelete(expense.id)}
                      title="Remove expense"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Team lunch", amount: 84.50, category: "Food" },
    { id: 2, name: "Flight to NYC", amount: 320.00, category: "Travel" },
    { id: 3, name: "Google Ads", amount: 150.00, category: "Marketing" },
  ]);

  const addExpense = (expense) => setExpenses(prev => [expense, ...prev]);
  const deleteExpense = (id) => setExpenses(prev => prev.filter(e => e.id !== id));
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      {/* <style>{styles}</style> */}
      <div className="app-wrapper">
        <div className="app-container">
          <header className="app-header">
            <div className="header-left">
              {/* <div className="logo-mark">ET</div> */}
              <div className="w-70">
                {/* <div className="app-title">Expense Tracker</div>
                <div className="app-subtitle">Personal Finance Dashboard</div> */}
                <Logo></Logo>
              </div>
            </div>
            <div className="header-badge">● USD Base Currency</div>
            <Header></Header>
          </header>

          <div className="main-grid">
            <div className="left-col">
              <ExpenseForm onAdd={addExpense} />
              <SummaryPanel expenses={expenses} />
              <CurrencyConverter totalUSD={total} />
            </div>
            <div className="right-col">
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

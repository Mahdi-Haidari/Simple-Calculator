import React, { useState, useEffect } from "react";

export default function CalculatorApp() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("calc_history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("calc_history", JSON.stringify(history));
  }, [history]);

  
  const handleInput = (value) => {
    setDisplay((prev) => prev + value);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      if (!display) return;
      
      const result = new Function(`return ${display}`)();
      
      if (result === undefined || isNaN(result)) {
        setDisplay("خطا");
        return;
      }

      setHistory([`${display} = ${result}`, ...history]);
      setDisplay(String(result));
    } catch (error) {
      setDisplay("خطا");
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ماشین حساب هوشمند (React Calc)</h1>

      <div style={styles.mainLayout}>
        <div style={styles.calcBox}>
          <div style={styles.screen}>{display || "0"}</div>

          <div style={styles.buttonGrid}>
            <button onClick={handleClear} style={{ ...styles.btn, ...styles.clearBtn }}>C</button>
            <button onClick={handleBackspace} style={{ ...styles.btn, ...styles.actionBtn }}>⌫</button>
            <button onClick={() => handleInput("/")} style={{ ...styles.btn, ...styles.actionBtn }}>/</button>
            <button onClick={() => handleInput("*")} style={{ ...styles.btn, ...styles.actionBtn }}>×</button>

            <button onClick={() => handleInput("7")} style={styles.btn}>7</button>
            <button onClick={() => handleInput("8")} style={styles.btn}>8</button>
            <button onClick={() => handleInput("9")} style={styles.btn}>9</button>
            <button onClick={() => handleInput("-")} style={{ ...styles.btn, ...styles.actionBtn }}>-</button>

            <button onClick={() => handleInput("4")} style={styles.btn}>4</button>
            <button onClick={() => handleInput("5")} style={styles.btn}>5</button>
            <button onClick={() => handleInput("6")} style={styles.btn}>6</button>
            <button onClick={() => handleInput("+")} style={{ ...styles.btn, ...styles.actionBtn }}>+</button>

            <button onClick={() => handleInput("1")} style={styles.btn}>1</button>
            <button onClick={() => handleInput("2")} style={styles.btn}>2</button>
            <button onClick={() => handleInput("3")} style={styles.btn}>3</button>
            <button onClick={handleCalculate} style={{ ...styles.btn, ...styles.equalBtn, gridRow: "span 2" }}>=</button>

            <button onClick={() => handleInput("0")} style={{ ...styles.btn, gridColumn: "span 2" }}>0</button>
            <button onClick={() => handleInput(".")} style={styles.btn}>.</button>
          </div>
        </div>

        <div style={styles.historyBox}>
          <div style={styles.historyHeader}>
            <h3 style={styles.historyTitle}>تاریخچه</h3>
            {history.length > 0 && (
              <button onClick={clearHistory} style={styles.clearHistoryBtn}>حذف همه</button>
            )}
          </div>
          
          <div style={styles.historyList}>
            {history.length === 0 ? (
              <p style={styles.emptyText}>هیچ محاسباتی انجام نشده است.</p>
            ) : (
              history.map((item, index) => (
                <div key={index} style={styles.historyItem}>{item}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "750px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Tahoma, Arial, sans-serif",
    direction: "rtl",
    backgroundColor: "#f1f5f9",
    borderRadius: "16px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#334155",
    fontSize: "22px",
    marginBottom: "25px",
  },
  mainLayout: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "20px",
  },
  calcBox: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  },
  screen: {
    backgroundColor: "#0f172a",
    color: "#38bdf8",
    padding: "15px",
    borderRadius: "8px",
    fontSize: "24px",
    textAlign: "left",
    direction: "ltr",
    minHeight: "35px",
    overflowX: "auto",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  btn: {
    padding: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#334155",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  clearBtn: {
    backgroundColor: "#ef4444",
  },
  actionBtn: {
    backgroundColor: "#475569",
    color: "#38bdf8",
  },
  equalBtn: {
    backgroundColor: "#0ea5e9",
  },
  historyBox: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
  },
  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "10px",
    marginBottom: "15px",
  },
  historyTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#475569",
  },
  clearHistoryBtn: {
    background: "none",
    border: "none",
    color: "#ef4444",
    fontSize: "12px",
    cursor: "pointer",
  },
  historyList: {
    flex: 1,
    overflowY: "auto",
    maxHeight: "260px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  historyItem: {
    backgroundColor: "#f8fafc",
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#64748b",
    textAlign: "left",
    direction: "ltr",
  },
  emptyText: {
    textAlign: "center",
    color: "#94a3b8",
    fontStyle: "italic",
    fontSize: "13px",
    marginTop: "20px",
  },
};

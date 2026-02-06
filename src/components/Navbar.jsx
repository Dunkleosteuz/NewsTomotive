import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    console.log("I am the constructor and I will be the first to run");

    const membership = typeof props.membership === "boolean" ? props.membership : false;
    const baseTitle = typeof props.title === "string" ? props.title : "NewsTomotive 📰";
    this.state = {
      membership,
      title: membership ? `${baseTitle} — Membership ✨` : baseTitle,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("I am getDerivedStateFromProps and I will be the second to run");
    const nextMembership = typeof nextProps.membership === "boolean" ? nextProps.membership : false;
    const nextBaseTitle = typeof nextProps.title === "string" ? nextProps.title : "NewsTomotive 📰";

    const prevBaseTitle = prevState.title.replace(" — Membership ✨", "");

    if (nextMembership !== prevState.membership || nextBaseTitle !== prevBaseTitle) {
      const newTitle = nextMembership ? `${nextBaseTitle} — Membership ✨` : nextBaseTitle;
      return { membership: nextMembership, title: newTitle };
    }
    return null;
  }

  render() {
    const { membership, title } = this.state;

    const navbarStyle = {
      padding: "12px 20px",
      background: membership ? "linear-gradient(90deg,#ffad77,#ff8566)" : "linear-gradient(90deg,#ffc857,#7dd87d)",
      position: "relative",
      boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
      backdropFilter: "saturate(140%) blur(8px)",
      borderBottom: "1px solid rgba(255,255,255,0.2)",
    };

    const contentStyle = {
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      gap: 12,
      minHeight: 56,
      maxWidth: 1200,
      margin: "0 auto",
    };

    const titleStyle = {
      margin: 0,
      color: "#fff",
      fontSize: 20,
      whiteSpace: "nowrap",
      textAlign: "center",
      justifySelf: "center",
      letterSpacing: 0.2,
      fontWeight: 800,
    };

    const navLinksStyle = {
      display: "flex",
      gap: 16,
      alignItems: "center",
    };

    const linkStyle = {
      color: "#fff",
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      textShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: "inline-block",
      position: "relative",
    };

    const badgeStyle = {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: 12,
      fontSize: 12,
      color: "#fff",
      background: membership ? "linear-gradient(90deg,#ffb366,#ff9b9d)" : "rgba(255,255,255,0.4)",
      marginLeft: 8,
      fontWeight: 600,
    };

    const memberButtonStyle = {
      padding: "8px 14px",
      borderRadius: 20,
      background: membership ? "linear-gradient(90deg,#ffb366,#ff9b9d)" : "rgba(255,255,255,0.3)",
      border: "1px solid rgba(255,255,255,0.5)",
      color: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      transition: "all 0.3s",
      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
    };

    return (
      <nav className="navbar" style={navbarStyle}>
        <div className="navbar-content" style={contentStyle}>
          <div style={{ ...navLinksStyle, justifySelf: "start" }}>
            <Link
              to="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
                e.currentTarget.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.15))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.filter = "drop-shadow(0 0 0 rgba(0,0,0,0))";
              }}
            >
              Beranda
            </Link>
            <Link
              to="/mobil"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
                e.currentTarget.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.15))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.filter = "drop-shadow(0 0 0 rgba(0,0,0,0))";
              }}
            >
              🚗 Mobil
            </Link>
            <Link
              to="/motor"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
                e.currentTarget.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.15))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.filter = "drop-shadow(0 0 0 rgba(0,0,0,0))";
              }}
            >
              🏍️ Motor
            </Link>
          </div>
          <h2 style={titleStyle}>
            {title}
            {membership && <span style={badgeStyle}>MEMBER</span>}
          </h2>
          <div style={{ ...navLinksStyle, justifySelf: "end" }}>
            <button onClick={this.props.toggleMembership} style={memberButtonStyle}>
              {membership ? "Active ✨" : "Join ⭐"}
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

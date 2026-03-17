function Login() {
  return (
    <section style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1>Admin Login</h1>

      <form className="admin-form">
        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;

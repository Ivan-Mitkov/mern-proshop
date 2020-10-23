import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./components/layout";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <Router>
      <Layout>
        <main className="py-3">
          <Container>
            <HomeScreen />
          </Container>
        </main>
      </Layout>
    </Router>
  );
}

export default App;

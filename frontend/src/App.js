import React from "react";
import { Container } from "react-bootstrap";
import Layout from "./components/layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <main className="py-3">
          <Container>
            <h1>Pro Com</h1>
          </Container>
        </main>
      </Layout>
    </div>
  );
}

export default App;

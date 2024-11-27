import React from "react";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";  // Link to navigate to other pages

function LandingPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-banner bg-primary text-white text-center py-5">
        <Container>
          <h1>Welcome to Our Blog System</h1>
          <p>Stay updated with the latest trends and insights from various topics.</p>
          <Button as={Link} to="/about" variant="light" size="lg">
            Learn More
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <Container>
          <h2 className="text-center mb-4">Why Choose Our Blog System?</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Easy to Use</Card.Title>
                  <Card.Text>
                    Our platform is user-friendly and easy to navigate, perfect for everyone.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Variety of Topics</Card.Title>
                  <Card.Text>
                    Explore blogs across various categories like Technology, Lifestyle, and more.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Engage with Writers</Card.Title>
                  <Card.Text>
                    Interact with blog authors through comments, and stay updated on their latest posts.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="recent-posts bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Recent Blog Posts</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
                <Card.Body>
                  <Card.Title>Blog Title 1</Card.Title>
                  <Card.Text>
                    A brief description of the blog post. This is where you can give a summary.
                  </Card.Text>
                  <Button as={Link} to="/blog/1" variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
                <Card.Body>
                  <Card.Title>Blog Title 2</Card.Title>
                  <Card.Text>
                    A brief description of the blog post. This is where you can give a summary.
                  </Card.Text>
                  <Button as={Link} to="/blog/2" variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
                <Card.Body>
                  <Card.Title>Blog Title 3</Card.Title>
                  <Card.Text>
                    A brief description of the blog post. This is where you can give a summary.
                  </Card.Text>
                  <Button as={Link} to="/blog/3" variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={6}>
              <p>&copy; 2024 Blog System. All Rights Reserved.</p>
            </Col>
            <Col md={6} className="text-right">
              <Link to="/contact" className="text-white">Contact Us</Link> | 
              <a href="https://facebook.com" className="text-white ml-2">Facebook</a> | 
              <a href="https://twitter.com" className="text-white ml-2">Twitter</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default LandingPage;

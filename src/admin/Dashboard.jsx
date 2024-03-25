import React from 'react'
import {Container, Row, Col} from 'reactstrap'

const Dashboard = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="revenue_box">
              <h5>Total Sales</h5>
              <span>$7890</span>
            </div>
          </Col>
          <Col lg='3'>
          <div className="order_box">
              <h5>Orders</h5>
              <span>789</span>
            </div>
          </Col>
          <Col lg='3'>
          <div className="products_box">
              <h5>Total Products</h5>
              <span>755</span>
            </div>
          </Col>
          <Col lg='3'>
          <div className="users_box">
              <h5>Total Users</h5>
              <span>78</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Dashboard
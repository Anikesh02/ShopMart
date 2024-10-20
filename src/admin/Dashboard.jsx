import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import useGetData from '../custom-hooks/useGetData'
import '../styles/dashboard.css'

const Dashboard = () => {

  const {data: products} = useGetData('products')
  const {data: users} = useGetData('users')

  return (
    <Helmet title="Dashboard">
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
              <span>{products.length}</span>
            </div>
          </Col>
          <Col lg='3'>
          <div className="users_box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </Helmet>
  )
}

export default Dashboard
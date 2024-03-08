import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import {Container, Row, Col} from 'reactstrap'
import HeroImg from '../assets/images/hero-img.png'
import '../styles/home.css'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import Services from '../services/Services'

const Home = () => {

  const year = new Date().getFullYear()

  return <Helmet title={"Home"}>
    <section className="hero_section">
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero_content">
              <p className="hero_subtitle">Trending product in {year}</p>
              <h2>Make Your Interior More Minimalistic & Modern</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi suscipit quaerat ipsam, cumque deserunt ut aliquam obcaecati sit facere deleniti!</p>
              <motion.button whileTap={{scale: 1.2}} className="buy_btn"><Link to='/shop'>SHOP NOW</Link></motion.button>
            </div>
          </Col>

          <Col lg='6' md='6'>
            <div className="hero_img">
              <img src={HeroImg} alt="" />
            </div>
          </Col>

        </Row>
      </Container>
    </section>

    <Services />
    </Helmet>;
  
}

export default Home
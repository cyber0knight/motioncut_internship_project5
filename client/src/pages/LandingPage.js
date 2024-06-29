import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import './styles.css'
import items from '../images/items.png'

export default function LandingPage() {
  return (
    <div className='LandingPage'>
      <Header type="login" />
        <div className='lanPageContent'>
          <div className=''>
            <h1>AMBITES</h1>
            <h4 className='text-decoration-underline'>* Online Tiffins</h4>
            <h4>* Deliciousness delivered to your doorstep!</h4>
            <h4>* Savor the taste of home-cooked goodness.</h4>
          </div>
          <img src={items} alt='' />
        </div>
      <Footer />
    </div>
  )
}

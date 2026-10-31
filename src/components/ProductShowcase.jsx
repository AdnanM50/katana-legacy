import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProductShowcase.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    name: 'Handgeschmiedetes Dragon KATANA',
    price: '119.99',
    image: '/images/katana-dragon.png',
    badge: 'Best Seller',
  },
  {
    name: 'Skyward Blade Roronoa Zoro Katana',
    price: '33.99',
    image: '/images/katana-shadow.png',
    badge: null,
  },
  {
    name: 'DerShogun Samurai Sword Set',
    price: '80.00',
    image: '/images/katana-crimson.png',
    badge: 'Limited',
  },
  {
    name: 'Imperial Gold Ceremonial Blade',
    price: '399.99',
    image: '/images/katana-imperial.png',
    badge: 'Premium',
  },
]

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const featuredRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    // Featured product entrance
    gsap.fromTo(featuredRef.current,
      { x: 60, opacity: 0, scale: 0.95 },
      {
        x: 0, opacity: 1, scale: 1, duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    )

    // Product list items stagger
    const items = listRef.current?.querySelectorAll('.product-item')
    if (items) {
      gsap.fromTo(items,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.1, duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 70%',
          }
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="product-showcase" id="shop">
      {/* White card panel — like the reference */}
      <div className="showcase-panel container">
        <div className="showcase-panel__inner">
          {/* Left side: Title + product list */}
          <div className="showcase-left">
            <div className="showcase-header">
              <span className="showcase-kanji">刀</span>
              <div>
                <h2 className="showcase-title">SHOP<br/>KATANA</h2>
                <p className="showcase-explore">explore <span className="arrow">⟶</span></p>
              </div>
            </div>

            {/* Product list */}
            <div ref={listRef} className="product-list">
              {products.slice(1).map((product, i) => (
                <div key={i} className="product-item">
                  <div className="product-item__img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-item__info">
                    <h4 className="product-item__name">{product.name}</h4>
                    <span className="product-item__price">
                      <sup>€</sup>{product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Featured product */}
          <div ref={featuredRef} className="showcase-featured">
            <div className="featured-image">
              <img src={products[0].image} alt={products[0].name} />
              <button className="featured-badge">
                View<br/><strong>DETAILS</strong>
              </button>
            </div>
            <div className="featured-info">
              <h3 className="featured-name">{products[0].name}</h3>
              <span className="featured-price">
                <sup>€</sup>{products[0].price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Smoky cloud background effect */}
      <div className="showcase-clouds" />
    </section>
  )
}


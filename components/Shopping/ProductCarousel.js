import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ProductCarousel() {
  return (
    <section id="product_Carousel">
        <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-bold">
           
            </h2>
            <p className="text-2xl font-medium text-indigo-600">
              
            </p>
          </div>
          <Swiper 
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={32}
            slidesPerView={4}
            pagination= { {
            clickable: true,
             }}
            loop={ true}
             
            >
           
              <SwiperSlide>
                <a href="/product/smart-watch" className="block">
                  <div>
                    <p className="text-xs text-indigo-500">
                      Banana
                    </p>
                    <h5 className="font-bold">
                      Smart Watch
                    </h5>
                  </div>
                  <div className="aspect-w-1 aspect-h-1">
                    <img loading="lazy" alt="Smart Watch" className="object-cover" src="https://images.unsplash.com/photo-1546868871-7041f2a55e12" />
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    $49.99
                  </p>
                </a>
                </SwiperSlide>
                <SwiperSlide>
                <a href="/product/smart-watch" className="block">
                  <div>
                    <p className="text-xs text-indigo-500">
                      Banana
                    </p>
                    <h5 className="font-bold">
                      Smart Watch
                    </h5>
                  </div>
                  <div className="aspect-w-1 aspect-h-1">
                    <img loading="lazy" alt="Smart Watch" className="object-cover" src="https://images.unsplash.com/photo-1546868871-7041f2a55e12" />
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    $49.99
                  </p>
                </a>
                </SwiperSlide>
                <SwiperSlide>
                <a href="/product/smart-watch" className="block">
                  <div>
                    <p className="text-xs text-indigo-500">
                      Banana
                    </p>
                    <h5 className="font-bold">
                      Smart Watch
                    </h5>
                  </div>
                  <div className="aspect-w-1 aspect-h-1">
                    <img loading="lazy" alt="Smart Watch" className="object-cover" src="https://images.unsplash.com/photo-1546868871-7041f2a55e12" />
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    $49.99
                  </p>
                </a>
                </SwiperSlide>
                <SwiperSlide>
                <a href="/product/smart-watch" className="block">
                  <div>
                    <p className="text-xs text-indigo-500">
                      Banana
                    </p>
                    <h5 className="font-bold">
                      Smart Watch
                    </h5>
                  </div>
                  <div className="aspect-w-1 aspect-h-1">
                    <img loading="lazy" alt="Smart Watch" className="object-cover" src="https://images.unsplash.com/photo-1546868871-7041f2a55e12" />
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    $49.99
                  </p>
                </a>
                </SwiperSlide>
     
            <div className="mt-12 swiper-pagination" />
          </Swiper>
        </div>
      </section>
  )
}

export default ProductCarousel
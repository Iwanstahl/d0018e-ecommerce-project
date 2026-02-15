import React from 'react'
import ProductGrid from './ProductGrid';

const LatestCollection = () => {
    const marqueeText = "KLANGWERK STUDIO \u00A0\u00A0 • \u00A0\u00A0 KLANGWERK STUDIO \u00A0\u00A0 • \u00A0\u00A0 KLANGWERK STUDIO \u00A0\u00A0 • \u00A0\u00A0 ";

    return (
        <div className='w-full'>
            {/* MARQUEE SECTION */}
            <div className='bg-(--highlight-color) py-5 overflow-hidden'>
                <div className='animate-marquee whitespace-nowrap flex'>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} className='text-2xl md:text-4xl font-bold text-(--main-text-color) tracking-tighter'>
                            {marqueeText.repeat(4)}
                        </span>
                    ))}
                </div>
            </div>

            {/* PRODUCT GRID SECTION */}
            <div className='my-10 w-full'>
                <ProductGrid limit={10} />
            </div>
        </div>
    )
}

export default LatestCollection
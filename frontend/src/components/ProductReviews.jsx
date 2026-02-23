import React, { useState, useRef, useEffect }from 'react'
import { ratingService } from '../../services/ratingService';
import Title from './Title';
import ReviewComment from './ReviewComment';

const ProductReviews = ({ productData, onRefresh }) => {
    const [hoverScore, setHoverScore] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedScore, setSelectedScore] = useState(0);
    const [comments, setComments] = useState([]);

    const loadComments = async () => {
        if (productData?.product_id) {
            const data = await ratingService.getProductComments(productData.product_id);
            setComments(data);
        }
    };

    const commentsRef = useRef(null);

    const handleStarClick = (score) => {
        setSelectedScore(score);
        setIsModalOpen(true);
    };

    const handleRating = async (score, comment) => {
        try {
            await ratingService.addRating(productData.product_id, score, comment);
            setIsModalOpen(false);
            await loadComments(); 
            onRefresh(); 
        } catch (error) {
            alert(error.message);
        }
    };  

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({ behavior: 'smooth'});
    };

    //Helper func for ratings
    const getProgressWidth = (count) => {
        if (!productData.rating_count) return '0%';
        return `${(count / productData.rating_count) * 100}%`;
    };

    useEffect(() => {
        loadComments();
    }, [productData.product_id])


    return (
        <div className='pt-10'>
        <Title text1={'USER'} text2={'REVIEWS'} />
        
        <div className='flex flex-col md:flex-row gap-12 bg-(--main-text-color) p-8 text-(--second-text-color)'>
            
            {/* STATS: Average rating */}
            <div className='flex flex-col items-center justify-center md:border-r border-(--second-text-color)/10 md:pr-12'>
            <p className='text-[10px] uppercase tracking-widest opacity-50 mb-2'>Average Rating</p>
            <h3 className='text-6xl font-bold'>{productData.average_rating?.toFixed(1) || "0.0"}</h3>
            <div className='flex gap-1 my-3 text-yellow-400'>
                {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.round(productData.average_rating) ? '★' : '☆'}</span>
                ))}
            </div>
            <p 
                onClick={scrollToComments}
                className='text-[10px] uppercase opacity-50'>
                {productData.rating_count} Reviews 
            </p>
            </div>

            {/* DISTRUBTION: 0-5 */}
            <div className='flex-1 space-y-3'>
            {[5, 4, 3, 2, 1].map((score) => (
                <div key={score} className='flex items-center gap-4 text-[10px] font-bold'>
                <span className='w-3'>{score}</span>
                <div className='flex-1 h-1.5 bg-(--second-text-color)/10 overflow-hidden'>
                    <div 
                    className='h-full bg-(--second-text-color) transition-all duration-700' 
                    style={{ width: getProgressWidth(productData.ratings?.[score] || 0) }}
                    ></div>
                </div>
                <span className='w-4 opacity-50'>{productData.ratings?.[score] || 0}</span>
                </div>
            ))}
            </div>

            {/* INTERACTION: VOTE */}
            <div className='md:border-l border-(--second-text-color)/10 md:pl-12 flex flex-col items-center justify-center'>
            <p className='text-[10px] uppercase tracking-widest opacity-50 mb-4 text-center'>
                Rate this product
            </p>
            <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onMouseEnter={() => setHoverScore(star)}
                    onMouseLeave={() => setHoverScore(0)}
                    onClick={() => handleStarClick(star)}
                    className='text-2xl transition-transform hover:scale-125 focus:outline-none'
                >
                    <span className={star <= (hoverScore) ? 'text-yellow-400' : 'text-white/20'}>
                    ★
                    </span>
                </button>
                ))}
            </div>
        </div>
    </div>
    
    {/* COMMENTS */}
    <div ref={commentsRef} className='space-y-6 pt-6 border-t border-(--main-text-color)'>
        <h4 className='text-xs font-bold uppercase tracking-widest mb-6 text-(--main-text-color)'>Customer Comments</h4>
        
        {comments.length > 0 ? (
            comments.filter(r => r.comment).map((item, index) => (
                <div 
                key={index} 
                className='bg-(--main-text-color) p-4 mb-2'>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='flex text-yellow-400 text-[10px]'>
                            {"★".repeat(item.score)}{"☆".repeat(5-item.score)}
                        </div>
                        <span className='text-[10px] font-bold uppercase text-(--second-text-color)'>
                            {item.user?.username || "Guest User"}
                        </span>
                    </div>
                    <p className='text-sm opacity-75 leading-relaxed text-(--second-text-color) '>"{item.comment}"</p>
                    <p className='text-[9px] text-(--second-text-color) opacity-50 mt-1'>
                        {new Date(item.created_at).toLocaleDateString()}
                    </p>
                </div>
            ))
        ) : (
            <p className='text-xs opacity-40 text-(--main-text-color)'>No written reviews yet.</p>
        )}
    </div>

        {/* POP-UP for writing comments */}
        <ReviewComment 
           isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleRating}
            productName={productData.name}
            initialScore={selectedScore}
        />
    </div>
  );
};

export default ProductReviews;

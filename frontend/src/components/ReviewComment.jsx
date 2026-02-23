import React, { useEffect, useState } from 'react'

const ReviewComment = ({ isOpen, onClose, onSave, productName, initialScore }) => {
    const [score, setScore] = useState(initialScore);
    const [comment, setComment] = useState("");
    
    useEffect(() => {
        setScore(initialScore);
    }, [initialScore]);

    if (!isOpen) return null;
  
return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000 flex items-center justify-center p-4">
            <div className="bg-(--main-text-color) text-(--second-text-color) w-full max-w-md p-8 shadow-2xl border border-white/10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold uppercase text-(--second-text-color) tracking-tighter">Add Review</h2>
                        <p className="text-[10px] uppercase text-(--second-text-color) opacity-50 tracking-widest">{productName}</p>
                    </div>
                    <button onClick={onClose} className="text-xl opacity-50 hover:opacity-100">&times;</button>
                </div>

                <div className="space-y-6">
                    {/* Raiting selection */}
                    <div>
                        <label className="text-[10px] uppercase font-bold mb-3 block text-(--second-text-color">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setScore(num)}
                                    className={`text-2xl transition-all ${score >= num ? 'text-yellow-400' : 'text-white/10'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comments */}
                    <div>
                        <label className="text-[10px] uppercase font-bold mb-3 block text-(--second-text-color)">Your Thoughts</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 p-4 text-sm h-32 outline-none focus:border-(--second-text-color)/50 transition-colors resize-none"
                            placeholder="Optional: Tell us what you think about the product..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            onClick={() => {
                                onSave(score, comment);
                                setComment(""); 
                            }}
                            className="w-full bg-(--second-text-color) text-(--main-text-color) py-4 text-xs font-bold uppercase hover:bg-(--hover-color) transition-colors"
                        >
                            Submit Review
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 text-[10px] uppercase font-bold text-(--second-text-color) opacity-50 hover:opacity-100 transition-opacity"
                        >
                            Skip & Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewComment

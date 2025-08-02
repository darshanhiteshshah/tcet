// import React, { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sparkles, ShoppingBag, Zap, Heart, Leaf, PartyPopper, Utensils, GlassWater } from 'lucide-react';
// import { useCart } from '../../context/CartContext'; // Assuming this is the correct path

// // --- Data (ENHANCED with images and prices) ---
// const dishDatabase = new Map([
//     // Swati Snacks
//     ["Panki", { tags: ['food', 'light', 'healthy', 'comfort'], price: 220, imageUrl: 'https://placehold.co/400x300/f97316/white?text=Panki' }],
//     ["Dal Dhokli", { tags: ['food', 'comfort', 'heavy'], price: 250, imageUrl: 'https://placehold.co/400x300/f97316/white?text=Dal+Dhokli' }],
//     ["Cheese Burst Pizza", { tags: ['food', 'celebratory', 'rich', 'heavy'], price: 450, imageUrl: 'https://placehold.co/400x300/f97316/white?text=Pizza' }],
//     // Dakshinayan
//     ["Masala Dosa", { tags: ['food', 'light', 'south-indian', 'breakfast'], price: 180, imageUrl: 'https://placehold.co/400x300/f59e0b/white?text=Dosa' }],
//     ["Idli Sambhar", { tags: ['food', 'light', 'comfort', 'south-indian', 'breakfast'], price: 150, imageUrl: 'https://placehold.co/400x300/f59e0b/white?text=Idli' }],
//     ["Filter Coffee", { tags: ['drink', 'warm', 'caffeine', 'breakfast-drink', 'comfort-drink'], price: 90, imageUrl: 'https://placehold.co/400x300/f59e0b/white?text=Coffee' }],
//     // Saravana Bhavan
//     ["Ghee Roast Dosa", { tags: ['food', 'rich', 'south-indian', 'breakfast'], price: 200, imageUrl: 'https://placehold.co/400x300/eab308/white?text=Ghee+Dosa' }],
//     ["Rava Kesari", { tags: ['food', 'dessert', 'sweet', 'rich'], price: 120, imageUrl: 'https://placehold.co/400x300/eab308/white?text=Kesari' }],
//     ["Masala Chai", { tags: ['drink', 'warm', 'caffeine', 'comfort-drink'], price: 80, imageUrl: 'https://placehold.co/400x300/eab308/white?text=Chai' }],
//     // Pizza By The Bay
//     ["Margherita Pizza", { tags: ['food', 'celebratory', 'rich', 'italian'], price: 550, imageUrl: 'https://placehold.co/400x300/ef4444/white?text=Margherita' }],
//     ["Pasta Alfredo", { tags: ['food', 'rich', 'comfort', 'italian', 'heavy'], price: 480, imageUrl: 'https://placehold.co/400x300/ef4444/white?text=Pasta' }],
//     ["Coca-Cola", { tags: ['drink', 'cold', 'default-drink'], price: 60, imageUrl: 'https://placehold.co/400x300/ef4444/white?text=Coke' }],
//     // Status
//     ["Dal Khichdi", { tags: ['food', 'comfort', 'light', 'healthy'], price: 280, imageUrl: 'https://placehold.co/400x300/84cc16/white?text=Khichdi' }],
//     ["Paneer Butter Masala", { tags: ['food', 'rich', 'celebratory', 'north-indian', 'heavy'], price: 380, imageUrl: 'https://placehold.co/400x300/84cc16/white?text=Paneer' }],
//     ["Garlic Naan", { tags: ['food', 'rich', 'north-indian', 'heavy'], price: 90, imageUrl: 'https://placehold.co/400x300/84cc16/white?text=Naan' }],
//     // Burma Burma
//     ["Burmese Khao Suey", { tags: ['food', 'adventurous', 'rich', 'spicy'], price: 520, imageUrl: 'https://placehold.co/400x300/a855f7/white?text=Khao+Suey' }],
//     ["Samosa Soup", { tags: ['food', 'adventurous', 'light', 'spicy'], price: 320, imageUrl: 'https://placehold.co/400x300/a855f7/white?text=Soup' }],
//     ["Bubble Tea", { tags: ['drink', 'cold', 'adventurous-drink'], price: 250, imageUrl: 'https://placehold.co/400x300/a855f7/white?text=Bubble+Tea' }],
//     // Rajdhani Thali
//     ["Rajdhani Thali", { tags: ['food', 'celebratory', 'rich', 'north-indian', 'heavy'], price: 850, imageUrl: 'https://placehold.co/400x300/f43f5e/white?text=Thali' }],
//     ["Sweet Lassi", { tags: ['drink', 'cold', 'comfort', 'cooling', 'refreshing'], price: 140, imageUrl: 'https://placehold.co/400x300/f43f5e/white?text=Lassi' }],
//     // Elco
//     ["Pani Puri", { tags: ['food', 'adventurous', 'light', 'street-food'], price: 100, imageUrl: 'https://placehold.co/400x300/3b82f6/white?text=Pani+Puri' }],
//     ["Sev Puri", { tags: ['food', 'adventurous', 'light', 'street-food'], price: 110, imageUrl: 'https://placehold.co/400x300/3b82f6/white?text=Sev+Puri' }],
//     ["Fresh Lime Soda", { tags: ['drink', 'cold', 'refreshing', 'default-drink'], price: 90, imageUrl: 'https://placehold.co/400x300/3b82f6/white?text=Soda' }],
// ]);

// // --- AIRecommender Component ---
// const AIRecommender = () => {
//     const { addToCart } = useCart();
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [selectedType, setSelectedType] = useState('food'); // 'food' or 'drink'
//     const [addedItems, setAddedItems] = useState({});

//     const moods = useMemo(() => [
//         { name: 'Comfort', tag: 'comfort', icon: <Heart size={24} />, color: 'bg-rose-500' },
//         { name: 'Healthy', tag: 'healthy', icon: <Leaf size={24} />, color: 'bg-emerald-500' },
//         { name: 'Adventurous', tag: 'adventurous', icon: <Zap size={24} />, color: 'bg-purple-500' },
//         { name: 'Celebratory', tag: 'celebratory', icon: <PartyPopper size={24} />, color: 'bg-yellow-500' },
//     ], []);

//     // Filter dishes based on selected mood AND type
//     const suggestedDishes = useMemo(() => {
//         if (!selectedMood) return [];
//         return Array.from(dishDatabase.entries())
//             .filter(([, details]) => details.tags.includes(selectedMood) && details.tags.includes(selectedType));
//     }, [selectedMood, selectedType]);

//     const handleAddToCart = (dishName, dishDetails) => {
//         const cartItem = {
//             id: dishName,
//             name: dishName,
//             price: dishDetails.price,
//             imageUrl: dishDetails.imageUrl,
//             qty: 1,
//         };
//         addToCart(cartItem);
//         setAddedItems(prev => ({ ...prev, [dishName]: true }));
//         setTimeout(() => {
//             setAddedItems(prev => ({ ...prev, [dishName]: false }));
//         }, 2000);
//     };

//     return (
//         <div className="bg-zinc-900 text-white min-h-screen pt-28 pb-16">
//             <div className="max-w-4xl mx-auto px-6 text-center">
//                 <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                     <Sparkles className="mx-auto h-16 w-16 text-orange-400 mb-4" />
//                     <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500">
//                         Feeling Lost? Let the AI Chef Decide.
//                     </h1>
//                     <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
//                         Tell us your mood, and we'll pick the perfect dish for you from Mumbai's best restaurants.
//                     </p>
//                 </motion.div>

//                 {/* Mood Selection */}
//                 <motion.div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
//                     {moods.map((mood) => (
//                         <motion.button key={mood.name} onClick={() => setSelectedMood(mood.tag)} className={`p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 ${mood.color} ${selectedMood === mood.tag ? 'ring-4 ring-white/80' : 'ring-0'}`} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
//                             {mood.icon}
//                             <span>{mood.name}</span>
//                         </motion.button>
//                     ))}
//                 </motion.div>

//                 {/* Type Selection */}
//                 <AnimatePresence>
//                     {selectedMood && (
//                         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex justify-center gap-4">
//                             <button onClick={() => setSelectedType('food')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${selectedType === 'food' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
//                                 <Utensils size={20} /> Food
//                             </button>
//                             <button onClick={() => setSelectedType('drink')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${selectedType === 'drink' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
//                                 <GlassWater size={20} /> Drinks
//                             </button>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Dish Suggestion Grid */}
//                 <div className="mt-12">
//                     <AnimatePresence>
//                         {suggestedDishes.length > 0 && (
//                             <motion.div
//                                 layout
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
//                                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//                             >
//                                 {suggestedDishes.map(([dishName, dishDetails]) => {
//                                     const isAdded = addedItems[dishName];
//                                     return (
//                                         <motion.div
//                                             layout
//                                             key={dishName}
//                                             variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
//                                             exit={{ opacity: 0, scale: 0.9 }}
//                                             className="bg-zinc-800/50 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col"
//                                         >
//                                             <img src={dishDetails.imageUrl} alt={dishName} className="w-full h-40 object-cover" />
//                                             <div className="p-4 flex flex-col flex-grow">
//                                                 <h3 className="text-xl font-bold text-white">{dishName}</h3>
//                                                 <p className="text-zinc-400 font-semibold mt-1">₹{dishDetails.price.toFixed(2)}</p>
//                                                 <motion.button
//                                                     onClick={() => handleAddToCart(dishName, dishDetails)}
//                                                     className={`mt-4 w-full px-4 py-2 rounded-full font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${isAdded ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}
//                                                     whileTap={{ scale: 0.95 }}
//                                                 >
//                                                     <AnimatePresence mode="wait">
//                                                         <motion.span key={isAdded ? 'added' : 'add'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
//                                                             {isAdded ? 'Added!' : 'Add to Cart'}
//                                                         </motion.span>
//                                                     </AnimatePresence>
//                                                     {!isAdded && <ShoppingBag size={18} />}
//                                                 </motion.button>
//                                             </div>
//                                         </motion.div>
//                                     );
//                                 })}
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AIRecommender;

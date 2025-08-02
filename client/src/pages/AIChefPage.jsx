import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, Zap, Heart, Leaf, PartyPopper, Utensils, GlassWater } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Assuming context is in this path

// --- Data Integration ---
// This is the new, larger dataset with all necessary tags added for the filters to work.
 const mockRestaurantsData = [
    {
        id: '1',
        name: 'Swati Snacks',
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
        description: 'A celebrated spot for authentic Gujarati snacks and classic Mumbai street food.',
        cuisine: 'Street Food',
        priceLevel: 2, // 1 for $, 2 for $$, 3 for $$$
        avgDeliveryTime: 25, // in minutes
        dishes: [
            { id: 'p1', name: 'Pani Puri', description: 'Crispy shells filled with spiced potatoes, chickpeas, and tangy tamarind water.', price: 150, imageUrl: 'https://images.pexels.com/photos/12318206/pexels-photo-12318206.jpeg',tags: ['snack', 'street food', 'adventurous', 'food'] },
            { id: 'p2', name: 'Pav Bhaji', description: 'A flavorful mash of mixed vegetables served with soft, buttered bread rolls.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGF2JTIwYmhhaml8ZW58MHx8MHx8fDA%3D' ,tags: ['snack', 'street food', 'comfort', 'food'] },
            { id: 'p3', name: 'Dahi Batata Puri', description: 'A delightful chaat with puris, potatoes, yogurt, and sweet and spicy chutneys.', price: 180, imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1220,h_915/k%2FPhoto%2FSeries%2F2021-08-a-call-to-chaat%2FCall-to-Chaat_Dahi-Batata-Puri%2F2021-07-28_ATK-3659', tags: ['snack', 'street food', 'comfort', 'adventurous', 'food'] },
            { id: 'p4', name: 'Panki Chatni', description: 'Thin rice pancakes steamed in banana leaves, served with chutney.', price: 170, imageUrl: 'https://assets3.thrillist.com/v1/image/2943946/1584x1056/crop;webp=auto;jpeg_quality=60;progressive.jpg', tags: ['snack', 'street food', 'healthy', 'food'] },
            { id: 'p5', name: 'Fada ni Khichdi', description: 'A wholesome and nutritious porridge made from broken wheat and lentils.', price: 220, imageUrl: 'https://images.pexels.com/photos/6363499/pexels-photo-6363499.jpeg', tags: ['main course', 'comfort', 'healthy', 'food'] },
            { id: 'p6', name: 'Satpadi Roti with Gatta Nu Shaak', description: 'Seven-layered flatbread served with gram flour dumplings in a yogurt-based curry.', price: 280, imageUrl: 'https://images.pexels.com/photos/28579050/pexels-photo-28579050.jpeg',  tags: ['main course', 'vegetarian', 'celebratory', 'food'] }
        ]
    },
    {
        id: '2',
        name: 'Saravana Bhavan',
        rating: 4.6,
        cuisine: 'South Indian',
        priceLevel: 2,
        avgDeliveryTime: 30,
        imageUrl: 'https://media.istockphoto.com/id/915770510/photo/top-view-of-delicious-masala-dosa-paper-roast-or-ghee-roast-popular-in-south-indian-cuisine.jpg?s=1024x1024&w=is&k=20&c=SSdCC7OgIjc2JCZXFT_Xy_iJhgQDJuX7IjbeCwhHAuQ=',
        description: 'A renowned destination for authentic South Indian vegetarian cuisine, famous for its crispy dosas.',
        dishes: [
            { id: 'b1', name: 'Masala Dosa', description: 'A thin, crispy crepe made from fermented rice and lentil batter, filled with spiced potatoes.', price: 220, imageUrl: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/masala-dosa-recipe-2.jpg' ,tags: ['breakfast', 'vegetarian', 'comfort', 'food'] },
            { id: 'b2', name: 'Idli Sambar', description: 'Steamed rice cakes served with a flavorful lentil-based vegetable stew.', price: 180, imageUrl: 'https://images.pexels.com/photos/31199041/pexels-photo-31199041.jpeg', tags: ['breakfast', 'healthy', 'comfort', 'vegetarian', 'food'] },
            { id: 'b3', name: 'Ghee Roast Dosa', description: 'A cone-shaped dosa roasted to perfection with clarified butter (ghee).', price: 250, imageUrl: 'https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D', tags: ['breakfast', 'vegetarian', 'celebratory', 'food'] },
            { id: 'b4', name: 'Rava Kichadi', description: 'A savory South Indian breakfast dish made from semolina, vegetables, and spices.', price: 190, imageUrl: 'https://images.unsplash.com/photo-1630409351211-d62ab2d24da4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2hpY2hkaXxlbnwwfHwwfHx8MA%3D%3D' ,tags: ['breakfast', 'vegetarian', 'comfort', 'food'] },
            { id: 'b5', name: 'Medu Vada', description: 'Crispy, savory doughnuts made from black gram lentils, served with sambar and chutney.', price: 160, imageUrl: 'https://images.unsplash.com/photo-1730191843435-073792ba22bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFkYXxlbnwwfHwwfHx8MA%3D%3D' ,tags: ['snack', 'vegetarian', 'comfort', 'food'] },
            { id: 'b6', name: 'Appam with Coconut Milk', description: 'Lacy, soft-centered rice pancakes served with sweet, aromatic coconut milk.', price: 200, imageUrl: 'https://media.istockphoto.com/id/701198310/photo/appam-palappam-with-mutton-stew-kerala-easter-breakfast.jpg?s=1024x1024&w=is&k=20&c=QytOu8lh42O7GJY1CCxU2unTdvPRhyQ__47ZYjOWiI8=' ,tags: ['breakfast', 'vegetarian', 'celebratory', 'food'] }
        ]
    },
    {
        id: '3',
        name: 'Rajdhani Thali',
        rating: 4.8,
        cuisine: 'Thali',
        priceLevel: 3,
        avgDeliveryTime: 40,
        imageUrl: 'https://media.istockphoto.com/id/1168396740/photo/traditional-food-thali-from-gujarat-india.jpg?s=1024x1024&w=is&k=20&c=ltWliIeILx4I446vbXzNTNmbNP_IA6_xGgJWZgM3_wo=',
        description: 'Specializing in lavish Rajasthani and Gujarati thalis, offering an unlimited feast of traditional dishes.',
        dishes: [
            { id: 's1', name: 'Dal Baati Churma', description: 'A traditional Rajasthani dish of hard wheat rolls, lentils, and sweetened cereal.', price: 450, imageUrl: 'https://media.istockphoto.com/id/1402853466/photo/dal-bati-rajasthani-traditional-vegetarian-food-plat-in-rural-india.jpg?s=1024x1024&w=is&k=20&c=AI_MneA5KdS9V9C6zvfjZ2v68KMr5BBXXLivz-eNcNc=', tags: ['main course', 'vegetarian', 'celebratory', 'comfort', 'food'] },
            { id: 's2', name: 'Gujarati Thali', description: 'A grand platter featuring a variety of vegetarian dishes from Gujarat.', price: 550, imageUrl: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VqYXJhdGklMjB0aGFsaXxlbnwwfHwwfHx8MA%3D%3D',  tags: ['main course', 'vegetarian', 'celebratory', 'food'] },
            { id: 's3', name: 'Paneer Makhani', description: 'Soft paneer cubes simmered in a rich and creamy tomato-based gravy.', price: 350, imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/paneer-makhani-recipe.jpg' ,tags: ['main course', 'vegetarian', 'celebratory', 'comfort', 'food'] },
            { id: 's4', name: 'Khandvi', description: 'Soft, melt-in-your-mouth rolls made from gram flour and yogurt.', price: 210, imageUrl: 'https://images.unsplash.com/photo-1588076186114-a3898e30530d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2hhbmR2aXxlbnwwfHwwfHx8MA%3D%3D', tags: ['snack', 'vegetarian', 'healthy', 'food'] },
            { id: 's5', name: 'Shrikhand', description: 'A sweet dish made of strained yogurt, flavored with saffron and cardamom.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1604442247807-69dd2578ff64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hyaWtoYW5kfGVufDB8fDB8fHww' ,tags: ['dessert', 'vegetarian', 'celebratory', 'food'] },
            { id: 's6', name: 'Gatte ki Sabzi', description: 'Gram flour dumplings cooked in a spicy and tangy yogurt-based curry.', price: 320, imageUrl: 'https://media.istockphoto.com/id/1513582138/photo/rajasthani-gatta-curry-or-besan-ke-gatte-ki-sabzi-gatte-are-gram-flour-roundels-or-chickpea.jpg?s=1024x1024&w=is&k=20&c=2LHlPBGXFLeygwX5edGxeHRbGlsIGsrIMAeCE1JlYnw=', tags: ['main course', 'vegetarian', 'comfort', 'food'] }
        ]
    },
    {
        id: '4',
        name: 'Burma Burma',
        rating: 4.9,
        cuisine: 'Burmese',
        priceLevel: 3,
        avgDeliveryTime: 35,
        imageUrl: 'https://images.unsplash.com/photo-1563245362-7212137021a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVybWVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D',
        description: 'An innovative restaurant offering a unique taste of vegetarian Burmese cuisine, from salads to noodle bowls.',
        dishes: [
            { id: 'bb1', name: 'Samosa Soup', description: 'A tangy and spicy soup with crushed samosas.', price: 320, imageUrl: 'https://plus.unsplash.com/premium_photo-1695297516676-04a259917c03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Ftb3NhfGVufDB8fDB8fHww',tags: ['soup', 'spicy', 'snack', 'adventurous', 'food'] },
            { id: 'bb2', name: 'Khow Suey', description: 'A one-bowl meal of noodles and vegetables in a coconut milk broth.', price: 480, imageUrl: 'https://images.pexels.com/photos/31745183/pexels-photo-31745183.jpeg' ,tags: ['noodles', 'coconut', 'vegetarian', 'adventurous', 'comfort', 'food'] },
            { id: 'bb3', name: 'Tea Leaf Salad', description: 'A refreshing salad made with fermented tea leaves, nuts, and seeds.', price: 410, imageUrl: 'https://plus.unsplash.com/premium_photo-1690489323642-6e057faf3c7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FsYWR8ZW58MHx8MHx8fDA%3D', tags: ['salad', 'healthy', 'fermented', 'adventurous', 'food'] },
            { id: 'bb4', name: 'Tohu Mash with Paratha', description: 'Burmese-style scrambled tofu served with flaky flatbread.', price: 430, imageUrl: 'https://images.pexels.com/photos/6327133/pexels-photo-6327133.jpeg', tags: ['tofu', 'paratha', 'breakfast', 'adventurous', 'comfort', 'food'] },
            { id: 'bb5', name: 'Bubble Tea', description: 'A cold, frothy tea-based drink with chewy tapioca pearls.', price: 300, imageUrl: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnViYmxlJTIwdGVhfGVufDB8fDB8fHww', tags: ['beverage', 'cold', 'tapioca', 'adventurous', 'drink'] },
            { id: 'bb6', name: 'Mandalay Laphet Thoke', description: 'A variation of the tea leaf salad with added crunchy beans and garlic.', price: 420, imageUrl: 'https://media.istockphoto.com/id/1196893919/photo/mandalay-myanmar.webp?a=1&b=1&s=612x612&w=0&k=20&c=VODDicQSEgnTldAx8753mViUBrfFVJj7cLlwxSQAugc=' ,tags: ['salad', 'crunchy', 'beans', 'healthy', 'adventurous', 'food'] }
        ]
    },
    {
        id: '5',
        name: 'Ishaara',
        cuisine: 'North Indian',
        priceLevel: 1,
        avgDeliveryTime: 20,
        rating: 4.5,
        imageUrl: 'https://media.istockphoto.com/id/683031210/photo/glasses-and-plates-on-table-in-restaurant.webp?a=1&b=1&s=612x612&w=0&k=20&c=STQi6mVeDxnmfR1Ejf5IFX8f7asJ4uGX7oiecbsZP_s=',
        description: 'A modern Indian restaurant serving contemporary dishes, from succulent kebabs to rich, slow-cooked dals.',
        dishes: [
            { id: 'i1', name: 'Dahi Ke Kebab', description: 'Soft, melt-in-the-mouth kebabs made from hung curd and spices.', price: 380, imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/dahi-kabab-recipe.jpg' ,  tags: ['kebab', 'vegetarian', 'snack', 'comfort', 'celebratory', 'food'] },
            { id: 'i2', name: 'Dal Haveli', description: 'Their signature slow-cooked black lentils, rich and creamy.', price: 450, imageUrl: 'https://media.istockphoto.com/id/855902314/photo/delicious-spicy-lentil-soup.jpg?s=612x612&w=0&k=20&c=efgW0CNE37ZkBCb7usWtVKgDoy2OFLpTQzmJjxPJFgQ=', tags: ['dal', 'lentils', 'creamy', 'comfort', 'food'] },
            { id: 'i3', name: 'Waterchestnut & Corn Tikki', description: 'Crispy tikkis made with waterchestnut and corn.', price: 360, imageUrl: 'https://media.istockphoto.com/id/2029197201/photo/millet-fast-food-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=R1YaTh2g-BERlXBO6J-boaDKWtEiWkL7IIxqvNXDjJY=' , tags: ['tikki', 'crispy', 'snack', 'comfort', 'food'] },
            { id: 'i4', name: 'Mushroom Galouti', description: 'A vegetarian version of the famous Lucknowi kebab, made with mushrooms.', price: 420, imageUrl: 'https://media.istockphoto.com/id/1437951082/photo/mushroom-pickle.webp?a=1&b=1&s=612x612&w=0&k=20&c=eiYXe3byRZSbyEc9uco-F0F9vlGUedb-iSQces-Y7yg=', tags: ['kebab', 'mushroom', 'vegetarian', 'adventurous', 'food'] },
            { id: 'i5', name: 'Phirni', description: 'A classic slow-cooked Indian sweet pudding made with ground rice, milk and sugar.', price: 280, imageUrl: 'https://media.istockphoto.com/id/1453999382/photo/jhangore-ki-kheer.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZKfcvqfbRZKAAtIaG8dacTEUdzjNJ7crRKgAUBCzyPo=', tags: ['dessert', 'pudding', 'sweet', 'comfort', 'celebratory', 'food'] },
            { id: 'i6', name: 'Ghewar with Rabri', description: 'A disc-shaped sweet cake made with flour, soaked in syrup and topped with rabri.', price: 350, imageUrl: 'https://media.istockphoto.com/id/1412258930/photo/ghevar-sweet.jpg?s=612x612&w=0&k=20&c=kiqsOBtWCfrrwXEGczA-yD9C0gy3wynBaopQi36N0h4=', tags: ['dessert', 'sweet', 'rabri', 'celebratory', 'adventurous', 'food'] }
        ]
    },
    {
        id: '6',
        name: 'Masala Library',
        cuisine: 'Modern Indian',
        rating: 4.8,
        priceLevel: 3,
        avgDeliveryTime: 30,
        imageUrl: 'https://media.istockphoto.com/id/465629937/photo/shop-of-exotic-indian-spices.webp?a=1&b=1&s=612x612&w=0&k=20&c=btoqztHXLeu0gpDolKwtYUyHfKeB7iT8v5Jls-vnlzI=',
        description: 'A pioneer of modern Indian cuisine, deconstructing classic dishes with scientific techniques.',
        dishes: [
            { id: 'ml1', name: 'Jalebi Caviar', description: 'A deconstructed jalebi served as tiny pearls, with saffron-infused rabri foam.', price: 550, imageUrl: 'https://media.istockphoto.com/id/1205549930/photo/jalebi-sweet-indian-food-on-the-street-market.jpg?s=612x612&w=0&k=20&c=1fXWXLa98OJXZoTx99WRgxWm1fyhjANjxOwOB_AXDa8=' , tags: ['dessert', 'jalebi', 'modern', 'adventurous', 'celebratory', 'food'] },
            { id: 'ml2', name: 'Wild Mushroom Chai', description: 'An earthy mushroom consommé poured table-side from a tea kettle over dehydrated mushrooms.', price: 475, imageUrl: 'https://media.istockphoto.com/id/2203687099/photo/oven-baked-pastries-filled-with-chives-and-mushrooms-on-wooden-tray.webp?a=1&b=1&s=612x612&w=0&k=20&c=8CybR5YV-rffu75Hes7EViwmOyYUHxuSoPdJW3ezWh8=',  tags: ['soup', 'mushroom', 'tea', 'adventurous', 'healthy', 'drink'] },
            { id: 'ml3', name: 'Dal Makhani with Naan', description: 'Traditional dal makhani presented in a modern style, often with bite-sized naan.', price: 650, imageUrl: 'https://media.istockphoto.com/id/1461228644/photo/dal-makhani-with-naan.webp?a=1&b=1&s=612x612&w=0&k=20&c=GViojxv1lNOw8RvYoDQNEPtC5MTWoIKN2a-UJUGRhgc=' , tags: ['dal', 'naan', 'modern', 'comfort', 'celebratory', 'food'] },
            { id: 'ml4', name: 'Dahi Bada', description: 'A reimagined dahi bada with aeration and light textures.', price: 425, imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/dahi-vada-recipe.jpg' , tags: ['snack', 'dahi', 'bada', 'comfort', 'adventurous', 'food'] },
            { id: 'ml5', name: 'Khandvi with Mango Chutney', description: 'Delicate gram flour rolls paired with a sweet and tangy mango chutney.', price: 450, imageUrl: 'https://media.istockphoto.com/id/1824026139/photo/gujarati-khandvi-or-patuli-snack.jpg?s=612x612&w=0&k=20&c=NlsZXRiomUibUd_VsvOW074hDZQcAeta9TQkjfZFlYU=',  tags: ['snack', 'khandvi', 'mango', 'healthy', 'adventurous', 'food'] },
            { id: 'ml6', name: 'Chocolate Mousse', description: 'A rich and airy chocolate mousse, often with a unique Indian flavour twist.', price: 500, imageUrl: 'https://media.istockphoto.com/id/180811737/photo/chocolate-mousse.webp?a=1&b=1&s=612x612&w=0&k=20&c=fj5KJR5Pj407xMbTCNFoS0XexS8DNDhNq8-r4HVu1SE=',        tags: ['dessert', 'chocolate', 'mousse', 'celebratory', 'comfort', 'food'] }
        ]
    },
    {
        id: '7',
        name: 'Punjab Grill',
        cuisine: 'North Indian',
        priceLevel: 2,
        avgDeliveryTime: 25,
        rating: 4.6,
        imageUrl: 'https://media.istockphoto.com/id/1365548297/photo/spicy-indian-chicken-tikka-masala-served-at-an-expensive-fine-dining-restaurant.webp?a=1&b=1&s=612x612&w=0&k=20&c=lJGnsgO0awAFYxuEZoWvrxcNVRcsctmFlohSyRaNHKs=',
        description: 'Celebrating North Indian culinary heritage with robust flavors, specializing in tandoori delicacies.',
        dishes: [
            { id: 'pg1', name: 'Paneer Tikka Multani', description: 'Cottage cheese marinated in a rich blend of cream, gram flour, and ajwain.', price: 450, imageUrl: 'https://media.istockphoto.com/id/1257759778/photo/delicious-indian-cuisine-set-wallpaper-background-flatlay.webp?a=1&b=1&s=612x612&w=0&k=20&c=NCIZngrUoISxIX4EU40THw1jgK-yBhzsc679dKF1SuY=', tags: ['celebratory', 'comfort', 'food'] },
            { id: 'pg2', name: 'Dal Makhani', description: 'Slow-cooked black lentils in a rich, buttery, and creamy tomato gravy.', price: 425, imageUrl: 'https://media.istockphoto.com/id/1170374719/photo/dal-makhani-at-dark-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=FWHhW6SnrLvmwaR-APN3pIxEjLJe073-PQ0cfvOGoTI=', tags: ['comfort', 'celebratory', 'food'] },
            { id: 'pg3', name: 'Veg Kolhapuri', description: 'A spicy mixed vegetable curry with a rich, dark, coconut-based gravy.', price: 475, imageUrl: 'https://media.istockphoto.com/id/1278584350/photo/veg-kolhapuri-in-black-bowl-on-dark-slate-table-top-indian-vegetable-curry-dish-vegetarian.webp?a=1&b=1&s=612x612&w=0&k=20&c=O9tXE4uFBKx4VfIKKNnQDzAc28CaCeobaPxrPFAAAWE=', tags: ['adventurous', 'spicy', 'food'] },
            { id: 'pg4', name: 'Amritsari Kulcha', description: 'Crisp, flaky bread stuffed with spiced potatoes and served with chana masala.', price: 350, imageUrl: 'https://media.istockphoto.com/id/1432760289/photo/aloo-paratha-or-potato-stuffed-flat-bread-on-a-wooden-background-served-with-curd-and-sauce.jpg?b=1&s=612x612&w=0&k=20&c=FbAwBi7Kk_N4MLqN7Gnr1rmb6XzAPwZzvgMaNR_r-DA=', tags: ['comfort', 'food'] },
            { id: 'pg5', name: 'Garlic Naan', description: 'Soft Indian flatbread topped with garlic and butter, cooked in a tandoor.', price: 150, imageUrl: 'https://media.istockphoto.com/id/1140752821/photo/indian-naan-bread-with-garlic-butter-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=lOeYboRNvwONnykKUu7lN-UQg5c0cl0CKfDFiVFfhBk=', tags: ['comfort', 'food'] },
            { id: 'pg6', name: 'Kesar Pista Lassi', description: 'A refreshing yogurt drink flavored with saffron and pistachios.', price: 250, imageUrl: 'https://images.pexels.com/photos/14509267/pexels-photo-14509267.jpeg', tags: ['celebratory', 'comfort', 'drink'] }
        ]
    },
    {
        id: '8',
        name: 'Mainland China',
        cuisine: 'Chinese',
        rating: 4.5,
        priceLevel: 2,
        avgDeliveryTime: 30,
        imageUrl: 'https://images.unsplash.com/photo-1754008238898-e54a875f6683?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFpbmxhbmQlMjBDaGluYSUyME1haW5sYW5kJTIwQ2hpbmElMjByZXN0cmF1bnR8ZW58MHx8Mnx8fDA%3D',
        description: 'A premier destination for authentic Chinese cuisine, from spicy Sichuan flavors to classic Hakka noodles.',
        dishes: [
            { id: 'mc1', name: 'Veg Manchow Soup', description: 'A spicy and sour soup with chopped vegetables, topped with crispy noodles.', price: 280, imageUrl: 'https://media.istockphoto.com/id/1494080616/photo/veg-manchow-soup-in-black-bowl-on-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=n2ADXERvDw8blc94JaRwM0DIV_gsdT9bIcKfMEkEYYw=', tags: ['soup', 'comfort', 'adventurous', 'food'] },
            { id: 'mc2', name: 'Corn and Water Chestnut Dumplings', description: 'Steamed dumplings filled with a crunchy mix of sweet corn and water chestnut.', price: 450, imageUrl: 'https://media.istockphoto.com/id/687516462/photo/dumpling.webp?a=1&b=1&s=612x612&w=0&k=20&c=dNKQmu0SgEkbDD4hB4k1lm55O9jgkxUpjOGpDDt9_0E=', tags: ['snack', 'healthy', 'comfort', 'food'] },
            { id: 'mc3', name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with a mix of fresh vegetables in a savory sauce.', price: 380, imageUrl: 'https://media.istockphoto.com/id/1292637257/photo/veg-hakka-noodles-a-popular-oriental-dish-made-with-noodles-and-vegetables-served-over-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=0xbbDCOhb_rLXHueLmoc0zBzmE8FR7xrDyvjflUlEQ8=', tags: ['main course', 'comfort', 'food'] },
            { id: 'mc4', name: 'Veg Manchurian Gravy', description: 'Deep-fried vegetable balls in a savory, sweet, and tangy gravy.', price: 420, imageUrl: 'https://media.istockphoto.com/id/1497707561/photo/veg-manchurian-in-a-bowl-closeup-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=6sC_ApLY-GVtj1Uc7PSzHmnBZsCiXqMF0xZlWahUv70=', tags: ['main course', 'comfort', 'adventurous', 'food'] },
            { id: 'mc5', name: 'Honey Chilli Potato', description: 'Crispy fried potatoes tossed in a sweet and spicy honey-chilli sauce.', price: 350, imageUrl: 'https://media.istockphoto.com/id/1453142161/photo/full-frame-image-of-deep-fried-potato-french-fry-chips-side-dish-red-chillis-and-sliced.webp?a=1&b=1&s=612x612&w=0&k=20&c=Qi_mdDB-0pCZ5xtVt4LYPsTaxoVM8TAEmdQoaLcyIoo=', tags: ['snack', 'adventurous', 'comfort', 'food'] },
            { id: 'mc6', name: 'Date Pancakes with Ice Cream', description: 'Warm, sweet date-filled pancakes served with a scoop of vanilla ice cream.', price: 320, imageUrl: 'https://images.pexels.com/photos/718739/pexels-photo-718739.jpeg', tags: ['dessert', 'celebratory', 'comfort', 'food'] }
        ]
    },
    {
        id: '9',
        name: 'Pizza By The Bay',
        cuisine: 'Italian',
        priceLevel: 2,
        avgDeliveryTime: 25,
        rating: 4.4,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
        description: 'An iconic eatery offering classic and fusion pizzas, complemented by stunning views of the bay.',
        dishes: [
            { id: 'pbtb1', name: 'Margherita Pizza', description: 'The classic with fresh tomatoes, mozzarella, basil, and a touch of olive oil.', price: 550, imageUrl: 'https://media.istockphoto.com/id/451865971/photo/margherita-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=jp5qC8fhdGsaE3eg7A5lPhqSHcOVEOCC9xv-KUfPLTU=', tags: ['main course', 'comfort', 'celebratory', 'food'] },
            { id: 'pbtb2', name: 'Verdure Pizza', description: 'A garden-fresh pizza loaded with bell peppers, olives, corn, and broccoli.', price: 650, imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=400&auto=format&fit=crop', tags: ['main course', 'healthy', 'comfort', 'food'] },
            { id: 'pbtb3', name: 'Bombay Masala Pizza', description: 'A spicy fusion pizza with a mix of Indian spices, onions, capsicum, and paneer.', price: 620, imageUrl: 'https://media.istockphoto.com/id/1293411368/photo/closeup-of-homemade-cheese-vegetable-pizza-in-plate.jpg?s=612x612&w=0&k=20&c=XpKQe9n0xnPcf8Pa_icJKP-BzaCVZ7BKt_NMZuvSh7c=', tags: ['main course', 'adventurous', 'food'] },
            { id: 'pbtb4', name: 'Garlic Bread with Cheese', description: 'Toasted bread with a generous topping of garlic butter and melted mozzarella.', price: 350, imageUrl: 'https://media.istockphoto.com/id/487219905/photo/toasted-cheese-and-garlic-bread.webp?a=1&b=1&s=612x612&w=0&k=20&c=cGAAIAmbkH-ZfPoXBpqUUXHUgLtSRqAXGJaTK3KJ6us=', tags: ['snack', 'comfort', 'food'] },
            { id: 'pbtb5', name: 'Arrabbiata Pasta', description: 'Penne pasta tossed in a spicy tomato and garlic sauce with fresh herbs.', price: 580, imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=400&auto=format&fit=crop', tags: ['main course', 'comfort', 'food'] },
            { id: 'pbtb6', name: 'Chocolate Lava Cake', description: 'A decadent chocolate cake with a gooey, molten chocolate center.', price: 380, imageUrl: 'https://media.istockphoto.com/id/544716244/photo/warm-chocolate-lava-cake-with-molten-center-and-red-currants.webp?a=1&b=1&s=612x612&w=0&k=20&c=LJLYYuVRRWLW2ODCdrF_Fcxrg-DVijWHnfzwtyehqCM=', tags: ['dessert', 'celebratory', 'comfort', 'food'] }
        ]
    },
    {
        id: '10',
        name: 'Elco Pani Puri Centre',
        cuisine: 'Street Food',
        priceLevel: 1,
        avgDeliveryTime: 15,
        rating: 4.6,
        imageUrl: 'https://media.istockphoto.com/id/979115746/photo/pani-puri-or-golgappa-is-a-popular-indian-chat-menu-selective-focus.jpg?s=612x612&w=0&k=20&c=YIYj2KHwYIRXtKg2vMGP0RTlnyEwi5Xp_lPh9XPNItw=',
        description: "A legendary destination for Mumbai's best street food, famous for its delicious Pani Puri and chaat.",
        dishes: [
            { id: 'elco1', name: 'Pani Puri', description: 'The legendary pani puri of Elco, famous for its perfectly spiced water and crisp puris.', price: 150, imageUrl: 'https://media.istockphoto.com/id/979115746/photo/pani-puri-or-golgappa-is-a-popular-indian-chat-menu-selective-focus.jpg?s=612x612&w=0&k=20&c=YIYj2KHwYIRXtKg2vMGP0RTlnyEwi5Xp_lPh9XPNItw=', tags: ['snack', 'street food', 'adventurous', 'food'] },
            { id: 'elco2', name: 'Sev Puri', description: 'Flat puris topped with potatoes, onions, chutneys, and a generous amount of sev.', price: 160, imageUrl: 'https://media.istockphoto.com/id/471291293/photo/sev-puri-south-indian-savoury-snacks.webp?a=1&b=1&s=612x612&w=0&k=20&c=p3wRswCsSAJBKlOyJ-3HLVzqXlGIN037-q1AIuxc9dE=', tags: ['snack', 'street food', 'comfort', 'food'] },
            { id: 'elco3', name: 'Ragda Pattice', description: 'Shallow-fried potato patties served with a white pea curry and various chutneys.', price: 200, imageUrl: 'https://media.istockphoto.com/id/2173847277/photo/aloo-tikki-is-a-crispy-spiced-potato-patty-often-served-as-a-snack-or-appetizer-garnished.webp?a=1&b=1&s=612x612&w=0&k=20&c=xKI4bVjfUnWOAzdys5LMdVbutEfEVbNHKN2-wq1Yvfk=', tags: ['snack', 'street food', 'comfort', 'food'] },
            { id: 'elco4', name: 'Chole Bhature', description: 'Fluffy fried bread served with a spicy chickpea curry.', price: 300, imageUrl: 'https://media.istockphoto.com/id/1328524212/photo/katlambe-chole.jpg?s=612x612&w=0&k=20&c=WImf2WcS08blqcijhLW6NS5baQ6-hVWgDxEhcgc62b4=', tags: ['main course', 'street food', 'comfort', 'celebratory', 'food'] },
            { id: 'elco5', name: 'Kulfi Falooda', description: 'A rich and creamy Indian ice cream (kulfi) served with vermicelli (falooda) and rose syrup.', price: 250, imageUrl: 'https://media.istockphoto.com/id/506571265/photo/kulfi-falooda-in-glass.jpg?s=612x612&w=0&k=20&c=TwfRFlhheQFVJgXi42YxPQlkEPKHQoJ-UA4tISnQKKo=', tags: ['dessert', 'street food', 'celebratory', 'food'] },
            { id: 'elco6', name: 'Dahi Puri', description: 'Crispy puris filled with potatoes and chickpeas, drenched in yogurt and chutneys.', price: 170, imageUrl: 'https://media.istockphoto.com/id/1024473712/photo/dahi-puri-chat-is-an-indian-road-side-snack-item-which-is-especially-popular-in-the-state-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=P5o74Sij_MRdLigQXa-XErRGk7gIjg9F_MqUZvW4h7Y=', tags: ['snack', 'street food', 'comfort', 'adventurous', 'food'] }
        ]
    },
    {
        id: '11',
        name: 'Kyani & Co.',
        cuisine: 'Irani Café',
        priceLevel: 1,
        avgDeliveryTime: 20,
        rating: 4.2,
        imageUrl: 'https://media.istockphoto.com/id/1494349673/photo/dark-stout-beer-in-glass-at-the-brewery.webp?a=1&b=1&s=612x612&w=0&k=20&c=cpIh5f78V0F95fNftFjxCUQcM9C_DdRLziasKVF34bI=',
        description: 'A heritage Irani café steeped in history, serving iconic Parsi snacks, baked goods, and bun maska.',
        dishes: [
            { id: 'kc1', name: 'Bun Maska & Chai', description: 'The iconic Irani cafe combination of soft, buttered bun with a cup of hot tea.', price: 120, imageUrl: 'https://media.istockphoto.com/id/1131737401/photo/breakfast.webp?a=1&b=1&s=612x612&w=0&k=20&c=ssTL8ePNUaeqGg7kiocgUXQpyQ4hqFUB9EwX6qq3XjY=', tags: ['comfort', 'food', 'drink'] },
            { id: 'kc2', name: 'Veg Puff', description: 'Flaky pastry filled with a savory and spiced mixed vegetable filling.', price: 60, imageUrl: 'https://media.istockphoto.com/id/2159713808/photo/vegetable-puff-pastry-on-white-plate-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fy_u27tcN1jBrEeOgya_42J0AINhJ3z-is44fpjlcYU=', tags: ['comfort', 'snack', 'food'] },
            { id: 'kc3', name: 'Mawa Cake', description: 'A rich, dense, and moist cake made with milk solids (mawa).', price: 80, imageUrl: 'https://media.istockphoto.com/id/1301439492/photo/mosaic-cake.jpg?s=612x612&w=0&k=20&c=V0FXevaQ6PkfPBM4upulAK97uF7T1vqaKAlDs7EFOlg=', tags: ['celebratory', 'dessert', 'comfort', 'food'] },
            { id: 'kc4', name: 'Cheese Omelette', description: 'A fluffy omelette stuffed with melted cheese, served with toast.', price: 220, imageUrl: 'https://media.istockphoto.com/id/1350253284/photo/moong-dal-cheela.webp?a=1&b=1&s=612x612&w=0&k=20&c=plczY0rRXvRBamVVnz3I1EhCYPoSI39qijFI2eCgIZM=', tags: ['comfort', 'breakfast', 'food'] },
            { id: 'kc5', name: 'Veg Cutlet', description: 'A crispy fried patty made from mashed vegetables and spices, served with chutney.', price: 180, imageUrl: 'https://media.istockphoto.com/id/1190997147/photo/veg-poha-roll-patties-or-tikki.webp?a=1&b=1&s=612x612&w=0&k=20&c=mJ-uZVyx-jpzFwBeCum4Nrdi3T9aSs3pnmTXKyP-GQo=', tags: ['comfort', 'snack', 'food'] },
            { id: 'kc6', name: 'Raspberry Soda', description: 'A classic Parsi sweet and fizzy raspberry-flavored soda.', price: 100, imageUrl: 'https://media.istockphoto.com/id/176708861/photo/fruity-refreshment-on-ice.webp?a=1&b=1&s=612x612&w=0&k=20&c=-riR9HtKEj-Iod7-DV016qjKO343iD4SCWlvxc92sqY=', tags: ['adventurous', 'drink'] }
        ]
    },
    {
        id: '12',
        name: 'Dakshinayan',
        cuisine: 'South Indian',
        priceLevel: 1,
        avgDeliveryTime: 30,
        rating: 4.7,
        imageUrl: 'https://media.istockphoto.com/id/177447843/photo/house-boat-in-backwaters.jpg?s=612x612&w=0&k=20&c=9RnNr22SKJiNKuOukgfo82TtSgvSLMIZALXNf4m_VPM=',
        description: 'An authentic South Indian eatery celebrated for its traditional flavors, dosas, and regional specialties.',
        dishes: [
            { id: 'dk1', name: 'Mini Idlis in Sambar', description: 'Bite-sized steamed rice cakes soaked in a flavorful and aromatic sambar.', price: 220, imageUrl: 'https://media.istockphoto.com/id/519845511/photo/idly-with-sambar-dish-of-south-indian-cuisine.webp?a=1&b=1&s=612x612&w=0&k=20&c=FLkQLmiEUT-sYIOq_wCgUzxVatzhNPVpFGB2JD58iqQ=', tags: ['breakfast', 'healthy', 'comfort', 'food'] },
            { id: 'dk2', name: 'Mysore Masala Dosa', description: 'A crispy dosa with a spicy red chutney spread inside, filled with potato masala.', price: 280, imageUrl: 'https://media.istockphoto.com/id/942678386/photo/mysore-masala-dosa-served-with-sambar-and-chutney-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=fgSCqxDUVuGTDo8lnnY9vxyo9AgcVanqE7P-binRqF4=', tags: ['breakfast', 'adventurous', 'comfort', 'food'] },
            { id: 'dk3', name: 'Pesarattu Upma', description: 'A green gram dosa stuffed with savory semolina (upma), an Andhra specialty.', price: 300, imageUrl: 'https://images.pexels.com/photos/20408458/pexels-photo-20408458.jpeg', tags: ['breakfast', 'healthy', 'comfort', 'food'] },
            { id: 'dk4', name: 'Bisi Bele Bath', description: 'A flavorful and spicy dish of rice, lentils, and vegetables cooked together.', price: 320, imageUrl: 'https://media.istockphoto.com/id/1273289152/photo/delicious-south-indian-food-bisi-bele-bath.webp?a=1&b=1&s=612x612&w=0&k=20&c=Mv8ECaIGoTs9GnC7stlODahCWU10tNJg2XeOc2_STps=', tags: ['main course', 'healthy', 'comfort', 'food'] },
            { id: 'dk5', name: 'Filter Coffee', description: 'Strong, aromatic South Indian filter coffee, served in a traditional tumbler and davara.', price: 100, imageUrl: 'https://media.istockphoto.com/id/1426602867/photo/south-indian-filter-coffee-served-in-traditional-steel-cup-and-saucer-bowl-closeup-shot-of.jpg?s=612x612&w=0&k=20&c=dpDM-s6fULV3SbcGSHNtJQQWZZ-Z3giRPkpVpEEJx1E=', tags: ['beverage', 'comfort', 'drink'] },
            { id: 'dk6', name: 'Rava Kesari', description: 'A sweet and rich pudding made from semolina, ghee, sugar, and saffron.', price: 180, imageUrl: 'https://media.istockphoto.com/id/2168835497/photo/suji-ka-halwa-or-rava-sheera-or-ravyacha-shira-is-an-indian-sweet-dish-served-as-dessert-or.webp?a=1&b=1&s=612x612&w=0&k=20&c=EqyBqZZTEOpqBFoPe6z3JBdCxJsH_6mRzKAZDg7VmIo=', tags: ['dessert', 'celebratory', 'comfort', 'food'] }
        ]
    }
];


const dishDatabase = new Map();
mockRestaurantsData.forEach(restaurant => {
    restaurant.dishes.forEach(dish => {
        dishDatabase.set(dish.id, {
            ...dish,
            restaurantName: restaurant.name,
            restaurantId: restaurant.id
        });
    });
});

// --- AIRecommender Component ---
const AIRecommender = () => {
    const { addItem } = useCart();
    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedType, setSelectedType] = useState('food');
    const [addedItems, setAddedItems] = useState({});

    const moods = useMemo(() => [
        { name: 'Comfort', tag: 'comfort', icon: <Heart size={24} />, color: 'bg-rose-100 text-rose-600', selectedColor: 'ring-rose-500' },
        { name: 'Healthy', tag: 'healthy', icon: <Leaf size={24} />, color: 'bg-emerald-100 text-emerald-600', selectedColor: 'ring-emerald-500' },
        { name: 'Adventurous', tag: 'adventurous', icon: <Zap size={24} />, color: 'bg-purple-100 text-purple-600', selectedColor: 'ring-purple-500' },
        { name: 'Celebratory', tag: 'celebratory', icon: <PartyPopper size={24} />, color: 'bg-yellow-100 text-yellow-600', selectedColor: 'ring-yellow-500' },
    ], []);

    const suggestedDishes = useMemo(() => {
        if (!selectedMood) return [];
        return Array.from(dishDatabase.values())
            .filter(details =>
                (details.tags || []).includes(selectedMood) &&
                (details.tags || []).includes(selectedType)
            );
    }, [selectedMood, selectedType]);

    const handleAddToCart = (dishDetails) => {
        const restaurantInfo = mockRestaurantsData.find(r => r.id === dishDetails.restaurantId);

        if (restaurantInfo) {
            const wasAdded = addItem(dishDetails, restaurantInfo);
            if (wasAdded) {
                setAddedItems(prev => ({ ...prev, [dishDetails.id]: true }));
                setTimeout(() => {
                    setAddedItems(prev => ({ ...prev, [dishDetails.id]: false }));
                }, 2000);
            }
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 text-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Sparkles className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        Don't know what to eat?
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Tell us your mood, and our AI Chef will suggest the perfect dish for you.
                    </p>
                </motion.div>

                <motion.div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
                    {moods.map((mood) => (
                        <motion.button 
                            key={mood.name} 
                            onClick={() => setSelectedMood(mood.tag)} 
                            className={`p-6 rounded-xl flex flex-col items-center justify-center gap-3 font-bold text-lg transition-all duration-300 transform hover:scale-105 ring-2 ring-transparent ${mood.color} ${selectedMood === mood.tag ? mood.selectedColor : ''}`} 
                            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                        >
                            {mood.icon}
                            <span>{mood.name}</span>
                        </motion.button>
                    ))}
                </motion.div>

                <AnimatePresence>
                    {selectedMood && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex justify-center gap-4">
                            <button onClick={() => setSelectedType('food')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${selectedType === 'food' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                                <Utensils size={20} /> Food
                            </button>
                            <button onClick={() => setSelectedType('drink')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${selectedType === 'drink' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                                <GlassWater size={20} /> Drinks
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12">
                    <AnimatePresence mode="wait">
                        {suggestedDishes.length > 0 ? (
                            <motion.div layout key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ staggerChildren: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {suggestedDishes.map((dishDetails) => {
                                    const isAdded = addedItems[dishDetails.id];
                                    return (
                                        <motion.div layout key={dishDetails.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col text-left shadow-sm hover:shadow-lg transition-shadow">
                                            <img src={dishDetails.imageUrl} alt={dishDetails.name} className="w-full h-40 object-cover" />
                                            <div className="p-4 flex flex-col flex-grow">
                                                <h3 className="text-lg font-bold text-gray-900">{dishDetails.name}</h3>
                                                <p className="text-sm text-gray-500">{dishDetails.restaurantName}</p>
                                                <p className="text-gray-800 font-semibold mt-2">₹{dishDetails.price.toFixed(2)}</p>
                                                <motion.button onClick={() => handleAddToCart(dishDetails)} className={`mt-auto w-full px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${isAdded ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`} whileTap={{ scale: 0.95 }}>
                                                    <AnimatePresence mode="wait">
                                                        <motion.span key={isAdded ? 'added' : 'add'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                                                            {isAdded ? 'Added!' : 'Add to Cart'}
                                                        </motion.span>
                                                    </AnimatePresence>
                                                    {!isAdded && <ShoppingBag size={18} />}
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            selectedMood && (
                                <motion.div layout key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
                                    <p className="text-gray-500">No {selectedType}s match that mood. Try another combination!</p>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const AIChefPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <AIRecommender />
        </motion.div>
    );
};

export default AIChefPage;
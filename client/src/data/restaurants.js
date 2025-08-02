export const mockRestaurantsData = [
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
            { id: 'p1', name: 'Pani Puri', description: 'Crispy shells filled with spiced potatoes, chickpeas, and tangy tamarind water.', price: 150, imageUrl: 'https://images.pexels.com/photos/12318206/pexels-photo-12318206.jpeg' },
            { id: 'p2', name: 'Pav Bhaji', description: 'A flavorful mash of mixed vegetables served with soft, buttered bread rolls.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGF2JTIwYmhhaml8ZW58MHx8MHx8fDA%3D' },
            { id: 'p3', name: 'Dahi Batata Puri', description: 'A delightful chaat with puris, potatoes, yogurt, and sweet and spicy chutneys.', price: 180, imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1220,h_915/k%2FPhoto%2FSeries%2F2021-08-a-call-to-chaat%2FCall-to-Chaat_Dahi-Batata-Puri%2F2021-07-28_ATK-3659' },
            { id: 'p4', name: 'Panki Chatni', description: 'Thin rice pancakes steamed in banana leaves, served with chutney.', price: 170, imageUrl: 'https://assets3.thrillist.com/v1/image/2943946/1584x1056/crop;webp=auto;jpeg_quality=60;progressive.jpg' },
            { id: 'p5', name: 'Fada ni Khichdi', description: 'A wholesome and nutritious porridge made from broken wheat and lentils.', price: 220, imageUrl: 'https://images.pexels.com/photos/6363499/pexels-photo-6363499.jpeg' },
            { id: 'p6', name: 'Satpadi Roti with Gatta Nu Shaak', description: 'Seven-layered flatbread served with gram flour dumplings in a yogurt-based curry.', price: 280, imageUrl: 'https://images.pexels.com/photos/28579050/pexels-photo-28579050.jpeg' }
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
            { id: 'b1', name: 'Masala Dosa', description: 'A thin, crispy crepe made from fermented rice and lentil batter, filled with spiced potatoes.', price: 220, imageUrl: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/masala-dosa-recipe-2.jpg' },
            { id: 'b2', name: 'Idli Sambar', description: 'Steamed rice cakes served with a flavorful lentil-based vegetable stew.', price: 180, imageUrl: 'https://images.pexels.com/photos/31199041/pexels-photo-31199041.jpeg' },
            { id: 'b3', name: 'Ghee Roast Dosa', description: 'A cone-shaped dosa roasted to perfection with clarified butter (ghee).', price: 250, imageUrl: 'https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D' },
            { id: 'b4', name: 'Rava Kichadi', description: 'A savory South Indian breakfast dish made from semolina, vegetables, and spices.', price: 190, imageUrl: 'https://images.unsplash.com/photo-1630409351211-d62ab2d24da4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2hpY2hkaXxlbnwwfHwwfHx8MA%3D%3D' },
            { id: 'b5', name: 'Medu Vada', description: 'Crispy, savory doughnuts made from black gram lentils, served with sambar and chutney.', price: 160, imageUrl: 'https://images.unsplash.com/photo-1730191843435-073792ba22bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFkYXxlbnwwfHwwfHx8MA%3D%3D' },
            { id: 'b6', name: 'Appam with Coconut Milk', description: 'Lacy, soft-centered rice pancakes served with sweet, aromatic coconut milk.', price: 200, imageUrl: 'https://media.istockphoto.com/id/701198310/photo/appam-palappam-with-mutton-stew-kerala-easter-breakfast.jpg?s=1024x1024&w=is&k=20&c=QytOu8lh42O7GJY1CCxU2unTdvPRhyQ__47ZYjOWiI8=' }
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
            { id: 's1', name: 'Dal Baati Churma', description: 'A traditional Rajasthani dish of hard wheat rolls, lentils, and sweetened cereal.', price: 450, imageUrl: 'https://media.istockphoto.com/id/1402853466/photo/dal-bati-rajasthani-traditional-vegetarian-food-plat-in-rural-india.jpg?s=1024x1024&w=is&k=20&c=AI_MneA5KdS9V9C6zvfjZ2v68KMr5BBXXLivz-eNcNc=' },
            { id: 's2', name: 'Gujarati Thali', description: 'A grand platter featuring a variety of vegetarian dishes from Gujarat.', price: 550, imageUrl: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VqYXJhdGklMjB0aGFsaXxlbnwwfHwwfHx8MA%3D%3D' },
            { id: 's3', name: 'Paneer Makhani', description: 'Soft paneer cubes simmered in a rich and creamy tomato-based gravy.', price: 350, imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/paneer-makhani-recipe.jpg' },
            { id: 's4', name: 'Khandvi', description: 'Soft, melt-in-your-mouth rolls made from gram flour and yogurt.', price: 210, imageUrl: 'https://images.unsplash.com/photo-1588076186114-a3898e30530d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2hhbmR2aXxlbnwwfHwwfHx8MA%3D%3D' },
            { id: 's5', name: 'Shrikhand', description: 'A sweet dish made of strained yogurt, flavored with saffron and cardamom.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1604442247807-69dd2578ff64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hyaWtoYW5kfGVufDB8fDB8fHww' },
            { id: 's6', name: 'Gatte ki Sabzi', description: 'Gram flour dumplings cooked in a spicy and tangy yogurt-based curry.', price: 320, imageUrl: 'https://media.istockphoto.com/id/1513582138/photo/rajasthani-gatta-curry-or-besan-ke-gatte-ki-sabzi-gatte-are-gram-flour-roundels-or-chickpea.jpg?s=1024x1024&w=is&k=20&c=2LHlPBGXFLeygwX5edGxeHRbGlsIGsrIMAeCE1JlYnw=' }
        ]
    },
    {
        id: '4',
        name: 'Burma Burma',
        rating: 4.9,
        cuisine: 'Burmese',
        priceLevel: 3,
        avgDeliveryTime: 35,
        imageUrl: 'data:image/jpeg;base64,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',
        description: 'An innovative restaurant offering a unique taste of vegetarian Burmese cuisine, from salads to noodle bowls.',
        dishes: [
            { id: 'bb1', name: 'Samosa Soup', description: 'A tangy and spicy soup with crushed samosas.', price: 320, imageUrl: 'https://plus.unsplash.com/premium_photo-1695297516676-04a259917c03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Ftb3NhfGVufDB8fDB8fHww' },
            { id: 'bb2', name: 'Khow Suey', description: 'A one-bowl meal of noodles and vegetables in a coconut milk broth.', price: 480, imageUrl: 'https://images.pexels.com/photos/31745183/pexels-photo-31745183.jpeg' },
            { id: 'bb3', name: 'Tea Leaf Salad', description: 'A refreshing salad made with fermented tea leaves, nuts, and seeds.', price: 410, imageUrl: 'https://plus.unsplash.com/premium_photo-1690489323642-6e057faf3c7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FsYWR8ZW58MHx8MHx8fDA%3D' },
            { id: 'bb4', name: 'Tohu Mash with Paratha', description: 'Burmese-style scrambled tofu served with flaky flatbread.', price: 430, imageUrl: 'https://images.pexels.com/photos/6327133/pexels-photo-6327133.jpeg' },
            { id: 'bb5', name: 'Bubble Tea', description: 'A cold, frothy tea-based drink with chewy tapioca pearls.', price: 300, imageUrl: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnViYmxlJTIwdGVhfGVufDB8fDB8fHww' },
            { id: 'bb6', name: 'Mandalay Laphet Thoke', description: 'A variation of the tea leaf salad with added crunchy beans and garlic.', price: 420, imageUrl: 'https://media.istockphoto.com/id/1196893919/photo/mandalay-myanmar.webp?a=1&b=1&s=612x612&w=0&k=20&c=VODDicQSEgnTldAx8753mViUBrfFVJj7cLlwxSQAugc=' }
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
            { id: 'i1', name: 'Dahi Ke Kebab', description: 'Soft, melt-in-the-mouth kebabs made from hung curd and spices.', price: 380, imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/dahi-kabab-recipe.jpg' },
            { id: 'i2', name: 'Dal Haveli', description: 'Their signature slow-cooked black lentils, rich and creamy.', price: 450, imageUrl: 'https://media.istockphoto.com/id/855902314/photo/delicious-spicy-lentil-soup.jpg?s=612x612&w=0&k=20&c=efgW0CNE37ZkBCb7usWtVKgDoy2OFLpTQzmJjxPJFgQ=' },
            { id: 'i3', name: 'Waterchestnut & Corn Tikki', description: 'Crispy tikkis made with waterchestnut and corn.', price: 360, imageUrl: 'https://media.istockphoto.com/id/2029197201/photo/millet-fast-food-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=R1YaTh2g-BERlXBO6J-boaDKWtEiWkL7IIxqvNXDjJY=' },
            { id: 'i4', name: 'Mushroom Galouti', description: 'A vegetarian version of the famous Lucknowi kebab, made with mushrooms.', price: 420, imageUrl: 'https://media.istockphoto.com/id/1437951082/photo/mushroom-pickle.webp?a=1&b=1&s=612x612&w=0&k=20&c=eiYXe3byRZSbyEc9uco-F0F9vlGUedb-iSQces-Y7yg=' },
            { id: 'i5', name: 'Phirni', description: 'A classic slow-cooked Indian sweet pudding made with ground rice, milk and sugar.', price: 280, imageUrl: 'https://media.istockphoto.com/id/1453999382/photo/jhangore-ki-kheer.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZKfcvqfbRZKAAtIaG8dacTEUdzjNJ7crRKgAUBCzyPo=' },
            { id: 'i6', name: 'Ghewar with Rabri', description: 'A disc-shaped sweet cake made with flour, soaked in syrup and topped with rabri.', price: 350, imageUrl: 'https://media.istockphoto.com/id/1412258930/photo/ghevar-sweet.jpg?s=612x612&w=0&k=20&c=kiqsOBtWCfrrwXEGczA-yD9C0gy3wynBaopQi36N0h4=' }
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
            { id: 'ml1', name: 'Jalebi Caviar', description: 'A deconstructed jalebi served as tiny pearls, with saffron-infused rabri foam.', price: 550, imageUrl: 'https://media.istockphoto.com/id/1205549930/photo/jalebi-sweet-indian-food-on-the-street-market.jpg?s=612x612&w=0&k=20&c=1fXWXLa98OJXZoTx99WRgxWm1fyhjANjxOwOB_AXDa8=' },
            { id: 'ml2', name: 'Wild Mushroom Chai', description: 'An earthy mushroom consommé poured table-side from a tea kettle over dehydrated mushrooms.', price: 475, imageUrl: 'https://media.istockphoto.com/id/2203687099/photo/oven-baked-pastries-filled-with-chives-and-mushrooms-on-wooden-tray.webp?a=1&b=1&s=612x612&w=0&k=20&c=8CybR5YV-rffu75Hes7EViwmOyYUHxuSoPdJW3ezWh8=' },
            { id: 'ml3', name: 'Dal Makhani with Naan', description: 'Traditional dal makhani presented in a modern style, often with bite-sized naan.', price: 650, imageUrl: 'https://media.istockphoto.com/id/1461228644/photo/dal-makhani-with-naan.webp?a=1&b=1&s=612x612&w=0&k=20&c=GViojxv1lNOw8RvYoDQNEPtC5MTWoIKN2a-UJUGRhgc=' },
            { id: 'ml4', name: 'Dahi Bada', description: 'A reimagined dahi bada with aeration and light textures.', price: 425, imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/dahi-vada-recipe.jpg' },
            { id: 'ml5', name: 'Khandvi with Mango Chutney', description: 'Delicate gram flour rolls paired with a sweet and tangy mango chutney.', price: 450, imageUrl: 'https://media.istockphoto.com/id/1824026139/photo/gujarati-khandvi-or-patuli-snack.jpg?s=612x612&w=0&k=20&c=NlsZXRiomUibUd_VsvOW074hDZQcAeta9TQkjfZFlYU=' },
            { id: 'ml6', name: 'Chocolate Mousse', description: 'A rich and airy chocolate mousse, often with a unique Indian flavour twist.', price: 500, imageUrl: 'https://media.istockphoto.com/id/180811737/photo/chocolate-mousse.webp?a=1&b=1&s=612x612&w=0&k=20&c=fj5KJR5Pj407xMbTCNFoS0XexS8DNDhNq8-r4HVu1SE=' }
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
            { id: 'pg1', name: 'Paneer Tikka Multani', description: 'Cottage cheese marinated in a rich blend of cream, gram flour, and ajwain.', price: 450, imageUrl: 'https://media.istockphoto.com/id/1257759778/photo/delicious-indian-cuisine-set-wallpaper-background-flatlay.webp?a=1&b=1&s=612x612&w=0&k=20&c=NCIZngrUoISxIX4EU40THw1jgK-yBhzsc679dKF1SuY=' },
            { id: 'pg2', name: 'Dal Makhani', description: 'Slow-cooked black lentils in a rich, buttery, and creamy tomato gravy.', price: 425, imageUrl: 'https://media.istockphoto.com/id/1170374719/photo/dal-makhani-at-dark-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=FWHhW6SnrLvmwaR-APN3pIxEjLJe073-PQ0cfvOGoTI=' },
            { id: 'pg3', name: 'Veg Kolhapuri', description: 'A spicy mixed vegetable curry with a rich, dark, coconut-based gravy.', price: 475, imageUrl: 'https://media.istockphoto.com/id/1278584350/photo/veg-kolhapuri-in-black-bowl-on-dark-slate-table-top-indian-vegetable-curry-dish-vegetarian.webp?a=1&b=1&s=612x612&w=0&k=20&c=O9tXE4uFBKx4VfIKKNnQDzAc28CaCeobaPxrPFAAAWE=' },
            { id: 'pg4', name: 'Amritsari Kulcha', description: 'Crisp, flaky bread stuffed with spiced potatoes and served with chana masala.', price: 350, imageUrl: 'https://media.istockphoto.com/id/1432760289/photo/aloo-paratha-or-potato-stuffed-flat-bread-on-a-wooden-background-served-with-curd-and-sauce.jpg?b=1&s=612x612&w=0&k=20&c=FbAwBi7Kk_N4MLqN7Gnr1rmb6XzAPwZzvgMaNR_r-DA=' },
            { id: 'pg5', name: 'Garlic Naan', description: 'Soft Indian flatbread topped with garlic and butter, cooked in a tandoor.', price: 150, imageUrl: 'https://media.istockphoto.com/id/1140752821/photo/indian-naan-bread-with-garlic-butter-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=lOeYboRNvwONnykKUu7lN-UQg5c0cl0CKfDFiVFfhBk=' },
            { id: 'pg6', name: 'Kesar Pista Lassi', description: 'A refreshing yogurt drink flavored with saffron and pistachios.', price: 250, imageUrl: 'https://images.pexels.com/photos/14509267/pexels-photo-14509267.jpeg' }
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
            { id: 'mc1', name: 'Veg Manchow Soup', description: 'A spicy and sour soup with chopped vegetables, topped with crispy noodles.', price: 280, imageUrl: 'https://media.istockphoto.com/id/1494080616/photo/veg-manchow-soup-in-black-bowl-on-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=n2ADXERvDw8blc94JaRwM0DIV_gsdT9bIcKfMEkEYYw=' },
            { id: 'mc2', name: 'Corn and Water Chestnut Dumplings', description: 'Steamed dumplings filled with a crunchy mix of sweet corn and water chestnut.', price: 450, imageUrl: 'https://media.istockphoto.com/id/687516462/photo/dumpling.webp?a=1&b=1&s=612x612&w=0&k=20&c=dNKQmu0SgEkbDD4hB4k1lm55O9jgkxUpjOGpDDt9_0E=' },
            { id: 'mc3', name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with a mix of fresh vegetables in a savory sauce.', price: 380, imageUrl: 'https://media.istockphoto.com/id/1292637257/photo/veg-hakka-noodles-a-popular-oriental-dish-made-with-noodles-and-vegetables-served-over-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=0xbbDCOhb_rLXHueLmoc0zBzmE8FR7xrDyvjflUlEQ8=' },
            { id: 'mc4', name: 'Veg Manchurian Gravy', description: 'Deep-fried vegetable balls in a savory, sweet, and tangy gravy.', price: 420, imageUrl: 'https://media.istockphoto.com/id/1497707561/photo/veg-manchurian-in-a-bowl-closeup-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=6sC_ApLY-GVtj1Uc7PSzHmnBZsCiXqMF0xZlWahUv70=' },
            { id: 'mc5', name: 'Honey Chilli Potato', description: 'Crispy fried potatoes tossed in a sweet and spicy honey-chilli sauce.', price: 350, imageUrl: 'https://media.istockphoto.com/id/1453142161/photo/full-frame-image-of-deep-fried-potato-french-fry-chips-side-dish-red-chillis-and-sliced.webp?a=1&b=1&s=612x612&w=0&k=20&c=Qi_mdDB-0pCZ5xtVt4LYPsTaxoVM8TAEmdQoaLcyIoo=' },
            { id: 'mc6', name: 'Date Pancakes with Ice Cream', description: 'Warm, sweet date-filled pancakes served with a scoop of vanilla ice cream.', price: 320, imageUrl: 'https://images.pexels.com/photos/718739/pexels-photo-718739.jpeg' }
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
            { id: 'pbtb1', name: 'Margherita Pizza', description: 'The classic with fresh tomatoes, mozzarella, basil, and a touch of olive oil.', price: 550, imageUrl: 'https://media.istockphoto.com/id/451865971/photo/margherita-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=jp5qC8fhdGsaE3eg7A5lPhqSHcOVEOCC9xv-KUfPLTU=' },
            { id: 'pbtb2', name: 'Verdure Pizza', description: 'A garden-fresh pizza loaded with bell peppers, olives, corn, and broccoli.', price: 650, imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=400&auto=format&fit=crop' },
            { id: 'pbtb3', name: 'Bombay Masala Pizza', description: 'A spicy fusion pizza with a mix of Indian spices, onions, capsicum, and paneer.', price: 620, imageUrl: 'https://media.istockphoto.com/id/1293411368/photo/closeup-of-homemade-cheese-vegetable-pizza-in-plate.jpg?s=612x612&w=0&k=20&c=XpKQe9n0xnPcf8Pa_icJKP-BzaCVZ7BKt_NMZuvSh7c=' },
            { id: 'pbtb4', name: 'Garlic Bread with Cheese', description: 'Toasted bread with a generous topping of garlic butter and melted mozzarella.', price: 350, imageUrl: 'https://media.istockphoto.com/id/487219905/photo/toasted-cheese-and-garlic-bread.webp?a=1&b=1&s=612x612&w=0&k=20&c=cGAAIAmbkH-ZfPoXBpqUUXHUgLtSRqAXGJaTK3KJ6us=' },
            { id: 'pbtb5', name: 'Arrabbiata Pasta', description: 'Penne pasta tossed in a spicy tomato and garlic sauce with fresh herbs.', price: 580, imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=400&auto=format&fit=crop' },
            { id: 'pbtb6', name: 'Chocolate Lava Cake', description: 'A decadent chocolate cake with a gooey, molten chocolate center.', price: 380, imageUrl: 'https://media.istockphoto.com/id/544716244/photo/warm-chocolate-lava-cake-with-molten-center-and-red-currants.webp?a=1&b=1&s=612x612&w=0&k=20&c=LJLYYuVRRWLW2ODCdrF_Fcxrg-DVijWHnfzwtyehqCM=' }
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
            { id: 'elco1', name: 'Pani Puri', description: 'The legendary pani puri of Elco, famous for its perfectly spiced water and crisp puris.', price: 150, imageUrl: 'https://media.istockphoto.com/id/979115746/photo/pani-puri-or-golgappa-is-a-popular-indian-chat-menu-selective-focus.jpg?s=612x612&w=0&k=20&c=YIYj2KHwYIRXtKg2vMGP0RTlnyEwi5Xp_lPh9XPNItw=' },
            { id: 'elco2', name: 'Sev Puri', description: 'Flat puris topped with potatoes, onions, chutneys, and a generous amount of sev.', price: 160, imageUrl: 'https://media.istockphoto.com/id/471291293/photo/sev-puri-south-indian-savoury-snacks.webp?a=1&b=1&s=612x612&w=0&k=20&c=p3wRswCsSAJBKlOyJ-3HLVzqXlGIN037-q1AIuxc9dE=' },
            { id: 'elco3', name: 'Ragda Pattice', description: 'Shallow-fried potato patties served with a white pea curry and various chutneys.', price: 200, imageUrl: 'https://media.istockphoto.com/id/2173847277/photo/aloo-tikki-is-a-crispy-spiced-potato-patty-often-served-as-a-snack-or-appetizer-garnished.webp?a=1&b=1&s=612x612&w=0&k=20&c=xKI4bVjfUnWOAzdys5LMdVbutEfEVbNHKN2-wq1Yvfk=' },
            { id: 'elco4', name: 'Chole Bhature', description: 'Fluffy fried bread served with a spicy chickpea curry.', price: 300, imageUrl: 'https://media.istockphoto.com/id/1328524212/photo/katlambe-chole.jpg?s=612x612&w=0&k=20&c=WImf2WcS08blqcijhLW6NS5baQ6-hVWgDxEhcgc62b4=' },
            { id: 'elco5', name: 'Kulfi Falooda', description: 'A rich and creamy Indian ice cream (kulfi) served with vermicelli (falooda) and rose syrup.', price: 250, imageUrl: 'https://media.istockphoto.com/id/506571265/photo/kulfi-falooda-in-glass.jpg?s=612x612&w=0&k=20&c=TwfRFlhheQFVJgXi42YxPQlkEPKHQoJ-UA4tISnQKKo=' },
            { id: 'elco6', name: 'Dahi Puri', description: 'Crispy puris filled with potatoes and chickpeas, drenched in yogurt and chutneys.', price: 170, imageUrl: 'https://media.istockphoto.com/id/1024473712/photo/dahi-puri-chat-is-an-indian-road-side-snack-item-which-is-especially-popular-in-the-state-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=P5o74Sij_MRdLigQXa-XErRGk7gIjg9F_MqUZvW4h7Y=' }
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
            { id: 'kc1', name: 'Bun Maska & Chai', description: 'The iconic Irani cafe combination of soft, buttered bun with a cup of hot tea.', price: 120, imageUrl: 'https://media.istockphoto.com/id/1131737401/photo/breakfast.webp?a=1&b=1&s=612x612&w=0&k=20&c=ssTL8ePNUaeqGg7kiocgUXQpyQ4hqFUB9EwX6qq3XjY=' },
            { id: 'kc2', name: 'Veg Puff', description: 'Flaky pastry filled with a savory and spiced mixed vegetable filling.', price: 60, imageUrl: 'https://media.istockphoto.com/id/2159713808/photo/vegetable-puff-pastry-on-white-plate-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fy_u27tcN1jBrEeOgya_42J0AINhJ3z-is44fpjlcYU=' },
            { id: 'kc3', name: 'Mawa Cake', description: 'A rich, dense, and moist cake made with milk solids (mawa).', price: 80, imageUrl: 'https://media.istockphoto.com/id/1301439492/photo/mosaic-cake.jpg?s=612x612&w=0&k=20&c=V0FXevaQ6PkfPBM4upulAK97uF7T1vqaKAlDs7EFOlg=' },
            { id: 'kc4', name: 'Cheese Omelette', description: 'A fluffy omelette stuffed with melted cheese, served with toast.', price: 220, imageUrl: 'https://media.istockphoto.com/id/1350253284/photo/moong-dal-cheela.webp?a=1&b=1&s=612x612&w=0&k=20&c=plczY0rRXvRBamVVnz3I1EhCYPoSI39qijFI2eCgIZM=' },
            { id: 'kc5', name: 'Veg Cutlet', description: 'A crispy fried patty made from mashed vegetables and spices, served with chutney.', price: 180, imageUrl: 'https://media.istockphoto.com/id/1190997147/photo/veg-poha-roll-patties-or-tikki.webp?a=1&b=1&s=612x612&w=0&k=20&c=mJ-uZVyx-jpzFwBeCum4Nrdi3T9aSs3pnmTXKyP-GQo=' },
            { id: 'kc6', name: 'Raspberry Soda', description: 'A classic Parsi sweet and fizzy raspberry-flavored soda.', price: 100, imageUrl: 'https://media.istockphoto.com/id/176708861/photo/fruity-refreshment-on-ice.webp?a=1&b=1&s=612x612&w=0&k=20&c=-riR9HtKEj-Iod7-DV016qjKO343iD4SCWlvxc92sqY=' }
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
            { id: 'dk1', name: 'Mini Idlis in Sambar', description: 'Bite-sized steamed rice cakes soaked in a flavorful and aromatic sambar.', price: 220, imageUrl: 'https://media.istockphoto.com/id/519845511/photo/idly-with-sambar-dish-of-south-indian-cuisine.webp?a=1&b=1&s=612x612&w=0&k=20&c=FLkQLmiEUT-sYIOq_wCgUzxVatzhNPVpFGB2JD58iqQ=' },
            { id: 'dk2', name: 'Mysore Masala Dosa', description: 'A crispy dosa with a spicy red chutney spread inside, filled with potato masala.', price: 280, imageUrl: 'https://media.istockphoto.com/id/942678386/photo/mysore-masala-dosa-served-with-sambar-and-chutney-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=fgSCqxDUVuGTDo8lnnY9vxyo9AgcVanqE7P-binRqF4=' },
            { id: 'dk3', name: 'Pesarattu Upma', description: 'A green gram dosa stuffed with savory semolina (upma), an Andhra specialty.', price: 300, imageUrl: 'https://images.pexels.com/photos/20408458/pexels-photo-20408458.jpeg' },
            { id: 'dk4', name: 'Bisi Bele Bath', description: 'A flavorful and spicy dish of rice, lentils, and vegetables cooked together.', price: 320, imageUrl: 'https://media.istockphoto.com/id/1273289152/photo/delicious-south-indian-food-bisi-bele-bath.webp?a=1&b=1&s=612x612&w=0&k=20&c=Mv8ECaIGoTs9GnC7stlODahCWU10tNJg2XeOc2_STps=' },
            { id: 'dk5', name: 'Filter Coffee', description: 'Strong, aromatic South Indian filter coffee, served in a traditional tumbler and davara.', price: 100, imageUrl: 'https://media.istockphoto.com/id/1426602867/photo/south-indian-filter-coffee-served-in-traditional-steel-cup-and-saucer-bowl-closeup-shot-of.jpg?s=612x612&w=0&k=20&c=dpDM-s6fULV3SbcGSHNtJQQWZZ-Z3giRPkpVpEEJx1E=' },
            { id: 'dk6', name: 'Rava Kesari', description: 'A sweet and rich pudding made from semolina, ghee, sugar, and saffron.', price: 180, imageUrl: 'https://media.istockphoto.com/id/2168835497/photo/suji-ka-halwa-or-rava-sheera-or-ravyacha-shira-is-an-indian-sweet-dish-served-as-dessert-or.webp?a=1&b=1&s=612x612&w=0&k=20&c=EqyBqZZTEOpqBFoPe6z3JBdCxJsH_6mRzKAZDg7VmIo=' }
        ]
    }
];
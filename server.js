const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// DESTINATIONS DATA (Backend API)
// ============================================
const destinations = [
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Where Mountains Kiss the Sky',
    shortDesc: 'A breathtaking hill station nestled in the Kullu Valley, surrounded by snow-capped peaks and lush pine forests.',
    description: `Manali is a high-altitude Himalayan resort town in India's northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination. Set on the Beas River, it's a gateway for skiing in the Solang Valley and trekking in Parvati Valley. It's also a jumping-off point for paragliding, rafting, and mountaineering in the Pir Panjal peaks.`,
    image: '/images/manali.png',
    bestTime: 'October to June',
    duration: '4-6 Days',
    budget: '₹8,000 - ₹25,000',
    rating: 4.8,
    attractions: [
      { name: 'Solang Valley', desc: 'Famous for snow activities, paragliding, and stunning valley views.' },
      { name: 'Rohtang Pass', desc: 'A high mountain pass at 3,978m offering breathtaking panoramic views.' },
      { name: 'Hadimba Temple', desc: 'Ancient cave temple surrounded by tall deodar cedar forests.' },
      { name: 'Old Manali', desc: 'Charming village with cafes, shops, and a vibrant backpacker culture.' },
      { name: 'Beas River', desc: 'Perfect for white water rafting and riverside camping adventures.' },
      { name: 'Jogini Waterfall', desc: 'A serene waterfall trek through apple orchards and pine forests.' }
    ],
    activities: ['Skiing', 'Paragliding', 'River Rafting', 'Trekking', 'Mountain Biking', 'Camping'],
    travelTips: [
      'Book Rohtang Pass permits in advance online.',
      'Carry warm clothing even in summer months.',
      'Try local Himachali cuisine — Siddu and Dham are must-tries.',
      'Avoid monsoon season (July-September) due to landslides.'
    ],
    packages: [
      { name: 'Manali Explorer', days: 4, price: '₹12,999', includes: ['Hotel Stay', 'Solang Valley Trip', 'Old Manali Tour', 'Meals'] },
      { name: 'Manali Adventure', days: 5, price: '₹18,999', includes: ['Hotel Stay', 'Rohtang Pass', 'Paragliding', 'Rafting', 'All Meals'] },
      { name: 'Manali Honeymoon Special', days: 6, price: '₹24,999', includes: ['Luxury Hotel', 'Private Tours', 'Candlelight Dinner', 'All Meals', 'Spa'] }
    ]
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    state: 'Devbhoomi',
    tagline: 'Land of the Gods',
    shortDesc: 'The spiritual heartland of India with sacred rivers, ancient temples, and majestic Himalayan landscapes.',
    description: `Uttarakhand, often referred to as "Devbhoomi" (Land of the Gods), is a state blessed with immense natural beauty and spiritual significance. From the sacred cities of Haridwar and Rishikesh to the stunning hill stations of Nainital and Mussoorie, Uttarakhand offers an incredible diversity of experiences. The state is home to the Char Dham pilgrimage sites and some of India's most spectacular national parks.`,
    image: '/images/uttarakhand.png',
    bestTime: 'March to June & September to November',
    duration: '5-8 Days',
    budget: '₹10,000 - ₹30,000',
    rating: 4.9,
    attractions: [
      { name: 'Rishikesh', desc: 'Yoga capital of the world with thrilling adventure sports and spiritual ashrams.' },
      { name: 'Nainital', desc: 'Beautiful lake city surrounded by mountains, perfect for boating and nature walks.' },
      { name: 'Mussoorie', desc: 'Queen of the Hills with colonial charm, Kempty Falls, and Gun Hill views.' },
      { name: 'Haridwar', desc: 'One of the seven sacred cities with the mesmerizing Ganga Aarti ceremony.' },
      { name: 'Jim Corbett National Park', desc: 'India\'s oldest national park, famous for Bengal tigers and wildlife safaris.' },
      { name: 'Valley of Flowers', desc: 'UNESCO World Heritage site with over 600 species of wildflowers.' }
    ],
    activities: ['Bungee Jumping', 'White Water Rafting', 'Yoga & Meditation', 'Wildlife Safari', 'Trekking', 'Camping'],
    travelTips: [
      'Visit Haridwar for the evening Ganga Aarti — it\'s a once-in-a-lifetime experience.',
      'Rishikesh offers India\'s highest bungee jumping at 83 meters.',
      'Book Jim Corbett safari permits well in advance.',
      'The Valley of Flowers is accessible only from July to September.'
    ],
    packages: [
      { name: 'Uttarakhand Spiritual Tour', days: 5, price: '₹14,999', includes: ['Hotel Stay', 'Haridwar-Rishikesh', 'Ganga Aarti', 'Temple Tours', 'Meals'] },
      { name: 'Uttarakhand Adventure Pack', days: 6, price: '₹21,999', includes: ['Hotel Stay', 'Bungee Jumping', 'Rafting', 'Camping', 'All Meals'] },
      { name: 'Uttarakhand Complete Tour', days: 8, price: '₹32,999', includes: ['Luxury Stay', 'Nainital', 'Mussoorie', 'Rishikesh', 'Corbett Safari', 'All Meals'] }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun, Sand & Serenity',
    shortDesc: 'India\'s ultimate beach paradise with golden sands, vibrant nightlife, and Portuguese heritage.',
    description: `Goa, India's smallest state, is a tropical paradise on the western coast. Famous for its stunning beaches, vibrant nightlife, Portuguese colonial architecture, and delicious seafood cuisine, Goa attracts millions of visitors every year. From the bustling beaches of North Goa to the serene shores of South Goa, there's something for everyone — whether you seek adventure, relaxation, or cultural exploration.`,
    image: '/images/goa.png',
    bestTime: 'November to February',
    duration: '4-6 Days',
    budget: '₹8,000 - ₹28,000',
    rating: 4.7,
    attractions: [
      { name: 'Baga Beach', desc: 'Famous for water sports, beach shacks, and vibrant nightlife.' },
      { name: 'Basilica of Bom Jesus', desc: 'UNESCO World Heritage church holding the remains of St. Francis Xavier.' },
      { name: 'Dudhsagar Falls', desc: 'Magnificent four-tiered waterfall, one of India\'s tallest at 310 meters.' },
      { name: 'Fort Aguada', desc: '17th-century Portuguese fort offering panoramic views of the Arabian Sea.' },
      { name: 'Anjuna Flea Market', desc: 'Iconic Wednesday market with handicrafts, jewelry, and bohemian vibes.' },
      { name: 'Palolem Beach', desc: 'Crescent-shaped beach in South Goa known for its calm waters and beauty.' }
    ],
    activities: ['Scuba Diving', 'Parasailing', 'Jet Skiing', 'Dolphin Watching', 'Casino Nights', 'Heritage Walks'],
    travelTips: [
      'Rent a scooter — it\'s the best way to explore Goa.',
      'Try the local Goan fish curry and bebinca (traditional dessert).',
      'South Goa is quieter and more peaceful than North Goa.',
      'Visit during Carnival (February) for a unique cultural experience.'
    ],
    packages: [
      { name: 'Goa Beach Getaway', days: 4, price: '₹11,999', includes: ['Beach Resort', 'North Goa Tour', 'Water Sports', 'Meals'] },
      { name: 'Goa Complete Experience', days: 5, price: '₹17,999', includes: ['Premium Resort', 'North & South Goa', 'Dudhsagar Trip', 'All Meals'] },
      { name: 'Goa Luxury Escape', days: 6, price: '₹27,999', includes: ['5-Star Resort', 'Private Tours', 'Scuba Diving', 'Casino Night', 'All Meals', 'Spa'] }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of Royal Heritage',
    shortDesc: 'A magnificent city of grand palaces, majestic forts, and vibrant Rajasthani culture.',
    description: `Jaipur, the capital of Rajasthan, is known as the Pink City due to the distinctive terracotta pink color of its buildings. Founded in 1727 by Maharaja Sawai Jai Singh II, it was India's first planned city. Jaipur is part of the famous Golden Triangle tourist circuit along with Delhi and Agra. The city boasts stunning architecture, colorful bazaars, delicious cuisine, and a rich royal heritage that transports you back to the era of Rajput kings.`,
    image: '/images/jaipur.png',
    bestTime: 'October to March',
    duration: '3-5 Days',
    budget: '₹7,000 - ₹22,000',
    rating: 4.7,
    attractions: [
      { name: 'Hawa Mahal', desc: 'The iconic Palace of Winds with 953 small windows and honeycomb facade.' },
      { name: 'Amber Fort', desc: 'Stunning hilltop fort with intricate mirror work and elephant rides.' },
      { name: 'City Palace', desc: 'Grand palace complex blending Rajasthani and Mughal architecture.' },
      { name: 'Jantar Mantar', desc: 'UNESCO World Heritage astronomical observation site with giant instruments.' },
      { name: 'Nahargarh Fort', desc: 'Fort overlooking the city, perfect for sunset views and photography.' },
      { name: 'Jal Mahal', desc: 'Beautiful water palace floating in Man Sagar Lake.' }
    ],
    activities: ['Heritage Walks', 'Elephant Rides', 'Hot Air Ballooning', 'Shopping', 'Rajasthani Cooking Class', 'Cultural Shows'],
    travelTips: [
      'Buy a composite ticket for major monuments to save money.',
      'Visit Amber Fort early morning to avoid crowds.',
      'Johari Bazaar is the best place for traditional Rajasthani jewelry.',
      'Try Dal Baati Churma and Laal Maas for authentic Rajasthani flavors.'
    ],
    packages: [
      { name: 'Jaipur Heritage Tour', days: 3, price: '₹9,999', includes: ['Heritage Hotel', 'Fort Tours', 'Cultural Show', 'Meals'] },
      { name: 'Jaipur Royal Experience', days: 4, price: '₹15,999', includes: ['Palace Hotel', 'All Forts', 'Hot Air Balloon', 'Shopping Tour', 'All Meals'] },
      { name: 'Golden Triangle (Delhi-Agra-Jaipur)', days: 5, price: '₹22,999', includes: ['Premium Hotels', 'Taj Mahal', 'All Jaipur Forts', 'Transport', 'All Meals'] }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'God\'s Own Country',
    tagline: 'Experience Paradise on Earth',
    shortDesc: 'Emerald backwaters, lush tea plantations, pristine beaches, and ancient Ayurvedic traditions.',
    description: `Kerala, located on India's tropical Malabar Coast, is a state known for its palm-lined beaches, backwaters network, and tea-and-spice plantations. Often called "God's Own Country," Kerala offers a unique blend of natural beauty, cultural richness, and wellness traditions. From the serene houseboats of Alleppey to the misty hills of Munnar, Kerala promises an unforgettable journey through one of India's most beautiful states.`,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0d9488, #065f46)',
    bestTime: 'September to March',
    duration: '5-7 Days',
    budget: '₹12,000 - ₹35,000',
    rating: 4.9,
    attractions: [
      { name: 'Alleppey Backwaters', desc: 'Cruise through serene backwaters on a traditional Kerala houseboat.' },
      { name: 'Munnar', desc: 'Hill station with endless rolling tea plantations and misty mountain views.' },
      { name: 'Kochi (Cochin)', desc: 'Historic port city with Chinese fishing nets, spice markets, and colonial heritage.' },
      { name: 'Thekkady', desc: 'Home to Periyar Wildlife Sanctuary with elephants, tigers, and bamboo rafting.' },
      { name: 'Varkala Beach', desc: 'Dramatic cliff-top beach with mineral water springs and stunning sunsets.' },
      { name: 'Wayanad', desc: 'Pristine forests, caves, waterfalls, and ancient tribal heritage.' }
    ],
    activities: ['Houseboat Cruise', 'Ayurvedic Spa', 'Tea Plantation Tour', 'Kathakali Show', 'Wildlife Safari', 'Beach Relaxation'],
    travelTips: [
      'Book houseboat stays in advance during peak season.',
      'Don\'t miss a traditional Kerala Sadhya (feast served on banana leaf).',
      'Visit a spice plantation in Thekkady for an aromatic experience.',
      'Kathakali dance performances in Kochi are a cultural highlight.'
    ],
    packages: [
      { name: 'Kerala Backwater Bliss', days: 5, price: '₹16,999', includes: ['Hotels', 'Houseboat Stay', 'Munnar Tour', 'Meals'] },
      { name: 'Kerala Complete Tour', days: 6, price: '₹23,999', includes: ['Premium Hotels', 'Houseboat', 'Munnar', 'Thekkady', 'Kochi', 'All Meals'] },
      { name: 'Kerala Honeymoon Package', days: 7, price: '₹34,999', includes: ['Luxury Resorts', 'Private Houseboat', 'Ayurvedic Spa', 'Candlelight Dinners', 'All Meals'] }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Eternal Spiritual City',
    shortDesc: 'One of the world\'s oldest living cities, where spirituality meets ancient traditions on the banks of the Ganges.',
    description: `Varanasi, also known as Kashi or Benaras, is one of the oldest continuously inhabited cities in the world. Situated on the banks of the sacred Ganges River, it is the spiritual capital of India. The city's ghats, temples, and narrow lanes create an atmosphere that is both mystical and timeless. Watching the Ganga Aarti at Dashashwamedh Ghat is a soul-stirring experience that draws millions of devotees and travelers alike.`,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #d97706, #92400e)',
    bestTime: 'October to March',
    duration: '3-4 Days',
    budget: '₹6,000 - ₹18,000',
    rating: 4.6,
    attractions: [
      { name: 'Dashashwamedh Ghat', desc: 'The main ghat famous for the spectacular evening Ganga Aarti ceremony.' },
      { name: 'Kashi Vishwanath Temple', desc: 'One of the most famous Hindu temples dedicated to Lord Shiva.' },
      { name: 'Sarnath', desc: 'Sacred Buddhist site where Lord Buddha gave his first sermon.' },
      { name: 'Assi Ghat', desc: 'Popular ghat for morning yoga, meditation, and cultural performances.' },
      { name: 'Manikarnika Ghat', desc: 'The main cremation ghat, considered the most sacred place to attain moksha.' },
      { name: 'Ramnagar Fort', desc: '18th-century fort with a museum of vintage cars, weapons, and royal artifacts.' }
    ],
    activities: ['Boat Ride on Ganges', 'Ganga Aarti', 'Temple Tours', 'Yoga & Meditation', 'Silk Weaving Tour', 'Street Food Walk'],
    travelTips: [
      'Take a sunrise boat ride on the Ganges — it\'s magical.',
      'Varanasi is famous for Banarasi silk sarees — visit the weaving districts.',
      'Try the famous Varanasi street food: kachori, chaat, and lassi.',
      'Respect local customs at the ghats and temples.'
    ],
    packages: [
      { name: 'Varanasi Spiritual Journey', days: 3, price: '₹8,999', includes: ['Hotel Stay', 'Ganga Aarti', 'Boat Ride', 'Temple Tours', 'Meals'] },
      { name: 'Varanasi & Sarnath Explorer', days: 4, price: '₹13,999', includes: ['Heritage Hotel', 'All Ghats Tour', 'Sarnath Visit', 'Silk Tour', 'All Meals'] }
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'Union Territory',
    tagline: 'The Land of High Passes',
    shortDesc: 'A surreal high-altitude desert with crystal-clear lakes, ancient monasteries, and dramatic mountain passes.',
    description: `Ladakh, known as "The Land of High Passes," is a region of stark, barren beauty and ancient Buddhist culture. Located in the northernmost part of India, it features dramatic landscapes of high mountain passes, crystal-clear lakes like Pangong Tso and Tso Moriri, and centuries-old monasteries perched on cliff edges. The region offers some of the most spectacular road trips and trekking experiences in the world.`,
    image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1e40af, #581c87)',
    bestTime: 'June to September',
    duration: '6-8 Days',
    budget: '₹15,000 - ₹40,000',
    rating: 4.9,
    attractions: [
      { name: 'Pangong Lake', desc: 'Mesmerizing blue lake at 14,270 ft, famous from the movie "3 Idiots."' },
      { name: 'Nubra Valley', desc: 'Stunning valley with sand dunes, double-humped camels, and Diskit Monastery.' },
      { name: 'Khardung La', desc: 'One of the world\'s highest motorable passes at 17,582 feet.' },
      { name: 'Leh Palace', desc: 'Former royal palace offering panoramic views of the Stok Kangri range.' },
      { name: 'Thiksey Monastery', desc: '12-story monastery resembling the Potala Palace in Lhasa, Tibet.' },
      { name: 'Magnetic Hill', desc: 'A gravity-defying hill where vehicles appear to roll uphill on their own.' }
    ],
    activities: ['Bike Trip', 'Monastery Hopping', 'Camel Safari', 'River Rafting', 'Star Gazing', 'High Altitude Trekking'],
    travelTips: [
      'Acclimatize for at least 1-2 days in Leh before traveling further.',
      'Carry medication for altitude sickness (AMS).',
      'Inner Line Permit is required for Pangong Lake and Nubra Valley.',
      'The Leh-Manali highway is one of the world\'s most epic road trips.'
    ],
    packages: [
      { name: 'Ladakh Explorer', days: 6, price: '₹22,999', includes: ['Hotel Stay', 'Pangong Lake', 'Nubra Valley', 'Monastery Tour', 'Meals'] },
      { name: 'Ladakh Complete Adventure', days: 8, price: '₹35,999', includes: ['Premium Hotels', 'All Passes', 'Pangong', 'Nubra', 'Tso Moriri', 'Rafting', 'All Meals'] }
    ]
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'Home of the Taj Mahal',
    shortDesc: 'The city of the iconic Taj Mahal, Mughal grandeur, and timeless architectural wonders.',
    description: `Agra, situated on the banks of the Yamuna River, is synonymous with the Taj Mahal — one of the Seven Wonders of the World. But this historic city has much more to offer beyond its crown jewel. From the magnificent Agra Fort to the stunning Fatehpur Sikri, Agra is a treasure trove of Mughal architecture and history. As the former capital of the Mughal Empire, every corner of this city tells a story of love, power, and artistic brilliance.`,
    image: '/images/agra.png',
    bestTime: 'October to March',
    duration: '2-3 Days',
    budget: '₹5,000 - ₹15,000',
    rating: 4.8,
    attractions: [
      { name: 'Taj Mahal', desc: 'The iconic monument of love, a UNESCO World Heritage Site and Wonder of the World.' },
      { name: 'Agra Fort', desc: 'Massive UNESCO World Heritage red sandstone fortress with palaces and mosques.' },
      { name: 'Fatehpur Sikri', desc: 'Abandoned Mughal capital with perfectly preserved 16th-century architecture.' },
      { name: 'Mehtab Bagh', desc: 'Garden complex offering the most beautiful sunset views of the Taj Mahal.' },
      { name: 'Itimad-ud-Daulah', desc: 'Known as the "Baby Taj," an exquisite marble tomb predating the Taj Mahal.' },
      { name: 'Kinari Bazaar', desc: 'Bustling market famous for marble handicrafts, leather goods, and sweets.' }
    ],
    activities: ['Taj Mahal Sunrise Visit', 'Heritage Walk', 'Mughal Cuisine Tour', 'Marble Inlay Workshop', 'Photography Tour', 'Shopping'],
    travelTips: [
      'Visit the Taj Mahal at sunrise for the best experience and fewer crowds.',
      'The Taj Mahal is closed on Fridays.',
      'Try Agra\'s famous Petha (sweet) and Mughlai cuisine.',
      'Hire a licensed guide for the best historical insights.'
    ],
    packages: [
      { name: 'Agra Day Trip', days: 1, price: '₹3,999', includes: ['Transport', 'Taj Mahal', 'Agra Fort', 'Lunch', 'Guide'] },
      { name: 'Agra Heritage Package', days: 2, price: '₹7,999', includes: ['Hotel Stay', 'Taj Mahal Sunrise', 'Agra Fort', 'Fatehpur Sikri', 'All Meals'] },
      { name: 'Agra-Mathura-Vrindavan', days: 3, price: '₹12,999', includes: ['Hotel Stay', 'All Monuments', 'Mathura Tour', 'Vrindavan Tour', 'All Meals'] }
    ]
  }
];

// ============================================
// API ROUTES
// ============================================

// Get all destinations
app.get('/api/destinations', (req, res) => {
  const summaries = destinations.map(d => ({
    id: d.id,
    name: d.name,
    state: d.state,
    tagline: d.tagline,
    shortDesc: d.shortDesc,
    image: d.image,
    gradient: d.gradient,
    bestTime: d.bestTime,
    duration: d.duration,
    budget: d.budget,
    rating: d.rating
  }));
  res.json({ success: true, data: summaries });
});

// Get single destination
app.get('/api/destinations/:id', (req, res) => {
  const dest = destinations.find(d => d.id === req.params.id);
  if (!dest) {
    return res.status(404).json({ success: false, message: 'Destination not found' });
  }
  res.json({ success: true, data: dest });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, destination, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  // In production, you'd save to a database or send an email
  console.log('📩 New Contact Form Submission:');
  console.log(`   Name: ${name}`);
  console.log(`   Email: ${email}`);
  console.log(`   Phone: ${phone || 'Not provided'}`);
  console.log(`   Interested In: ${destination || 'General inquiry'}`);
  console.log(`   Message: ${message}`);
  console.log('---');

  res.json({
    success: true,
    message: 'Thank you for reaching out! We will get back to you within 24 hours.'
  });
});

// Booking inquiry
app.post('/api/booking', (req, res) => {
  const { name, email, phone, destination, packageName, travelers, travelDate, message } = req.body;

  if (!name || !email || !destination) {
    return res.status(400).json({ success: false, message: 'Name, email, and destination are required.' });
  }

  console.log('🎫 New Booking Inquiry:');
  console.log(`   Name: ${name}`);
  console.log(`   Email: ${email}`);
  console.log(`   Phone: ${phone || 'Not provided'}`);
  console.log(`   Destination: ${destination}`);
  console.log(`   Package: ${packageName || 'Custom'}`);
  console.log(`   Travelers: ${travelers || 'Not specified'}`);
  console.log(`   Travel Date: ${travelDate || 'Flexible'}`);
  console.log(`   Message: ${message || 'None'}`);
  console.log('---');

  res.json({
    success: true,
    message: 'Your booking inquiry has been received! Our team will contact you shortly with the best deals.'
  });
});

// Search destinations
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) {
    return res.json({ success: true, data: [] });
  }

  const results = destinations.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.state.toLowerCase().includes(query) ||
    d.tagline.toLowerCase().includes(query) ||
    d.shortDesc.toLowerCase().includes(query) ||
    d.attractions.some(a => a.name.toLowerCase().includes(query))
  ).map(d => ({
    id: d.id,
    name: d.name,
    state: d.state,
    tagline: d.tagline,
    image: d.image,
    gradient: d.gradient
  }));

  res.json({ success: true, data: results });
});

// Serve main page for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌍 ═══════════════════════════════════════════`);
  console.log(`   Go India Travel Server is running!`);
  console.log(`   🌐 http://localhost:${PORT}`);
  console.log(`   📞 Contact: 7906038019, 8650554950`);
  console.log(`   📧 Email: dc09152935@gmail.com`);
  console.log(`🌍 ═══════════════════════════════════════════\n`);
});

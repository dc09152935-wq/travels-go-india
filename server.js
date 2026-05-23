const nodemailer = require('nodemailer');
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

// =========================================================================
// DESTINATIONS DATA (Backend API)
// =========================================================================
const destinations = [
  {
    id: 'agra',
    title: 'Agra - The City of Taj',
    description: 'Experience the epitome of love and rich Mughal heritage.',
    image: '/images/agra.jpg',
    price: '₹4,999'
  },
  {
    id: 'jaipur',
    title: 'Jaipur - The Pink City',
    description: 'Explore majestic forts, royal palaces, and vibrant culture.',
    image: '/images/jaipur.jpg',
    price: '₹5,499'
  },
  {
    id: 'goa',
    title: 'Goa - Beach Paradise',
    description: 'Relax on sun-kissed beaches and enjoy thrilling water sports.',
    image: '/images/goa.jpg',
    price: '₹8,999'
  }
];

// API Route to get destinations
app.get('/api/destinations', (req, res) => {
  res.json({ success: true, data: destinations });
});

app.get('/api/destinations/:id', (req, res) => {
  const dest = destinations.find(d => d.id === req.params.id);
  if (!dest) {
    return res.status(404).json({ success: false, message: 'Destination not found' });
  }
  res.json({ success: true, data: dest });
});

// =========================================================================
// CONTACT & BOOKING FORM SUBMISSION (GMAIL SYSTEM)
// =========================================================================
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, destination, message, package, travelers, travelDate } = req.body;

    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // 1. Logs me dikhane ke liye
    console.log('--- Nayi Inquiry Aayi Hai ---');
    console.log(Name: ${name});
    console.log(Email: ${email});
    console.log(Phone: ${phone || 'Not provided'});
    console.log(Destination/Package: ${destination || package || 'General Enquiry'});

    // 2. Gmail par bejne ka system
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dc09152935@gmail.com', 
                pass: 'ijlfhkcmxvdboela' // Bina space ke set kar diya hai
            }
        });

        let mailOptions = {
            from: 'dc09152935@gmail.com',
            to: 'dc09152935@gmail.com', 
            subject: New Travel Inquiry from ${name},
            text: Website se Nayi Lead Aayi Hai:\n\n +
                  👤 Name: ${name}\n +
                  📧 Email: ${email}\n +
                  📞 Phone: ${phone || 'Not provided'}\n +
                  📍 Destination/Package: ${destination || package || 'General Enquiry'}\n +
                  👥 Travelers: ${travelers || 'Not specified'}\n +
                  📅 Travel Date: ${travelDate || 'Flexible'}\n +
                  💬 Message: ${message || 'None'}
        };

        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully!");

        res.json({ success: true, message: 'Inquiry sent successfully' });

    } catch (error) {
        console.log("Email Sending Failed:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Serve frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(Go India Travel Server is running on port ${PORT});
});

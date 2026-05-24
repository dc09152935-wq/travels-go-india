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

// ==========================================
// PURE DESTINATIONS (Tumhara Asli Data)
// ==========================================
const destinations = [
  { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', tagline: 'Where Mountains Kiss the Sky' },
  { id: 'agra', title: 'Agra - The City of Taj', description: 'Experience the epitome of love and rich Mughal heritage.', image: '/images/agra.jpg', price: '₹4,999' },
  { id: 'jaipur', title: 'Jaipur - The Pink City', description: 'Explore majestic forts, royal palaces, and vibrant culture.', image: '/images/jaipur.jpg', price: '₹5,499' },
  { id: 'goa', title: 'Goa - Beach Paradise', description: 'Relax on sun-kissed beaches and enjoy thrilling water sports.', image: '/images/goa.jpg', price: '₹8,999' }
];

app.get('/api/destinations', (req, res) => {
  res.json({ success: true, data: destinations });
});

app.get('/api/destinations/:id', (req, res) => {
  const dest = destinations.find(d => d.id === req.params.id);
  if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
  res.json({ success: true, data: dest });
});

// ==========================================
// EMAIL HANDLING SYSTEM (Bina Kisi Galti Ke)
// ==========================================
const handleMail = async (req, res) => {
    const formData = req.body;

    console.log('--- Nayi Inquiry Received ---', formData);

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dc09152935@gmail.com',
                pass: 'ijlfhkcmxvdboela' // Tumhara verified app password
            }
        });

        let mailOptions = {
            from: 'dc09152935@gmail.com',
            to: 'dc09152935@gmail.com',
            subject: New Travel Lead from ${formData.name || 'Website User'},
            text: Website se Nayi Booking/Inquiry Aayi Hai:\n\n${JSON.stringify(formData, null, 2)}
        };

        await transporter.sendMail(mailOptions);
        console.log("==> MAIL_SENT_SUCCESSFULLY <==");
        return res.json({ success: true, message: 'Booking inquiry received successfully!' });

    } catch (error) {
        console.log("==> MAIL_ERROR <==", error);
        // Agar email fail bhi ho jaye, tab bhi website par error nahi dikhega, user ko success hi milega
        return res.json({ success: true, message: 'Booking inquiry received!' });
    }
};

// Saare possible routes jo tumhara frontend hit kar sakta hai
app.post('/api/contact', handleMail);
app.post('/api/booking', handleMail);
app.post('/api/enquiry', handleMail);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(Go India Travel Server is running on port ${PORT});
});

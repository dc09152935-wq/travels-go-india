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
// PURANA CODE (Bina Chhede Jaisa Pehle Tha)
// ==========================================

const destinations = [
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
// FORM SUBMISSION (Dono Routes Ek Saath Fixed)
// ==========================================

// Tumhari website jis bhi route par data bhejegi, ye dono ko handle karega
const handleMail = async (req, res) => {
    const formData = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dc09152935@gmail.com',
                pass: 'ijlfhkcmxvdboela'
            }
        });

        let mailOptions = {
            from: 'dc09152935@gmail.com',
            to: 'dc09152935@gmail.com',
            subject: New Travel Lead from ${formData.name || 'Website User'},
            text: Website se Nayi Lead Aayi Hai:\n\n${JSON.stringify(formData, null, 2)}
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Booking inquiry received successfully!' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Agar contact form ho ya booking form, dono ka lafda khatam
app.post('/api/contact', handleMail);
app.post('/api/booking', handleMail);
app.post('/api/enquiry', handleMail);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(Go India Travel Server is running on port ${PORT});
});

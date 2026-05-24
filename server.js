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

// Destinations Data
const destinations = [
  { id: 'agra', title: 'Agra - The City of Taj', description: 'Experience the epitome of love.', image: '/images/agra.jpg', price: '₹4,999' },
  { id: 'jaipur', title: 'Jaipur - The Pink City', description: 'Explore majestic forts.', image: '/images/jaipur.jpg', price: '₹5,499' },
  { id: 'goa', title: 'Goa - Beach Paradise', description: 'Relax on sun-kissed beaches.', image: '/images/goa.jpg', price: '₹8,999' }
];

app.get('/api/destinations', (req, res) => { res.json({ success: true, data: destinations }); });

// Contact Form Submission (Simple Setup)
app.post('/api/contact', async (req, res) => {
    // Jo bhi data form se aayega, sab isme collect ho jayega
    const formData = req.body; 

    console.log('--- Nayi Inquiry Aayi Hai ---');
    console.log(formData);

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
            subject: New Travel Inquiry from ${formData.name || 'Website User'},
            text: Website se Nayi Inquiry Aayi Hai:\n\n${JSON.stringify(formData, null, 2)}
        };

        await transporter.sendMail(mailOptions);
        console.log("==> EMAIL_SENT_SUCCESSFULLY_TO_GMAIL <==");
        res.json({ success: true, message: 'Inquiry sent successfully' });

    } catch (error) {
        console.log("==> EMAIL_SENDING_FAILED <==", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

app.listen(PORT, () => { console.log(Go India Travel Server is running on port ${PORT}); });

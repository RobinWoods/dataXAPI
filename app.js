const express = require('express');

const agencyRoutes = require('./routes/agencyRoutes');
const captorRoutes = require('./routes/captorRoutes');
const cityRoutes = require('./routes/cityRoutes');
const gasRoutes = require('./routes/gasRoutes');
const regionRoutes = require('./routes/regionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const sectorRoutes = require('./routes/sectorRoutes');
const staffRoutes = require('./routes/staffRoutes');
const statementRoutes = require('./routes/statementRoutes');
const usersRoutes = require('./routes/userRoutes');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin : 'https://sentinelle.derenty.net',
    credentials : true
}));

app.use(express.json());

app.use(cookieParser());

// Routes
app.use('/api/agency', agencyRoutes);

app.use('/api/captor', captorRoutes);

app.use('/api/city', cityRoutes);

app.use('/api/gas', gasRoutes);

app.use('/api/region', regionRoutes);

app.use('/api/report', reportRoutes);

app.use('/api/sector', sectorRoutes);

app.use('/api/staff', staffRoutes);

app.use('/api/statement', statementRoutes);

const privateKey = process.env.PRIVATEKEY;
const certificate = process.env.CERTIFICATE;

const credentials = {
    key: privateKey,
    cert: certificate,
};

// Créer le serveur HTTPS
const httpsServer = https.createServer(credentials, app);

// Démarrer le serveur HTTPS
httpsServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


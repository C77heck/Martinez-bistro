const express = require('express');
const path = require('path');
const app = express();
const { exec } = require('child_process');
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

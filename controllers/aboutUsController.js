/**
 * Hiển thị trang About Us.
 */
const renderAboutUsPage = (req, res) => {
    res.render('aboutUs'); // Render file views/aboutUs.ejs
};

module.exports = {
    renderAboutUsPage,
};

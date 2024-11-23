function navigateTo(section) {
    const content = document.getElementById('content');
    const sidebarButtons = document.querySelectorAll('.sidebar button');

    // Xóa trạng thái 'active' của tất cả nút
    sidebarButtons.forEach(button => button.classList.remove('active'));

    // Thêm trạng thái 'active' cho nút tương ứng
    const targetButton = Array.from(sidebarButtons).find(btn => btn.textContent.includes(getButtonText(section)));
    if (targetButton) {
        targetButton.classList.add('active');
    }

    let htmlContent = '';

    switch (section) {
        case 'account':
            changeBackgroundImage('images/images.jpg')
            htmlContent = `
                <div class="section">
                    <h2>Thông tin tài khoản</h2>
                    <p>Tên tài khoản: user123</p>
                    <p>mật khẩu: password123</p>
                </div>
            `;
            break;
        case 'living-room':
            changeBackgroundImage('images/1.jpg')
            htmlContent = `
                <div class="devices">
                    <div class="box">
                        <img src="images/light.svg" alt="light">
                        <p>Đèn trần</p>
                        <label class="switch">
                            <input type="checkbox" id="lightswitch1" onchange="light1()">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="box">
                        <img src="images/fan.svg" alt="fan">
                        <p>Quạt</p>
                        <label class="switch">
                            <input type="checkbox" id="fanswitch1" onchange="fanrotate1()">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            `;
            break;
        case 'dining-room':
            changeBackgroundImage('images/2.jpg')
            htmlContent = `
                <div class="devices">
                    <div class="box">
                        <img src="images/light.svg" alt="light">
                        <p>Đèn trần</p>
                        <label class="switch">
                            <input type="checkbox" id="lightswitch2" onchange="light2()">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="box">
                        <img src="images/fan.svg" alt="fan">
                        <p>Quạt</p>
                        <label class="switch">
                            <input type="checkbox" id="fanswitch2" onchange="fanrotate2()">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            `;
            break;
        case 'bedroom':
            changeBackgroundImage('images/phongkhach.jpg')
            htmlContent = `
                <div class="devices">
                    <div class="box">
                        <img src="images/light.svg" alt="light">
                        <p>Đèn ngủ</p>
                        <label class="switch">
                            <input type="checkbox" id="lightswitch3" onchange="light3()">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="box">
                        <img src="images/fan.svg" alt="fan">
                        <p>Quạt</p>
                        <label class="switch">
                            <input type="checkbox" id="fanswitch3" onchange="fanrotate3()">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            `;
            break;
    }

    content.innerHTML = htmlContent;
    document.querySelector('.dashboard').classList.add('active');
}

function goToHome() {
    changeBackgroundImage('images/bk_background.jpg')
    const content = document.getElementById('content');
    const sidebarButtons = document.querySelectorAll('.sidebar button');

    // Xóa trạng thái 'active' khỏi tất cả nút
    sidebarButtons.forEach(button => button.classList.remove('active'));

    // Hiển thị lại nội dung trang chủ
    content.innerHTML = `
        <div class="mainrow">
            <div class="box1">
                <h2>Today</h2>
                <div class="datetime">
                    <p id="date"></p>
                    <p id="time"></p>
                </div>
                <div class="temp">
                    <div class="Temperature">
                        <strong>24</strong><sup>°C</sup>
                        <p>Temperature</p>
                    </div>
                    <div class="Humidity">
                        <strong>84%</strong>
                        <p>Humidity</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.dashboard').classList.remove('active');

    // Khởi động lại đồng hồ
    startTime();
}

function getButtonText(section) {
    const mapping = {
        'account': 'Tài khoản',
        'living-room': 'Phòng khách',
        'dining-room': 'Phòng ăn',
        'bedroom': 'Phòng ngủ',
    };
    return mapping[section] || '';
}

function startTime() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = today.toLocaleString('en-US', options);
    document.getElementById('date').innerHTML = `${day}/${month}/${year}`;
    document.getElementById('time').innerHTML = timeString;
    setTimeout(startTime, 500);
}

function changeBackgroundImage(imageUrl) {
    const dashboard = document.querySelector('.dashboard'); // Chọn phần tử có class .dashboard
    if (dashboard) {
        dashboard.style.backgroundImage = `url('${imageUrl}')`; // Cập nhật ảnh nền
    } else {
        console.error('Phần tử .dashboard không tồn tại!');
    }
}

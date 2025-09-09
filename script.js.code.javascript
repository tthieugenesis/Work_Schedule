// DÁN URL BẠN VỪA COPY TỪ APPS SCRIPT VÀO ĐÂY
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6UC4hTZlraHle5U1ex35dBcwooMCvfbSeGBzUGX9CpI82EtT18i5UqeDWbsMd2g5k6A/exec'; 

async function loadData() {
    try {
        const response = await fetch(SCRIPT_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        allData = await response.json();
        
        // Dữ liệu đã ở định dạng JSON, không cần parse CSV nữa
        populateFilters();
        renderGrid();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        // Hiển thị lỗi cho người dùng nếu không tải được dữ liệu
        gridContainer.innerHTML = '<p style="color: red; text-align: center;">Không thể tải dữ liệu lịch làm việc. Vui lòng thử lại sau.</p>';
    }
}

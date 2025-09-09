// DÁN URL BẠN VỪA COPY TỪ APPS SCRIPT VÀO ĐÂY
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqS43rb4ajwccIqeY9L7tSa0hJc1--LxvEF5a20AKiSJVOYOG3Abc28j_Eld0dcvWc/exec'; 

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


// Truy cập vào ô input
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');
const birthdayEl = document.getElementById('birthday');


// xử lý quay lại trang index
const btnBack = document.querySelector('.btn-back');

btnBack.addEventListener('click', function () {
    window.location.href = '/'; // điều hướng về trang chủ
})

// Xử lý thêm user
const btnSave = document.querySelector('#btn-save');
btnSave.addEventListener('click', async function () {
    try { // thiếu check giá trị các trường nhập vào
        // Tạo object với dữ liệu đã được cập nhật
        let userNew = {
            name: nameEl.value,
            phone: phoneEl.value,
            email: emailEl.value,
            birthday: birthdayEl.value
        }

        // Gọi API để cập nhật
        let res = await axios({
            method: 'post',
            url: `/users/`,
            data: userNew
        })

        if (res.data) {
            window.location.href = '/';
        }
    } catch (error) {
        console.log(error);
    }
})

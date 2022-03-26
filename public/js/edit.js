let params = new URLSearchParams(window.location.search)
let id = params.get("id");

const getUser = async (id) => { // truyền id tương ứng vào

    try {
        let res = await axios.get(`/users/${id}`)

        renderUser(res.data)

    } catch (error) {
        console.log(error);
    }
}

// Truy cập vào ô input
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');
const birthdayEl = document.getElementById('birthday');

const renderUser = user => {
    nameEl.value = user.name;
    emailEl.value = user.email;
    phoneEl.value = user.phone;
    birthdayEl.value = user.birthday;
}

// xử lý quay lại trang index
const btnBack = document.querySelector('.btn-back');

btnBack.addEventListener('click', function () {
    window.location.href = '/'; // điều hướng về trang chủ
})

// Xử lý cập nhật thông tin user
const btnSave = document.querySelector('#btn-save');
btnSave.addEventListener('click', async function () {
    try { // thiếu check giá trị các trường nhập vào
        // Tạo object với dữ liệu đã được cập nhật
        let userUpdate = {
            id: id,
            name: nameEl.value,
            phone: phoneEl.value,
            email: emailEl.value,
            birthday: birthdayEl.value
        }

        // Gọi API để cập nhật
        let res = await axios({
            method: 'put',
            url: `/users/${id}`,
            data: userUpdate
        })

        if (res.data) {
            window.location.href = '/';
        }
    } catch (error) {
        console.log(error);
    }
})

getUser(id)
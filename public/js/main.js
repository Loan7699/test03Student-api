// 1. Hiển thị danh sách users
let users = '';
async function getUsersList() {
    try {
        let res = await axios.get('http://localhost:3000/users');
        users = res.data;

        // Render ra ngoài giao diện
        renderUsersList(users);

    } catch (error) {
        console.log(error);
    }
}

let usersEl = document.querySelector('tbody');

function renderUsersList(arr) {
    usersEl.innerHTML = '';

    // Kiểm tra mảng rỗng
    if (arr.length == 0) {
        usersEl.innerHTML = "Không có user nào trong danh sách";
        return;
    }
    // trường hợp có user
    for (let i = 0; i < arr.length; i++) {
        let t = arr[i];
        usersEl.innerHTML += `
            <tr>
                <td>${t.name}</td>
                <td>${t.birthday
            }</td>
                <td>${t.phone}</td>
                <td>${t.email}</td>
                <td>
                    <a href="/edit.html?id=1" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
                    |
                    <a class="text-danger" onclick="deleteUser(${t.id})"><i class="fa fa-trash-alt"></i> Xóa</a>
                </td>
            </tr>
        `
    }
}

window.onload = () => {
    getUsersList();
}

// Tạo users
let btnSave = document.querySelector('.btn-success');
let nameEl = document.querySelector('#name');
let birthdayEl = document.querySelector('#birthday');
let phoneEl = document.querySelector('#phone');
let emailEl = document.querySelector('#email');
let inputEles = document.querySelectorAll('.form-control');


// Lắng nghe sự kiệm bấm vào 'Lưu' gọi hàm kiểm tra giá trị
btnSave.addEventListener('click', function () {

    Array.from(inputEles).map((ele) =>
        ele.classList.remove('success', 'error')
    );

    let isValid = checkValidate();

    if (isValid) {
        alert('Đăng ký thành công');
    }
})

// Hàm kiểm tra giá trị nhập vào input
function checkValidate() {

    let nameValue = nameEl.value;
    let birthdayValue = birthdayEl.value;
    let phoneValue = phoneEl.value;
    let emailValue = emailEl.value;

    let isCheck = true;

    // kiểm tra username
    if (nameValue == '') {
        setError(nameEl, 'Name không được để trống');
        isCheck = false;
    } else {
        setSucess(nameEl);
    }

    // kiểm tra email
    if (emailValue == '') {
        setError(emailEl, 'Email không được để trống')
        isCheck = false;
    } else if (!isEmail(emailEl)) {
        setError(emailEl, 'Email không đúng định dạng')
        isCheck = false;
    } else {
        setSucess(emailEl);
    }

    // kiểm tra trường phone
    if (phoneValue == '') {
        setError(phoneEl, 'Phone không được để trống')
        isCheck = false;
    } else if (!isPhone(phoneEl)) {
        setError(phoneEl, 'Phone không đúng định dạng')
        isCheck = false;
    } else {
        setSucess(phoneEl);
    }

    // kiểm tra trường birthday
    if (birthdayValue == '') {
        setError(birthdayEl, 'Birthday không được để trống')
        isCheck = false;
    } else {
        setSucess(birthdayEl);
    }

    return isCheck;
}

function setError(ele, mes) {
    let parentEle = ele.parentNode
    parentEle.insertAdjacentHTML('beforeend', `<span style = 'color: red'>${mes}</span>`);
}

function setSucess(ele) {
    ele.parentNode.classList.add('success');
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}

// Hiển thị kết quả đăng ký trên trang users
// Random ngẫu nhiên Id
function createId() {
    return Math.floor(Math.random() * 100000);
}

// API thêm user
// async function createUser() {
//     try {
//         let res = await axios.post('/users');
//         console.log(res.data);
//     } catch (error) {
//         console.log(error);
//     }
// }


// Xóa user
let deleteBtn = document.querySelector('.text-danger');

deleteBtn.addEventListener('click', function() {
    console.log(deleteBtn);
    alert('Bạn chắc chắn muốn xóa user này');
})
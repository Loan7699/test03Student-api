// Chữa BT
const getUsers = async () => {
    try {
        let res = await axios.get("/users?_sort=id&_order=desc") // desc giảm dần, asc tăng dần

        // Render data
        renderUser(res.data);

    } catch (error) {
        console.log(error);
    }
}

const tableContentEl = document.querySelector(".table-user tbody");
console.log(tableContentEl);

// render danh sách
const renderUser = arr => {
    tableContentEl.innerHTML = '';

    let html = '';
    for (let i = 0; i < arr.length; i++) {
        const u = arr[i];
        html += `
        <tr data-id="${u.id}">
            <td>${u.name}</td>
            <td>${u.birthday}4</td>
            <td>${u.email}</td>
            <td>${u.phone}</td>
            
            <td>
                <a href="/edit.html?id=${u.id}" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
                |
                <a class="text-danger" onclick="deleteUser(${u.id})"><i class="fa fa-trash-alt"></i> Xóa</a>
            </td>
        </tr>
        `
    }
    tableContentEl.innerHTML = html;
}

// 2. Xóa user
const deleteUser = async (id) => {
    try {
        isConfirm = confirm('Bạn có muốn xóa không');
        if (isConfirm) {
            await axios.delete(`/users/${id}`);

            let tr = document.querySelector(`[data-id="${id}"]`)
            console.log(tr);
            tr.parentElement.removeChild(tr);
            // let tr = btn.parentElement.parentElement // btn: thẻ a => td => tr
            // tr.parentElement.removeChild(tr) // truy cập cha xóa phần tử con
        }
    } catch (error) {
        console.log(error);
    }
}

getUsers();
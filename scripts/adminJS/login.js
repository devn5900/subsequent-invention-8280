let adDetails = {
    name: 'devn',
    password: '1234',
    stat: false
}
localStorage.setItem('adminDetails', JSON.stringify(adDetails));
document.querySelector('#adminLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.getElementById('adname').value;
    let pass = document.getElementById('adpass').value;
    if (name == "") {
        document.getElementById('adname').style.border = '1px solid red';
    } else if (pass == "") {
        document.getElementById('adname').style.border = 'none';
        document.getElementById('adpass').style.border = '1px solid red';
    } else {

        let stData = JSON.parse(localStorage.getItem('adminDetails')) || {};
        if (stData['name'] == name && stData['password'] == pass) {
            stData.stat = true;
            localStorage.setItem('adminDetails', JSON.stringify(stData));
            window.location.href = './dashboard.html';
        } else {
            document.getElementById('adpass').style.border = '1px solid red';
            document.getElementById('adname').style.border = '1px solid red';

        }
    }
});
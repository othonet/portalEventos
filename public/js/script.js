const containerMsg = document.querySelector('.msg');
const btnCloseAlert = document.querySelector('.btnClose');
btnCloseAlert.addEventListener('click', (e) => {
    containerMsg.style.display = 'none';
})
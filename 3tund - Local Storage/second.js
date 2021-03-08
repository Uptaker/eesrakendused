let fname, lname, email, saveLocal, loadLocal, deleteLocal, dataContainer;

window.onload = function() {
    init();
}

function init() {
    fname = document.querySelector('#fname');
    lname = document.querySelector('#lname');
    email = document.querySelector('#email');
    saveLocal = document.querySelector('#saveLocal');
    loadLocal = document.querySelector('#loadLocal');
    deleteLocal = document.querySelector('#deleteLocal');
    dataContainer = document.querySelector('#dataContainer');

    saveLocal.addEventListener('click', () => {
        let error = false;
        if (fname.value.length < 2) {
            error = true;
            fname.style.borderColor = 'red';
        } else {
            fname.style.borderColor = 'grey';
        }
        if (lname.value.length < 2) {
            error = true;
            lname.style.borderColor = 'red';
        } else {
            lname.style.borderColor = 'grey';
        }
        if (email.value.length < 2) {
            error = true;
            email.style.borderColor = 'red';
        } else {
            email.style.borderColor = 'grey';
        }

        if (!error) {
            let data = {
                firstName: fname.value,
                lastName: lname.value,
                email: email.value
            }
            localStorage.setItem('personData', JSON.stringify(data));
        } else {
            dataContainer.append(`Invalid input!`);
        }
    });

    loadLocal.addEventListener('click', () => {
        console.log('loaded');
        const localData = JSON.parse(localStorage.getItem('personData'));
        dataContainer.innerHTML = `Eesnimi: ${localData.firstName}<br>
        Perekonnanimi: ${localData.lastName}<br>
        Email: ${localData.email}`;
        // dataContainer.append(`Perekonnanimi: ${localData.lastName}`);
        // dataContainer.append(`Email: ${localData.email}`);
    });

    deleteLocal.addEventListener('click', () => {
        localStorage.removeItem('personData');
    });
}
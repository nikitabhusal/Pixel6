const usernameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const phoneImgEl = document.querySelector('#phoneImg');
const phoneStateEl = document.querySelector('#phoneState');
const userFirstNameEl = document.querySelector('#userfirstname');
const phoneNumberEl = document.querySelector('#phonenumber');
const otpEl = document.querySelector('#otp');

const userDetails = {
    name: '',
    email: '',
    phone: '',
    otp: ''
}
const form = document.querySelector('#user');
const otpForm = document.querySelector('#otpForm');
const otpSuccessForm = document.querySelector('#otpSuccess');

let otpAttemps = 0;

const checkName = () => {
    let valid = false;
    const min = 4, minWords = 2;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
        showError(usernameEl, 'Name cannot be blank.');
    } else if (username.split(' ').length < minWords) {
        showError(usernameEl, `Name must have firstname and lastname.`)
    } else {
        let validName = false;
        for (let name of username.split(' ')) {
            validName = name.length < min
        }
        if (validName) {
            showError(usernameEl, `Each word in name must have min 4 char.`)
        } else {
            showSuccess(usernameEl);
            valid = true;
        }
    }
    userDetails.name = username;
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    userDetails.email = email;
    return valid;
};

const checkPhone = () => {
    let valid = false;

    const phone = phoneEl.value.trim();

    if (!isRequired(phone)) {
        showError(phoneEl, 'Phone cannot be blank.');
    } else if (phone.length < 14) {
        showError(phoneEl, 'Phone must be 10 digit no');
    } else {
        showSuccess(phoneEl);
        valid = true;
    }
    phoneEl.value = formatPhoneNumber(phone) || phone;
    userDetails.phone = phoneEl.value;
    return valid;
};

const checkOTP = () => {
    let valid = false;
    const otp = otpEl.value.trim();
    console.log(userDetails, otp);
    if (!isRequired(otp)) {
        showError(otpEl, 'Please enter OTP.');
    } else if (Number(otp) != userDetails.otp) {
        otpAttemps += 1;
        showError(otpEl, 'Invalid OTP, Please re-enter')
    } else {
        showSuccess(otpEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const formatPhoneNumber = (phoneNumberString) => {
    const input = phoneNumberString.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    let valid = true;
    const areaCode = input.substring(0, 3);
    if (isBetween(Number(areaCode), 621, 799)) {
        phoneImgEl.src = 'img/jio.svg'
    }
    else if (isBetween(Number(areaCode), 801, 920)) {
        phoneImgEl.src = 'img/idea.svg'
    }
    else if (isBetween(Number(areaCode), 921, 999)) {
        phoneImgEl.src = 'img/vodafone.svg'
    }
    else {
        phoneImgEl.src = ''
        valid = false;
        showError(phoneEl, 'Invalid phone number');
    }
    const middle = input.substring(3, 6);
    phoneStateEl.innerHTML = valid && middle ? states[Number(middle) % 36] : ''; // reminder after number divisible by 36 is the state no
    const last = input.substring(6, 10);

    if (input.length > 6) { phoneNumberString = `(${areaCode})-${middle}-${last}`; }
    else if (input.length > 3) { phoneNumberString = `(${areaCode})-${middle}`; }
    else if (input.length > 0) { phoneNumberString = `(${areaCode}`; }
    return phoneNumberString;
};

const isRequired = value => value === '' ? false : true;
const isBetween = (value, min, max) => value < min || value > max ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isNameValid = checkName(),
        isEmailValid = checkEmail()
    isPhoneValid = checkPhone();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isPhoneValid

    // submit to the server if the form is valid
    if (isFormValid) {
        userDetails.otp = Math.floor(1000 + Math.random() * 9000);
        alert(userDetails.otp)
        userFirstNameEl.innerHTML = userDetails.name.substring(0, userDetails.name.indexOf(' '));
        phoneNumberEl.innerHTML = userDetails.phone;
        form.classList.add('hide');
        otpForm.classList.add('show');
    }
});

form.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
            break;
    }
});

const redirectToPixel = () => {
    window.location.href = "http://pixel6.co/"
}

const redirectTo404 = () => {
    window.location.href = "http://pixel6.co/404"
}

otpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (checkOTP()) {
        otpForm.classList.remove('show');
        otpForm.classList.add('hide');
        otpSuccessForm.classList.add('show');
        setTimeout(() => {
            redirectToPixel();
        }, 5000)
    }
    else if (otpAttemps == 3) {
        redirectTo404();
    }
})


const states = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"];
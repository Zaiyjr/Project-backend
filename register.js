const submitData = async()=>{
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let emailDOM = document.querySelector('input[name=email]')
    let passwordDOM = document.querySelector('input[name=password]')
  /*  let dobDOM = document.querySelector('input[name=dob')
    let provinceDOM = document.querySelector('input[name=province]')
   */
    let genderDOM = document.querySelector('input[name=gender]:checked')
    let interestingDOM = document.querySelectorAll('input[name=interesting]:checked')
    let describeDOM = document.querySelector('textarea[name=describe]')

    let interesting = ''
    for(let i = 0; i<interestingDOM.length;i++){
        interesting += interestingDOM[i].value
        if(i != interestingDOM.length - 1){
            interesting += ', '
        }
    }

    let userData = {
        firstname: firstNameDOM.value,
        lastname: lastNameDOM.value,
        age: ageDOM.value,
        email: emailDOM.value,
        password: passwordDOM.value,
        dob: dobDOM.value,
        provice: provinceDOM.value,
        gender: genderDOM.value,
        interesting: interesting,
        description: describeDOM.value
    }
    console.log('submit data', userData);
    const response = await axios.post('localhost:4000/users',userData)
   console.log('response',response.data);
}
   
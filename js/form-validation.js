// get all the inputs
const inputs = document.querySelectorAll(".input");

// functions
const handleFocus = (e) => {
    // get the parent
    const parent = e.target.parentElement;
    // get the icon
    const icon = e.target.nextElementSibling;
    
    console.log("focused",e.target, parent, icon);
    
    //add the focused class 
    parent.classList.add('focused');

    // then remove success and error
    parent.classList.remove('success');
    parent.classList.remove('error');

    // then remove the icon
    icon.className = "icon fas";
}

const handleBlur = (e) => {
    // get the parent
    const parent = e.target.parentElement;
    // get the icon
    const icon = e.target.nextElementSibling;
    
    console.log("blur",e.target.checkValidity(), parent, icon);

    if (e.target.checkValidity()) {
        parent.classList.add('success');
        icon.classList.add('fa-check');
    }else {
        parent.classList.add('error');
        icon.classList.add('fa-exclamation');
    }

}
// add event listeners on the inputs
inputs.forEach(input => {
    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);
    // input.addEventListener('input', handleInput);
})

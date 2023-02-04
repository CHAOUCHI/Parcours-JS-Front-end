const form = document.querySelector("#formulaire");

form.addEventListener("submit",function(event){
    event.preventDefault();

    const prenom = document.querySelector("#prenom").value.trim();
    const nom = document.querySelector("#nom").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();
    
    if(prenom.length < 2){
        document.querySelector("#prenom").nextElementSibling.classList.remove("invisible")
    }

    const data = {
        prenom : prenom,
        nom : nom,
        email : email,
        message : message
    }
    console.log(data);
    // fetch("http://www.domain.com/api/sendMail",{
    //     method : "POST",
    //     body : data
    // });
});
class AuthenticationService {

    login(user) {
        
        let userJsonString = JSON.stringify(user);
        sessionStorage.setItem("loggedInUser", userJsonString)

    }
    
    logout() {
        sessionStorage.removeItem("loggedInUser");
    }
    
    isUserLoggedIn(email) {
        let savedUserJsonString = sessionStorage['loggedInUser'];

        if (savedUserJsonString == null) return false;
    
        let user = JSON.parse(savedUserJsonString);

        console.log("user:  " + user)

        return user != null && user.email != null && user.email.includes("@");
    }

}

export default new AuthenticationService()
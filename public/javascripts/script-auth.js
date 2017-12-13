function toggleSignInGoogle() {
    console.log('Google Toggle')
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut();
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithRedirect(provider);
    }
    // [START_EXCLUDE]
    document.getElementById('Google-signin').disabled = true;
    // [END_EXCLUDE]
}

function toggleSignInGithub() {
    console.log('Github Toggle')

    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GithubAuthProvider();

        provider.addScope('repo');

        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut();
        var provider = new firebase.auth.GithubAuthProvider();

        provider.addScope('repo');

        firebase.auth().signInWithRedirect(provider);
    }
}

function initApp() {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            var credential = result.credential;
            var user = result.user;
            // [START_EXCLUDE]
            document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
            // [END_EXCLUDE]
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);

        var email = error.email;
        console.log(email);

        var credential = error.credential;
        console.log(credential);


        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
        } else {
            console.error(error);
        }
    });
    // [END getidptoken]
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-account-details').textContent = 'null';
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
            // [END_EXCLUDE]
        };
    });
    document.getElementById('Google-signin').addEventListener('click', toggleSignInGoogle, false);
    document.getElementById('Github-signin').addEventListener('click', toggleSignInGithub, false);
}
window.onload = function () {
    initApp();
};

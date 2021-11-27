import initializeFirebase from "../components/Firebase/Firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, sendEmailVerification, sendPasswordResetEmail, signOut, getIdToken } from "firebase/auth";
import { useState, useEffect } from "react";


initializeFirebase();

const useFirebase = () => {
    // MUI Snackbar starts
    const [open, setOpen] = useState(false);
    // MUI Snackbar ends

    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');
    const [admin, setAdmin] = useState(false);

    const getName = (e) => {
        setName(e.target.value);
    }
    const getEmail = (e) => {
        setEmail(e.target.value);
    }
    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const signUpUsingEmail = () => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUsingEmail = () => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUserName = () => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }
    const resetUserPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess('Password Reset confirmation sent to your mail successfully!');
                setOpen(true);
                setError('');
            })
            .catch(err => {
                setError(err.code);
                setOpen(true);
                setSuccess('');
            });
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setSuccess('Logged out successfully!');
                setOpen(true);
                setError('');
            })
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, userInfo => {
            if (userInfo && userInfo.emailVerified) {
                getIdToken(userInfo)
                    .then(idToken => {
                        setToken(idToken);
                        localStorage.setItem('idToken', idToken);
                    })
                setUser(userInfo);
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        })
        return () => unsubscribed;
    }, [auth]);

    useEffect(() => {
        fetch(`https://evil-coffin-47333.herokuapp.com/users/admins/verify?email=${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.isAdmin));
    }, [user.email]);

    return {
        user,
        setUser,
        token,
        admin,
        name,
        email,
        password,
        getName,
        getEmail,
        getPassword,
        error,
        success,
        setError,
        setSuccess,
        signInUsingGoogle,
        signUpUsingEmail,
        signInUsingEmail,
        updateUserName,
        verifyEmail,
        resetUserPassword,
        logOut,
        isLoading,
        setIsLoading,
        open,
        setOpen,
    }
}

export default useFirebase;
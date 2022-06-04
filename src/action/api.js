
const base = process.env.NODE_ENV === "production" ? 'https://customer-support-messages.herokuapp.com' : 'http://localhost:3001';
console.log(process.env.NODE_ENV)
const login = async(username, password)=> {
    return fetch(base +"/login", {
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            username, password
        })
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {success: false, message: 'something went wrong'}
    });
}

const logout = async()=> {
    return fetch(base +"/logout", {
        method: 'GET',
        credentials: 'include',
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {status: false, message: 'something went wrong'}
    });
}

const checklogin = async()=> {
    return fetch(base +"/checkLoggedIn", {
        method: 'GET',
        credentials: 'include',
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {status: false, message: 'something went wrong'}
    });
}

const bootstrap = async() => {
    return fetch(base +"/bootstrap", {
        method: 'GET',
        credentials: 'include',
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {status: false, message: 'something went wrong'}
    });
}

const updateMasterAction = async(selected, to)=> {
    return fetch(base +"/masterAction", {
        method: 'PUT',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            selected,to
        })
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {success: false, message: 'something went wrong'}
    });
}

export default {login, logout, checklogin, bootstrap, updateMasterAction};
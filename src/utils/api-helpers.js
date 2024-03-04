/*
* GET helper function with fetch
*/
export async function fetchGetJSON(url){
    try {
        const data = await fetch(url).then((res) => res.json())
        return data
    }
    catch (err) {
        if(err instanceof Error){
            throw new Error(err.message)
        }
        throw err
    }
}

/*
* POST helper function with fetch
* This structure can be followed to create PUT, DELETE etc
*/

/* Example use case on Client side needs to be wrapped in useEffect()

useEffect(() => {
    fetchPostJSON('api/create_user', {
        email: 'johndoe@gmail.com',
    }).then((data) => {
        //... outcomes
    })
}, [args...])

*/

export async function fetchPostJSON(url, data = {}){
    try{
        console.log(data)
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data || {})
        })
        console.log(data)
        return await response.json()
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        throw err
    }
}
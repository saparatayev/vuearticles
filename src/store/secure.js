export default {
    actions: {
        getSecure () {
            const token = localStorage.getItem('token');
            
            return new Promise((resolve,reject) => {
                fetch(`http://restfulapi/api/secure?token=${token}`)
                .then(res => {
                    if(res.status === 200) resolve(res.json())
                    else resolve(res.status)
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    }
}
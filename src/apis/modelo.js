
export const fetchEvents = async() => {
    const q = await query(collection(firestore, tabla));
    try {
        const results = [];
        onSnapshot(q, (element) => {
            element.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            //this.user=results
        });
        return results;
    } catch (e) {
    console.error('Error getting documents: ', e);
    }
    //const response = await fetch(`${baseURL}/events`);
    //return await response.json(); 
}

/* export const storeEvent = async(event) => {
    return await fetch(`${baseURL}/events`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(event)
    }) 
}

export const mutateEvent = async(event,id) => {
    return await fetch(`${baseURL}/events/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(event)
    }) 
}

export const destroyEvent = async(event,id) => {
    return await fetch(`${baseURL}/events/${id}`,{
        method:'PUT'
    }) 
}    */
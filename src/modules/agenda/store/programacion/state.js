
export default () => ({
    isLoading: true,
    entries: localStorage.getItem('entries')
        ? JSON.parse(localStorage.getItem('entries'))
        : []
})
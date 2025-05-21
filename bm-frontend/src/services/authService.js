export const api = {
    async getUser() {
        const res = await fetch('api/users');
        const data = await res.json();        
        return data;
    }
}
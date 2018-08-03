import "whatwg-fetch";

export default class ServerCommunication {

    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    async getTimers() {
        return (await fetch(`${this.baseUrl}/api/timers`)).body;
    }

    async startTimer({id, start = Date.now()}) {
        return await fetch(`${this.baseUrl}/api/timers/start`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, start})
        });
    }

    async stopTimer({id, stop = Date.now()}) {
        return await fetch(`${this.baseUrl}/api/timers/stop`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, stop})
        });
    }

    async createTimer(attrs) {
        return await fetch(`${this.baseUrl}/api/timers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attrs)
        });
    }

    async updateTimer(attrs) {
        return await fetch(`${this.baseUrl}/api/timers`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attrs)
        });
    }

    async deleteTimer(id) {
        return await fetch(`${this.baseUrl}/api/timers`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: id})
        });
    }
}

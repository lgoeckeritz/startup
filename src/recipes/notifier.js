class Notifier {

    socket;
    handler;

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onmessage = async (event) => { 
          const msg = JSON.parse(await event.data.text());
          this.displayMsg(msg.from, msg.value);
        };
    }

    addHandler(handler) {
        this.handler = handler;
    }
    //don't think I need this
    removeHandler() {
        this.handler = null;
    }

    displayMsg(from, msg) { 
        this.handler(from + " viewed " + msg)
    }

    broadcastEvent(from, value) { 
        const event = {
          from: from,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
    }

}

const notifier = new Notifier();
export { notifier };
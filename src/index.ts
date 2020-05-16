import App from "./app";

const server = App.instance;

server.start(() => {
    console.log(`Server running in port ${server.port} ready`);
});

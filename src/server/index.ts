import { Server } from "./svc/server.ts";

const setup = ()=>{
	const server = new Server();
	server.start();
};

setup();


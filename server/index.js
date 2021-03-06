const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "../protos/dummy.proto";
const protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const dummyProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(dummyProto.DummyService.service, {

});


server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server at port:", port);
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);

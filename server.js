const http = require("http");
const PORT = 600;

let bukky = "bukola";

const CodeLab = [
  { id: 1, name: "Bukky" },
  { id: 2, name: "Peter" },
  { id: 3, name: "Ndidi" },
  { id: 4, name: "Osas" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Sam" },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      let status = 404;
      let response = {
        success: false,
        data: null,
      };

      if (method === "GET" && url === "/CodeLab") {
        status = 200;
        response.success = true;
        response.data = CodeLab;
      } else if (method === "POST" && url === "/CodeLab") {
        const { id, name } = JSON.parse(body);
        CodeLab.push({ id, name });
        status = 201;
        response.success = true;
        response.data = CodeLab;
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(response));
    });
});

server.listen(PORT, () => {
  console.log(`Finally, PORT: ${PORT} is now Open for ${bukky}`);
});

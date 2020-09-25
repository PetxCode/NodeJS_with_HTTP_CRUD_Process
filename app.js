const http = require("http");
const PORT = 300;

const codelab = [
  { id: 1, name: "Peter" },
  { id: 2, name: "Bukky" },
  { id: 3, name: "Ndidi" },
  { id: 4, name: "Grace" },
];

const app = http.createServer((req, res) => {
  console.log("Server is all set and Ready");
  const body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      //body = Buffer.concat(body).toString();

      const { method, url } = req;
      let status = 404,
        response = {
          success: false,
          data: null,
        };

      if (method === "GET" && url === "/codelab") {
        status = 200;
        response.success = true;
        response.data = codelab;
      } else if (method === "POST" && url === "/codelab") {
        const { id, name } = JSON.parse(body);

        if (!id || !name) {
          status = 404;
          (response.data = null), (response.success = false);
        } else {
          codelab.push({ id, name });

          status = 201;
          response.success = true;
          response.data = codelab;
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(response));
    });
});

app.listen(PORT, () => {
  console.log(`port is ready on ${PORT}`);
});

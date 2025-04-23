import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import querystring from 'querystring';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simulando base de datos en memoria
let db = {
  users: {
    'admi': { pswd: "123", auth: 1 },
    'alex': { pswd: "ok", auth: 0 }
  }
};


var content = {
  video: [{
    src: 'static/video/lol gameplay warwick.mp4',
    title: 'lol gameplay warwick',
    author: 'Autor del video',
    price: '$10',
    extension: 'png',
    category: 'Categoría del video',
    rating: '4.5',
    description: 'Descripción del video'
}],
  audio:[{
      src: 'static/audio/Married life.mp3',
      title: 'Married life',
      author: 'Autor del video',
      price: '$10',
      extension: 'png',
      category: 'Categoría del video',
      rating: '4.5',
      description: 'Descripción del video'
  }],
  image:[{
      src: 'static/image/Dedos dibujados.jpg',
      title: 'Dedos dibujados',
      author: 'Autor del video',
      price: '$10',
      extension: 'png',
      category: 'Categoría del video',
      rating: '4.5',
      description: 'Descripción del video'
  }]
};


// Función para servir archivos estáticos
function serveFile(res, filePath, contentType = 'text/html') {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Archivo no encontrado");
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Función para parsear datos de formularios
function parseBody(req, callback) {
  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => callback(querystring.parse(body)));
}

// Crear servidor
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;

  // Rutas GET
  if (method === "GET") {
    if (url.pathname === "/") {
      serveFile(res, path.join(__dirname, "templates", "main_view.html"));
    } else if (url.pathname.startsWith("/styles") || url.pathname.startsWith("/scripts") || url.pathname.startsWith("/static")) {
      // Archivos estáticos como imágenes, videos, audios
      const filePath = path.join(__dirname, "templates", url.pathname);
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".jpg": "image/jpeg",
        ".png": "image/png",
        ".mp4": "video/mp4",
        ".mp3": "audio/mpeg"
      };
      serveFile(res, filePath, mimeTypes[ext] || 'application/octet-stream');
    } else {
      // Ruta no encontrada
      res.writeHead(404);
      res.end("Página no encontrada");
    }
  }

  // Rutas POST
  else if (method === "POST") {
    if (url.pathname === "/signin") {
      parseBody(req, data => {
        if (db.users[data.name] && db.users[data.name].pswd === data.password) {
          if (db.users[data.name].auth == 1) {
            serveFile(res, path.join(__dirname, "templates", "admi_view.html"));
          } else {
            serveFile(res, path.join(__dirname, "templates", "user_view.html"));
          }
        } else {
          serveFile(res, path.join(__dirname, "templates", "login.html"));
        }
      });
    }

    else if (url.pathname === "/register") {
      parseBody(req, data => {
        if (db.users[data.name]) {
          serveFile(res, path.join(__dirname, "templates", "register_fail.html"));
        } else {
          db.users[data.name] = { pswd: data.password, auth: data.auth };
          serveFile(res, path.join(__dirname, "templates", "login.html"));
        }
        console.log(db);
      });
    }

    else if (url.pathname === "/save_content") {
      parseBody(req, data => {
        const newItem = {
          src: `static/${data.typeData}/${data.src}`,
          title: data.title,
          author: data.author,
          price: data.price,
          extension: data.extension,
          category: data.category,
          rating: data.rating,
          description: data.description
        };
        content[data.typeData].push(newItem);
        console.log(content);
        serveFile(res, path.join(__dirname, "templates", "admi_view.html"));
      });
    }

    else {
      res.writeHead(404);
      res.end("Ruta POST no encontrada");
    }
  }

  // Otros métodos no permitidos
  else {
    res.writeHead(405);
    res.end("Método no permitido");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});

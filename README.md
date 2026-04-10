# Entrega Final

# Docker Image

La imagen del proyecto está disponible en Docker Hub:

👉 https://hub.docker.com/r/cesvalde/entrega_final

## Ejecutar con Docker

```bash
docker pull cesarvalderrama/entrega_final
docker run -p 8080:8080 cesarvalderrama/entrega_final
```

---

# 🧠 7. Si usas MongoDB (IMPORTANTE)

Si tu app usa Mongo local, en Docker necesitas:

### Opción A (simple): usar Mongo Atlas

```env
MONGO_URL=your_mongo_atlas_connection_string
```

---

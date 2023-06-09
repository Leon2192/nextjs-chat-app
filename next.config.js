/** @type {import('next').NextConfig} */
const nextConfig = {
    appDir: true,
    swcPlugins: [
        ["next-superjson-plugin", {}]
    ],
    images: {
        domains: [
            'res.cloudinary.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ]
    },

    // Configuración para la carpeta pública y los assets estáticos
    // Puedes ajustar esto según la estructura de tu proyecto
}

module.exports = nextConfig

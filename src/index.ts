import createServer from 'server';

const startServer = () => {
    const app = createServer();
    const PORT: number = parseInt(<string>process.env.PORT) || 4000

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
     });
}

startServer();
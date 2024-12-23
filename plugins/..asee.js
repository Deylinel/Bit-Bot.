const listAllChats = async (conn) => {
    try {
        const chats = await conn.chats.all();
        console.log('Listado de chats:', chats.map(chat => chat.id));
    } catch (error) {
        console.error('Error al listar chats:', error);
    }
};

// Llama a esta función después de que el bot haya iniciado sesión
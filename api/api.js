const BASE_URL = 'http://localhost:5249/api/biblioteca';

export const getListar = async () => {
    try {
        // EXECUTA
        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response)
        if (!response.ok) {
            throw new Error(`GET resquest failed with status ${response.status}`)
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;

    }
    catch (error) {
        // TRATATIVA DO ERRO
        console.error(error)
        throw error;
    }
}

export const postEmprestar = async (idBook, nomeUser, anoNasc) => {
    try {
        let myBody = {
            idBook: idBook,
            nomeUser: nomeUser,
            anoNasc: anoNasc
        };

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myBody),
        });

        if (!response.ok) {
            throw new Error("Post request failed!")
        }

        const textData = await response.text();
        return JSON.parse(textData);

    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getLerUnicoLivro = async (idBook) => {
    try {
        // EXECUTA
        const response = await fetch(`${BASE_URL}/${idBook}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response)
        if (!response.ok) {
            throw new Error(`GET resquest failed with status ${response.status}`)
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;

    }
    catch (error) {
        // TRATATIVA DO ERRO
        console.error(error)
        throw error;
    }
}

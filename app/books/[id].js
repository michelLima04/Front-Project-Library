import { router, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { getLerUnicoLivro, postEmprestar } from "../../api/api";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Modal, ScrollView, TextInput } from "react-native-web";

export default function BooksPage() {
    const [book, setBook] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [dtNascimento, setDtNascimento] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [qtd, setQtd] = useState("");
    const [bookId, setBookId] = useState();
    const [alert1, setAlert1] = useState(false); //Estoque insuficiente
    const [alert2, setAlert2] = useState(false); //Sem dados
    const [alert3, setAlert3] = useState(false); //Emprestado!
    const { id } = useLocalSearchParams();

    const router = useRouter();

    const clearRedirect = (waiting = false) => {
        setName("");
        setDtNascimento("");
        setBookId();

        if (waiting) {
            router.push('/'); 
        }
        setAlert1(false);
        setAlert2(false);
        setAlert3(false);
    }

    const handleRent = async () => {
        if (name === "" || dtNascimento === "") {
            setAlert2(true);
            setTimeout(() => {
                setAlert2();

                clearRedirect();
            }, 2000);
            return;

        }

        if (book.qtd < 1) {
            setAlert1(true);
            setTimeout(() => {
                setAlert1(false);

                clearRedirect();

            }, 2000);
            return;

        }

        const rent = await postEmprestar(bookId, name, dtNascimento);

        if(rent){
            setAlert3(true);
            setTimeout(() => {
                setAlert3(false);

                clearRedirect(true);

            }, 3000);
        }   



    }

    useEffect(() => {
        const getBook = async () => {
            const data = await getLerUnicoLivro(id)
            setBook(data)
            console.log(data)
        }
        getBook();
    }, [])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.titleBook}>{book.titulo}</Text>
                    <Text style={styles.sinopseBook}>{book.sinopse}</Text>
                    <Text style={styles.qtdBook}>Qtd disponível: {book.qtd}</Text>

                    <TouchableOpacity
                        style={styles.btnEmprestar}
                        onPress={() => [setBookId(book.id), setModalVisible(true)]}
                    >
                        <Text style={styles.emprestarText}>Emprestar</Text>
                    </TouchableOpacity>



                    {/* delvover */}

                    


                    <TouchableOpacity
                        style={styles.btnVoltar}
                        onPress={() =>
                            router.push({
                                pathname: "/",

                            })
                        }
                    >
                        <Text style={styles.voltarText}>Voltar</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Exemplo de Modal</Text>

                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nome Completo:"
                                    value={name}
                                    onChangeText={(value) => setName(value)}
                                />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Ano nascimento:"
                                    value={dtNascimento}
                                    onChangeText={(value) => setDtNascimento(value)}
                                />

                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Fechar"
                                        onPress={() => setModalVisible(false)}
                                    />
                                    <Button
                                        title="Emprestar"
                                        onPress={() => handleRent()}

                                    />

                                </View>

                                <View>
                                        {
                                             alert1
                                                ? <Text style={styles.errorText}>
                                                    Estoque insuficiente!
                                                </Text>
                                                : <></>
                                        }

                                        {
                                            alert2
                                                ? <Text style={styles.errorText}>
                                                    Dados incompletos!
                                                </Text>
                                                : <></>
                                        }

                                        {
                                            alert3
                                                ? <Text style={styles.successText}>
                                                    Livro emprestado com sucesso!
                                                </Text>
                                                : <></>
                                        }
                                </View>
                            </View>
                           
                        </View>
                    </Modal>

                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        alignItems: "center"
    },
    card: {
        marginTop: 15,
        width: "100%",
        height: "auto",
        backgroundColor: "#ddd",
        borderRadius: 15,
        border: 1,
        borderColor: "#000",
        padding: 5
    },
    titleBook: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    sinopseBook: {

        marginTop: 15,
        textAlign: "justify",
        fontSize: 10
    },
    qtdBook: {
        marginTop: 5,
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 10
    },

    btnEmprestar: {
        marginTop: 15,
        backgroundColor: "#F01C1C",  // Correção da cor
        paddingVertical: 1,
        paddingHorizontal: 10,
        borderRadius: 5,  // Bordas arredondadas
        alignSelf: "center",  // Alinhar à esquerda
        marginBottom: 5,
    },
    btnDevolver: {

        backgroundColor: "#1DDB00",  // Correção da cor
        paddingVertical: 1,
        paddingHorizontal: 10,
        borderRadius: 5,  // Bordas arredondadas
        alignSelf: "center",  // Alinhar à esquerda
        marginBottom: 5,

    },
    emprestarText: {
        marginTop: 0,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase"
    },

    btnVoltar: {
        marginTop: 0,
        backgroundColor: "#283639", 
        paddingVertical: 1,
        paddingHorizontal: 10,
        borderRadius: 5,  
        alignSelf: "center",  
        marginBottom: 5,

    },
    voltarText: {
        marginTop: 0,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase"
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        marginTop: 5,
        color: "red",
        alignSelf: "center",  
        fontSize: 14,
        fontWeight: "bold",
    },
    successText: {
        marginTop: 5,
        color: "green",
        alignSelf: "center",  
        fontSize: 14,
        fontWeight: "bold",
    }

})
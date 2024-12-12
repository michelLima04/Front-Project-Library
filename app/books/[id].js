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
                                <Text style={styles.modalTitle}>Informe seus dados</Text>

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
        backgroundColor: "#2C3E50", 
        padding: 20,
        alignItems: "center",
        paddingTop: 40,
    },
    card: {
        marginTop: 20,
        width: "100%",
        backgroundColor: "#34495E", 
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#F1C40F",
        padding: 20,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    titleBook: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22, 
        color: "#ECF0F1", 
        marginBottom: 10,
        fontFamily: "Roboto",
    },
    sinopseBook: {
        marginTop: 15,
        textAlign: "justify",
        fontSize: 14,
        color: "#BDC3C7", 
    },
    qtdBook: {
        marginTop: 5,
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 14,
        color: "#ECF0F1", 
    },
    btnEmprestar: {
        marginTop: 20,
        backgroundColor: "#1ABC9C", 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: "center",
        shadowColor: "#1ABC9C", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    // btnDevolver: {
    //     marginTop: 15,
    //     backgroundColor: "#1DDB00", // Cor para o botão devolver
    //     paddingVertical: 12,
    //     paddingHorizontal: 20,
    //     borderRadius: 30,
    //     alignSelf: "center",
    //     shadowColor: "#1DDB00", 
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 3,
    //     elevation: 5,
    // },
    emprestarText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
    },
    btnVoltar: {
        marginTop: 20,
        backgroundColor: "#283639", 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: "center",
        shadowColor: "#283639", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    voltarText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContainer: {
        backgroundColor: '#34495E', 
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#F1C40F", 
    },
    textInput: {
        height: 40,
        borderColor: '#BDC3C7',
        borderWidth: 2,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
        color: "#FFFFFF",
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
        color: "#00ff00",
        alignSelf: "center",  
        fontSize: 14,
        fontWeight: "bold",
    }
});
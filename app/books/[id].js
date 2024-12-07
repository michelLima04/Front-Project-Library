import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { getLerUnicoLivro } from "../../api/api";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {  Button, Modal, ScrollView, TextInput} from "react-native-web";

export default function BooksPage() {
    const [book, setBook] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [dtNascimento, setDtNascimento] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [qtd, setQtd] = useState("");
    const [bookId, setBookId] = useState();
    const { id } = useLocalSearchParams();


    useEffect(() => {
        const getBook = async () => {
            const data = await getLerUnicoLivro(id)
            setBook(data)
            console.log(data)
        }
        getBook();
        //console.log(book)
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
                        onPress={() => [setBookId(item.id), setModalVisible(true)]}
                    >
                        <Text style={styles.emprestarText}>Emprestar</Text>
                    </TouchableOpacity>


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
    emprestarText: {
        marginTop: 0,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase"
    },

    btnVoltar: {
        marginTop: 0,
        backgroundColor: "#283639",  // Correção da cor
        paddingVertical: 1,
        paddingHorizontal: 10,
        borderRadius: 5,  // Bordas arredondadas
        alignSelf: "center",  // Alinhar à esquerda
        marginBottom: 5,

    },
    voltarText: {
        marginTop: 0,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase"
    },



})
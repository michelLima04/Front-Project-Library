import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Modal, ScrollView, TextInput } from "react-native-web";
import { router } from "expo-router";
import { getListar } from "../api/api";



export default function Page() {
  const [books, setBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [bookId, setBookId] = useState();
  const [sinopse, setSinopse] = useState("");
  const [qtd, setQtd] = useState("");

 


  useEffect(() => {
    const getBooks = async () => {
      const data = await getListar()
      setBooks(data)
      console.log(data)
    }
    getBooks();
    //console.log(books)
  }, [])

  const handleRent = async () => {
   // const response = await postEmprestar(bookId, name, dtNascimento);
    //console.log(response)
  }

  return (
    <>
    
      <View style={styles.container}>
        <Text style={styles.title}>BIBLIOTECA.IO</Text>

        <ScrollView>
          {books.map((item, index) => (
            <Pressable onPress={() => {
              router.push({
                pathname: "books/[id]",
                params: {id: item.id}
              })
            }}>
              <View style={styles.card}>
              
              <Text style={styles.titleBook}>{item.titulo}</Text>
              <Text style={styles.authorBook}>{item.autor}</Text>
              <Text style={styles.yearBook}>{item.ano}</Text>
              
              </View>
              
            </Pressable>
            
          ))}

        </ScrollView>
        
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50", // Azul escuro para o fundo da tela
    padding: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#F1C40F",  // Dourado para o título
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Playfair Display", // Fonte serifada
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    marginTop: 20,
    width: "100%",
    height: "auto",
    backgroundColor: "#fff", // Branco para o fundo do card
    borderRadius: 10,
    borderColor: "#D4AF37", // Dourado para a borda do card
    borderWidth: 2, // Bordas mais grossas para dar destaque
    padding: 10,
    shadowColor: "#000", // Sombra preta
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  titleBook: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#34495E", // Azul claro escuro para o título do livro
  },
  authorBook: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#7F8C8D", // Cinza médio para o autor
    textTransform: "capitalize",
  },
  yearBook: {
    textAlign: "center",
    fontSize: 12,
    color: "#95A5A6", // Cinza claro para o ano
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#1A5276", // Azul escuro para o botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "#1A5276", // Sombra para o botão
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  btnText: {
    color: "#F1C40F", // Texto dourado no botão
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
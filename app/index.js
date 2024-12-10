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
    backgroundColor: "#2C3E50", 
    padding: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40, // Aumentando o tamanho
    color: "#F1C40F", // Mantendo a cor dourada
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Merriweather",
    letterSpacing: 3, // Aumentando o espaçamento das letras
    textShadowColor: "#000", // Cor da sombra
    textShadowOffset: { width: 0, height: 4 }, // Distância da sombra
    textShadowRadius: 6, // Intensidade da sombra
    backgroundColor: "transparent",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    marginTop: 20,
    width: "auto",
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
    fontSize: 20,
    color: "#ECF0F1", 
    marginBottom: 10,
    fontFamily: "Roboto", 
  },
  authorBook: {
    textAlign: "center",
    fontSize: 16,
    color: "#BDC3C7",
    marginBottom: 8,
  },
  yearBook: {
    textAlign: "center",
    fontSize: 14,
    color: "#95A5A6", 
    marginTop: 4,
  },
  btn: {
    backgroundColor: "#1ABC9C", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "#1ABC9C", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  btnText: {
    color: "#F1C40F", 
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
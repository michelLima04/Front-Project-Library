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
        <Text style={styles.title}>Biblioteca</Text>

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
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  card: {
    marginTop: 15,
    width: "100%",
    height: 100,
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
  authorBook: {
    textAlign: "center",
    marginTop: 15,
    textTransform: 'capitalize',
    fontSize: 14
  },
  yearBook: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold"
  },
  btn: {
    backgroundColor: "#F01C1C",  // Correção da cor
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 5,  // Bordas arredondadas
    marginTop: 0,
    alignSelf: "flex-end",  // Alinhar à esquerda
    marginBottom: 5,

  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  item:{
    textAlign: "center",
  },
  example:{
    backgroundColor: "red"
  }
  
});
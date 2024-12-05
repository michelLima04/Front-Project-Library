import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getListar, postEmprestar } from "./api/api";
import { Button, Modal, ScrollView, TextInput } from "react-native-web";



export default function App() {
  const [books, setBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [bookId, setBookId] = useState();

  const getBooks = async () => {
    const data = await getListar()
    setBooks(data)
    console.log(data)
  }


  useEffect(() => {
    getBooks();
  }, [])

  const handleRent = async () => {
    const response = await postEmprestar(bookId, name, dtNascimento);
    console.log(response)
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Biblioteca</Text>

        <ScrollView>
          {books.map((item) => (
            <View 
              style={styles.card} 
              key={item.id}
            >
              <Text style={styles.titleBook}>{item.titulo}</Text>
              <Text style={styles.authorBook}>{item.autor}</Text>
              <Text style={styles.yearBook}>{item.ano}</Text>

              <TouchableOpacity 
                style={styles.btn}
                onPress={() => [ setBookId(item.id), setModalVisible(true)]}
              >
                <Text style={styles.btnText}>Emprestar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <TextInput 
              value={name}
              onChangeText={setName}
              placeholder="Nome:"
            />
            <TextInput 
              value={dtNascimento}
              onChangeText={setDtNascimento}
              placeholder="Data de nascimento:"
            />
            <Button title="Emprestar livro" onPress={() => handleRent()} />
            <Button title="Fechar Modal" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </Modal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
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
    marginTop: 15,
    textTransform: 'capitalize',
    fontSize: 14
  },
  yearBook: {
    fontSize: 12,
    fontWeight: "bold"
  },
  btn: {
    display: "flex",
    backgroundColor: "##F01C1C",
    width: 120,
    justifyContent: "center",
    alignItems: "center"

  },
  btnText: {
    fontSize: 20,
    textTransform: "uppercase",
  }
});
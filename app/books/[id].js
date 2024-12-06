import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View} from "react-native";

export default function BooksPage(){
    const { id } = useLocalSearchParams();

    return(
        <View style={style.container}>
            <Text> My Book Page {id} </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItens: "center",
        justifyContent: "center",
    }
})
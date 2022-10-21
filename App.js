import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";

import { FlatList } from "react-native";
import StyledText from "./components/StyledText";

// make a react component
const Card = (c) => {
	return (
		<View style={styles.card}>
			{/* <Text>{c.flag}</Text> */}
			<Image
				style={styles.flag}
				source={{
					uri: c.flags.png,
				}}
			/>
			<View style={styles.cardContent}>
				<StyledText>{c.name.common}</StyledText>
			</View>
		</View>
	);
};

export default function App() {
	const [countries, setCountries] = useState([]);



  	const fetchCountries = async () => {
			const response = await fetch("https://restcountries.com/v3.1/all");
			const data = await response.json();
			// console.log(data[0]);
			setCountries(data);
		};


  	useEffect(() => {
			fetchCountries();
		}, []);

  




	const renderItem = ({ item }) => <Card {...item} />;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<StyledText>
					<Text style={styles.headerText}>REST COUNTRIES</Text>
				</StyledText>
			</View>
			<FlatList
				data={countries}
				renderItem={renderItem}
				keyExtractor={(item) => item.cca3}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "stretch",
		// justifyContent: "center",
		padding: 20,
	},

  header: {
    // backgroundColor: "#f4511e",
    textAlign: "center",
    paddingTop: 20,
    display: "flex",
    alignItems: "center",
    // marginBottom: 20,
  },
	headerText: {
		fontSize: 30,
		fontWeight: "bold",
		// color: "blue",
		// marginBottom: 10,
		// marginTop: 20,
		// textAlign: "center",
	},
	flag: {
		width: "100%",
		height: 200,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
	},
	card: {
		backgroundColor: "#eee",
		borderWidth: 1,
		borderColor: "#ccc",
		// padding: 10,
		marginTop: 30,
		// width:"100%",
		borderRadius: 6,
	},
	cardContent: {
		padding: 10,
		// fontFamily: "DMSans_400Regular",
		fontFamily: "monospace",
	},
});

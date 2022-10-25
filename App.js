import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";

import { FlatList } from "react-native";
import StyledText from "./components/StyledText";
// import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// r
function HomeScreen({ navigation }) {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((res) => res.json())
			.then((data) => {
				setCountries(data);
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={countries}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.card}
						onPress={() => navigation.navigate("Details",{
							details: item
						})}
					>
						{/* {console.log(item[0])} */}
						<Image
							style={styles.flag}
							source={{
								uri: item.flags.png,
							}}
						/>
						<View style={styles.cardContent}>
							<StyledText>{item.name.common}</StyledText>
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.cca3}
			/>

			<StatusBar style="auto" />
		</View>
	);
}

function DetailsScreen({route, navigation}) {

	const {details} = route.params;

	// set the title of the screen as the name of the country
	useEffect(() => {
		navigation.setOptions({ title: details.name.common });
	}, []);
	


	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<ScrollView>

			<Text>{JSON.stringify(details)}</Text>
			</ScrollView>
		</View>
	);
}

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
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

import { Text } from "react-native";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans"; 

const StyledText = (props) => {

      let [fontsLoaded] = useFonts({
				" DMSans_400Regular": DMSans_400Regular,
			});

      if (!fontsLoaded) {
				return null;
			}



	return (
		<Text
			style={{
				fontFamily: "DMSans_400Regular",
			}}
		>
			{props.children}
		</Text>
	);
};

export default StyledText;

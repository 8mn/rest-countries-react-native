import { Text } from "react-native";

const StyledText = (props) => {




	return (
		<Text
			style={{
				// fontFamily: "DMSans_400Regular",
			}}
		>
			{props.children}
		</Text>
	);
};

export default StyledText;

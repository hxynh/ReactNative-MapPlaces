import { launchCameraAsync } from "expo-image-picker";
import { Button, Pressable, View } from "react-native";

export default function ImagePicker() {
    async function takeImageHandler() {
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image);
    }

    return (
        <View>
            <View>
                
            </View>
            <Button 
                title="Take Image"
                onPress={takeImageHandler}
                />
        </View>
    )
}
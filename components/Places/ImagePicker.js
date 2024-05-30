import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { Alert, Button, Pressable, View } from "react-native";

export default function ImagePicker() {
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermission() {
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionRequest = await requestPermission();
            return permissionRequest.granted;
        }
        if(cameraPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions', 'You need to grant permission to use this feature');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermission();
        
        if(!hasPermission) {
            return;
        }
        
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
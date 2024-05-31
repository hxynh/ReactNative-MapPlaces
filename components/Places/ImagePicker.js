import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, Text, Pressable, View, StyleSheet } from "react-native";
import {Colors} from '../../constants/colors';

export default function ImagePicker() {
    const [pickedImage, setPickedImage] = useState('');
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
        setPickedImage(image.assets[0].uri);
    }

    const imagePreview = pickedImage ? 
                    <Image style={styles.image} source={{uri: pickedImage }} /> : 
                    <Text>Image not avaialble yet.</Text>

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <Button 
                title="Take Image"
                onPress={takeImageHandler}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: Colors.primary100,
    },
    image: {
        width: '100%',
        height: '100%',

    }

})
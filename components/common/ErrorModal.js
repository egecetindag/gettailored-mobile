import { Modal, Text, View } from 'react-native';
import React from 'react';
function ErrorModal({errorMsg}) {
    return (
        <Modal visible={true}>
            <Text>{errorMsg}</Text>
        </Modal>
    )


}

export default ErrorModal;
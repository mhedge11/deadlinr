import { View, Text } from 'react-native';

function IndividualThreadItem({ threadWords }) {
    return (
        <View>
            <Text>{threadWords}</Text>
        </View>
    );
}

export default IndividualThreadItem;

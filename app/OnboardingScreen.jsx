import React from 'react';
import { router } from 'expo-router';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    View,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        image: require('../assets/images/love.png'),
        subtitle: 'Welcome to SellyBloom\nWhere every flower tells a story.',
    },
    {
        id: '2',
        image: require('../assets/images/roses.png'),
        subtitle: 'Make Every Occasion Blossom.',
    },
    {
        id: '3',
        image: require('../assets/images/bouquet.png'),
        subtitle: 'Bringing Beauty to Every Moment.',
    },
];

const Slide = ({ item }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={item.image}
                style={{ height: '75%', width, resizeMode: 'contain' }}
            />
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    );
};

const OnboardingScreen = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const flatListRef = React.useRef(null);

    const updateCurrentSlideIndex = (e) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentSlideIndex(index);
    };

    const Footer = () => {
        return (
            <View
                style={{
                    height: height * 0.25,
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                    }}
                >
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex === index && {
                                    backgroundColor: '#fff',
                                    width: 25,
                                },
                            ]}
                        />

                    ))
                    };

                </View>

                {/* Buttons */}
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => router.push('/Login')}
                            style={[
                                styles.btn,
                                {
                                    backgroundColor: 'transparent',
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                },
                            ]}
                        >
                            <Text
                                style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}
                            >
                                Log in
                            </Text>
                        </TouchableOpacity>

                        <View style={{ width: 15 }} />

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => router.replace('HomeScreen')}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFC9DC' }}>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ height: height * 0.75 }}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Slide item={item} />}
            />

            <Footer />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    subtitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '70%',
        marginTop: 20,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#C13B85',
        justifyContent: 'center',
        alignItems: 'center',
    },
}
);


export default OnboardingScreen;
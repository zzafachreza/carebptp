import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
  Linking,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors } from '../../utils/colors';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyCarouser({ jenis = 1 }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://carebptp.zavalabs.com/api/slider.php?jenis=' + jenis).then(res => {
      console.log('slider', res.data);
      setData(res.data);
    });
  }, []);

  const [data, setData] = useState([]);

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      if (jenis == "konsul") {

        if (item.id == 32) {
          Linking.openURL('https://www.litbang.pertanian.go.id/hasil/600');
        } else if (item.id == 33) {
          Linking.openURL('http://repository.pertanian.go.id/handle/123456789/15131');
        }
      }
    }}>
      <Image
        source={{ uri: item.image }}
        style={{
          resizeMode: 'cover',
          height: 180,
          width: 300,
          borderRadius: 10,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <Carousel

        loop={true}
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={windowWidth - 100}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    // position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: colors.black,
    height: 250,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  cardImage: {
    height: 250,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});

import React from 'react';
import {
  Dimensions,
  Linking,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {ClientSheet} from './components/ClientSheet';
import {Avatar as BaseAvatar} from './components/Avatar';
import {
  SatisfactionPill,
  SatisfactionLevel,
} from './components/SatisfactionPill';
import {pointsOfInterest, PointOfInterest} from './data/pois';
import {NavigationOptionsSheet} from './components/NavigationOptionsSheet';
import {ClientSearch} from './components/ClientSearch';

const {width} = Dimensions.get('window');

const pois: readonly PointOfInterest[] = pointsOfInterest;

const App = () => {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  const [showClientSheet, setShowClientSheet] = React.useState(false);
  const [showNavigationOptions, setShowNavigationOptions] = React.useState(
    false,
  );

  const mapRef = React.useRef<MapView>(null);
  const markerRefs = React.useRef<Array<Marker | null>>([]);
  const carouselRef = React.useRef<Carousel<PointOfInterest>>(null);

  const activePoi = pois[activeItemIndex];

  React.useEffect(() => {
    const marker = markerRefs.current[activeItemIndex];

    if (marker !== null) {
      marker.showCallout();
    }

    // @ts-ignore - can't get TS to be OK with these 🤔
    if (carouselRef.current?.currentIndex !== activeItemIndex) {
      // @ts-ignore - can't get TS to be OK with these 🤔
      carouselRef.current?.snapToItem(activeItemIndex);
    }
  }, [activeItemIndex]);

  React.useEffect(() => {
    mapRef.current?.animateToRegion(
      {
        latitude: activePoi.latitude,
        longitude: activePoi.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      500,
    );
  }, [activePoi]);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.fullHeight}
        initialRegion={{
          latitude: activePoi.latitude,
          longitude: activePoi.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {pois.map((poi, index) => (
          <Marker
            ref={(ref) => markerRefs.current.push(ref)}
            key={poi.title}
            coordinate={{latitude: poi.latitude, longitude: poi.longitude}}
            title={poi.title}
            pinColor={index === activeItemIndex ? '#3a86ff' : 'red'}
            onPress={() => setActiveItemIndex(index)}
          />
        ))}
      </MapView>

      <SafeAreaView
        style={{
          position: 'absolute',
          width,
        }}>
        <ClientSearch
          clients={pois}
          showClient={(clientId: number) => {
            setActiveItemIndex(
              pois.findIndex((client) => client.id === clientId),
            );
            setShowClientSheet(true);
          }}
        />
      </SafeAreaView>

      <NavigationButton onPress={() => setShowNavigationOptions(true)}>
        <Icon
          name="navigation"
          style={{transform: [{rotate: '45deg'}]}}
          color="white"
          size={32}
        />
      </NavigationButton>

      <Carousel
        ref={carouselRef}
        data={pois.slice(0, 5)}
        containerCustomStyle={{
          position: 'absolute',
          bottom: 0,
          height: 300,
          paddingTop: 42,
        }}
        itemWidth={width * 0.75}
        sliderWidth={width}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.9}
        onSnapToItem={setActiveItemIndex}
        renderItem={({item, index}) => (
          <Card
            onPress={() => {
              setShowClientSheet(true);
            }}
            disabled={index !== activeItemIndex}>
            <Avatar source={{uri: 'https://i.pravatar.cc/84'}} />
            <SatisfactionPill level={SatisfactionLevel.satisfied} />
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="phone" size={18} />
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                <Text style={{marginLeft: 8}}>{item.phone}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />

      {/* Begin Modals/Sheets */}
      <ClientSheet
        visible={showClientSheet}
        onClose={() => setShowClientSheet(false)}
        client={pois[activeItemIndex]}
      />

      <NavigationOptionsSheet
        visible={showNavigationOptions}
        onClose={() => setShowNavigationOptions(false)}
      />
    </>
  );
};

const Card = styled.TouchableOpacity`
  height: 200px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
`;

const Avatar = styled(BaseAvatar)`
  position: absolute;
  top: -42px;
`;

const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #aaa;
`;

const NavigationButton = styled.TouchableOpacity`
  background-color: #3a86ff;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  position: absolute;
  right: 16px;
  bottom: 332px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px #444;
`;

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
});

export default App;

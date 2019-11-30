import * as React from 'react'
import { ScrollView, StyleSheet,Text, View, Button  } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RNCamera } from 'react-native-camera';
// import { Camera } from 'expo-camera';


export default class LinksScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render(){
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
    <ScrollView style={styles.container}>
     <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
          
        
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
          <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{
                flex: 10,
                width: 500 ,
                height:500,
              }}
            >
          </RNCamera>
    </ScrollView>
  );
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

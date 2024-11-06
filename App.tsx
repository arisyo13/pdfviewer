import React from 'react';
import {
  Button,
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PDFView from 'react-native-pdf';

const MainApp = () => {
  const [openPdf, setOpenPdf] = React.useState(false);
  const source = {
    uri: 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf',
    cache: false,
    Headers: {'Cache-Control': 'no-cache'},
  };

  return (
    <View style={styles.container}>
      <Button
        title={`${!openPdf ? 'Open' : 'Close'} pdf`}
        onPress={() => setOpenPdf(!openPdf)}
      />
      <Text>PDF</Text>
      {openPdf && (
        <PDFView
          trustAllCerts={false}
          onError={error => console.log('pdf view error', error)}
          onPressLink={uri => {
            Linking.openURL(uri);
          }}
          onLoadProgress={(percent: number) => {
            console.log(`progress: ${percent}%`);
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`, filePath);
          }}
          source={source}
          style={styles.fullsizePdf}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  fullsizePdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MainApp;

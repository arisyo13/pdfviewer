import React from 'react';
import { Button, Dimensions, Linking, StyleSheet, Text, View } from 'react-native';
import PDFView from 'react-native-pdf';

const MainApp = () => {
  const [openPdf, setOpenPdf] = React.useState(false);
  const source = { uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', cache: false };
  return (
    <View style={styles.container}>
      <Button title={`${!openPdf ? 'Open' : 'Close'} pdf`} onPress={() => setOpenPdf(!openPdf)} />
      <Text>PDF</Text>
      {openPdf && <PDFView
        // trustAllCerts={true}
        onError={(error) => console.log('pdf view error', error)}
        onPressLink={(uri) => {
          Linking.openURL(uri);
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`, filePath);
        }}
        source={source}
        style={styles.fullsizePdf}
      />}
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const [products, setProducts] = useState(null);
  const [token, setToken] = useState('token d555262a9d043e52635ccbc6fb705368c33eedf5');
  const isFocused = useIsFocused();

  useEffect(() => {
    let headers = new Headers();

    //headers.append('Content-Type', 'text/json');
    headers.append('Authorization', token);

    const requestOptions = {
      method:'GET',
      headers: headers,
      };
    fetch('http://192.168.2.18:8000/api/bills/', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // console.log("json", json);
        setProducts(json);
      }).catch((error) => {
        console.error(error);
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facturas</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={products}
        renderItem={({item}) => <View style={styles.item}><Text style={styles.itemText}>{item.company_name}</Text><Text style={styles.itemSubText}>Nit: {item.nit}</Text><Text style={styles.itemSubText}>Cliente: {item.client.first_name} {item.client.last_name}</Text><Text style={styles.itemSubText}>Codigo: {item.code}</Text><Text style={styles.itemSubText}>Producto: {item.product.name}</Text></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    backgroundColor: '#cfcfcf',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'column',
    margin: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 13,
    color: '#000',
  },
});

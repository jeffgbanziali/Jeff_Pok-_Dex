import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [sortedPokemonList, setSortedPokemonList] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
        setInitialList(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const sortPokemonList = () => {
    const sortedList = [...pokemonList];
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
    setSortedPokemonList(sortedList);
    setIsSorted(true);
  };

  const sortReset = () => {
    const sortedList = [...pokemonList];
    sortedList.sort((a, b) => a.id - b.id);
    setSortedPokemonList(sortedList);
    setIsSorted(false);
  };


  return (


    <ScrollView style={styles.container}>
      <Text style={{
        textAlign: 'center',
        color: '#ff2323',
        marginTop: 60,
        fontSize: 20,
        fontWeight: 'bold'
      }}>Poki App</Text>

      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {isSorted ? (
          <Pressable
            style={{
              width: 200,
              height: 50,
              backgroundColor: '#ff2323',
              borderRadius: 10,
              justifyContent: 'center',
            }}
            onPress={sortReset}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Retour à l'état initial
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              width: 200,
              height: 50,
              backgroundColor: '#ff2323',
              borderRadius: 10,
              justifyContent: 'center',
            }}
            onPress={sortPokemonList}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Trier par ordre alpha
            </Text>
          </Pressable>
        )}
      </View>


      <View style={styles.pokiGridContainer}>
        {(isSorted ? sortedPokemonList : pokemonList).map((item, index) => (
          <PokemonItem key={index} name={item.name} />
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>

  );
}

const PokemonItem = ({ name }) => {
  const [poki, setPoki] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setPoki(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [name]);

  return (
    <View style={styles.pokiContainer}>
      {poki && (
        <>
          <View
            style={{
              width: 110,
              height: 110,
              backgroundColor: '#ffff',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {poki.sprites && poki.sprites.front_default && (
              <Image
                source={{ uri: poki.sprites.front_default }}
                style={styles.pokiImage}
              />
            )}
          </View>
          <Text style={styles.pokiName}>{name}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {
              poki.id
            }
          </Text>
          <Text style={styles.pokiType}>Type: {poki.types[0].type.name}</Text>
          <Text style={styles.pokiHeight}>Taille: {poki.height / 10} cm</Text>
          <Text style={styles.pokiWeight}>Poids: {poki.weight / 10} Kg</Text>
          <Text style={styles.pokiExp}>{poki.base_experience}</Text>
        </>
      )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pokiGridContainer: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-evenly",
  },
  pokiImage: {
    width: 100,
    height: 100,
  },
  pokiContainer: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  pokiName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  pokiType: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',

  },
  pokiHeight: {
    fontSize: 20,
    color: 'yellow',
    fontWeight: 'bold',
  },
  pokiWeight: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  pokiExp: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },

});

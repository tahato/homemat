import { Ionicons } from "@expo/vector-icons";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from "../constants/images";
export default function RootLayout() {
  return (
    <>
      <Stack>
<Stack.Screen name="project" options={{ 
    headerTitle:'',
          header:({ navigation }) => (
              <SafeAreaView edges={['top']}>
                <View style={styles.headerLeftContainer}>
                  <View style={{display:"flex",flexDirection:'row',alignItems:'center',gap:5 }}>
                    <TouchableOpacity>
                   <Ionicons name="arrow-back-circle-sharp" size={30} color="white" onPress={navigation.goBack}/>
                    </TouchableOpacity>
                  <Text style={{color:"white"}} > Projet 001-925</Text>

                  </View>
                  <Image source={images.logo} style={{width:50,height:50}}></Image>
                </View>
              </SafeAreaView>
            ),

}} />
        <Stack.Screen name="home" options={{ 
          headerTitle:'',
          header:({ navigation }) => (
              <SafeAreaView edges={['top']}>
                <View style={styles.headerLeftContainer}>
                  <Text style={{color:"white"}} > Bienvenu</Text>
                  <Image source={images.logo} style={{width:50,height:50}}></Image>
                </View>
              </SafeAreaView>
            ),

        }} />

        
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </>

  );
}
const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor:'#293846',
    padding: 10
  },
})

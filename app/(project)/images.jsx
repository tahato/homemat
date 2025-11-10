import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImages } from "../../api/getImages";
import { useGlobalContext } from "../../context/GlobaleProvider";

export default function images() {
  const [isFocus, setIsFocus] = useState(false);
  const { conceptions } = useGlobalContext();
  const data = conceptions.map((item, index) => ({
    label: `Conceptin N° ${index + 1}`,
    value: item.id,
  }));
  const [value, setValue] = useState(data[0]?.value);
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [path, setPath] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchData();
      // console.log("dataaaaaa", imgs);
    }, [value])
  );
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getImages(value);
      setImgs(data.images);
      setLoading(false);
    } catch (e) {
      console.log("error get project", e);
    }
  };
  const displayImage = (img) => {
    // console.log(img);
    setPath(img)
    
    setVisible(true)
  };
  return (
    <SafeAreaView edges={["bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            renderItem={(item) => (
              <View style={{ paddingVertical: 2 }}>
                <Text
                  style={{
                    fontSize: 14,
                    padding: 7,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            )}
            // search
            maxHeight={200}
            labelField="label"
            valueField="value"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginVertical: 20 }}
          />
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              padding: 10,
            }}
          >
            {imgs.map((img, i) => (
              <TouchableOpacity onPress={() => displayImage(img.path)} key={i}>
                <Image
                  source={{ uri: img.path }}
                  style={{ width: 300, height: 200 }}
                  contentFit="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false);
          }}
        >
          <View style={styles.modalContent}>
            <Image
              source={{ uri: path }}
              style={styles.modalImage}
              contentFit="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    margin: 15,
  },
  dropdown: {
    borderRadius: 10,
    padding: 10,
    elevation: 7,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    // position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    fontSize: 13,

    // fontFamily: fonts.mainFont,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  iconStyle: {
    width: 20,
    height: 10,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 13,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 20,
  },
  modalImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
});

import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import WebView from "react-native-webview";
import { getProject } from "../../api/getProject";
import { useGlobalContext } from "../../context/GlobaleProvider";
import { getItem } from "../../tools/AsyncStorage";

export default function threeD() {
  const [appId, setAppId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState(true);
  const [data, setData] = useState([]);
  const { projectId } = useGlobalContext();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(0);
  const [url, setUrl] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [value])
  );
  const getLocalData = async () => {
    const id = await getItem("appId");
    setAppId(id);
  };
  const fetchData = async () => {
    try {
      getLocalData();
      const data = await getProject(projectId);
      setProject(data);
      const list = data.conceptions.map((item, index) => ({
        label: `Conceptin N° ${index + 1}`,
        value: index,
      }));
      setData(list);
      setIsLoading(false);
    } catch (e) {
      console.log("error get project", e);
    }
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <View style={{ display: "flex", flex: 1, position: "relative" }}>
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
                console.log("sqlfjkgysqdhd sqd", item.value);

                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <WebView
            source={{
              uri: `http://192.168.100.25:8000/homemat/view3d/${appId}/${project?.bill_id}/${value}`,
              // uri: "https://homemattest.scriptdzshock.com/homemat/view3d/2/146/0",
            }}
            style={{ flex: 1, position: "relative" }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "35%",
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 2,
  },
  dropdown: {
    borderRadius: 10,
    padding: 8,
    elevation: 7,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    fontSize: 11,

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
    fontSize: 11,
  },
});
